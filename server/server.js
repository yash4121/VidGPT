const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { YoutubeTranscript } = require("youtube-transcript");
app.use(express.json())

app.post("/api/transcript", async (req,res) => {
    const {videoURL} = req.body;
    try {
      if(!videoURL) {
        return res.status(400).json({
          error: "Invalid YouTube URL"
        })
      }
      const transcript = await YoutubeTranscript.fetchTranscript(videoURL);
      console.log(transcript)
      return res.status(200).json({
        success: true,
        transcript: transcript
      });
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the transcript"})
    }

});
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