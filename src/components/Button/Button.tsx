import React from "react"
import styles from "./Button.styl"
import {classes} from "../../lib/utils"

interface Props {
    text: string
    onClick?: () => void
}

interface State {
    disabled: boolean
}

export default class Button extends React.Component<Props, State> {
    state = {disabled: false}

    update(disabled: boolean) {
        this.setState({disabled})
    }

    private onButtonCLick() {
        if (!this.state.disabled) {
            this.props.onClick?.()
        }
    }

    render() {
        let buttonClasses = classes({
            [styles.button]: true,
            [styles.disabled]: this.state.disabled
        })

        return (
            <div className={buttonClasses}
                 onClick={this.onButtonCLick.bind(this)}>
                {this.props.text}
            </div>
        )
    }
}