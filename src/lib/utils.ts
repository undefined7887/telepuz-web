type ClassesObject = {[className: string]: boolean}

export function classes(args: ClassesObject): string {
    let str = ""
    let classes = Object.keys(args)

    for (let i = 0; i < classes.length; i++) {
        if (args[classes[i]]) {
            str += classes[i] + " "
        }
    }

    return str
}

export async function timeout(timeout: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, timeout)
    })
}

