import React from "react"
import styles from "./AuthForm.styl"
import {classes} from "../../lib/utils";

interface Props {
    labelText: string
    inputText: string
    buttonText: string
    onReady?: () => void
}

interface State {
    error: boolean
    labelText: string
    buttonDisabled: boolean
}

export default class AuthForm extends React.Component<Props, State> {
    private input = React.createRef<HTMLInputElement>()

    state = {
        error: false,
        labelText: this.props.labelText,
        buttonDisabled: false
    }

    getValue(): string {
        return this.input.current.value
    }

    update(error: boolean, labelText: string, buttonDisabled: boolean) {
        this.setState({error, labelText, buttonDisabled})
    }

    private onInputKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.props.onReady?.()
        }
    }

    private onButtonCLick() {
        if (!this.state.buttonDisabled) {
            this.props.onReady?.()
        }
    }

    render() {
        let formStyles = classes({
            [styles.form]: true,
            [styles.error]: this.state.error
        })

        let buttonClasses = classes({
            [styles.button]: true,
            [styles.disabled]: this.state.buttonDisabled
        })

        return (
            <div className={formStyles}>
                <div>
                    <div className={styles.label}>{this.state.labelText}</div>
                    <input ref={this.input}
                           className={styles.input}
                           placeholder={this.props.inputText}
                           onKeyPress={this.onInputKeyPress.bind(this)}/>
                </div>
                <div className={buttonClasses}
                     onClick={this.onButtonCLick.bind(this)}>
                    {this.props.buttonText}
                </div>
            </div>
        )
    }
}