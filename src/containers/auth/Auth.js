import React from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/Input/Input";
import is from "is_js";
import { connect } from "react-redux";
import { auth } from "../../redux/actions/auth";

class Auth extends React.Component {
  state = {
    isFormValid: false,
    form: {
      email: {
        value: "",
        type: "email",
        label: "E-mail",
        errorMessage: "Введите корректный e-mail",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Введите корректный password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {
    this.props.auth(
      this.state.form.email.value,
      this.state.form.password.value,
      true
    );
  };

  registerHandler = () => {
    this.props.auth(
      this.state.form.email.value,
      this.state.form.password.value,
      false
    );
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const form = { ...this.state.form };
    const control = { ...form[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    form[controlName] = control;

    let isFormValid = true;

    Object.keys(form).forEach((name) => {
      isFormValid = form[name].valid && isFormValid;
    });

    this.setState({
      form,
      isFormValid,
    });
  };

  renderInputs = () => {
    return Object.keys(this.state.form).map((controlName, index) => {
      const control = this.state.form[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  };

  render() {
    return (
      <div className={classes.auth}>
        <div>
          <h1>Authorization</h1>

          <form onSubmit={this.submitHandler} className={classes["auth-form"]}>
            {this.renderInputs()}

            <Button type="success" onClick={this.loginHandler}>
              Sign in
            </Button>

            <Button type="primary" onClick={this.registerHandler}>
              Sign up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
