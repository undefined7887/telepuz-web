import React from 'react'
import css from './Form.css'

class Form extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.label}>Никнейм</div>
        <input className={css.input}/>
      </div>
    );
  }
}

export default Form;