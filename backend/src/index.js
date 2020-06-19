import Express from 'express'
import TodoDAO from './todo-dao.js'

const PORT = 3000

const store = new TodoDAO()

const loggerMid = (req, res, next) => {
    console.log('Method', req.method)
    console.log('Url', req.url)
    console.log('Params', req.params)
    console.log('Body', req.body)
    next()
}

const app = new Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(loggerMid)

app.get('/todos', (req, res) => {
    res.json(store.get(req.params.id && +req.params.id))
})

app.get('/todos/:id', (req, res) => {
    // TODO Error handling
    res.json(store.get(+req.params.id))
})

app.post('/todos', loggerMid, (req, res) => {
    // TODO Error handling
    const newTodo = store.create(req.body)
    res.json(newTodo)
})

app.put('/todos', (req, res) => {
    // TODO Error handling
    store.update(req.body)
    res.sendStatus(200)
})

app.delete('/todos/:id', (req, res) => {
    // TODO Error handling
    store.delete(+req.params.id)
    res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))