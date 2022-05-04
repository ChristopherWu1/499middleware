const Pool = require('pg').Pool
const pool = new Pool({
  user: 'christopherwu',
  host: 'localhost',
  database: 'exercise_db',
  password: '',
  port: 5432,
});

const getExerciseNames= () => {
    return new Promise(function(resolve, reject) {
      
      pool.query('SELECT "Name" FROM "Excercises"', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  module.exports = {
    getExerciseNames
    
  }