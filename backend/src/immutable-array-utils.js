export function addTo(arr, obj) {
    return [...arr, obj]
}

// Returns a copy of arr where the item at idx has been replaced with obj
export function replaceAt(arr, idx, obj) {
    return [...arr.slice(0, idx), obj, ...arr.slice(idx+1)]
}

// Returns a copy of arr where the item at idx has been removed
export function deleteAt(arr, idx) {
    return [...arr.slice(0, idx), ...arr.slice(idx+1)]
}