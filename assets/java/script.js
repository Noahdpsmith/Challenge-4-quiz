const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
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
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
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