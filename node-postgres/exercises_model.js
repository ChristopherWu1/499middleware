const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'exercise_db',
  password: '',
  port: 5432,
});

const getUserExercises= () => {
    return new Promise(function(resolve, reject) {
      
      pool.query('SELECT * FROM "User"', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const getUserExercisesFromID = (body) => {
    return new Promise(function(resolve, reject) {
      let User_Id1 = body.id;
      
      pool.query('SELECT * FROM "User" where "User_Id" = ($1)', [User_Id1],(error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  

  
/*
User_Id: Int
Exercise: text
Rating: bigint
Set: bigint
Reps: bigint
Date: text
*/
  const createUserExercise = (body) => {
    return new Promise(function(resolve, reject) {
      //const { User_Id,Exercise,Rating,Set,Reps,Date } = body
      let User_Id1 = body.user_id;
      let Exercise1 = body.exercise;
     let Rating1= body.rating;
      let Set1 = body.sets;
      let Reps1 = body.reps;
      let Date1= body.date;
      console.log(body,User_Id1, Exercise1,Rating1,Set1,Reps1,Date1);

      pool.query('INSERT INTO "User" ("User_Id","Exercise","Rating","Set","Reps","Date") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [User_Id1, Exercise1,Rating1,Set1,Reps1,Date1], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new exericse has been added added: ${results.rows[0]}`)
      })
      pool.end
    })
  }

  module.exports = {
    getUserExercises,
    createUserExercise,
    getUserExercisesFromID
  }
  