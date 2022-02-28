import React, { useEffect, useState } from 'react'
function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {

    // fetch api from backend
    fetch('/api').then(
      //whatever response we get from the api it will be in json format
      response => response.json()
    ).then(
      //get the data from the json and set it to the backendData variable
      data => {
        setBackendData(data)
      }
    )
  }, []/*[] it makes sure to start only on the first render of the page*/);
  const [secondBackendData, setSecondBackendData] = useState([{}])
  useEffect(() => {
    fetch('/home').then(
      response => response.json()
    ).then(
      data => {
        setSecondBackendData(data)
      }
    )
  })
  const [num1, setNum1] = useState([{}]);
  const [num2, setNum2] = useState([{}]);
  const [sum, setSum] = useState([{}]);
  var nums = { "num1": num1, "num2": num2 };
  //react function components must start with capitalized letters
  var HandleSubmit = function (event) {
    event.preventDefault();
    alert('form submitted');
    console.log(nums);
    //
    fetch('http://localhost:5000/data', {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      //convert react state to json and send it as the post body
      body: JSON.stringify(nums)
    }).then((response) => response.json()
    ).then(data => {
      console.log(data);
      setSum(data)
    })
  }
  /*var handleSubmit = function(e) {
    e.preventDefault()
    axios.post('/data', nums).then(() =>
      console.log('nums sent')).catch(err => {
        console.error(err);
      });
  };*/
  /*useEffect(function(){
    alert('form submitted');
  fetch('http://localhost:5000/data',{
    method:'POST',
    //convert react state to json and send it as the post body
    body:JSON.stringify(nums)
  }).then(function(response){
    console.log(response)
    return response.json();
  });
  })*/
  return (
    <div>
      {(typeof backendData.users === 'undefined') ? (
        <p>loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
      <p>{secondBackendData.string}</p>
      <p>{secondBackendData.number}</p>
      <form onSubmit={HandleSubmit}>
        <label>
          Enter name: <input type="text" onChange={e => setNum1(e.target.value)} />
        </label>
        <br/>
        <label>
          Enter exercise: <input type="text" onChange={e => setNum2(e.target.value)} />
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <h1>sum:{sum.sum}</h1>
      {(typeof sum.sum === 'undefined') ? (
        <p></p>
      ) : (
        sum.sum.map((val, i) => (
          <p key={i}>{val}</p>
        ))
      )}
    </div>
  )
}

export default App