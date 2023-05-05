package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}

	server.Use(cors.New(config))

	server.POST("/file", func(ctx *gin.Context) {
		file, err := ctx.FormFile("pdfFile")
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "something went wrong with the upload",
			})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": "file uploaded",
		})
		if err := ctx.SaveUploadedFile(file, "./uploads/"+file.Filename); err != nil {
			panic(err)
		}
	})

	server.Run(":8000")
}
