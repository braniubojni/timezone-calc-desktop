package db

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
	"time"
)

func cleanup(filePath string) {
	if err := os.Remove(filePath); err != nil {
		panic(err)
	}
}

func tmpSetup(t *testing.T) string {
	tempDir := t.TempDir()
	dbPath := filepath.Join(tempDir, "test_vault.json")
	return dbPath
}

// TestInit tests the initialization of the database
func TestInit(t *testing.T) {
	// Use a temporary file for testing
	dbPath := tmpSetup(t)

	// Initialize the database
	db := Init(dbPath)
	if db == nil {
		t.Fatal("Failed to initialize database")
	}

	// Check if the file was created
	if _, err := os.Stat(dbPath); os.IsNotExist(err) {
		t.Fatalf("Expected database file to exist at %s, but it doesn't", dbPath)
	}

	// Check if the file contains a valid Vault structure
	data, err := os.ReadFile(dbPath)
	if err != nil {
		t.Fatalf("Failed to read database file: %v", err)
	}

	var vault Vault
	if err := json.Unmarshal(data, &vault); err != nil {
		t.Fatalf("Database file doesn't contain valid JSON: %v", err)
	}

	// The vault should be initialized with an empty entries array
	if vault.Entries == nil {
		t.Fatal("Expected vault.Entries to be initialized, but it's nil")
	}

	if len(vault.Entries) != 0 {
		t.Fatalf("Expected empty vault, but found %d entries", len(vault.Entries))
	}

	// cleanup
	cleanup(dbPath)
}

// TestCreate tests the Create method
func TestCreate(t *testing.T) {
	// Use a temporary file for testing
	dbPath := tmpSetup(t)

	// Create a database instance
	db := Init(dbPath)

	// Check if the file was created
	if _, err := os.Stat(dbPath); os.IsNotExist(err) {
		t.Fatalf("Expected database file to exist at %s, but it doesn't", dbPath)
	}

	// Call Create again to test the case where file already exists
	db.Create() // This should not panic or cause errors

	// Ensure the file contains a valid Vault structure
	data, err := os.ReadFile(dbPath)
	if err != nil {
		t.Fatalf("Failed to read database file: %v", err)
	}

	var vault Vault
	if err := json.Unmarshal(data, &vault); err != nil {
		t.Fatalf("Database file doesn't contain valid JSON: %v", err)
	}

	// cleanup
	cleanup(dbPath)
}

// TestGetAll tests the GetAll method
func TestGetAll(t *testing.T) {
	// Use a temporary file for testing
	dbPath := tmpSetup(t)

	// Create and initialize the database with some test data
	db := Init(dbPath)

	// Create test data
	testVault := Vault{
		Entries: []TimezoneEntry{
			{
				ID:       0,
				Timezone: "America/New_York",
				AddedAt:  time.Now().Format(time.RFC3339),
			},
			{
				ID:       1,
				Timezone: "Europe/London",
				AddedAt:  time.Now().Format(time.RFC3339),
			},
		},
	}

	// Write test data to the file
	data, err := json.Marshal(testVault)
	if err != nil {
		t.Fatalf("Failed to marshal test data: %v", err)
	}

	if err := os.WriteFile(dbPath, data, 0644); err != nil {
		t.Fatalf("Failed to write test data: %v", err)
	}

	// Test GetAll
	vault := db.GetAll()
	if vault == nil {
		t.Fatal("GetAll returned nil")
	}

	if len(vault.Entries) != 2 {
		t.Fatalf("Expected 2 entries, got %d", len(vault.Entries))
	}

	if vault.Entries[0].Timezone != "America/New_York" {
		t.Fatalf("Expected first timezone to be 'America/New_York', got '%s'", vault.Entries[0].Timezone)
	}

	if vault.Entries[1].Timezone != "Europe/London" {
		t.Fatalf("Expected second timezone to be 'Europe/London', got '%s'", vault.Entries[1].Timezone)
	}

	// cleanup
	cleanup(dbPath)
}

