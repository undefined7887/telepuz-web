import React from "react"
import styles from "./Form.styl"

interface Props {
    label: string
    placeholder: string
    onEnterPress: (element: HTMLInputElement) => void
}

export default class Form extends React.Component<Props> {
    inputElement = React.createRef<HTMLInputElement>()

    onKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.props.onEnterPress(this.inputElement.current)
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.label}>{this.props.label}</div>
                <input ref={this.inputElement}
                       className={styles.input}
                       placeholder={this.props.placeholder}
                       onKeyPress={this.onKeyPress.bind(this)}/>
            </div>
        )
    }
}