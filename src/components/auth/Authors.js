import React from 'react'
import css from './Authors.styl'

class Authors extends React.Component {
  render() {
    return (
      <div className={css.container}>
        Made for fun and test by<br/>
        <a className={css.link} href={'https://github.com/undefined7887'}>undefined</a>
        &nbsp;and&nbsp;
        <a className={css.link} href={'https://github.com/KerJen'}>KerJen</a>
      </div>
    );
  }
}

export default Authors;