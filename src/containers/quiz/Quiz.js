import React from 'react';
import classes from '../../styles/Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends React.Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    results: {},
    quiz: [],
    loading: false
  };

  onAnswerClickHandler = answerId => {
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if(question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success';
      }
      this.setState({
        answerState: {
          [answerId]: 'success'
        },
        results
      });

      const timeout = setTimeout(() => {
        if(this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout);
      }, 1000)
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {
          [answerId]: 'error'
        },
        results
      });
    }
  }

  isQuizFinished(){
    console.log('state', this)
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () =>  {
    this.setState({
      isFinished: false,
      results: {},
      activeQuestion: 0,
      answerState: null
    });
  }

  async componentDidMount() {
    console.log('i am here')
    this.setState({
      loading: true
    });

    console.log('request beginning...')

    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      console.log('response', response)
      const quiz = response.data;
      console.log('quiz', quiz)

      this.setState({
        quiz,
        loading: false
      });
    } catch (error) {
      console.log('error', error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    return (
      <div className={classes.quiz}>
        
        <div className={classes.quizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.state.loading 
              ? <Loader />
              : this.state.isFinished 
                  ? <FinishedQuiz 
                      results={this.state.results}
                      quiz={this.state.quiz}
                      onRetry={this.retryHandler}
                    />
                  : <ActiveQuiz 
                      answers={this.state.quiz[this.state.activeQuestion] && this.state.quiz[this.state.activeQuestion].answers}
                      question={this.state.quiz[this.state.activeQuestion] && this.state.quiz[this.state.activeQuestion].question}
                      quizLength={this.state.quiz.length}
                      answerNumber={this.state.activeQuestion + 1}
                      onAnswerClick = {this.onAnswerClickHandler}
                      answerState={this.state.answerState}
                    />
          }
        </div>
      </div>
    )
  };
}

export default Quiz;