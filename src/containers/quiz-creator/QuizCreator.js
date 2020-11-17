import React from "react";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/Input/Input";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";

import {
  createQuizQuestion,
  finishCreateQuiz,
} from "../../redux/actions/createQuiz";

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Значение не может быть пустым",
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends React.Component {
  state = {
    form: createFormControls(),
    rightAnswerId: 1,
    isFormValid: false,
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = (event) => {
    event.preventDefault();

    const { option1, option2, option3, option4 } = this.state.form;

    const questionItem = {
      question: this.state.form.question.value,
      id: this.props.createQuiz.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      form: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false,
    });
  };

  createQuizHandler = (event) => {
    event.preventDefault();

    try {
      this.setState({
        form: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false,
      });

      this.props.finishCreateQuiz();
    } catch (error) {
      throw error;
    }
  };

  changeHandler = (value, controlName) => {
    const form = { ...this.state.form };
    const control = { ...form[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    form[controlName] = control;

    this.setState({
      form,
      isFormValid: validateForm(form),
    });
  };

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: Number(event.target.value),
    });
  };

  renderControls() {
    return Object.keys(this.state.form).map((controlName, index) => {
      const control = this.state.form[controlName];

      return (
        <Auxillary key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />

          {index === 0 ? <hr /> : null}
        </Auxillary>
      );
    });
  }

  render() {
    return (
      <div className={classes["quiz-creator"]}>
        <div>
          <h1>Create test</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
              ]}
            />

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.createQuiz.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    createQuiz: state.createQuiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
