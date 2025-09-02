const ytdl = require('ytdl-core')
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg")
ffmpeg.setFfmpegPath(ffmpegPath)
const videoURL = "https://www.youtube.com/watch?v=0CmtDk-joT4"

const getAudio = async () => {
    const audio = ytdl(videoURL,{
        quality: "highestaudio",
        filter: "audioonly"
    });
    ffmpeg(audio)
        .toFormat("mp3")
        .saveToFile("audio.mp3", (stdout, stderr) => {})
        .on("end", () => {
        console.log("Finished converting video to MP3!");
        })
        .on("progress", (progress) => {
        console.log(progress.timemark);
        })
        .on("error", (err) => {
        console.error(err);
        })
        .run();
    };
    // module.exports = getAudio;
getAudio();