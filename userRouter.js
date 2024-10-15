const express = require('express')
const userRouter = express.Router()

const users = require('./users.json')

userRouter.get('/', (req, res) => {
    res.send(users)
})

userRouter.post('/', (req, res) => {
    const userObj = req.body
    users.push(req.body)
    console.log(users)
    res.send(userObj)
})

module.exports = userRouter;