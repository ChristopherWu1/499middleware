import React, {useState, useEffect,Compnent} from 'react';
import Autosuggest from 'react-autosuggest';
import { Link } from "react-router-dom";
import Nav from './/NavBar/NavBar'
import Analytics from './/Analytics/Analytics'
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
              <Analytics></Analytics>
            </div>
            
          );
}
export default Profile;