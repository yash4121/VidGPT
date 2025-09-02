require('dotenv').config();
const fs = require("fs");
const path = require("path");
const { createClient } = require('@deepgram/sdk');
const TranscribeData = require("./models/TranscribeData");
const connectDB = require("./models/db");
connectDB(true);

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

async function transcribe() {
  try{
    const audioPath = path.join(__dirname, 'compressedAudio.mp3');
    if(!fs.existsSync(audioPath)){
      throw new Error('Audio file not found: audio.mp3');
    }
    const audio = fs.readFileSync(audioPath);

    const {result, error} = await deepgram.listen.prerecorded.transcribeFile(audio,{
      mimetype: 'audio/mp3',
      model: 'nova-3',
      smart_format: true
    });
    if (error) {
        throw new Error(`Deepgram API Erro: ${error.message}`);
        
    }
    console.log(result)
    const transcript = result.results.channels[0].alternatives[0].transcript;
    
    if(!transcript) {
      console.log("No transcript was returned.");
      return;
    }
    console.log('Transcript:', transcript);
    return transcript;
    const transcriptFilePath = path.join(__dirname,'transcript.txt');
    fs.writeFileSync(transcriptFilePath,transcript);
  } catch(err) {
    console.log("error, ", err);
  }
  // console.dir(result, { depth: null });
}

async function saveFile() {
  try {
    const name = "transcribe";
    let data = await TranscribeData.findOne({ name });
    if (!data) {
      await TranscribeData.create({
        name: name,
        transcribe: jsonString,
      }).then(console.log("Transcript Uploaded On Database"));
    } else {
      await TranscribeData.findOneAndUpdate(
        {
          name: name,
        },
        {
          $set: {
            transcribe: jsonString,
          },
        }
      ).then(console.log("Transcribe Updated Successfully !"));
    }
  } catch (error) {
    console.log(error);
  }
  mongoDB(false);
}

transcribe();
saveFile()




  




// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// (async () => {
//     const response = await openai.audio.transcriptions.create({
//         file: fs.createReadStream("audio.mp3"),
//         model: "whisper-1",
//     });
//     console.log(response.text)
// })();

