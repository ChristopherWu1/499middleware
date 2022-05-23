import React, {useState, useEffect,Compnent} from 'react';
import Autosuggest from 'react-autosuggest';
import { Link } from "react-router-dom";
import Nav from '../../Components/NavBar/NavBar'

function Profile(props) {
    const [user, setUser] = useState('');
    useEffect(() => {
      getUser();
    }, []);


  const [exercise_category, setExerciseCategory] = useState([{}]);
  const [difficulty, setDifficulty] = useState([{}]);
  const [location, setLocation] = useState([{}]);
  const [id,setId] = useState([{}]);

  var request = { "exercise_category":exercise_category , "difficulty": difficulty, "location":location, "id":props.id};
  var HandleSubmit = function (event) {
    event.preventDefault();
 
    alert('form submitted');
    console.log(request);
    //
    fetch('http://localhost:3001/users', {
      method: 'PUT',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      //convert react state to json and send it as the post body
      body: JSON.stringify(request)
    }).then(response => {
        return response.text();
      })
      .then(data => {
        getUser();
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
              let theName = data.split('Name')[1];
              console.log(theName);
              theName = theName.slice(3,theName.length -3);
              console.log(theName,);

              let theLocation = data.split('location')[1];
              console.log(theLocation);
              theLocation = theLocation.split('"')[2];
              console.log(theLocation);

              let theDifficulty = data.split('difficulty')[1];
              console.log(theDifficulty);
              theDifficulty = theDifficulty.split('"')[2];
              console.log(theDifficulty);

              let theId = data.split('user_id')[1];
              console.log(theId);
              theId = theId.split('"')[2];
              console.log(theId);

              let cat = data.split('exercise_category')[1];
              console.log(cat);
              cat = cat.split('"')[2];
              console.log(cat);


              
              let str = "Hello, " + theName + " . These are your preferences. \n Location: " + theLocation + "\n Difficulty: " + theDifficulty + " Exercise Category: " + cat;
              //return(data);
              setUser(str);
            });
          }

          return (
            <div>
              <Nav></Nav>

              {user ? user : 'There is no user'}
              <br />

                <form onSubmit={HandleSubmit}>
                  <label>
                    Enter Exercise Category:
                    <select onChange={e => setExerciseCategory(e.target.value)}>
                      <option value="Strength">Strength</option>
                      <option value="Flexibility">Flexibility</option>
                      <option value="Aerobic">Aerobic</option>
                    </select>
                  </label>
                  <label style={{ paddingLeft: '50px' }}>
                    Enter Difficulty: 
                    <select onChange={e => setDifficulty(e.target.value)}>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </label>
                
                  <label style={{ paddingLeft: '50px' }}>
                    Enter Location:
                    <select onChange={e => setLocation(e.target.value)}>
                      <option value="Home">Gym only</option>
                      <option value="Gym">Home only</option>
                      <option value="Both">Both gym and home</option>
                      <option value="Special">Specialized equipment</option>
                    </select>
                  </label>
                  <br/>

                <input type="submit" value="Submit"></input>
              </form>
                    
            </div>
            
          );
}
export default Profile;