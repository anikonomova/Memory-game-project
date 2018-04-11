let card = document.querySelectorAll('.card');
let cardList = Array.from(card);

const restart = document.querySelector('.restart');
const deck = document.querySelector('.deck');
let openedCards = [];
let matchedCards = [];

let moves = 0;
let movesCounter = document.querySelector('.moves');

let scorePanel = document.querySelector('.stars');
let stars = scorePanel.querySelectorAll('li');
let starList = Array.from('stars');


let timer = document.getElementById('timer');
let min = 0;
let sec = 0;
let interval;

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }

   return array;
}
window.onload = start();

function start() {

 cards = shuffle(cardList);
 // reset moves
 moves = 0;
 movesCounter.innerHTML = moves;

  startTimer();

//creating the list
   for (let i = 0; i< cards.length; i++) {
     cards[i].classList.remove('open', 'show', 'match');
     deck.appendChild(cards[i]);
}
};
// adding the event listener
deck.addEventListener('click', function (evt) {

  if (evt.target.className === "card" && openedCards.length < 2) {
    display(evt);
    addToOpenedCards(evt);
  }  else {
    evt.stopPropagation();
  };
});

function display (evt) {
 evt.target.classList.toggle('open');
 evt.target.classList.toggle('show');
}

function addToOpenedCards (evt) {
   openedCards.push(evt.target);
    if (openedCards.length == 2) {
     moves++;
     movesCounter.innerHTML = moves;
//call the stars function
     hideStars ();
     if (openedCards[0].innerHTML === openedCards[1].innerHTML){
   matching ();
} else {
  unmatching();
};
};
}

function matching() {
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards[0].classList.toggle('match');
    openedCards[1].classList.toggle('match');
    openedCards = [];
matchedCards.push(openedCards);
  removeOpened();
}

function removeOpened() {
  openedCards = [];
  openedCards.length=0;
};

function unmatching () {
  setTimeout (function () {
  openedCards[0].classList.remove('open', 'show');
  openedCards[1].classList.remove('open', 'show');
  openedCards = [];
  removeOpened();
}, 1000);
}

function hideStars () {
  for (star of stars) {
  if (moves > 10 && moves < 18 ) {
    scorePanel.children[2].classList.add('hide');
  }  if (moves >= 18 && moves <= 22) {
    scorePanel.children[1].classList.add('hide');
  } else if (moves > 22) {
    scorePanel.children[0].classList.add('hide');
  };
};
};

// creating the timer
function startTimer() {
  let interval = setInterval (function () {
    sec++;
     if (sec < 10) {
       sec = '0' + sec;
     };
     if (sec === 60) {
       min++;
       sec = 0;
};
timer.innerHTML = min + ':' + sec;
}, 1000);
};

function stopTimer () {
  clearInterval(interval);
};
