package main

import (
	"context"
	"fmt"
	"timezone-calc-desktop/internal/constants"
	"timezone-calc-desktop/internal/db"
)

// App struct
type App struct {
	ctx context.Context
	db  *db.JsonDB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Get timezones
func (a *App) GetTimezones() []string {
	return constants.Timezones
}

// Get tz list
func (a *App) GetTimezoneList() []db.TimezoneEntry {
	return a.db.GetAll().Entries
}

// Add timezone
func (a *App) AddTimezone(timezone string) {
	a.db.Add(timezone)
}

// Remove timezone
func (a *App) RemoveTimezone(timezone string) {
	a.db.Remove(timezone)
}
