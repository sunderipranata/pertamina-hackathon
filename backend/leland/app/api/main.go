package main

import (
	"log"
	"net/http"
	"os"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland"
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/database"
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/handler"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
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
	router.POST("/assets/:id/running", lelandHandler.ToggleAsset)
	//router.POST("/assets/prediction", leland.PredictAsset)

	router.GET("/auctions-info/:id", lelandHandler.GetAuctionInfo) //return avg price & max price
	router.GET("/auctions/:id", lelandHandler.GetAuctions)
	router.POST("/auctions", lelandHandler.NewAuction)
	// Start server
	log.Println("Listening at port", os.Getenv("PORT"))
	router2 := cors.Default().Handler(router)

	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), router2))
}

// router.POST("/assets", lelandHandler.NewAsset)
// router.PATCH("/assets/:id", lelandHandler.UpdateAsset)
// router.DELETE("/assets/:id", lelandHandler.DeleteAsset)
