import React, {useState, useEffect,Compnent} from 'react';
import Autosuggest from 'react-autosuggest';
import { Link } from "react-router-dom";
function Profile(props) {
    const [user, setUser] = useState('');
    useEffect(() => {
      getUser();
    }, []);

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
              
              let str = "hello, " + theName + " . These are your preferences. \n Location: " + theLocation + "\n Difficulty: " + theDifficulty;
              //return(data);
              setUser(str);
            });
          }

          return (
            <div>
              <Link to={`/`}>
              <h1> Home</h1>
              </Link>

            <Link to = {'/newExercise'}>
            <h1>Add New Exercise</h1>
            </Link>


              {user ? user : 'There is no user'}
            </div>
            
          );
}
export default Profile;