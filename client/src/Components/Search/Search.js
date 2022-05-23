import React, { useEffect, useState } from 'react'


export default function Search() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {

    // fetch api from backend
    fetch('http://localhost:5000/api').then(
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
    fetch('http://localhost:5000/home').then(
      response => response.json()
    ).then(
      data => {
        setSecondBackendData(data)
      }
    )
  })
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState([{}]);
  const [num3, setNum3] = useState([{}]);
  //checkboxes
  const [num4, setNum4] = useState('');
  const [num5, setNum5] = useState('');
  const [num6, setNum6] = useState('');
  const [num7, setNum7] = useState('');
  const [num8, setNum8] = useState('');
  const [num9, setNum9] = useState('');

  //numbers
  const [num10, setNum10] = useState('');
  const [num11, setNum11] = useState('');
  const [num12, setNum12] = useState('');
  const [num13, setNum13] = useState('');
  const [num14, setNum14] = useState('');
  const [num15, setNum15] = useState('');

  //yes or no to using weights from input
  const [num16, setNum16] = useState('No');


  const [sum, setSum] = useState([{}]);

  const handleCheckOne = (val) => {
    if(val === 'Target Area')
    {
    
      if( (num4 === '') )
      {
        //console.log(val);
        console.log(num4);
        setNum4(val);
        console.log(num4);
      }
      else
      {
        //console.log(val);
        console.log(num4);
        setNum4('');
        console.log(num4);
      }
    }
    else if(val === 'Target Muscle' )
    {
      if( (num5 === '') )
      {
        //console.log(val);
        console.log(num5);
        setNum5(val);
        console.log(num5);
      }
      else
      {
        //console.log(val);
        console.log(num5);
        setNum5('');
        console.log(num5);
      }
    }
    else if(val === 'Exercise Category' )
    {
      if( (num6 === '') )
      {
        //console.log(val);
        console.log(num6);
        setNum6(val);
        console.log(num6);
      }
      else
      {
        //console.log(val);
        console.log(num6);
        setNum6('');
        console.log(num6);
      }
    }
    else if(val === 'Push Pull Stretch Aerobic' )
    {
      if( (num7 === '') )
      {
        //console.log(val);
        console.log(num7);
        setNum7(val);
        console.log(num7);
      }
      else
      {
        //console.log(val);
        console.log(num7);
        setNum7('');
        console.log(num7);
      }
    }
    else if(val === 'Difficulty' )
    {
      if( (num8 === '') )
      {
        //console.log(val);
        console.log(num8);
        setNum8(val);
        console.log(num8);
      }
      else
      {
        //console.log(val);
        console.log(num8);
        setNum8('');
        console.log(num8);
      }
    }
    else if(val === 'Location' )
    {
      if( (num9 === '') )
      {
        //console.log(val);
        console.log(num9);
        setNum9(val);
        console.log(num9);
      }
      else
      {
        //console.log(val);
        console.log(num9);
        setNum9('');
        console.log(num9);
      }
    }

  };

  var nums = { "num1": num1, "num2": num2,"num3": num3 ,'num4': num4, 'num5' : num5, 'num6' : num6, 'num7' : num7, 'num8' : num8, 'num9' : num9,
  "num10": num10, "num11": num11, "num12": num12, "num13": num13, "num14": num14, "num15": num15, "num16": num16};
  //react function components must start with capitalized letters
  var HandleSubmit = function (event) {
    event.preventDefault();
    alert('form submitted');
    const arrs = new Array(num10, num11, num12,num13,num14,num15);
    console.log(arrs);
    console.log(nums);
    
    let theSum = 0;
    for(let x = 0 ; x < arrs.length; x++)
    {
      if(arrs[x] !== '')
      {
        theSum += parseInt(arrs[x]);
      }
    }
    console.log(theSum);
    //
    if((num2 === '') || (num1 === ''))
    {
      alert('exercise field has cannot be left blank');
      sum.sum  = undefined;
      return;
    }
    if(num16 === 'Yes')
    {
      if((num4 === "" && num10 !== "") || (num4 !== "" && num10 === "") )
      {
        alert('you put a value for a field you have not included,nothing has run');
        sum.sum  = undefined;
        return;

      }
      else if((num5 === "" && num11 !== "") || (num5 === "" && num11 !== ""))
      {
        alert('you put a value for a field you have not included,nothing has run');
        sum.sum  = undefined;
        return;

      }
      else if((num6 === "" && num12 !== "") || (num6 === "" && num12 !== ""))
      {
        alert('you put a value for a field you have not included,nothing has run');
        sum.sum  = undefined;
        return;

      }
      else if((num7 === "" && num13 !== "") || (num7 === "" && num13 !== ""))
      {
        alert('you put a value for a field you have not included,nothing has run');
        sum.sum  = undefined;
        return;

      }
      else if((num8 === "" && num14 !== "") || (num8 === "" && num14 !== ""))
      {
        alert('you put a value for a field you have not included,nothing has run');
        sum.sum  = undefined;
        return;

      }
      else if((num9 === "" && num15 !== "") || (num9 === "" && num15 !== ""))
      {
        alert('you put a value for a field you have not included,nothing has run');
        sum.sum  = undefined;
        return;

      }
      else if(theSum !== 100 )
      {
        alert('the weights do not add up to 100, nothing has run');
        sum.sum  = undefined;
        return;
      }
    }
    /*
    else{
      setNum10('');
      setNum11('');
      setNum12('');
      setNum13('');
      setNum14('');
      setNum15('');
    }*/
    console.log('passed tests');
    //console.log(nums);
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
        <br/>
        <label>
          Pick your preference:
          <select onChange={e => setNum3(e.target.value)}>
            <option value="Target Area">Target Area</option>
            <option value="Target Muscle">Target Muscle</option>
            <option value="Exercise Category">Exercise Category</option>
            <option value="Difficulty">Difficulty</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Choose wether or not to use inputted weights:<br/>
          If no,all categories will be weighted the same<br />
          If yes, will use inputtsed weights, must add up to 100<br />
          <select onChange={e => setNum16(e.target.value)}>
            <option value="No">No, do not use inputted weights</option>
            <option value="Yes">Yes, use inputted weights</option>
          </select>
        </label>
        <br/>
        <br/>
        <label>
          Pick your preference:
          <br />
          <label >Target Area</label><input type="checkbox" value="Target Area"  onChange={e => handleCheckOne(e.target.value)}/>

          <label style={{ paddingLeft: '15px' }} > Weight:</label><input type="number" min = '0'  max = '100' step = '1' onChange={e => setNum10(e.target.value)} /><br />
           
          <label>Target Muscle </label><input type="checkbox" value="Target Muscle" onChange={e => handleCheckOne(e.target.value)}/>
          <label style={{ paddingLeft: '15px' }} > Weight:</label><input type="number" min = '0'  max = '100' step = '1' onChange={e => setNum11(e.target.value)}/><br />

          <label>Exercise Category</label><input type="checkbox" value="Exercise Category" onChange={e => handleCheckOne(e.target.value)}/>
          <label style={{ paddingLeft: '15px' }} > Weight:</label><input type="number" min = '0'  max = '100' step = '1' onChange={e => setNum12(e.target.value)} /><br />

          <label>Push,Pull,Strech, or Aerobic  </label> <input type="checkbox" value="Push Pull Stretch Aerobic" onChange={e => handleCheckOne(e.target.value)}/>
          <label style={{ paddingLeft: '15px' }} > Weight:</label><input type="number" min = '0'  max = '100' step = '1' onChange={e => setNum13(e.target.value)}/><br />

          <label>Difficulty</label><input type="checkbox" value="Difficulty" onChange={e => handleCheckOne(e.target.value)}/>
          <label style={{ paddingLeft: '15px' }} > Weight:</label><input type="number" min = '0'  max = '100' step = '1' onChange={e => setNum14(e.target.value)}/><br />

          <label>Location </label><input type="checkbox" value="Location" onChange={e => handleCheckOne(e.target.value)}/>
          <label style={{ paddingLeft: '15px' }} > Weight:</label><input type="number" min = '0'  max = '100' step = '1' onChange={e => setNum15(e.target.value)}/><br />

        </label> 

        <br />
        <input type="submit" value="Submit"></input>
      </form>
      
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