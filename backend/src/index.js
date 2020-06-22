import Express from 'express'
import cors from 'cors'
import TodoDAO from './todo-dao.js'

const PORT = 2000

const store = new TodoDAO()

const loggerMid = (req, res, next) => {
    console.log('Origin', req.hostname)
    console.log('Method', req.method)
    console.log('Url', req.url)
    console.log('Params', req.params)
    console.log('Body', req.body)
    next()
}

const app = new Express()

// Allows parsing of json body
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// Logs information for debugging/curiosity
app.use(loggerMid)

// Enable CORS coming from the frontend only
// We would not want hackers stealing our precious todos!!!
const corsOptions = {
    // TODO #config
    origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))

app.get('/todos', (req, res) => {
    res.json(store.get(req.params.id && +req.params.id))
})

app.get('/todos/:id', (req, res) => {
    // TODO #errorhandling https://www.restapitutorial.com/lessons/httpmethods.html
    res.json(store.get(+req.params.id))
})

app.post('/todos', loggerMid, (req, res) => {
    // Recommended return values https://www.restapitutorial.com/lessons/httpmethods.html
    const newTodo = store.create(req.body)
    res.json(newTodo)
})

app.put('/todos', (req, res) => {
    // Recommended return values https://www.restapitutorial.com/lessons/httpmethods.html
    store.update(req.body)
    res.sendStatus(200)
})

app.delete('/todos/:id', (req, res) => {
    // Recommended return values https://www.restapitutorial.com/lessons/httpmethods.html
    store.delete(+req.params.id)
    res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))