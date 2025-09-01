const Pinecone = require('@pinecone-database/pinecone');
require("dotenv").config();
const { GoogleGenerativeAIEmbeddings }= require("@langchain/google-genai");
const {ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { PineconeStore } = require("@langchain/community/vectorstores/pinecone");
const  { loadQAStuffChain } = require("langchain/chains");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { Document }= require("langchain/document");
const fs = require("fs");

const qaAns = async (question) => {
    console.log(question);
    const pinecone = new Pinecone({
        apiKey: process.env.Pin_API_KEY
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX)
    const data = fs.readFileSync("./transcribe/transcript.txt",{
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
    const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        { pineconeIndex }
    );
    const query = question;
    const docs = await vectorStore.similaritySearch(query,4);
    const llmA = new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "gemini-2.5-flash",
        temperature: 0.2,
    });
    const chainA = loadQAStuffChain(llmA);
    const resA = await chainA.call({
        input_documents: docs,
        question: query,
    });
    console.log({ resA });
    return resA.text;


}
module.exports = qaAns;


