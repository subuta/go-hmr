// code borrowed from https://github.com/antage/eventsource
package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"
  "github.com/fsnotify/fsnotify"
  "gopkg.in/antage/eventsource.v1"
  "github.com/satori/go.uuid"
	"net/http"
  "os/exec"
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
  watcher, err := fsnotify.NewWatcher()
  if err != nil {
    log.Fatal(err)
  }
  defer watcher.Close()

  log.Println("watch file changes")

  go func() {
    for {
      select {
      case event := <-watcher.Events:
        log.Println("event:", event)
        if event.Op&fsnotify.Create == fsnotify.Create {
          log.Println("modified file:", event.Name)
          u1 := uuid.NewV4()
          es.SendEventMessage("sdk built", "message", fmt.Sprintf("%s", u1))
        }
      case err := <-watcher.Errors:
        log.Println("error:", err)
      }
    }
  }()

  err = watcher.Add("./public")
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
