package routes

import (
	"fknexe/internal/api/handlers"
	"net/http"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/items", handlers.GetItemsHandler)
	return mux
}
