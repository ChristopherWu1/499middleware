import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from '../../Components/NavBar/NavBar'
import "../../App.css";
function Register(props) {
  const [username, setUsername] = useState([{}]);
  const [password, setPassword] = useState([{}]);
  const [name, setName] = useState([{}]);
  const [secondBackendData, setSecondBackendData] = useState([{}])
  let [question1, setQuestion1] = useState([]);
  let [answer1,setAnswer1]=useState('')
  let [question2, setQuestion2] = useState([]);
  let [answer2,setAnswer2]=useState('')
  let [question3, setQuestion3] = useState([]);
  let [answer3,setAnswer3]=useState('')
  
  var HandleClickQ1 = function(event){
    setAnswer1(event)
  }
  var HandleClickQ2 = function(event){
    setAnswer2(event)
  }
  var HandleClickQ3 = function(event){
    setAnswer3(event)
  }
  useEffect(() => {
    const fetchData = async () => {
      let data1 = await axios.get("http://localhost:3001/questions/question1");
      setQuestion1(data1.data);
      let data2 = await axios.get("http://localhost:3001/questions/question2");
      setQuestion2(data2.data);
      let data3 = await axios.get("http://localhost:3001/questions/question3");
      setQuestion3(data3.data);
    }

    fetchData()
      .catch(console.error);;
  }, [])
  useEffect(() => {

    // fetch api from backend
    fetch("http://localhost:3001/questions/question1").then(
      //whatever response we get from the api it will be in json format
      response => response.json()
    ).then(
      //get the data from the json and set it to the backendData variable
      data => {
        console.log(data)
        setQuestion1(data)
      }
    )
  },[]);

  var request = { "username":username , "password": password, "name":name,"difficulty": answer1,"Location":answer2, "exercise_category": answer3};
  var HandleSubmit = function (event) {
    event.preventDefault();
 
    alert('form submitted');
    console.log(request);
    //
    fetch(`http://localhost:3001/createUser`, {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      //convert react state to json and send it as the post body
      body: JSON.stringify(request)
    }).then((response) => response.json()
    ).then(data => {
    setSecondBackendData(data)
      
    })
    console.log(secondBackendData);
    /*
    let num = parseInt(secondBackendData[0].user_id);
    console.log(typeof num,num);
    props.setId(num);
    console.log(props.id);*/
  }
  return (
    <div>
      <Nav></Nav>
         <h1>register</h1>
         <form onSubmit={HandleSubmit}>
          <div>
        <label>
          Enter username: <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          Enter password: <input type="text" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          Enter name: <input type="text" onChange={e => setName(e.target.value)}/>
        </label>
        </div>
      {(typeof question1 === 'undefined') ? (
    <p>loading...</p>
  ) : (
    question1.map((item) => (
      <div key={item.id} className = "card" onClick={()=>HandleClickQ1(item.description)}>
            <img src= {item.img}/>
            <p>{item.description}</p> 
        </div>
    ))
  )}
  {answer1 ? <p>You chose: {answer1}</p> : <p>You need to make a choice above!</p>}
  {(typeof question2 === 'undefined') ? (
    <p>loading...</p>
  ) : (
    question2.map((item) => (
      <div key={item.id} className = "card" onClick={()=>HandleClickQ2(item.description)}>
            <img src= {item.img}/>
            <p>{item.description}</p> 
        </div>
    ))
  )}
  {answer2 ? <p>You chose: {answer2}</p> : <p>You need to make a choice above!</p>}
  {(typeof question3 === 'undefined') ? (
    <p>loading...</p>
  ) : (
    question3.map((item) => (
      <div key={item.id} className = "card" onClick={()=>HandleClickQ3(item.description)}>
            <img src= {item.img}/>
            <p>{item.description}</p> 
        </div>
    ))
  )}
  {answer3 ? <p>You chose: {answer3}</p> : <p>You need to make a choice above!</p>}
      <input type="submit" value="Submit"></input>
      <Link to = {'/'}>
        <h1>Log in</h1>
      </Link>
      </form>
    </div>
  )
}

export default Register;