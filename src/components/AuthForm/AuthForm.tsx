import React from "react"
import styles from "./AuthForm.styl"
import {classes} from "../../lib/utils";

interface Props {
    regexp: RegExp
    onReady?: () => void
}

interface State {
    inputDisabled: boolean
    buttonDisabled: boolean
}

export default class AuthForm extends React.Component<Props, State> {
    private input = React.createRef<HTMLInputElement>()

    state = {
        inputDisabled: false,
        buttonDisabled: true
    }

    getValue(): string {
        return this.input.current.value
    }

    private onInputKeyUp(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.emitReady()
            return
        }

        if (this.props.regexp.test(this.getValue())) {
            if (this.state.buttonDisabled) {
                this.setState({buttonDisabled: false})
            }
        } else {
            if (!this.state.buttonDisabled) {
                this.setState({buttonDisabled: true})
            }
        }
    }

    private onButtonCLick() {
        if (!this.state.buttonDisabled) {
            this.emitReady()
        }
    }

    private emitReady() {
        this.setState({
            inputDisabled: true,
            buttonDisabled: true
        })

        this.props.onReady?.()
    }

    render() {
        let buttonClasses = classes({
            [styles.button]: true,
            [styles.buttonDisabled]: this.state.buttonDisabled
        })

        return (
            <div className={styles.form}>
                <div>
                    <div className={styles.label}>Никнейм</div>
                    <input ref={this.input}
                           className={styles.input}
                           placeholder="Кто мы с тобой, орлы или вороны?"
                           disabled={this.state.inputDisabled}
                           onKeyUp={this.onInputKeyUp.bind(this)}/>
                </div>
                <div className={buttonClasses}
                     onClick={this.onButtonCLick.bind(this)}>
                    Войти
                </div>
            </div>
        )
    }
}