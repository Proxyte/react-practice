import React from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

export default class QuizList extends React.Component {

  state = {
    quizes: [],
    loading: false
  };

  renderQuizes() {
    return this.state.quizes.length && this.state.quizes.map((quiz, index) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>
            { quiz.name }
          </NavLink>
        </li>
      )
    });
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });

    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест # ${index + 1}`
        })
      });

      this.setState({
        quizes
      });

      return response;
    } catch(error) {
      console.log('error', error)
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className={classes['quiz-list']}>
        <h1>Список тестов</h1>

        <ul>
          { 
            this.state.loading 
              ? <Loader />
              : this.renderQuizes() 
          }
        </ul>
      </div>
    )
  }
};