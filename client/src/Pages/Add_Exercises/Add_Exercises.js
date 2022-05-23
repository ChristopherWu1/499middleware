import React, {useState, useEffect,Compnent} from 'react';
import Autosuggest from 'react-autosuggest';
import { Link } from "react-router-dom";
import Nav from '../../Components/NavBar/NavBar'
import './Exercise.css'
function Add_Exercises(props) {
    const [exercises, setExercises] = useState(false);
  useEffect(() => {
    getExercises1();
  }, []);
  //const [user_id, set_user_id] = useState('');
  const [exercise, set_exerise] = useState('');
  const [rating, set_rating] = useState('');
  const [sets, set_sets] = useState('');
  const [reps, set_reps] = useState('');
  const [date, set_date] = useState('');
  console.log('props id',props.id,typeof props.id);


  const [user, setUser] = useState('');
  useEffect(() => {
    getUser();
  }, []);
  const [user_id_2, set_user_id_2] = useState('');
  




  const [exercise_names, set_exercise_names] = useState(false);
  useEffect(() => {
    getExerciseNames();
  }, []);

  const [ex_names, set_ex_names] = useState([]);

  const [value, set_values] = useState('');
  const [suggestions, set_suggestions] = useState('');

  function onSuggestionsFetchRequested  (value )  {
      set_suggestions( getSuggestions(value));
  };

  function onSuggestionsClearRequested()
  {
    set_suggestions( []);
  }
  
  
  // Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : ex_names.filter(ex =>
    ex.theName.toLowerCase().slice(0, inputLength) === inputValue
  );
};
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.theName;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);
/*
function getUserId() {
  let username = prompt('enter username');
  let password = prompt('enter password');
  fetch('http://localhost:3001/users',{method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
},
    body: JSON.stringify({username,password}),
}
  )
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log(data);
      var numberPattern = /\d+/g;
      let num = data.match( numberPattern ).join('');
      
      set_user_id_2(num);
      

    });
}
*/

    
      function getExercises1() {
        let id = props.id;
        
        fetch('http://localhost:3001/exercises',{method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
      },
          body: JSON.stringify({id}),
    }
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
   let user_id = props.id;
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
            getExercises1();
          });
      }
      
      function getUser() {
        
        //let id = prompt('Enter  user_id');
        let id = props.id;
       console.log(id);
        fetch(`http://localhost:3001/users_specific/${id}`, {
             method: 'GET',}
             )
              .then(response => {
                return response.text();
            })
            .then(data => {
              console.log(data);
              //return(data);
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
                    let arr4 = [];
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
                    var obj = {"theName": aName};
                    //console.log(obj);
                    arr4.push({"theName": aName});
    
                    }
                  
                  
    
                    //console.log(arr2,":::::",arr4);
                    for(let x = 0; x < arr4.length; x++)
                    {
                      console.log(arr4[x].theName);
                    }
                    set_ex_names(arr4);
                    set_exercise_names(arr2);
                    //console.log(data,data.length,data[0],typeof data,arr,arr.length);
                  });
              };
    

      
        
        
          

        

      return (
        <div className='Background'>
          
          <Nav> </Nav>
          <div className='Recommend_Contents Card '>
              <h1 class = "Title">Add Exercise you have done</h1>
              

              {exercises ? exercises : 'You have done no exercises'}
              
              <br />

            
            <input className = 'login-menu username' placeholder = 'Enter exercise:' type="text" onChange={e => set_exerise(e.target.value)} />
            <input className = 'login-menu username' placeholder = 'Enter Rating: ' type="number"min = '1' max = '5' step = '0.5' onChange={e => set_rating(e.target.value)} />
            <input  className = 'login-menu username' placeholder = 'Enter number of sets: ' type="number" step = '1' onChange={e => set_sets(e.target.value)} />
            <input className = 'login-menu username' placeholder = 'Enter number of reps done for each set:'  type="number" step = '1' onChange={e => set_reps(e.target.value)} />
            <input className = 'login-menu username' placeholder = 'Enter date the exercise was done: ' type="date" onChange={e => set_date(e.target.value)} />

            <button className='Login_1' onClick={createExercise}>Add Exercise</button>
          
            
            </div>
        </div>
      );
         
      }

export default Add_Exercises;