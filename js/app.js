let card = document.querySelectorAll('.card');
let cardList = Array.from(card);

const restart = document.querySelector('.restart');
restart.addEventListener('click', start);
const deck = document.querySelector('.deck');
let openedCards = [];
let matchedCards = [];

let moves = 0;
let movesCounter = document.querySelector('.moves');

let scorePanel = document.querySelector('.stars');
let stars = scorePanel.querySelectorAll('li');

let timer = document.getElementById('timer');
let min = 0;
let sec = 0;
let time;

let modal = document.getElementById('modal');
const close = document.querySelector(".close");
const replayGame = document.querySelector('.replayButton');
let endTime;
let endStars;

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

 let cards = shuffle(cardList);
 // reset moves
 moves = 0;
 movesCounter.innerHTML = moves;

//show back the stars
for (let star of stars) {
  star.classList.remove('hide');
}
//creating the list
   for (let i = 0; i< cards.length; i++) {
     cards[i].classList.remove('open', 'show', 'match');
     deck.appendChild(cards[i]);
}
//clear the timer
stopTimer();
sec = 0;
min = 0;
timer.innerHTML = "00:00"

matchedCards.length=0;
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

//start the timer
     if (moves === 1){
       startTimer();
     };

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
    endGame();
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
}, 1200);
}

//Hiding the stars
function hideStars () {
  for (let star of stars) {
  if (moves > 10 && moves < 18 ) {
    scorePanel.children[2].classList.add('hide');
  }  if (moves >= 18 && moves <= 22) {
    scorePanel.children[1].classList.add('hide');
  } else if (moves > 22) {
    scorePanel.children[0].classList.add('hide');
  };
};
};

// creating the timer - the idea for sec and min came from https://www.youtube.com/watch?v=KK7EH8h97jU
function startTimer() {
    time = setInterval (function () {
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
  timer.innerHTML = "00:00";
  clearInterval(time);
  min=0;
  sec=0;
};

//showing the modal
function endGame() {
  if (matchedCards.length == 8) {
    changeSalut ();
    endTime = timer.innerHTML;

    stopTimer();
    timer.innerHTML = "00:00"

    modal.style.display = 'block';

    endStars = document.querySelector(".stars").innerHTML;

        document.querySelector('.endStars').innerHTML = endStars;
        document.querySelector('.endTime').innerHTML = endTime;
        document.querySelector('.allMoves').innerHTML = moves;
replay();
closeModal();
};
};

//Changing the text in the modal depending on moves number
function changeSalut () {
  if (moves < 14) {
  document.querySelector('h2').innerHTML = 'Excellent! Amazing memory!';
  } if (moves >= 14 && moves < 24) {
    document.querySelector('h2').innerHTML = 'Good job! You did it!';
  } if  (moves >=24) {
    document.querySelector('h2').innerHTML = 'You can do better!';
  };
};

//closing the modal on 'X'
function closeModal(e){
    close.addEventListener("click", function(){
        modal.style.display = "none";
    });
};

//replaying at Try again?
function replay(e){
replayGame.addEventListener("click", function(){
    modal.style.display = "none";
    start();
  });

};
