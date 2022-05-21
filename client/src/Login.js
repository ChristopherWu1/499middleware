import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Nav from './/NavBar/NavBar'

function Login(props) {
  const [username, setUsername] = useState([{}]);
  const [password, setPassword] = useState([{}]);
  const [show, setShow]=useState(false);
  var request = { "username":username , "password": password };
  //const [serverResponse, setResponse]=useState([{}]);
  var handleLogout = function(event){
    event.preventDefault();
    props.parentLogout(0);
    setShow(false);
  }
  var HandleSubmit = function (event) {
    event.preventDefault();
 
    alert('form submitted');
    console.log(request);
    //
    fetch('http://localhost:3001/users', {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      //convert react state to json and send it as the post body
      body: JSON.stringify(request)
    }).then(response => {
        return response.text();
      })
      .then(data => {
        console.log("intial id",data);
        var numberPattern = /\d+/g;
        let num = data.match( numberPattern ).join('');
        num = parseInt(num);
        props.parentCallback(num)
        setShow(true);
      });

  }
  return (
    <div>
        <h1>Login</h1>
      <form onSubmit={HandleSubmit}>
      <label>
          Enter username: <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          Enter password: <input type="text" onChange={e => setPassword(e.target.value)}/>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <button type="button" onClick={handleLogout}>log out</button>
      <Link to= {`/Register`}>
        <h1>Register</h1>
      </Link>
      <nav style={{display: show ? "block" : "none"}}>
       
        <Nav></Nav>
    </nav>
    </div>
  )
}

export default Login