import React from 'react';
import classes from './Drawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import { NavLink } from 'react-router-dom';

const links = [
  {
    to: '/',
    label: "Список ",
    exact: true
  },
  {
    to: '/auth',
    label: "Авторизация",
    exact: false
  },
  {
    to: '/quiz-creator',
    label: "Создать тест",
    exact: false
  }
];

class Drawer extends React.Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink 
            to={link.to} 
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
            >{link.label}
          </NavLink>
        </li>
      )
    })
  };

  clickHandler = () => {
    this.props.onClose();
  }

  render() {
    const cls = [classes.drawer];

    if(!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <React.Fragment>
        { this.props.isOpen && <BackDrop onClick={this.props.onClose} /> }
        
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

export default Drawer;