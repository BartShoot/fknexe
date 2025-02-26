package models

type Item struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Link string `json:"link"`
}

func GetItems() []Item {
	return []Item{
		{ID: "1", Name: "Example Item 1", Link: "https://example.com/1"},
		{ID: "2", Name: "Example Item 2", Link: "https://example.com/2"},
		{ID: "3", Name: "Example Item 3", Link: "https://example.com/3"},
	}
}
