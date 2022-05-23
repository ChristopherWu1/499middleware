import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import react, {useState, useEffect} from "react"
import axios from "axios";
import './Quiz.css'
const Quiz = (props) => {
    let [questions, setQuestions] = useState([]);
    let [counter, setCounter] = useState(2);
    let [answers, setAnswers] = useState([]);
    let [serverData, setServer] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        let data = await axios.get("http://localhost:5000/questions/question1");
        setQuestions(data.data);
      }
  
      fetchData()
        .catch(console.error);;
    }, [])

    function handleClick(e) {
      let ans = [];
      ans = answers;
      ans.push(e);
      setAnswers(ans);
  
      if(counter < 4)
      {
        let questionsUpdate = async () => {
          let data = await axios.get(`http://localhost:5000/questions/question${counter}`);
          setCounter(counter + 1)
          setQuestions(data.data);
        }
        questionsUpdate();
      }
      else
      {
        
        let filter = async () => {
          var request = { "exercise_category":answers[0] , "difficulty": answers[1], "location": answers[2], "id":props.id};
          await axios.put('http://localhost:3001/users', answers);
        }
  
        filter();
        setTimeout(() => {navigate("/profile"); }, 2000);
      }
  
    }

    let QuizView = () => {
      return questions.map((item) => {
          return(
            <div key={item.id} className = "question_card" onClick={() => handleClick(item.description)}>
                <img src= {item.img}/>
                <p>{item.description}</p> 
            </div>
          )
      })
    }

    return (
      <div className = "question_container" >
        {QuizView()}
      </div>
    );
  }
  
  export default Quiz;