const express = require('express')
const app = express()
const port = 3001

const exercises_model = require('./exercises_model')
const user_model = require('./user_model')
const exercise_list_model = require('./exercises_list_model.js')

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

  app.put('/exercises',(req, res) => {
    exercises_model.getUserExercisesFromID(req.body)
    .then(response => {
      res.status(200).send(response);
      console.log(req.body);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  app.get('/users_specific/:id', (req, res) => {
    //res.status(200).send('Hello World!');
    //res.status(200).send();
    let id  = req.params.id;
    user_model.getUser1(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  app.post('/users/', (req, res) => {
    user_model.createUser(req.body)
    .then(response => {
      res.status(200).send(response);
      console.log(req.body);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
  app.put('/users', (req, res) => {
    user_model.loginUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log('test3');
      res.status(500).send(error);
    })
  })

  app.delete('/users', (req, res) => {
    user_model.deleteUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  app.get('/exercises_list', (req, res) => {
    //res.status(200).send('Hello World!');
    
    exercise_list_model.getExerciseNames()
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