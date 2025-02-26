package handlers

import (
	"encoding/json"
	"fknexe/internal/api/models"
	"net/http"
)

func GetItemsHandler(w http.ResponseWriter, r *http.Request) {
	items := models.GetItems()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status": "success",
		"data":   items,
	})
}
