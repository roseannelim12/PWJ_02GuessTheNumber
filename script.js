let randomNumber;
let guesses = [];
let guessCtr = 0;
let resultFlg = false;

window.onload = () => {
    generateRandomNumber();
}

restartGame = () => {
    generateRandomNumber();
    document.querySelector('.input-number').value = "";
    document.querySelector('.input-number').disabled = false;
    document.querySelector('.input-number').autofocus = true;
    document.querySelector('.result-wrong').innerHTML = "";
    document.querySelector('.result-correct').innerHTML = "";
    document.querySelector('.history').innerHTML = "";
    document.getElementById('submit-button').disabled = false;
    document.querySelector('.result-correct').style.backgroundColor = "";
    document.querySelector('.result-correct').style.padding = "";
    document.querySelector('.history').style.backgroundColor = "";

    guesses = [];
    guessCtr = 0;
    resultFlg = false;
}

generateRandomNumber = () => {
    randomNumber = Math.floor((Math.random() * 100) + 1);
    console.log(randomNumber);
}

document.querySelector('.input-number').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getUserNumber();
    }
});

getUserNumber = () => {
    guessCtr++;
    let userNumber = document.querySelector('.input-number').value;

    if(userNumber != "") {
        document.querySelector('.input-number').value = "";
        compareValues(userNumber, randomNumber);
        saveGuessHistory(userNumber);
        console.log(guessCtr);
    }

}

compareValues = (userNum, randomNum) => {
    let resultText;
    let comparison;

    if(userNum > randomNum) {
        // resultText = "Your guess, " + userNum + ", is too high!";
        comparison = "high";
    } else if(userNum < randomNum) {
        // resultText = "Your guess, " + userNum + ", is too low!";
        comparison = "low"; 
    } else if(userNum == randomNum) {
        // resultText = "Awesome! You got it!";
        resultFlg = true;
        comparison = "equal";
    }   

    resultText = guessCounter(userNum, resultFlg, comparison);
    displayResults(resultText, resultFlg);
}

guessCounter = (userNum, resultFlg, comparison) => {
    if(resultFlg) {
        // if guessed correctly in less than 7 times
        document.getElementById('submit-button').disabled = true;
        document.querySelector('.input-number').disabled = true;
        if(guessCtr == 1) {
            return "Awesome! You guessed the number in " + guessCtr + " try!";
        } else {
            return "Awesome! You guessed the number in " + guessCtr + " tries!";
        }
    } else {
        // if user has not yet guessed correctly
        if(guessCtr == 7) {
            // and if it reached 7 tries
            document.getElementById('submit-button').disabled = true;
            document.querySelector('.input-number').disabled = true;
            return "You ran out of turns. Try again!";
        } else if(comparison == "high"){
            // if guess is wrong and guess is high
            return "Your guess, " + userNum + ", is too high!";
        } else if(comparison == "low") {
            //if guess is wrong and guess is low
            return "Your guess, " + userNum + ", is too low!";
        }
    }
}

displayResults = (resultText, resultFlg) => {
    if(resultFlg) {
        document.querySelector('.result-wrong').innerHTML = "";
        document.querySelector('.result-wrong').style.backgroundColor = "";
        document.querySelector('.result-wrong').style.padding = "";
        document.querySelector('.result-correct').innerHTML = resultText;
        document.querySelector('.result-correct').style.backgroundColor = "#79b889";
        document.querySelector('.result-correct').style.padding = "12px";
    } else {
        document.querySelector('.result-correct').innerHTML = "";
        document.querySelector('.result-correct').style.backgroundColor = "";
        document.querySelector('.result-correct').style.padding = "";
        document.querySelector('.result-wrong').innerHTML = resultText;
        document.querySelector('.result-wrong').style.backgroundColor = "#ffcdd9";
        document.querySelector('.result-wrong').style.padding = "12px";
    }
}

saveGuessHistory = (userNum) => {
    guesses.unshift(userNum);
    console.log(guesses);

    displayGuessHistory(guesses)
}

displayGuessHistory = (guesses) => {
    // <div class="guess-history" style="background-color: azure; opacity: 0.8; border-radius: 8px; padding:6px"></div>
    let guessHtml = ``;
    for(let i=0; i < guesses.length; i++) {
        guessHtml += `
            <div class="guess-history">
                You guessed ${guesses[i]}
            </div>
        `;
    }
    document.querySelector('.history').innerHTML = guessHtml;
    document.querySelector('.history').style.backgroundColor = "azure";
    document.querySelector('.history').style.opacity = "0.8";
    document.querySelector('.history').style.padding = "12px 84px";
    document.querySelector('.history').style.borderRadius = "15px";
}

