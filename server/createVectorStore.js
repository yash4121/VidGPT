const Pinecone = require('@pinecone-database/pinecone');
require("dotenv").config();
const { GoogleGenerativeAIEmbeddings }= require("@langchain/google-genai");
const { PineconeStore } = require("@langchain/community/vectorstores/pinecone");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { Document }= require("langchain/document");
const fs = require("fs");
const connectDB = require("./models/db");
const TranscribeData = require("./models/TranscribeData");


const createVectorStore = async () => {
    connectDB(true);
    const pinecone = new Pinecone({
        apiKey: process.env.Pin_API_KEY
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
    try {
        const name = "transcribe";
        let res = await TranscribeData.findOne({ name });
        if (!res) {
            console.log("Please Upload the Transcribe to MongoDB");
            console.log("Run getTranscribe.js File");
            return;
        }
        console.log("Transcribe Received Successfully");
        let data = res.transcribe;
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 100,
            chunkOverlap: 1,
        });
        const Output = await splitter.splitDocuments([
        new Document({ pageContent: data }),
        ]);
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY,
            modelName: "embedding-001", // Optional: default is embedding-001
        });
        await PineconeStore.fromDocuments(Output, embeddings, {
            pineconeIndex
        });
        console.log("Vector Created Successfully");
    } catch (error) {
        console.log(error);
    }
    connectDB(false);
    
}
createVectorStore();
module.exports = createVectorStore;




