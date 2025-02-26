package handlers

import (
	"fknexe/internal/api/components"
	"fknexe/internal/api/models"
	"net/http"
)

func GetItems(w http.ResponseWriter, r *http.Request) {
	component := components.Items(models.GetItems())
	component.Render(r.Context(), w)
}
