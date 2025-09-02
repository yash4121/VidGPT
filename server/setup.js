const getAudio = require("./getAudio");
const compressAudio = require("./compressAudio");
const getTranscribe = require("./getTranscript");
const createVectorStore = require("./createVectorStore");

const setup = async () => {
  try {
    await getAudio().then(await compressAudio);
    // await getTranscribe();
    // await createVectorStore();
  } catch (err) {
    console.log(err);
  }
};
setup();