import path from 'path'
import fs from 'fs'

import { addTo, replaceAt, deleteAt } from './immutable-array-utils.js'

// TODO #config
const STORE_PATH = 'd:\\code\\my\\daily-todos\\backend\\data\\data.json'

const fileStore = {
    read() {
        if (fs.existsSync(STORE_PATH)) {
            const raw = fs.readFileSync(STORE_PATH, 'utf-8')
            if (raw) {
                // TODO #errorhandling
                return (raw && JSON.parse(raw)) || null
            }
        } else {
            fs.create(STORE_PATH)
        }

        return []
    },
    // TODO #errorhandling
    write(data) {
        fs.writeFileSync(STORE_PATH, JSON.stringify(data))
    }
}

export default class TodoDAO {
    constructor(store = fileStore) {
        this.store = store
        // Immutable array of todos
        this.todos = this.store.read() || []
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
        if (id) {
            return this.todos.find(t => t.id === id)
        } else {
            return this.todos
        }
    }
    update(todo) {
        const idx = this.todos.findIndex(t => t.id === todo.id)
        if (idx !== -1) {
            const newTodos = replaceAt(this.todos, idx, todo)
            this.updateStore(newTodos)
        }
    }
    delete(id) {
        const idx = this.todos.findIndex(t => t.id === id)
        if (idx !== -1) {
            const newTodos = deleteAt(this.todos, idx)
            this.updateStore(newTodos)
        }
    }
    // That's defnitely something that belongs more on the front-end...
    undo() {
        if (this.history.length) {
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
        // TODO #performance sync is probably the best idea for a production environment
        this.store.write(this.todos)
    }
}