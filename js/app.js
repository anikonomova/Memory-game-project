let card = document.querySelectorAll('.card');
let cardList = Array.from(card);

const restart = document.querySelector('.restart');
const deck = document.querySelector('.deck');
let openedCards = [];
let matchedCards = [];

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

function startGame() {

 cards = shuffle(cardList);

   for (let card of cards){
     deck.appendChild(card);
};
display (evt);
addToOpenedCards (evt);
}

function display (evt) {
  let target = evt.target;
 target.classList.toggle('open');
 target.classList.toggle('show');
}

function addToOpenedCards (evt) {
   openedCards.push(target);
   let length = openedCards.length;
   if (length === 2) {
   matching ();
};
}

function matching() {
  if (openedCards[0].className === openedCards[1].className){
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards[0].classList.toggle('match');
    openedCards[1].classList.toggle('match');
    openedCards = [];
  };
  removeOpened();
}

function removeOpened() {
  openedCards[0].classList.remove('open', 'show');
  openedCards[1].classList.remove('open', 'show');
  openedCards = [];
  openedCards.length=0;
};
