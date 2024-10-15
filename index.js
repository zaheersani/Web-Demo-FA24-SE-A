const express = require('express')
const app = express()
const users = require('./users.json')

// Builtin Middleware
app.use(express.json())

// Custom Middleware
const middleware1 = (req, res, next) => {
    console.log('Middleware 1')
    console.log(`${req.method} ${req.path}`)
    req.info = "Some info"
    // req.method = "POST"
    next()
    // res.send('I am not happy with your request!')
}

// Custom Middleware
const middleware2 = (req, res, next) => {
    console.log('Middleware 2')
    console.log(`${req.method} ${req.path}`)
    console.log(req.info)
    next()
}

// Global Middlewares
app.use(middleware1)
app.use(middleware2)
app.use((req, res, next) => {
    console.log('Middleware 3')
    next()
})

// Custom Authentication Middleware
const auth = (req, res, next) => {
    const { username, password } = req.body
    console.log('Auth Middleware')
    if(username === 'admin' && password === 'admin') {
        next()
    } else {
        res.send('Unauthorized')
    }
};

// GET / - Middleware 1 - Auth - Middleware 2
app.get('/', middleware1, auth, middleware2, (req, res) => {
    res.send(`Welcome ${req.body.username}`)
})

app.post('/', (req, res) => {
    res.send(`Hello World from ${req.method}`)
})

// Crash the server
app.get('/comments', (req, res) => {
    // Code will crash here and sends to Error middleware
    comments.push(req.body)
    res.send('Comments')
})

// Users Router
const userRouter = require('./userRouter');
app.use('/users', userRouter);

// When no route is matched
app.use((req, res) => {
    res.status(404).send('404 Not Found')
})

// Error Middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Listen on port 3000
app.listen(3000, () => {
    console.log(`Listening on port: 3000`)
})