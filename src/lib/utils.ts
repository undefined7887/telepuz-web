import {UserObject} from "../api/api";
import Socket from "./Socket";

type ClassesObject = {[className: string]: boolean}

export function classes(classesObject: ClassesObject): string {
    let str = ""
    let classes = Object.keys(classesObject)

    for (let i = 0; i < classes.length; i++) {
        if (classesObject[classes[i]]) {
            str += classes[i] + " "
        }
    }

    return str
}

export function concatClasses(...classes: string[]): string {
    let res = ""
    for (let i = 0; i < classes.length; i++) {
        res += classes[i] + " "
    }
    return res
}

export async function timeout(timeout: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, timeout)
    })
}

const userColors: Array<string> = ["#d32d2f", "#ab47bc", "#00bcd4", "#ff6d00", "#00c853"]

export function getUserColorByNickname(nickname: string): string {
    let number = 0
    for (let i = 0; i < nickname.length; i++) {
        number += nickname.charCodeAt(i)
    }
    return userColors[number % userColors.length]
}
