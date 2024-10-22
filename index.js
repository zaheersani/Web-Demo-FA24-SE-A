const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const users = require('./users.json')

// Builtin Middleware
app.use(express.json())

// Login Route to Sign JWT
app.post('/login', (req, res) => {
    if(req.body.username === 'admin' && req.body.password === 'admin') {
      const token = jwt.sign({ usernmae: 'admin', department: 'Software Engineering' },
        'secret', 
        { expiresIn: '1h' }
      )
      res.send({ token });
    } else {
      res.status(401).send('Unauthorized');
    }
  });
  
  // Authentication Middleware
  const auth = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, user) => {
      if(err) {
        res.status(403).send('Forbidden');
      } else {
        req.auth = user;
        next();
      }
    });
  }
  
  // Protected Route which uses Authentication Middleware
  app.post('/protected', auth, (req, res) => {
    res.send({ auth: req.auth });
  });

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