// TestAdd tests the Add method
func TestAdd(t *testing.T) {
	// Use a temporary file for testing
	dbPath := tmpSetup(t)

	// Create and initialize the database
	db := Init(dbPath)

	// Add a timezone
	db.Add("Africa/Nairobi")

	// Verify it was added
	vault := db.GetAll()
	if vault == nil {
		t.Fatal("GetAll returned nil after Add")
	}

	if len(vault.Entries) != 1 {
		t.Fatalf("Expected 1 entry after Add, got %d", len(vault.Entries))
	}

	if vault.Entries[0].Timezone != "Africa/Nairobi" {
		t.Fatalf("Expected timezone to be 'Africa/Nairobi', got '%s'", vault.Entries[0].Timezone)
	}

	// Add another timezone
	db.Add("Europe/Paris")

	// Verify both timezones are in the database
	vault = db.GetAll()
	if len(vault.Entries) != 2 {
		t.Fatalf("Expected 2 entries after second Add, got %d", len(vault.Entries))
	}

	// Try adding a timezone that doesn't exist in constants.Timezones
	initialCount := len(vault.Entries)
	db.Add("NonExistent/Timezone")

	// This should not add a new entry
	vault = db.GetAll()
	if len(vault.Entries) != initialCount {
		t.Fatalf("Expected %d entries after adding non-existent timezone, got %d",
			initialCount, len(vault.Entries))
	}

	// Cleanup
	cleanup(dbPath)
}

// TestRemove tests the Remove method
func TestRemove(t *testing.T) {
	// Use a temporary file for testing
	dbPath := tmpSetup(t)

	// Create and initialize the database
	db := newDB(dbPath)
	db.Create()

	// Add two timezones
	db.Add("Africa/Nairobi")
	db.Add("Europe/Paris")

	// Verify they were added
	vault := db.GetAll()
	if len(vault.Entries) != 2 {
		t.Fatalf("Expected 2 entries after adding, got %d", len(vault.Entries))
	}

	// Remove one timezone
	db.Remove("Africa/Nairobi")

	// Verify it was removed
	vault = db.GetAll()
	if len(vault.Entries) != 1 {
		t.Fatalf("Expected 1 entry after removing one, got %d", len(vault.Entries))
	}

	if vault.Entries[0].Timezone != "Europe/Paris" {
		t.Fatalf("Expected remaining timezone to be 'Europe/Paris', got '%s'", vault.Entries[0].Timezone)
	}

	// Remove a timezone that doesn't exist
	db.Remove("NonExistent/Timezone")

	// This should not change anything
	vault = db.GetAll()
	if len(vault.Entries) != 1 {
		t.Fatalf("Expected 1 entry after removing non-existent timezone, got %d", len(vault.Entries))
	}

	// Remove the last timezone
	db.Remove("Europe/Paris")

	// Verify the database is empty
	vault = db.GetAll()
	if len(vault.Entries) != 0 {
		t.Fatalf("Expected 0 entries after removing all timezones, got %d", len(vault.Entries))
	}

	// cleanup
	cleanup(dbPath)
}

// TestRemoveAll tests the RemoveAll method
func TestRemoveAll(t *testing.T) {
	// Use a temporary file for testing
	dbPath := tmpSetup(t)

	// Create and initialize the database
	db := Init(dbPath)

	// Add multiple timezones
	db.Add("Africa/Nairobi")
	db.Add("Europe/Paris")
	db.Add("America/New_York")

	// Verify they were added
	vault := db.GetAll()
	if len(vault.Entries) != 3 {
		t.Fatalf("Expected 3 entries after adding, got %d", len(vault.Entries))
	}

	// Call RemoveAll to remove all timezones
	db.RemoveAll()

	// Verify all entries were removed
	vault = db.GetAll()
	if len(vault.Entries) != 0 {
		t.Fatalf("Expected 0 entries after RemoveAll, got %d", len(vault.Entries))
	}

	// Check that the file contains a valid but empty Vault structure
	data, err := os.ReadFile(dbPath)
	if err != nil {
		t.Fatalf("Failed to read database file after RemoveAll: %v", err)
	}

	var emptyVault Vault
	if err := json.Unmarshal(data, &emptyVault); err != nil {
		t.Fatalf("Database file doesn't contain valid JSON after RemoveAll: %v", err)
	}

	// After RemoveAll, emptyVault.Entries might be nil or an empty slice
	// Either is acceptable for an empty list in JSON, but we need to make sure
	// that we can add items to the database later

	// Add a new timezone after RemoveAll to ensure the database is still functional
	db.Add("Asia/Tokyo")

	// Verify it was added
	vault = db.GetAll()
	if len(vault.Entries) != 1 {
		t.Fatalf("Expected 1 entry after adding post-RemoveAll, got %d", len(vault.Entries))
	}

	if vault.Entries[0].Timezone != "Asia/Tokyo" {
		t.Fatalf("Expected timezone to be 'Asia/Tokyo', got '%s'", vault.Entries[0].Timezone)
	}

	// cleanup
	cleanup(dbPath)
}
