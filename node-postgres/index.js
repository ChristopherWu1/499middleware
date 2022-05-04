const express = require('express')
const app = express()
const port = 3001

const exercises_model = require('./exercises_model')
const user_model = require('./user_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});



app.get('/exercises', (req, res) => {
  //res.status(200).send('Hello World!');
  exercises_model.getUserExercises()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/exercises', (req, res) => {
    exercises_model.createUserExercise(req.body)
    .then(response => {
      res.status(200).send(response);
      console.log(req.body);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  app.get('/users', (req, res) => {
    //res.status(200).send('Hello World!');
    user_model.getUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  app.post('/users/:id', (req, res) => {
    user_model.createUser(req.body)
    .then(response => {
      res.status(200).send(response);
      console.log(req.body);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  app.delete('/users/:id', (req, res) => {
    user_model.deleteUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  

  
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})