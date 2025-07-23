const ytdl = require('ytdl-core')
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg")
ffmpeg.setFfmpegPath(ffmpegPath)
const videURL = "https://www.youtube.com/watch?v=_GaY21NF4-U"
const audio = ytdl(videURL,{
    quality: "highestaudio",
    filter: "audioonly"
});
ffmpeg(audio)
    .toFormat('mp3')
    .saveToFile("audio.mp3", (stdout, stderr) => {})
    .on("end",() => {
    console.log("finish converting to mp3")
    })
    .on("error",(err) => {
    console.log(err)
    })
    .run(); 