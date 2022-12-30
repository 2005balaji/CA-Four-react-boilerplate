import React from 'react'
import './styles.css'
import { useState , useRef , useEffect } from 'react'
import questions from './questions'


export default function QuestionBox() {

  const [setFinalResult, showFinalResult] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [theme, setTheme] = useState(true)
  const [themeName, setThemeName] = useState("Change Theme ")


  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    }
    else {
      showFinalResult(true)
    }
  }

  const restartGame = () => {
    setScore(0)
    setCurrentQuestion(0)
    showFinalResult(false)
  }




  const focusQuestion = useRef();

  function handleFocus(){
    focusQuestion.current.style.color = "red";
  }

  function handleNoFocus(){
    focusQuestion.current.style.color = "white";
  }

  function backGroundColors(color){
    document.body.style.backgroundColor = color? "#000000":"white";
    return{
    backgroundColor : color? "#000000":"white",
    }
}
const handleToggle = ()=>{
    setTheme(theme?false:true);
}






  return (
    <div style={backGroundColors(theme)} >

        <div className='header' id='header'>
          <div>
          <img src="../../images/logo.svg" alt="logo" />
          </div>
          
          <div> <button className="toggle-button" onClick={handleToggle}  >{themeName}</button></div>


          

          

        </div>



      <br />

      <div className='body'>

      {setFinalResult ?
        (
          <div className='result-box'>
            <h1>Final Result </h1>
            <h2 ref={focusQuestion} > You scored is : {score}/{questions.length} </h2>
            <h3>
              Answers for the questions:-
            </h3>
            <h4>1.user interface framework</h4>
            <h4>2.JavaScript</h4>
            <h4>3.A permanent storage.</h4>
            <h4>4.Pair of current state </h4>
            <button onClick={() => restartGame()}>Restart Game</button>
          </div>
        ) :

        (
          <div className='container'>

            <h1 id='question' ref={focusQuestion}> {questions[currentQuestion].text}</h1>
            <h2>Question {currentQuestion + 1}/{questions.length}</h2>



            <ul>
              {questions[currentQuestion].options.map((Option) => {
                return (
                  <li key={Option.id} onClick={() => optionClicked(Option.isCorrect)}>{Option.text}</li>
                )
              })}
            </ul>



          </div>)

          

      }
      </div>
      <br />

      <div className="nav-btns">
          <div className="highlight-btns" onClick={handleFocus}>Highlight</div>
          <div className="highlight-btns" onClick={handleNoFocus}>Remove Highlight</div>
        </div>



      

    </div>
  )
}


