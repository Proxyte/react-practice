import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./actionTypes";
import axios from "axios";

export function resetQuiz() {
  return {
    type: RESET_QUIZ_CREATION,
  };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    const quiz = getState().createQuiz.quiz;

    await axios.post(
      "https://react-practice-a6ae9.firebaseio.com/quizes.json",
      quiz
    );
    dispatch(resetQuiz);
  };
}

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}
