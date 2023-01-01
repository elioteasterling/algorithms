import { ArrayStack as Stack } from "../data_structures/Stack"

export const evaluate = (exp: string) => {
    const values    = new Stack()
    const operators = new Stack()

    for (const c of exp) {
        if (c === "(") continue
        const possibleValue = parseFloat(c)
        if (!Number.isNaN(possibleValue)) values.push(possibleValue)
        else if (c !== ")") operators.push(c)
        else {
            const op = operators.pop()
            const v1 = values.pop()
            const v2 = values.pop()
            const result = performOperation((op as string), parseInt(v1 as string), parseInt(v2 as string))
            values.push(result)
        }
    }

    return values.pop()
}

function performOperation(op: string, v1: number, v2: number) {
    switch(op) {
        case "+" : return v1 + v2
        case "-" : return v1 - v2
        case "*" : return v1 * v2
        case "/" : return v1 / v2
    }
}