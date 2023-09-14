import React from "react";
import Options from "./Options";

export default function Question({ question, dispatch }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
      <button onClick={() => dispatch({ type: "next" })}>Next</button>
    </div>
  );
}
