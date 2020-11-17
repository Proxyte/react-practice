import React from "react";
import classes from "./Drawer.module.css";
import BackDrop from "../../UI/BackDrop/BackDrop";
import { NavLink } from "react-router-dom";

class Drawer extends React.Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  clickHandler = () => {
    this.props.onClose();
  };

  render() {
    const cls = [classes.drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    const links = [
      {
        to: "/",
        label: "Список ",
        exact: true,
      },
    ];

    if (this.props.isAuthenticated) {
      links.push(
        {
          to: "/quiz-creator",
          label: "Создать тест",
          exact: false,
        },
        {
          to: "/logout",
          label: "Выйти",
          exact: false,
        }
      );
    } else {
      links.push({
        to: "/auth",
        label: "Авторизация",
        exact: false,
      });
    }

    return (
      <React.Fragment>
        {this.props.isOpen && <BackDrop onClick={this.props.onClose} />}

        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Drawer;
