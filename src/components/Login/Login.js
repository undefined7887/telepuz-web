import React from 'react';
import css from './Login.css'

import Form from "./Form";

class Login extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.logo}>Telepuz</div>
        <div className={css.hint}>Творите историю маленькой чат комнаты!</div>
        <Form/>
      </div>
    );
  }
}

export default Login;