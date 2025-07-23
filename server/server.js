const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require('fs')
// const cors = require('cors')
const ytdl = require('ytdl-core');
const { rejects } = require("assert");
dotenv.config();
app.use(express.json())
app.post("/api/transcript", async (req,res) => {
    const {videoURL} = req.body;
    
    try {
      // const videoID = extractVideoID(videoURL)
      const foundAudio = await Transcripts.findOne({ VideoURL })
      if(foundAudio){
        return {
          success: true,
          transcriptText: foundAudio.transcript
        }
      }
      if(!videoURL) {
        return res.status(400).json({
          error: "Invalid YouTube URL"
        })
      }
      const audio = await ytdl(videoURL,{
        quality: "highestaudio",
        filter: "audioonly"
      });
      const writeStream = fs.createWriteStream('audio.mp3')
      audio.pipe(writeStream)
      const fileCreationPromise = new Promise((resolve,reject) => {
          writeStream.on("finish", () => {
            resolve()
          })
      })
      await fileCreationPromise;
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the transcript"})
    }

});
const extractVideoID = (url) => {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});
// app.post("api/ask", (req,res) => {
//   const {query, transcript} = req.body;
//   try {
//       if(query){
        
//       }
//   } catch (error) {
    
//   }
  
// })
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});