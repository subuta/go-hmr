// code borrowed from https://github.com/antage/eventsource
package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"
  "gopkg.in/antage/eventsource.v1"
  "github.com/rjeczalik/notify"
  "github.com/satori/go.uuid"
	"net/http"
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
      if (strings.Contains(event.Path(), "bundle.component-repository.js")) {
        u1 := uuid.NewV4()
        es.SendEventMessage("built", "message", fmt.Sprintf("%s", u1))
      }
    }
  }()

  // watch sdk folder recursively
  err := notify.Watch("./public/...", watchChannel, notify.All)
  if err != nil {
    log.Fatal(err)
  }

  // use server sent events
  e.Get("/events", standard.WrapHandler(es))

  log.Println("start web server at 8080")
	e.Run(standard.New(":8080"))
}
