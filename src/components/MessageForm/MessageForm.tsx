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
            this.printing = false
            clearTimeout(this.timer)
            this.props.onReady?.()
            this.props.onStopPrinting?.()
            return
        }

        if (this.printing) {
            console.log("Already printing")
            clearTimeout(this.timer)
        } else {
            console.log("Not printing")
            this.printing = true
            this.props.onStartPrinting?.()
        }

        this.timer = setTimeout(() => {
            console.log("Timeout")
            this.printing = false
            this.props.onStopPrinting?.()
            clearTimeout(this.timer)
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