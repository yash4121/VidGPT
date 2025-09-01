import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from "dotenv";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { loadQAStuffChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import * as fs from "fs";

dotenv.config();


const pinecone = new Pinecone({
    apiKey: process.env.Pin_API_KEY
});
// console.log(pinecone)
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




// const query = "Does long sleep guarantee deep sleep";
const query = "Explain stages of sleep cycle";


const docs = await vectorStore.similaritySearch(query,4);
const llmA = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.2,
});
// const llmA = new OpenAI({});
const chainA = loadQAStuffChain(llmA);

const resA = await chainA.call({
    input_documents: docs,
    question: query,
});
console.log({ resA });

