package main

import (
	"embed"
	"os"
	"path/filepath"
	"timezone-calc-desktop/internal/db"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

//go:embed all:frontend/dist
var assets embed.FS
var Title = "Timezone Calculator"

// Setup icon
//
//go:embed all:build/appicon.png
var icon []byte

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Initialize db
	dir, _ := os.UserCacheDir()
	filePath := filepath.Join(dir, "timezone-calc-desktop", "vault.json")
	jsonDB := db.Init(filePath)
	app.db = jsonDB

	// Create application with options
	err := wails.Run(&options.App{
		Title:  Title,
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		MinWidth: 450,

		Mac: &mac.Options{
			About: &mac.AboutInfo{
				Title:   Title,
				Message: "© 2021 braniubojni",
				Icon:    icon,
			},
		},
		Linux: &linux.Options{
			Icon:                icon,
			WindowIsTranslucent: false,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyNever,
			ProgramName:         "wails",
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
