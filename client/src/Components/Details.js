import React from "react";

const Details = () => {
  return (
    <div>
      <div>
        <h3>Tech Stack Used</h3>
        <h4>
          Deepgram API for generating transcripts and answering
          questions.{" "}
        </h4>{" "}
        <h4> Pinecone for vector search.</h4>{" "}
        <h4> Langchain for language translation. </h4>
        <h4>MongoDB for storing data. </h4>
        <h4>Express for server-side JavaScript. </h4>
        <h4>React for client-side JavaScript.</h4>
        <h4> Node.js for server-side JavaScript.</h4>
      </div>
    </div>
  );
};

export default Details;