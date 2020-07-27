import React from "react"
import styles from "./Form.styl"
import {classes} from "../../lib/utils";

interface Props {
    labelText: string
    inputText: string
    onEnterPress?: () => void
}

interface State {
    labelText: string
    labelError: boolean
}

export default class Form extends React.Component<Props, State> {
    private input = React.createRef<HTMLInputElement>()

    state = {
        labelText: this.props.labelText,
        labelError: false
    }

    getValue(): string {
        return this.input.current.value
    }

    updateLabel(text: string, error: boolean) {
        this.setState({
            labelText: text,
            labelError: error
        })
    }

    private onInputKeyPress(event: KeyboardEvent) {
        console.log("button pressed")
        if (event.key === "Enter") {
            this.props.onEnterPress?.()
        }
    }

    render() {
        let labelClasses = classes({
            [styles.label]: true,
            [styles.error]: this.state.labelError
        })

        return (
            <div className={styles.form}>
                <div className={labelClasses}>{this.state.labelText}</div>
                <input ref={this.input}
                       className={styles.input}
                       placeholder={this.props.inputText}
                       onKeyPress={this.onInputKeyPress.bind(this)}/>
            </div>
        )
    }
}