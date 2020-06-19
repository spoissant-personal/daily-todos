import TodoDAO from '../src/todo-dao'

const getMockedDao = () => new TodoDAO({read(){}, write(){}})
const getMockedTodo = (text) => ({ text })

let dao;

beforeEach(() => {
    // Reset the DAO before each test
    dao = getMockedDao()
})

it('can create a todo', () => {
    dao.create(getMockedTodo('test'))
    const todos = dao.get()
    
    expect(todos.length).toBe(1)
    expect(todos[0].text).toBe('test')
})

it('can update a todo', () => {
    const todo1 = dao.create(getMockedTodo('test1'))
    const todo2 = dao.create(getMockedTodo('test2'))
    const updatedTodo2 = {...todo2, text: 'chicken'}
    dao.update(updatedTodo2)
    
    const todos = dao.get()

    expect(todos.length).toBe(2)
    expect(todos.find(t => t.id === todo1.id).text).toBe('test1')
    expect(todos.find(t => t.id === todo2.id).text).toBe('chicken')
})

it('can delete a todo', () => {
    const todo1 = dao.create(getMockedTodo('test1'))
    const todo2 = dao.create(getMockedTodo('test2'))
    const todo3 = dao.create(getMockedTodo('test3'))
    dao.delete(todo3.id)
    
    const todos = dao.get()

    expect(todos.length).toBe(2)
    expect(todos[0].text).toBe('test1')
    expect(todos[1].text).toBe('test2')
})

it('can retrieve a specific todo', () => {
    const todo1 = dao.create(getMockedTodo('test1'))
    const todo2 = dao.create(getMockedTodo('test2'))
    

    const retrieved1 = dao.get(todo1.id)
    const retrieved2 = dao.get(todo2.id)

    expect(retrieved1.text).toBe('test1')
    expect(retrieved2.text).toBe('test2')
})

