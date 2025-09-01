const Pinecone = require('@pinecone-database/pinecone');
require("dotenv").config();
const { GoogleGenerativeAIEmbeddings }= require("@langchain/google-genai");
const {ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { PineconeStore } = require("@langchain/community/vectorstores/pinecone");
const  { loadQAStuffChain } = require("langchain/chains");

const qaAns = async (question) => {
    const pinecone = new Pinecone({
        apiKey: process.env.Pin_API_KEY
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX)
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