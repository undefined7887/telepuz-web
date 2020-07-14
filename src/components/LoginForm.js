import React from 'react';
import styles from './LoginForm.css'

class LoginForm extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>Telepuz</div>
        <div className={styles.hint}>Але ты куда звонишь?</div>
      </div>
    );
  }
}

export default LoginForm;