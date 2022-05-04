import React, {useState, useEffect} from 'react';
import Autosuggest from 'react-autosuggest';


function Add_Exercises() {
    const [exercises, setExercises] = useState(false);
  useEffect(() => {
    getExercises();
  }, []);
  const [user_id, set_user_id] = useState('');
  const [exercise, set_exerise] = useState('');
  const [rating, set_rating] = useState('');
  const [sets, set_sets] = useState('');
  const [reps, set_reps] = useState('');
  const [date, set_date] = useState('');

  const [user, setUser] = useState(false);
  const [user_id_2, set_user_id_2] = useState(19);

  const [exercise_names, set_exercise_names] = useState(false);
  useEffect(() => {
    getExerciseNames();
  }, []);
  
  
  




    function getExercises() {
        fetch('http://localhost:3001/exercises',{method: 'GET'}
        )
          .then(response => {
            return response.text();
          })
          .then(data => {
            setExercises(data);
            

          });
      }
      /*
        User_Id: Int
        Exercise: text
        Rating: bigint
        Set: bigint
        Reps: bigint
        Date: text
    */
function createExercise() {
    /*
    let user_id = prompt('Enter merchant user_id');
    let exercise = prompt('Enter exercise');
    let rating = prompt('Enter rating: 1 being the worst and 5 being the best');
    let sets = prompt('Enter amount of sets');
    let reps = prompt('Enter amount of reps per set');
    let date = prompt('Enter date exercise is done');
    */
   console.log(user_id);
    fetch('http://localhost:3001/exercises', {
         method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({user_id,exercise,rating,sets,reps,date}),
        })
          .then(response => {
            return response.text();
        })
          .then(data => {
            alert(data);
            getExercises();
          });
      }
      
      function getUser() {
        
        let id = prompt('Enter  user_id');
       console.log(id);
        fetch(`http://localhost:3001/users_specific/${id}`, {
             method: 'GET'}
             )
              .then(response => {
                return response.text();
            })
            .then(data => {
              setUser(data);
            });
          }
          function getExerciseNames() {
            fetch('http://localhost:3001/exercises_list',{method: 'GET'}
            )
              .then(response => {
                return response.text();
              })
              .then(data => {
                let arr = data.split(",");
                let arr2 = [];
                for (let i = 0; i < arr.length; i++) { 
                  //console.log(arr[i]);
                  let arr3 = arr[i].split(":");
                  let aName = arr3[1];
                  //console.log(aName);
                  if(i === (arr.length -1 ))
                  {
                    aName = aName.substring(1,aName.length -3);
                    
                  }
                  else
                  {
                    aName = aName.substring(1,aName.length -2);
                    
                  }
                  if(aName.substring(aName.length -2) === '\n')
                    {
                      //console.log('yeš');
                      aName = aName.substring(0,aName.length -2);

                    }
                  aName = aName.trim();
                  
                  arr2.push(aName);

                }
              
              

                console.log(arr2);
                set_exercise_names(arr2);
                //console.log(data,data.length,data[0],typeof data,arr,arr.length);
              });
          }
        
          



      return (
        <div>
          {exercises ? exercises : 'You have done no exercises'}
          <br />
          <label>
          Enter User_Id: <input type="number" step = '1' onChange={e => set_user_id(e.target.value)} />
          </label>
          <br />

          <label>
          Enter exercise: <input type="text" onChange={e => set_exerise(e.target.value)} />
          </label>
          <br/>

          <label>
          Enter Rating: <input type="number"min = '1' max = '5' step = '0.5' onChange={e => set_rating(e.target.value)} />
          </label>
          <br />

          <label>
          Enter number of sets: <input type="number" step = '1' onChange={e => set_sets(e.target.value)} />
          </label>
          <br />

          <label>
          Enter number of reps done for each set: <input type="number" step = '1' onChange={e => set_reps(e.target.value)} />
          </label>
          <br />

          <label>
          Enter date the exercise was done: <input type="date" onChange={e => set_date(e.target.value)} />
          </label>
          <br />


      <button onClick={createExercise}>Add merchant</button>
      <p>----------------------------------------------</p>
      <button onClick={getUser}>Add merchant</button>
      <br />
      {user ? user : 'There is no user'}
          <br />
          {exercise_names ? exercise_names : 'There is no exerciseses'}

         
        </div>
        
      );
      
    
}

export default Add_Exercises;