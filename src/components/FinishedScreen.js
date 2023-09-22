import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function FinishedScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 280) emoji = "🥇";
  if (percentage >= 220 && percentage < 100) emoji = "🥈";
  if (percentage >= 180 && percentage < 80) emoji = "🥉";
  else emoji = "🙈";
  return (
    <>
      <p className="result">
        You scored{" "}
        <strong>
          {emoji} {points}
        </strong>{" "}
        out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
