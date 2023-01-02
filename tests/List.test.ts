import { Comparable } from '../contracts/sort'
import { List } from '../data_structures/List'
import {describe, expect, test} from '@jest/globals'

const num = (value: number) => ({ value, compareTo: (x) => {
    if      ((this as any).value > x) return  1
    else if ((this as any).value < x) return -1
    return 0
}} as Comparable)

const l = new List()

l.addBack(num(0))
l.addBack(num(1))
l.addBack(num(2))
l.addBack(num(3))
l.addBack(num(4))
l.addBack(num(5))
l.addBack(num(6))
l.addBack(num(7))
l.addBack(num(8))
l.addBack(num(9))
 
let result = ""
for (const n of l) { result += (n as any).value }

describe('List Tests', () => {
    test('Check the iterability of the list class', () => {
        expect(result).toBe('0123456789')
    })
})
