import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from "react-router-dom";
import Nav from '../../Components/NavBar/NavBar'
import * as AiIcons from "react-icons/ai";
import './Login.css'
function Login(props) {
  const [username, setUsername] = useState([{}]);
  const [password, setPassword] = useState([{}]);
  const [checkUser, setUser] = useState(false)
  const [checkPass, setPass] = useState(false)
  const navigate = useNavigate();

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
        props.parentCallback(num);
        setShow(true);
      });
      setTimeout(() => {navigate("/profile"); }, 2000);
  }

  function showpass() {
    var x = document.getElementById("myInput");
    console.log('pass')
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div className='background'>   
      <div className='card'>
          
          <h1>LOGIN</h1>
         
          <form onSubmit={HandleSubmit}>
              <input className = 'login-menu username' placeholder= 'Username' type="text" onChange= {(e) => {setUsername(e.target.value); setUser(true) }}/>
              <input id="myInput" className = 'login-menu ' placeholder = 'Password' type="password" onChange={(e) => {setPassword(e.target.value); setPass(true) }}/>
              <div className = 'check password'>
                <input  type="checkbox" onClick={showpass}/> Show Password
              </div>
              <input className = {checkPass && checkUser ? 'Login active' : 'Login'} type="submit" value="Log In"></input>
        </form>

        <Link className = 'Register' to= {`/Register`}>
          <h1 className='Member'>Need a membership? <u>Sign Up Now</u></h1>
        </Link>
      </div>
    </div>
  )
}

export default Login