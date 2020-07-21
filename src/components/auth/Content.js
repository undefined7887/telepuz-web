import React from 'react';
import css from './Content.styl'

class Content extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.logo}>Telepuz</div>
        <div className={css.slogan}>Алё, ну чё там с деньгами?</div>
        <div className={css.form}>
          <div className={css.label}>Никнейм</div>
          <input className={css.input} placeholder={'Кто мы с тобой орлы или вороны?'}/>
        </div>
        <div className={css.button}>Войти</div>
      </div>
    );
  }
}

export default Content;