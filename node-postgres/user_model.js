const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'exercise_db',
  password: '',
  port: 5432,
});

const deleteUser = (aId) => {
    return new Promise(function(resolve, reject) {
      //const id = parseInt(request.params.id)
      let User_Id1 = parseInt(aId);
      pool.query('DELETE FROM user_list WHERE user_id = $1', [User_Id1], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`User deleted with ID: ${id}`)
      })
    })
  }


  function getUser1(testid){
    return new Promise(function(resolve, reject) {
      const id = parseInt(testid)
      //resolve(id);
      console.log(id);
      pool.query('select * from "user_list" WHERE "user_id" = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    })
  }
  const loginUser = (body) => {
    return new Promise(function(resolve, reject) {
      //const { User_Id,Exercise,Rating,Set,Reps,Date } = body
      let Username1 = body.username;
      let Password1= body.password;
      console.log(Username1);
      console.log(Password1);

      pool.query('select user_id from "user_list" where "username" = ($1) and "password" = ($2)', [Username1,Password1], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results.rows);
        resolve(results.rows);
      })
      pool.end
    })
  }
  

  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      //const { User_Id,Exercise,Rating,Set,Reps,Date } = body
      //let User_Id1 = body.user_id;
      let Username1 = body.username;
      let Password1= body.password;
      let Name1 = body.name;
      let Difficulty1 =body.difficulty
      let Location=body.Location
      let exercise_category=body.exercise_category
  
      /*
      let Exercise_category1 = body.exercise_category;
      let Difficulty1 = body.difficulty;
      let Location1= body.location;
      let Name1 = body.Name;*/
      console.log(body,Username1,Password1,Name1);

      pool.query('INSERT INTO "user_list" ("user_id","username","password","Name","difficulty","location","exercise_category") VALUES ((select max("user_id") from "user_list") + 1,$1,$2,$3,$4,$5,$6) RETURNING "user_id"', [ Username1,Password1,Name1,Difficulty1,Location,exercise_category], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results.rows);
        resolve(results.rows);
      })
      pool.end
    })
  }

  const updateUser = (body) => {
    return new Promise(function(resolve, reject) {
      let exercise_category_1 = body.exercise_category;
      let difficulty1 = body.difficulty;
      let location1= body.location;
      let id1 = body.id;
      /*
      let Exercise_category1 = body.exercise_category;
      let Difficulty1 = body.difficulty;
      let Location1= body.location;
      let Name1 = body.Name;*/
      console.log(body,exercise_category_1,difficulty1,location1,id1);

      pool.query('UPDATE "user_list" SET "exercise_category" = ($1), "difficulty" = ($2), "location" = ($3) WHERE "user_id" = ($4) returning *', [ exercise_category_1,difficulty1,location1,id1], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results.rows);
        resolve(results.rows);
      })
      pool.end
    })

  }
  module.exports = {
    deleteUser,
    getUser1,
    createUser,
    loginUser,
    updateUser
  }





