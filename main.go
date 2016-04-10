// code borrowed from https://github.com/antage/eventsource
package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"
  "github.com/rjeczalik/notify"
  "gopkg.in/antage/eventsource.v1"
  "github.com/satori/go.uuid"
	"net/http"
  "os/exec"
  "strings"
  "fmt"
  "log"
  "time"
)

func main() {

	e := echo.New()

	e.Use(middleware.Static("public"))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

  // for server sent events
  es := eventsource.New(
    eventsource.DefaultSettings(),
    func(req *http.Request) [][]byte {
      return [][]byte{
        []byte("Access-Control-Allow-Origin: *"),
        []byte("Content-Type: text/event-stream"),
        []byte("Cache-Control: no-cache"),
        []byte("Connection: keep-alive"),
      }
    },
  )
  defer es.Close()

  es.SendRetryMessage(3 * time.Second)

  // for file watcher
  watchChannel := make(chan notify.EventInfo)
  defer notify.Stop(watchChannel)

  log.Println("watch file changes")

  go func() {
    for {
      event := <- watchChannel
      log.Println("modified file:", event.Path())
        u1 := uuid.NewV4()
      if (strings.Contains(event.Path(), "client")) {
        // if client changed
        out, err := exec.Command("npm", "run", "build-component").CombinedOutput()
        if err != nil {
          errorMessage := string(out)
          log.Println(errorMessage)
        }
        es.SendEventMessage("built", "message", fmt.Sprintf("%s", u1))
      } else if (strings.Contains(event.Path(), "sdk")) {
        // if sdk changed
        es.SendEventMessage("sdk built", "message", fmt.Sprintf("%s", u1))
      }
    }
  }()

  // watch sdk folder recursively
  err := notify.Watch("./sdk/...", watchChannel, notify.All)
  if err != nil {
    log.Fatal(err)
  }

  // watch client folder recursively
  err = notify.Watch("./client/...", watchChannel, notify.All)
  if err != nil {
    log.Fatal(err)
  }

  // use server sent events
  e.Get("/events", standard.WrapHandler(es))

  // endpoint for build
	e.Get("/build", func(c echo.Context) error {
    out, err := exec.Command("npm", "run", "build-component").CombinedOutput()
    if err != nil {
      errorMessage := string(out)
      log.Println(errorMessage)
      return c.String(http.StatusInternalServerError, errorMessage)
    }

    u1 := uuid.NewV4()
    es.SendEventMessage("built", "message", fmt.Sprintf("%s", u1))
    return c.String(http.StatusOK, string(out))
	})

  log.Println("start web server at 8080")
	e.Run(standard.New(":8080"))
}
