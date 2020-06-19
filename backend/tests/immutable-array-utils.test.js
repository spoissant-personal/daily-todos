import { addTo, replaceAt, deleteAt } from '../src/immutable-array-utils'

test('addAt returns a new array with the value added at the end', () => {
    const arr = [1, 2, 3]
    const arr2 = addTo(arr, 4)

    expect(arr.length).toBe(3)
    expect(arr2.length).toBe(4)
    expect(arr2.pop()).toBe(4)
})

test('replaceAt returns a new array with the value at idx replaced with the provided item', () => {
    const arr = [1, 0, 3]
    const arr2 = replaceAt(arr, 1, 2)

    expect(arr[1]).toBe(0)
    expect(arr2[1]).toBe(2)
})

test('deleteAt returns a new array with the item at idx removed', () => {
    const arr = [1, 2, 3]
    const arr2 = deleteAt(arr, 1)

    expect(arr.length).toBe(3)
    expect(arr2.length).toBe(2)
    expect(arr[1]).toBe(2)
    expect(arr2[1]).toBe(3)
})

