import React from "react"
import styles from "./Photo.styl"

const colors: Array<string> = ["#d32d2f", "#ab47bc", "#00bcd4", "#ff6d00", "#00c853"]

interface Props {
    nickname: string
    diameter: string
    fontSize: string
}

export default class Photo extends React.Component<Props> {
    static getBackground(nickname: string): string {
        let number = 0
        for (let i = 0; i < nickname.length; i++) {
            number += nickname.charCodeAt(i)
        }
        return colors[number % colors.length]
    }

    private getInitials(): string {
        return this.props.nickname.charAt(0).toUpperCase()
    }

    render() {
        return (
            <div className={styles.photo}
                 style={{
                     background: Photo.getBackground(this.props.nickname),
                     height: this.props.diameter,
                     minWidth: this.props.diameter,
                     fontSize: this.props.fontSize
                 }}>
                {this.getInitials()}
            </div>
        )
    }
}