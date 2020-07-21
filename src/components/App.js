import React from 'react';
import style from './App.styl'
import AuthPage from './auth/Page'

class App extends React.Component {
  render() {
    return (
      <div className={style.app}>
        <AuthPage />
      </div>
    )
  }
}

export default App;