import React from "react";

export default function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((opt, i) => (
        <button className="btn btn-option" key={i}>
          {opt}
        </button>
      ))}
    </div>
  );
}
