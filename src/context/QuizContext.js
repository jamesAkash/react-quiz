import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: null,
};

function reducer(state, actions) {
  switch (actions.type) {
    case "dataReceived":
      return { ...state, questions: actions.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "next":
      return { ...state, index: state.index + 1 };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: actions.payload,
        points:
          actions.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      if (state.highscore === null) state.highscore = state.points;
      if (state.highscore < state.points) state.highscore = state.points;
      return { ...state, status: "finished" };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };
    default:
      throw new Error("Action unknown");
  }
}

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points, highscore } = state;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const numQuestion = questions.length - 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://quiz-react-akash.onrender.com/questions"
        );
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highscore,
        dispatch,
        maxPossiblePoints,
        numQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext used outside of its Provider");
  return context;
};

export { useQuiz, QuizProvider };
