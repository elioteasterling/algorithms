import { Stack } from "../data_structures/Stack"

export const evaluate = (exp: string) => {
    const values    = new Stack()
    const operators = new Stack()

    for (const c of exp) {
        if (c === "(") continue
        const possibleValue = parseFloat(c)
        if (possibleValue !== NaN) values.push(possibleValue)
        else if (c !== ")") operators.push(c)
        else {
            const op = operators.pop()
            const v1 = values.pop()
            const v2 = values.pop()
            const result = performOperation(op, v1, v2)
            values.push(result)
        }
    }

    return values.pop()
}

function performOperation(op, v1, v2) {
    switch(op) {
        case "+" : return v1 + v2
        case "-" : return v1 - v2
        case "*" : return v1 * v2
        case "/" : return v1 / v2
    }
}