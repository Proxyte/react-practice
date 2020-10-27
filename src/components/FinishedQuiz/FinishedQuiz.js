import React from 'react';
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
  return (
    <div className={classes['finished-quiz']}>
      <ul>
        <li>
          <strong>1</strong>.&nbsp;
          Lorem ipsum
          <i className={'fa fa-times ' + classes.error}/>
        </li>
        <li>
          <strong>1</strong>.&nbsp;
          Lorem ipsum
          <i className={'fa fa-check ' + classes.success}/>
        </li>
      </ul>

      <p>Правильно 4 из 10</p>
      <div>
        <button>Повторить</button>
      </div>
    </div>
  )
};

export default FinishedQuiz;