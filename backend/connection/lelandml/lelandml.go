// package pertamina_hackathon

// import (
// 	"log"
// )

// // S4cInterface interface for s4c communication
// type LelandMLInterface interface {
// 	UploadFile(string, []byte) error
// 	GetFileURL(string) (string, error)
// 	DeleteFile(string) error
// }

// // S4cWrapper holds s4c connection info
// type S4cWrapper struct {
// 	host        string
// 	port        string
// 	s4Client    *s4c.S4Client
// }

// // NewS4c new s4c client
// // no auth
// func NewS4c(host string, port string) *S4cWrapper {
// 	log.Println("Connecting LelandML API")
// 	return &S4cWrapper{
// 		host: host,
// 		port: port,
// 		s4Client: s4c.NewS4Client(
// 			host,
// 			username,
// 			password,
// 			requestTimeout,
// 		),
// 	}
// }

// // UploadFile upload file to s4c
// func (s4cW *S4cWrapper) UploadFile(fileName string, data []byte) error {
// 	err := s4cW.s4Client.SimplePutObjectFromFileContent(
// 		s4cW.bucketName,
// 		fileName,
// 		data,
// 		"public-read",
// 		s4c.OptionalParams{},
// 	)
// 	return err
// }

// // GetFileURL get the url of a file
// func (s4cW *S4cWrapper) GetFileURL(fileName string) (fileURL string, err error) {
// 	fileURL = s4cW.storagehost + "/" + s4cW.bucketName + "/" + fileName
// 	return
// }

// // DeleteFile delete a file
// func (s4cW *S4cWrapper) DeleteFile(fileName string) error {
// 	err := s4cW.s4Client.DeleteObject(s4cW.bucketName, fileName, s4c.OptionalParams{})
// 	return err
// }
