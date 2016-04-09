// code borrowed from https://github.com/antage/eventsource
package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"
  "gopkg.in/antage/eventsource.v1"
	"net/http"
  "os/exec"
  "fmt"
  "time"
)

func main() {

	e := echo.New()

	e.Use(middleware.Static("public"))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

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

  // use server sent events
  e.Get("/events", standard.WrapHandler(es))

  // endpoint for build
  counter := 1
	e.Get("/build", func(c echo.Context) error {
    out, err := exec.Command("npm", "run", "build").CombinedOutput()
    if err != nil {
      errorMessage := string(out)
      fmt.Println(errorMessage)
      return c.String(http.StatusInternalServerError, errorMessage)
    }

    es.SendEventMessage("success", "message", fmt.Sprintf("%d", counter))
    counter++;
    return c.String(http.StatusOK, string(out))
	})

  fmt.Println("start web server at 8080")
	e.Run(standard.New(":8080"))
}
