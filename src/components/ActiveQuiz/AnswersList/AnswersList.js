import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => (
  <ul className={classes['answer-list']}>
    { props.answers && props.answers.map((answer, index) => {
      return (
        <AnswerItem 
          key={index} 
          answer={answer}
          onAnswerClick={props.onAnswerClick}
          answerState={props.answerState && props.answerState[answer.id]}
        />
      )
    })
  }
  </ul>
)

export default AnswersList;