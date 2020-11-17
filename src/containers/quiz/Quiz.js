import React from "react";
import classes from "../../styles/Quiz.module.css";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";

import { connect } from "react-redux";
import {
  fetchQuizById,
  quizAnswerClick,
  quizRetry,
} from "../../redux/actions/quiz";

class Quiz extends React.Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.quizRetry}
            />
          ) : (
            <ActiveQuiz
              answers={
                this.props.quiz[this.props.activeQuestion] &&
                this.props.quiz[this.props.activeQuestion].answers
              }
              question={
                this.props.quiz[this.props.activeQuestion] &&
                this.props.quiz[this.props.activeQuestion].question
              }
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              onAnswerClick={this.props.quizAnswerClick}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    quizRetry: () => dispatch(quizRetry()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
