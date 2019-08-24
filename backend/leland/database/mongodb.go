package database

import (
	"log"
	"time"

	mgo "gopkg.in/mgo.v2"
)

// MongoDB holds the functionality to do database-related works in MongoDB.
type MongoDB struct {
	Session  *mgo.Session
	Database *mgo.Database
}

// Option holds all necessary options for database.
type Option struct {
	User     string
	Password string
	Host     string
	Port     string
	Database string
}

// NewMongoDB returns a pointer of MongoDB instance and error.
func NewMongoDB(opt *Option) (*MongoDB, error) {
	log.Println("Connecting MongoDB Client")
	mongoDialInfo := &mgo.DialInfo{
		Addrs:    []string{opt.Host},
		Database: opt.Database,
		Username: opt.User,
		Password: opt.Password,
		Timeout:  5 * time.Second,
	}
	session, err := mgo.DialWithInfo(mongoDialInfo)
	if err != nil {
		return nil, err
	}
	session.SetMode(mgo.Eventual, true)
	db := session.DB(opt.Database)
	return &MongoDB{Session: session, Database: db}, nil
}

// Collection select table
func (db *MongoDB) Collection(collection string) *mgo.Collection {
	c := db.Database.C(collection)
	return c
}

// Close session
func (db *MongoDB) Close() {
	db.Session.Close()
}
