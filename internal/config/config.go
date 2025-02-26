package config

type Config struct {
	Port int
	Env  string
}

func LoadConfig() *Config {
	return &Config{
		Port: 8080,
		Env:  "development",
	}
}
