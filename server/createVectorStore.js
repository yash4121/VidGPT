const Pinecone = require('@pinecone-database/pinecone');
require("dotenv").config();
const { GoogleGenerativeAIEmbeddings }= require("@langchain/google-genai");
const { PineconeStore } = require("@langchain/community/vectorstores/pinecone");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { Document }= require("langchain/document");
const fs = require("fs");

const createVectorStore = async () => {
    const pinecone = new Pinecone({
        apiKey: process.env.Pin_API_KEY
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
    let data = fs.readFileSync("transcript.txt",{
        encoding: "utf-8",
    });
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 1,
    });
    const Output = await splitter.splitDocuments([
        new Document({ pageContent: data})
    ]);
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        modelName: "embedding-001", // Optional: default is embedding-001
    });
    await PineconeStore.fromDocuments(Output, embeddings, {
        pineconeIndex
    });
    console.log("VectorStore Created Successfully !");
}
module.exports = createVectorStore;