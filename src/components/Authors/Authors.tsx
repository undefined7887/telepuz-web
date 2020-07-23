import React from "react"
import "./Authors.styl"

class Authors extends React.Component {
    render() {
        return (
            <div className="Authors-container">
                Made for fun and test by<br/>
                <a className="Authors-link"
                   href="https://github.com/undefined7887">
                    undefined
                </a>
                &nbsp;and&nbsp;
                <a className="Authors-link"
                   href="https://github.com/KerJen">
                    KerJen
                </a>
            </div>
        );
    }
}

export default Authors;