// Abstract operations on todos from the front-end. The front-end doesn't need to know
// where or how the todos are being fetched and should only work the the todos as JS
// objects

import { BACKEND } from '../configs'

const urlFor = url => `${BACKEND}${url}`

export async function addTodo(todo) {
    const res = await window.fetch(urlFor('/todos'), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(todo)
    })
    if(!res.ok) {
        // TODO #errorhandling
    }

    return res.json()
}

export async function getTodos() {
    const res = await window.fetch(urlFor('/todos'), { method: 'GET' })
    if (!res.ok) {
        // TODO #errorhandling
    }

    return res.json()
}

export async function updateTodo(todo) {
    const res = await window.fetch(urlFor('/todos'), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(todo)
    })
    if(!res.ok) {
        // TODO #errorhandling
    }

    return true
}

export async function completeTodo(id) {
    const res = await window.fetch(urlFor(`/todos/${id}`), {method: 'DELETE'})
    if(!res.ok) {
        // TODO #errorhandling
    }

    return true
}