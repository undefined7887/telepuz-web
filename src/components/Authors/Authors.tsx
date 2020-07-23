import React from "react"
import style from "./Authors.styl"

export default class Authors extends React.Component {
    render() {
        return (
            <div className={style.container}>
                Made for fun and test by<br/>
                <a className={style.link}
                   href="https://github.com/undefined7887">
                    undefined
                </a>
                &nbsp;and&nbsp;
                <a className={style.link}
                   href="https://github.com/KerJen">
                    KerJen
                </a>
            </div>
        );
    }
}
