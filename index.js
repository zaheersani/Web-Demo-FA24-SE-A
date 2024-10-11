const express = require('express')
const app = express()
// const users = require('./users')

const users = require('./users.json')

const userRouter = require('./userRouter');
app.use('/users', userRouter);



app.use(express.json())

app.get('/', (req, res) => {
    // res.send('This is Root route')
    const json = '{ "name": "John Doe", "age": 25 }';
    const jsObj = {
        name: 'John Doe',
        age: 25
    }
    // if(json) res.status(200).send(json)
    // else {
    // }
    res.redirect('/about/4')
    res.end()
    // res.send(jsObj)
})

// const users=[{ name: 'Old User', age: 92, department: 'Software Engineering' }]

// app.post('/users', (req, res) => {
//     const userObj = req.body
//     users.push(req.body)
//     console.log(users)
//     res.send(userObj)
// })

app.get('/about/:id', (req, res) => {
    res.send('This is About route')
})

// app.get('/users', (req, res) => {
//     res.send(users)
// })

// app.get('/users/:id', (req, res) => {
//     res.send(`This is User ${req.params.id} route`)
// })

app.listen(3000, () => {
    console.log(`Listening on port: 3000`)
})