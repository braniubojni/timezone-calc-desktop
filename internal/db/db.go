package db

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"
	"timezone-calc-desktop/internal/constants"
)

var (
	ErrReadError = fmt.Errorf("error reading file")
	ErrNotFound  = fmt.Errorf("tz not found")
)

type JsonDB struct {
	filename string
}

type TimezoneEntry struct {
	ID       int    `json:"id"`
	Timezone string `json:"timezone"`
	AddedAt  string `json:"added_at"`
}

type Vault struct {
	Entries []TimezoneEntry `json:"entries"`
}

func Init(dbName string) *JsonDB {
	db := newDB(dbName)
	db.Create()

	return db
}

func newDB(dbName string) *JsonDB {
	return &JsonDB{
		filename: dbName,
	}
}

func (db *JsonDB) Create() {

	// File already exists, no need to create
	_, err := os.Stat(db.filename)
	if err == nil {
		return
	}

	// File does not exist, create it
	if os.IsNotExist(err) {
		// Create the directory if it doesn't exist
		err = os.MkdirAll(filepath.Dir(db.filename), 0755)
		if err != nil {
			panic(err)
		}
		// Create the file
		_, err = os.Create(db.filename)
		if err != nil {
			panic(err)
		}
	}
	// Check if the error is not related to the file not existing
	if err != nil {
		panic(err)
	}

	// Create new empty vault with empty entries array
	vault := Vault{
		Entries: []TimezoneEntry{},
	}

	// Convert to JSON
	data, err := json.Marshal(vault)
	if err != nil {
		panic(err)
	}

	// Write empty vault to file
	err = os.WriteFile(db.filename, data, 0644)
	if err != nil {
		panic(err)
	}
}

func (db *JsonDB) GetAll() *Vault {
	data, err := os.ReadFile(db.filename)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	var vault Vault
	if err := json.Unmarshal(data, &vault); err != nil {
		fmt.Println(err)
		return nil
	}

	return &vault
}

func (db *JsonDB) Add(tzName string) {
	vault := db.GetAll()
	if vault == nil {
		return
	}

	var newTz TimezoneEntry
	for id, tz := range constants.Timezones {
		if tz == tzName {
			newTz = TimezoneEntry{
				ID:       id,
				Timezone: tz,
				AddedAt:  time.Now().Format(time.RFC3339),
			}
			break
		}
	}
	vault.Entries = append(vault.Entries, newTz)

	data, err := json.Marshal(vault)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = os.WriteFile(db.filename, data, 0644)
	if err != nil {
		fmt.Println(err)
	}
}

func (db *JsonDB) Remove(timezone string) {
	vault := db.GetAll()
	if vault == nil {
		return
	}

	var newEntries []TimezoneEntry
	for _, entry := range vault.Entries {
		if entry.Timezone != timezone {
			newEntries = append(newEntries, entry)
		}
	}
	vault.Entries = newEntries

	data, err := json.Marshal(vault)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = os.WriteFile(db.filename, data, 0644)
	if err != nil {
		fmt.Println(err)
	}
}
