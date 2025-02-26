package main

import (
	"fknexe/internal/api/routes"
	"fknexe/internal/config"
	"fmt"
	"log"
	"net/http"
)

func main() {
	cfg := config.LoadConfig()

	router := routes.SetupRoutes()

	serverAddr := fmt.Sprintf(":%d", cfg.Port)
	log.Printf("Starting server on %s", serverAddr)

	server := http.ListenAndServe(serverAddr, router)
	log.Fatal(server)
}
