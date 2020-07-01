import React, { useState, useEffect, useRef } from 'react'
import * as TodosService from '../services/todosService'

const TodoEditor = ({todo, onConfirm, onCancel}) => {
    const [text, setText] = useState(todo.text)
    const inputRef = useRef(null)

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            onConfirm({...todo, text})
        }
        if (e.key === 'Escape') {
            onCancel()
        }
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <input ref={inputRef} className='todo-editor' value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} />
    )
}

const Todos = () => {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('') // Inputs don't like nulls
    const [editing, setEditing] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => {
        TodosService.getTodos().then(setTodos)
    }, [])

    const addTodo = async todo => {
        const newTodo = await TodosService.addTodo(todo)
        setTodos(prev => [...prev, newTodo])
        setText('')
        inputRef.current.focus()
    }

    const updateTodo = async (todo) => {
        const updated = await TodosService.updateTodo(todo)
        setTodos(prev => {
            const updatedIdx = prev.findIndex(t => t.id === updated.id)
            return [...prev.slice(0, updatedIdx - 1), todo, ...prev.slice(updatedIdx)]
        })
        setEditing(null)
    }

    const completeTodo = async id => {
        await TodosService.completeTodo(id)
        setTodos(prev => prev.filter(t => t.id !== id))
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTodo({ text })
        }
    }

    return (
        <>
            <ul className='todo-list'>
                {todos.map(t => {
                    return t.id === editing ?
                    (<TodoEditor key={t.id} todo={t} onConfirm={updateTodo} onCancel={() => setEditing(null)} />) :
                    (<li className='todo-item' key={t.id}><span onClick={() => completeTodo(t.id)}>{t.text}</span><button className='todo-editButton' onClick={(e) => { e.preventDefault(); setEditing(t.id); } }>Edit</button></li>)
                }
                )}
            </ul>
            <input type='text' placeholder='Add todo...' value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef} />
            <button onClick={() => addTodo({ text })}>Add</button>
        </>
    )
}

export default Todos