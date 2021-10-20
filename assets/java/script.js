const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreButton = document.getElementById('score-btn')
const saveScoreBtn =document.getElementById('saveScoreBtn')
const end =document.getElementById('end')
const answerBox =document.getElementById('answerBox')
const mostRecentScore =localStorage.getItem('mostRecentScore')
const mostRecentScoreName =localStorage.getItem('mostRecentScoreName')
const username=document.getElementById('username')
const finalScore =document.getElementById('finalScore')
const scoreText =document.getElementById('score')
let shuffledQuestions, currentQuestionIndex
var count = 20;
var score = 30;
startButton.addEventListener('click', startGame)
scoreButton.addEventListener('click', showScoreBoard)
saveScoreBtn.addEventListener('click', saveScore)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  })
  
  function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    
    
    var interval = setInterval(function(){
        document.getElementById('count').innerHTML = count;
        count--;
        if (count < 0){
            clearInterval(interval);
            document.getElementById('count').innerHTML='';
        // or...
            alert("You're out of time!");
            showScoreBoard();
        }
    }, 1000);
  }
  
  function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })

  }
  
  function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if(!correct){
        count = count-5
    }
    else{
        score = score+5
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      scoreButton.innerText = 'score'
      scoreButton.classList.remove('hide')

    }
  }
  function showScoreBoard(){
    answerBox.classList=('hide')
    end.classList.remove('hide')
   
    finalScore.innerText = "Previous High Score: " + mostRecentScore + " " + mostRecentScoreName;
    scoreText.innerHTML= score
    if (score > mostRecentScore){
        scoreText.innerHTML= "High Score! " + score
    }
}
    function saveScore(){
        if (score > mostRecentScore){
            localStorage.setItem("mostRecentScore", score);
            localStorage.setItem("mostRecentScoreName", username.value);
        }
    }



  
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
        
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }
  saveHighscore = (e) => {
      e.preventDefault();

  }
  
  const questions = [
    {
      question: 'What is my favorite color?',
      answers: [
        { text: 'burgandy', correct: true },
        { text: 'tickle me pink', correct: false },
        { text: 'chartreuse', correct: false },
        { text: 'indigo', correct: false }
      ]
    },
    {
      question: 'how tall am i?',
      answers: [
        { text: '6 foot 6', correct: true },
        { text: '5 foot 11.5', correct: false },
        { text: 'short', correct: false },
        { text: '4 foot 11', correct: false }
      ]
    },
    {
      question: 'Whats my favorite game?',
      answers: [
        { text: 'clash of clans', correct: false },
        { text: 'chess', correct: true },
        { text: 'football', correct: false },
        { text: 'badminton', correct: false }
      ]
    },
    {
      question: 'whats my favorite number?',
      answers: [
        { text: '1', correct: false },
        { text: '47', correct: false },
        { text: '7', correct: false },
        { text: '12', correct: true }
      ]
    }
  ]