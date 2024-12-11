const emojis = ['🎄', '🎁', '🎅', '☃️','🎄', '🎁', '🎅', '☃️']; // Your set of emojis


/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */

/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair 
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */
  

//State
let clickedCardCount = 0

setupGame()
function setupGame() {
  const cardsArray = randomize(emojis)
  console.log('cardsArray: ', cardsArray)
  setupBoard(cardsArray)
}

function randomize(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1))
    const tmp = array[j]
    array[j] = array[i]
    array[i] = tmp
  }
  return array
}

function setupBoard(cards) {
  const cardsHTML = cards.map((card) => {
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.dataset.value = card
    newCard.textContent = '?'
    return newCard
  })
  const gameContainer = document.getElementById('game-board')
  cardsHTML.forEach(card => {
    card.addEventListener('click', revealCard)
    gameContainer.appendChild(card)
  })

}

function revealCard(e) {
  console.log('clickedCardCount: ', clickedCardCount)
  const clickedCard = e.target
  if(clickedCardCount===0) {
    clickedCardCount++
    clickedCard.classList.add('revealed')
    clickedCard.textContent = clickedCard.dataset.value
  } else if(clickedCardCount===1) {
    console.log('check for match')
    clickedCardCount++
    clickedCard.classList.add('revealed')
    clickedCard.textContent = clickedCard.dataset.value
    checkForMatch()
  }
}

function checkForMatch() {
  const clickedCards = document.getElementsByClassName('revealed')
  console.log('clickedCards: ', clickedCards)
  //There should always be 2 cards clicked when we get here
  if(clickedCards[0].textContent===clickedCards[1].textContent) {
    //Win
    //Fix up the classes
    const cardsArray = Array.from(clickedCards)
    cardsArray.forEach(card => {
      card.classList.add('found')
      card.classList.remove('revealed')
      clickedCardCount = 0
    })
  } else {
    setTimeout(() => {
      console.log(clickedCards)
      resetCards(clickedCards)
      clickedCardCount = 0
    }, 3000);
  }
}

function resetCards(cardList) {
  const cardsArray = Array.from(cardList)
  cardsArray.forEach(card => {
    card.classList.remove('revealed')
    card.textContent = '?'
  });
}