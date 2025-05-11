package db

import (
	"encoding/json"
	"fmt"
	"os"
	"slices"
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
	if _, err := os.Stat(db.filename); err == nil {
		// File already exists, no need to create
		return
	} else if !os.IsNotExist(err) {
		// Error other than file not existing
		return
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
			}
			break
		}
	}
	vault.Entries = append(vault.Entries, newTz)
	slices.SortFunc(vault.Entries, func(a, b TimezoneEntry) int {
		return a.ID - b.ID
	})

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

func (db *JsonDB) Remove(tz TimezoneEntry) {
	vault := db.GetAll()
	if vault == nil {
		return
	}
	for i, entry := range vault.Entries {
		if entry.ID == tz.ID {
			vault.Entries = slices.Delete(vault.Entries, i, i+1)
			break
		}
	}
	slices.SortFunc(vault.Entries, func(a, b TimezoneEntry) int {
		return a.ID - b.ID
	})

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
