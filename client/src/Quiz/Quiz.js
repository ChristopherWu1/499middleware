const Quiz = (props) => {

    let { questions } = props;
    const {handleClick} = props;

    let QuizView = () => {
      return questions.map((item) => {
          return(
            <div key={item.id} className = "card" onClick={() => handleClick(item.description)}>
                <img src= {item.img}/>
                <p>{item.description}</p> 
            </div>
          )
      })
    }

    return (
      <div className = "container" >
        {QuizView()}
      </div>
    );
  }
  
  export default Quiz;