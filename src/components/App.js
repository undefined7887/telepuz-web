import React from 'react';
import style from './App.css'
import LoginForm from './LoginForm'


class App extends React.Component {
  render() {
    return (
      <div className={style.app}>
        <LoginForm />
      </div>
    )
  }
}

export default App;