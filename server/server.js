// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// const fs = require('fs')
// // const cors = require('cors')
// const ytdl = require('ytdl-core');
// const { rejects } = require("assert");
// dotenv.config();
// app.use(express.json())
// app.post("/api/transcript", async (req,res) => {
//     const {videoURL} = req.body;
    
//     try {
//       // const videoID = extractVideoID(videoURL)
//       const foundAudio = await Transcripts.findOne({ VideoURL })
//       if(foundAudio){
//         return {
//           success: true,
//           transcriptText: foundAudio.transcript
//         }
//       }
//       if(!videoURL) {
//         return res.status(400).json({
//           error: "Invalid YouTube URL"
//         })
//       }
//       const audio = await ytdl(videoURL,{
//         quality: "highestaudio",
//         filter: "audioonly"
//       });
//       const writeStream = fs.createWriteStream('audio.mp3')
//       audio.pipe(writeStream)
//       const fileCreationPromise = new Promise((resolve,reject) => {
//           writeStream.on("finish", () => {
//             resolve()
//           })
//       })
//       await fileCreationPromise;
//       return res.status(200).json({
//         success: true,
//       });
//     } catch (error) {
//         res.status(500).json({error: "Failed to fetch the transcript"})
//     }

// });
// const extractVideoID = (url) => {
//   const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// }
// app.get("/", (req, res) => {
//   res.send("Server is up and running!");
// });
// // app.post("api/ask", (req,res) => {
// //   const {query, transcript} = req.body;
// //   try {
// //       if(query){
        
// //       }
// //   } catch (error) {
    
// //   }
  
// // })
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

import { Pinecone } from '@pinecone-database/pinecone';
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import * as fs from "fs";

dotenv.config();

const pinecone = new Pinecone({
    apiKey: 'pcsk_nFQBy_BEdf62G4ustPVvX7fPHeSE2732B9dZgWMS1Hi1BEVxeUoZRw7a86BvkGBKBYk3e'
});

const pineconeIndex = pinecone.Index("vidgpt")
console.log(pineconeIndex)
var data = fs.readFileSync("./transcribe/transcript.txt");
console.log(data)
// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 100,
//     chunkOverlap: 1,
// });
// const Output = await splitter.splitDocuments([
//     new Document({ pageContent: data})
// ]);
// await PineconeStore.fromDocuments(Output, new OpenAIEmbeddings(), {
//     pineconeIndex
// });
// const vectorStore = await PineconeStore.fromExistingIndex(
//     new OpenAIEmbeddings(),
//     { pineconeIndex }
// );
// const query = "Does long sleep guarantee deep sleep";

// const docs = await vectorStore.similaritySearch(query,4);
// const llmA = new OpenAI({});
// const chainA = loadQAStuffChain(llmA);

// const resA = await chainA.call({
//     input_documents: docs,
//     question: "Does long sleep guarantee deep sleep",
// });
// console.log({ resA });

