import React from 'react';
import layoutClasses from '../../styles/Layout.module.css';

class Layout extends React.Component {
  render() {
    return (
      <div className={layoutClasses.layout}>

        <main>  
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout;