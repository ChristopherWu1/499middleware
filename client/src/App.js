import "./App.css";

//Router
import React, {Component , useState}  from 'react';
import { Routes, Route,BrowserRouter as Router } from "react-router-dom";
import Recommendations from './Recommendations';
import Add_Exercises from "./Add_Exercises";

/*
<Route exact path="/" component={Recommendations} />
<Route exact path="/newExercise" component={Add_Exercises} />
*/


class App extends Component {
 
  constructor() {
    super();
    this.state = {id: 1};
  }
  /*
   getUserId = () =>{
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
        this.setState({id : num});
        //set_user_id_2(num);
        
  
      });
  }*/
  render(){

  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Recommendations id = {this.state.id}/>} />
      <Route exact path="/newExercise" element={<Add_Exercises id = {this.state.id}/>} />
         
      </Routes>
       
    </div>
  );
  }
 
}

export default App;