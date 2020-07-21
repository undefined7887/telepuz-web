import React from 'react';
import style from './App.css'
import Login from './Login/Login'


class App extends React.Component {
  render() {
    return (
      <div className={style.app}>
        <Login />
      </div>
    )
  }
}

export default App;