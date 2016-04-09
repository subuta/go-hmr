package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"
	"gopkg.in/antage/eventsource.v1"
	"net/http"
  "os/exec"
  "fmt"
	//"strconv"
	//"time"
)

func main() {

	es := eventsource.New(
		eventsource.DefaultSettings(),
		func(req *http.Request) [][]byte {
			return [][]byte{
				[]byte("X-Accel-Buffering: no"),
				[]byte("Access-Control-Allow-Origin: *"),
			}
		},
	)

	es.SendEventMessage("tick", "tick-event", "test")

	//defer es.Close()
	//
	//http.Handle("/events", es)
	//go func() {
	//	id := 1
	//	for {
	//		es.SendEventMessage("tick", "tick-event", strconv.Itoa(id))
	//		id++
	//		time.Sleep(2 * time.Second)
	//	}
	//}()
	//
	//log.Fatal(http.ListenAndServe(":8080", nil))

	e := echo.New()

	e.Use(middleware.Static("public"))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

  // endpoint for build
	e.Get("/build", func(c echo.Context) error {
    out, err := exec.Command("npm", "run", "build").CombinedOutput()
    if err != nil {
      errorMessage := string(out)
      fmt.Println(errorMessage)
      return c.String(http.StatusInternalServerError, errorMessage)
    }
		return c.String(http.StatusOK, string(out))
	})

  fmt.Println("start web server at 8080")
	e.Run(standard.New(":8080"))
}
