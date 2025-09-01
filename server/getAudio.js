const ytdl = require('ytdl-core')
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg")
ffmpeg.setFfmpegPath(ffmpegPath)
const videURL = "https://www.youtube.com/watch?v=0CmtDk-joT4"
const audio = ytdl(videURL,{
    quality: "highestaudio",
    filter: "audioonly"
});
ffmpeg(audio)
    .toFormat('mp3')
    .saveToFile("audio2.mp3", (stdout, stderr) => {})
    .on("end",() => {
    console.log("finish converting to mp3")
    })
    .on("progress", (frames) => {
        console.log(frames.timemark);
    })
    .on("error",(err) => {
    console.log(err)
    })
    .run(); 