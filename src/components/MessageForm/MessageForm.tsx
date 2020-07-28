import React from "react"
import styles from "./MessageForm.styl"

const PRINTING_TIMEOUT = 3000

interface Props {
    onStartPrinting?: () => void
    onStopPrinting?: () => void
    onReady?: () => void
}

export default class MessageForm extends React.Component<Props> {
    private input = React.createRef<HTMLInputElement>()

    private printing = false
    private timer: ReturnType<typeof setTimeout>

    getValue(): string {
        return this.input.current.value
    }

    setValue(value: string) {
        this.input.current.value = value
    }

    private onInputKeyUp(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.props.onReady?.()
            this.printing = false
            clearTimeout(this.timer)
            return
        }

        if (this.printing) {
            clearTimeout(this.timer)
        } else {
            this.printing = true
            this.props.onStartPrinting?.()
        }

        this.timer = setTimeout(() => {
            this.printing = false
            this.props.onStopPrinting?.()
        }, PRINTING_TIMEOUT)
    }

    render() {
        return (
            <input ref={this.input}
                   className={styles.form}
                   onKeyUp={this.onInputKeyUp.bind(this)}
                   placeholder="Ну напиши уже что-нибудь тут..."/>
        )
    }
}