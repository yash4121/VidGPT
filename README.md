# VidGPT  

VidGPT is an **AI-powered YouTube summarizer and Q&A web application**.  
It allows users to **generate summaries** and **ask questions** about any YouTube video, solving their queries without the need to rewatch the video.  

It uses:  
- **Deepgram API** → to generate transcripts of YouTube videos  
- **LangChain + Pinecone** → to build a vector store with **Google Gemini embeddings**  
- **MongoDB** → to store data  

---

## 🚀 Technologies Used
- **Deepgram API** → Transcript generation  
- **Pinecone** → Vector search  
- **LangChain** → LLM orchestration  
- **Google Gemini** → Embeddings and Q&A 
- **MongoDB** → Database  
- **Express** → Backend framework  
- **React** → Frontend library  
- **Node.js** → Runtime environment  

---

## ⚙️ Installation & Setup  

### 1. Backend Setup  
cd server

Then setup the backend by installing the required libaries
npm install

Create a .env file inside the backend/ folder with the following keys:
GEMINI_API_KEY=""
PINECONE_API_KEY=""
PINECONE_INDEX=""
MONGODB_URL=""
DEEPGRAM_API_KEY=""

You can the use the url of the youtube video you want to use.
Run getAudio.js file to download the Youtube audio.

node getAudio.js

If the size of the audio is greater than 10MB run compressAudio.js

node compressAudio.js


Once you have the audio ready run getTranscript.js to generate the transcript of the audio file

node getTranscript.js

Now we need to create the Vector Store of Pinecone so run createVectorStore.js

node createVectorStore.js

backend setup is completed.
now you can run the main server.js

node server.js

Once the server setup is completed, navigate to client.
Open a new terminal windows or tab and navigate to the root of the project and then change directory to the client.

cd client

now setup the react libararies by running the following code
npm install

once all library are installed run
npm start






