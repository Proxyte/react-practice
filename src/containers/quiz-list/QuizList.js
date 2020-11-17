import React from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
// import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../redux/actions/quiz";

class QuizList extends React.Component {
  renderQuizes() {
    return (
      this.props.quizes.length &&
      this.props.quizes.map((quiz, index) => {
        return (
          <li key={quiz.id}>
            <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
          </li>
        );
      })
    );
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={classes["quiz-list"]}>
        <h1>Список тестов</h1>

        <ul>
          {this.props.loading && this.props.quizes.length > 0 ? (
            <Loader />
          ) : (
            this.renderQuizes()
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
