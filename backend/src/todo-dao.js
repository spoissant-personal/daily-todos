import path from 'path'
import fs from 'fs'

import { addTo, replaceAt, deleteAt } from './immutable-array-utils.js'

// From https://techsparx.com/nodejs/esnext/dirname-es-modules.html
// Works fine when running the code but does not play well with jest...
// const moduleURL = new URL(import.meta.url)
// const __dirname = path.dirname(moduleURL.pathname)

// TODO make that parameterizable
// const STORE_PATH = path.join(__dirname, '../data/data.json')
const STORE_PATH = 'd:\\code\\my\\daily-todos\\backend\\data\\data.json'

const fileStore = {
    // TODO Don't assume the file exists
    read() { 
        if(fs.existsSync(STORE_PATH)) {
            const raw = fs.readFileSync(STORE_PATH, 'utf-8')
            if(raw) {
                // TODO Error handling for invalid JSON
                return (raw && JSON.parse(raw)) || null
            }
        } else {
            fs.create(STORE_PATH)
        }

        return []
    },
    write(data) { 
        fs.writeFileSync(STORE_PATH, JSON.stringify(data))
    }
}

export default class TodoDAO {
    constructor(store = fileStore) {
        this.store = store
        // Immutable array of todos
        // TODO error handling for invalid data
        this.todos = this.store.read() || []
        // TODO improve?
        this.nextId = this.todos.length ? this.todos.map(t => t.id).sort().pop() + 1 : 1
        // Previous states to support undo. Note that we do NOT store
        // history in the file system so if the server is reset you lose
        // the history
        this.history = []
    }
    create(todo) {
        todo.id = this.nextId++
        const newTodos = addTo(this.todos, todo)
        this.updateStore(newTodos)
        return todo
    }
    get(id) {
        if(id) {
            return this.todos.find(t => t.id === id)
        } else {
            return this.todos
        }
    }
    update(todo) {
        const idx = this.todos.findIndex(t => t.id === todo.id)
        // this.todos[idx] = todo would work but replaceAt 
        const newTodos = replaceAt(this.todos, idx, todo)
        this.updateStore(newTodos)
    }
    delete(id) {
        const idx = this.todos.findIndex(t => t.id === id)
        const newTodos = deleteAt(this.todos, idx)
        this.updateStore(newTodos)
    }
    undo() {
        if(this.history.length) {
            this.todos = this.history.pop()
            this.persistStore()
        }
    }
    updateStore(todos) {
        this.history.push(this.todos)
        this.todos = todos
        this.persistStore()
    }
    persistStore() {
        // TODO Using Sync to avoid conflicts but this would not be good for a real-life app
        this.store.write(this.todos)       
    }
}