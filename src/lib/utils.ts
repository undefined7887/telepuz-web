import {UserObject} from "../api/api";

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
