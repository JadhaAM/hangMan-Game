const hangmanImg = document.querySelector(".hangman-box img");
const keyboradDiv = document.querySelector(".keyborad");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guess-text span");
const gameModal=document.querySelector(".game-modal");
const playAgaiBtn=document.querySelector(".play-again");

let correntWord,correctLetter=[], wrongGuessCounter = 0;
const maxGuesses = 6;


const resetGame=()=>{
    // reseting the all game varibale and ui elements
    correctLetter=[];
    wrongGuessCounter=0;
    keyboradDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    hangmanImg.src = `hangman-${wrongGuessCounter}.svg`;
    wordDisplay.innerHTML = correntWord.split("").map(() => `<li class="letter"></li>`).join("");
    guessesText.innerText = `${wrongGuessCounter}/${maxGuesses}`;
    gameModal.classList.remove("show");
}

// random word and hint select
const getRandoumWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    correntWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver= (isvictory)=>{
    setTimeout(()=>{
        // After 600ms of game comoplelte.. showing modal with  relevent ditails
        
        const modelText=isvictory ? `You  Found the word :` : `The correct word Was :`;
        gameModal.querySelector("img").src= `${isvictory ?'victory':'lost'}.gif`;
        gameModal.querySelector("h4").innerText= `${isvictory ?'Congrats !':'game Over !'}`;
        gameModal.querySelector("p").innerHTML= `${modelText}  <b>${correntWord}</b>`;
        gameModal.classList.add("show");
        
    },300);
}


const initGame = (button, clickedLetter) => {
    // check the clickedlist is exist or not
    if (correntWord.includes(clickedLetter)) {
        [...correntWord].forEach((letter, index) => {
            // correct letter is display
            if (letter === clickedLetter) {
                correctLetter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else {
        wrongGuessCounter++;
        hangmanImg.src = `hangman-${wrongGuessCounter}.svg`;
    }
    // wrong guesses than change the hangman image and update the wrongGuessCounter
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCounter}/${maxGuesses}`;
    //  if match this condition than call the gameover fuction 
    if (wrongGuessCounter === maxGuesses){
            return gameOver(false);
    }  
            if (correctLetter.length === correntWord.length)
            {
               
             return gameOver(true);
            }
                
}
// keyboard code add event listener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i);
    keyboradDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}


getRandoumWord();

playAgaiBtn.addEventListener("click",getRandoumWord);