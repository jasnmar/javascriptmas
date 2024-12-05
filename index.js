/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js. 

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from '/data.js'

// Some useful elements
const guessInput = document.getElementById('guess-input')
const messageContainer = document.getElementsByClassName('message-container')[0]
const emojiCluesContainer = document.getElementsByClassName('emoji-clues-container')[0]
const guess = document.getElementsByName('guess-input')

// State
let cQuestionIndex = -1
let cQuestionData = {}
const qArray = []
let guesses = 3
const qTimeout = 1000

guessInput.addEventListener('submit', (e) => checkAnswer(e))

function checkAnswer(e) {
  e.preventDefault()
  console.log('guess: ', guess[0].value)
  console.log('cQuestionData.title: ', cQuestionData.title)
  const answer = guess[0].value
  if(answer == cQuestionData.title) {
    rightAnswer()
  } else {
    wrongAnswer()
  }
}

function rightAnswer() {
  if(cQuestionIndex < films.length - 1) {
    messageContainer.textContent = "Correct!"
    setTimeout(() => {
      getNextQuestion()
    }, qTimeout);
  } else {
    messageContainer.textContent = "That's all folks!"
  }
}

function getNextQuestion() {
  guesses = 3
  cQuestionIndex++
  cQuestionData = films[qArray[cQuestionIndex]]
  createQuestion()
}

function createQuestion() {
  const emojiList = cQuestionData.emoji.join(' ')
  emojiCluesContainer.textContent = cQuestionData.emoji.join(' ')
  let preText = 'Incorrect! '
  if(guesses===3) {
    preText = ''
  }
  messageContainer.textContent = `${preText}You have ${guesses} more guesses remaining.`
}

function wrongAnswer() {
  guesses--
    if(guesses<1) {
      messageContainer.textContent = `The film was ${cQuestionData.title}!`
      if(cQuestionIndex < films.length - 1) {
        setTimeout(() => {
          getNextQuestion()
        }, qTimeout)
      } else {
        messageContainer.textContent = "That's all folks!"
      }
  } else {
    messageContainer.textContent = `Incorrect! You have ${guesses} more guesses remaining.`
  }
}

questionList()
getNextQuestion()

//Setup Functions
function questionList() {
  console.log('films: ', films)
  //create an array with all of the films by index
  for(let i = 0; i < films.length; i++) {
    qArray.push(i) 
  }
  shuffleArray(qArray)
}

function shuffleArray(array) {
  for (let i = array.length -1 ; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1))
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }
}

