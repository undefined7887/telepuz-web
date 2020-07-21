import React from 'react'
import css from './Page.styl'
import Content from "./Content";
import Authors from "./Authors";

class AuthPage extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.spacer}/>
        <Content/>
        <div className={css.spacer}/>
        <Authors/>
      </div>
    );
  }
}

export default AuthPage;