import React from "react"
import style from "./Authors.styl"

export default class Authors extends React.Component {
    render() {
        return (
            <div className={style.authors}>
                <span>Made for fun and test by</span>
                <br/>
                <a className={style.link}
                   href="https://github.com/undefined7887">
                    undefined
                </a>
                <span>&nbsp;and&nbsp;</span>
                <a className={style.link}
                   href="https://github.com/KerJen">
                    KerJen
                </a>
            </div>
        )
    }
}

