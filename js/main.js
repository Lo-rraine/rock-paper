/*Declare the DOM elements. iow gets the html elements into the JS file
so that we can access the html element as a variable
*/
const restart = document.getElementById('restart');
const score = document.getElementById('score');
const choices = document.querySelectorAll('.choices');
const result = document.getElementById('result');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0
}

//Main function

function play(e) {
    //Get the choice of the player by ID and store it into a new variable
    const playerChoice = e.target.id;

    //once the play function is executed we want the restart button to appear
    restart.style.display = "inline-block";

    //get the choice of the computer
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    //console.log(playerChoice, computerChoice, winner);
    showWinner(winner, computerChoice, playerChoice);
}


function getComputerChoice() {
    //This will generate a random decimal number
    const num = Math.random();
    //and assign the number a choice
    if (num < 0.34) {
        return 'rock';
    } else if (num <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

/**Take choice parameter and based on selection will
 *  output the winner */
function getWinner(p, c) {
    if (p === c) {
        return 'draw';
    }
    else if (p === 'rock') {
        if (c === 'paper') {
            return 'computer';
        }
        else {
            return 'player';
        }
    }
    else if (p === 'paper') {
        if (c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    }
    else if (p === 'scissors') {
        if (c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
    
}

function showWinner(winner, computerChoice, playerChoice) {
    if (winner === 'player') {
        //this will increment if the player wins
        scoreboard.player++;

        //output the modal result and put in info
        result.innerHTML = `
        <h1 class="text-win">You Win!</h1>
        <p>You chose ${playerChoice}</p>
        <p>Lorraine chose ${computerChoice}</i>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        `;
    } else if (winner === 'computer') {
        //this will increment if the computer wins
        scoreboard.computer++;

        //output the modal result and put in info
        result.innerHTML = `
        <h1 class="text-lose">You Lose!</h1>
        <p>You chose ${playerChoice}</p>
        <p>Lorraine chose ${computerChoice}</i>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        `;
    } else {
        result.innerHTML = `
        <h1>It's A Draw</h1>
        <p>You chose ${playerChoice}</p>
        <p>Lorraine chose ${computerChoice}</i>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        `;
    }

    score.innerHTML = `
<p>You: ${scoreboard.player}</p>
<p>Lorraine: ${scoreboard.computer} </p>
`;
    
    modal.style.display = 'block';
}

function clearModal(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}

function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>You: 0</p>
    <p>Lorraine: 0</p>
    `;
}


/**Event Listener
 * For each of the nodes in the list, the event listener will wait for a click
 * When something is clicked it will call the play function.
 * in the play function the item that is clicked will be stored in a new
 * variable witha value of the item ID
 */
choices.forEach(choice => choice.addEventListener('click', play));
//To close the modal
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame)