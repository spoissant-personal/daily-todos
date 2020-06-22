import React, { useState, useEffect } from 'react'
import * as TodosService from '../services/todosService'

const Todos = () => {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('') // Inputs don't like nulls

    useEffect(() => {
        TodosService.getTodos().then(setTodos)
    }, [])

    const addTodo = async todo => {
        const newTodo = await TodosService.addTodo(todo)
        setTodos(prev => [...prev, newTodo])
        setText('')
    }

    const completeTodo = async id => {
        await TodosService.completeTodo(id)
        setTodos(prev => prev.filter(t => t.id !== id))
    }

    return (
        <>
            <ul>
                {todos.map(t => (
                    <li key={t.id} onClick={() => completeTodo(t.id)}>{t.text}</li>
                ))}
            </ul>
            <input type='text' placeholder='Add todo...' value={text} onChange={e => setText(e.target.value)} />
            <button onClick={() => addTodo({ text })}>Add</button>
        </>
    )
}

export default Todos