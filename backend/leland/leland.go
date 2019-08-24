package leland

// Leland is a main struct that holds all business logic.
type Leland struct {
	database Database
	//connection Connection
}

// Database is a contract for database client.
type Database interface {
	InsertAsset(Asset) error
	GetAssets() ([]Asset, error)
	GetRunningAssets(string, string) ([]Asset, error)
	GetAsset(string) (Asset, error)
	UpdateAsset(string, Asset) error
	// DeleteAsset(string) error

	// InsertAuction(Auction) error
	// GetAuctions() ([]Auction, error)
}

// Connection is a struct for required third party service.
// type Connection struct {
// 	S4c lelandml.LelandInterface
// }

// New is a function to create leland instance
//func New(db Database, conn Connection) *Leland {
func New(db Database) *Leland {
	return &Leland{
		database: db,
		//connection: conn,
	}
}
