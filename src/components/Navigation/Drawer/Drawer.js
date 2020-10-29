import React from 'react';
import classes from './Drawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';

const links = [1,2,3]

class Drawer extends React.Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a onClick={(event) => event.preventDefault()}>Link {link}</a>
        </li>
      )
    })
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