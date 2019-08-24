package main

import (
	"log"
	"net/http"
	"os"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland"
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/database"
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/handler"
	"github.com/julienschmidt/httprouter"
	"github.com/subosito/gotenv"
)

func main() {
	gotenv.Load()

	// MongoDB
	option := &database.Option{
		User:     os.Getenv("MONGO_USER"),
		Password: os.Getenv("MONGO_PASSWORD"),
		Host:     os.Getenv("MONGO_HOST"),
		Port:     os.Getenv("MONGO_PORT"),
		Database: os.Getenv("MONGO_DB"),
	}

	db, err := database.NewMongoDB(option)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	log.Println("Using MongoDB ", os.Getenv("MONGO_DB"), "on", os.Getenv("MONGO_HOST")+":"+os.Getenv("MONGO_PORT"))

	// // s4c
	// connection := leland.Connection{
	// 	LelandML: pertamina_hackathon.NewLelandML(
	// 		os.Getenv("S4C_STORAGEHOST"),
	// 		os.Getenv("S4C_HOST"),
	// 		os.Getenv("S4C_USER"),
	// 		os.Getenv("S4C_PASSWORD"),
	// 		s4c.RequestsTimeout{
	// 			DeleteObjectTimeout:          10 * time.Second,
	// 			GetObjectTemporaryURLTimeout: 10 * time.Second,
	// 			GetObjectTimeout:             10 * time.Second,
	// 			PutObjectTimeout:             10 * time.Second,
	// 		},
	// 		os.Getenv("S4C_BUCKET"),
	// 	),
	// }
	// log.Println("Using S4c ", os.Getenv("S4C_HOST"), "with storage host", os.Getenv("S4C_STORAGEHOST"), "and bucket", os.Getenv("S4C_BUCKET"))

	//	leland := leland.New(db, connection)
	leland := leland.New(db)
	router := httprouter.New()
	lelandHandler := handler.New(leland)

	// route
	router.GET("/healthz", lelandHandler.Healthz)

	// endpoint route
	router.GET("/assets", lelandHandler.GetAssets)
	router.GET("/running-assets", lelandHandler.GetRunningAssets)
	router.GET("/assets/:id", lelandHandler.GetAsset)
	router.POST("/assets", lelandHandler.NewAsset)
	router.PATCH("/assets/:id/running", lelandHandler.ToggleAsset)

	// router.GET("auctions/:id", lelandHandler.GetAuction) //return avg price & max price
	// router.POST("/auctions/:id", lelandHandler.InsertAuction)

	// Start server
	log.Println("Listening at port", os.Getenv("PORT"))
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), router))
}

// router.POST("/assets", lelandHandler.NewAsset)
// router.PATCH("/assets/:id", lelandHandler.UpdateAsset)
// router.DELETE("/assets/:id", lelandHandler.DeleteAsset)
