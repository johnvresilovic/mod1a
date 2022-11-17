let newPlayerHealth = document.getElementById("player-stats");

let newOpponentName = document.getElementById("opponent-name");

let newOpponentHealth = document.getElementById("opponent-stats");

let messageBoard = document.getElementById("message-board");

let quitCounter = 0;

let combatants = [];

let opponentCounter = 1;

const attackButton = document.getElementById("attack");

const quitButton = document.getElementById("quit");

const restartButton = document.getElementById("restart");

setTimeout(() => {
  messageBoard.style.cursor = "pointer";
  messageBoard.innerHTML = "Click to Begin";
}, 2000);

messageBoard.addEventListener("click", (e) => {
  messageBoard.style.fontSize = "20px";
  messageBoard.innerHTML =
    "To win this fighting game you must defeat three opponents in turn.  Each fight is composed of attacks and counterattacks which reduce the fighters' health levels.  A fight ends when one fighter's health falls below 1.  Click Attack to begin.";
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Hero {
  constructor(health, power) {
    this.health = health;
    this.power = power;
  }
}

const playerOne = new Hero(100, randomNumber(40, 90));

class Opponent {
  constructor(health, power) {
    this.health = health;
    this.power = power;
  }
}

const makeOpponent = () => {
  let healthValue = 100;
  let powerValue = randomNumber(10, 60);
  newOpponent = new Opponent(healthValue, powerValue);
};

for (let i = 1; i < 4 + 1; i++) {
  makeOpponent();
  combatants.push(newOpponent);
}

let currentOpponent = combatants[0];

attackButton.addEventListener("click", (e) => {
  if (quitCounter == 0) {
    attack(playerOne, currentOpponent);
  } else {
    messageBoard.innerHTML = "Press Restart to play again.";
  }
});

quitButton.addEventListener("click", (e) => {
  messageBoard.innerHTML = "Thanks for playing!";
  quitCounter = 1;
  attackButton.style.color = "gray";
  attackButton.style.cursor = "not-allowed";
});

restartButton.addEventListener("click", (e) => {
  window.location.reload();
});

function attack(you, opponent) {
  if (you.power >= opponent.power) {
    let healthLoss = randomNumber(30, 40);
    opponent.health -= healthLoss;
    newOpponentHealth.innerHTML = "Health: " + opponent.health;
    if (opponent.health < 1) {
      newOpponentHealth.innerHTML = "Health: XXX";
      messageBoard.innerHTML =
        "Nice job!  Opponent " + opponentCounter + " has been defeated!";
      opponentCounter += 1;
      if (opponentCounter < 4) {
        setTimeout(() => {
          currentOpponent = combatants[opponentCounter];
          messageBoard.innerHTML =
            "Opponent " +
            opponentCounter +
            " awaits you.  Click Attack to begin.";
          newOpponentName.innerHTML = "Opponent " + opponentCounter;
          newOpponentHealth.innerHTML = "Health: 100";
        }, 2000);
      } else {
        setTimeout(() => {
          messageBoard.innerHTML = "You've beaten the final opponent!";
        }, 2000);
        quitCounter = 1;
        setTimeout(() => {
          messageBoard.style.fontSize = "48px";
          messageBoard.innerHTML = "YOU WIN";
          newOpponentHealth.innerHTML = "Health: XXX";
          attackButton.style.color = "gray";
          attackButton.style.cursor = "not-allowed";
        }, 2000);
      }
    } else {
      messageBoard.innerHTML =
          "You caused serious damage.  Opponent " +
          opponentCounter +
          "'s health is down to " +
          opponent.health +
          ".  Now brace yourself for a counterattack!";
        counterattack(opponent, you);
    }
  } else {
    let healthLoss = randomNumber(10, 20);
    opponent.health -= healthLoss;
    newOpponentHealth.innerHTML = "Health: " + opponent.health;
    if (opponent.health < 1) {
      newOpponentHealth.innerHTML = "Health: XXX";
      messageBoard.innerHTML =
        "Nice job!  Opponent " + opponentCounter + " has been defeated!";
      opponentCounter += 1;
      if (opponentCounter < 4) {
        currentOpponent = combatants[opponentCounter];
        setTimeout(() => {
          messageBoard.innerHTML =
            "Opponent " +
            opponentCounter +
            " awaits you.  Click Attack to begin.";
        }, 2000);
        newOpponentName.innerHTML = "Opponent " + opponentCounter;
        newOpponentHealth.innerHTML = "Health: 100";
      } else {
        setTimeout(() => {
          newOpponentHealth.innerHTML = "Health: XXX";
          messageBoard.innerHTML = "You've beaten the final opponent!";
        }, 2000);
        setTimeout(() => {
          messageBoard.style.fontSize = "48px";
          messageBoard.innerHTML = "YOU WIN";
        }, 2000);
        quitCounter = 1;
        newOpponentHealth.innerHTML = "Health: XXX";
        attackButton.style.color = "gray";
        attackButton.style.cursor = "not-allowed";
      }
    } else {
      messageBoard.innerHTML =
          "You caused minor damage.  Opponent " +
          opponentCounter +
          "'s health is down to " +
          opponent.health +
          ".  Now brace yourself for a counterattack!";
        counterattack(opponent, you);
    }
  }
}

function counterattack(opponent, you) {
  if (opponent.power > you.power) {
    let healthLoss = randomNumber(30, 40);
    you.health -= healthLoss;
    newPlayerHealth.innerHTML = "Health: " + you.health;
    if (you.health < 1) {
      newPlayerHealth.innerHTML = "Health: XXX";
      setTimeout(() => {
        messageBoard.innerHTML =
        "Aargh!  You have been defeated.  Click Restart to play again.";
      }, 2000);
      attackButton.style.color = "gray";
      attackButton.style.cursor = "not-allowed";
    } else {
      setTimeout(() => {
        messageBoard.innerHTML =
          "You took serious damage.  Your health is down to " +
          you.health +
          ".  Launch your next attack!";
      }, 3000);
    }
  } else {
    let healthLoss = randomNumber(10, 20);
    you.health -= healthLoss;
    newPlayerHealth.innerHTML = "Health: " + you.health;
    if (you.health < 1) {
      newPlayerHealth.innerHTML = "Health: XXX";
      setTimeout(() => {
        messageBoard.innerHTML =
        "Aargh!  You have been defeated.  Click Restart to play again.";
      }, 2000);
      attackButton.style.color = "gray";
      attackButton.style.cursor = "not-allowed";
    } else {
      setTimeout(() => {
        messageBoard.innerHTML =
          "You took minor damage.  Your health is down to " +
          you.health +
          ".  Launch your next attack!";
      }, 3000);
    }
  }
}
/* The only things I don't like about this version's attack-counterattack mechanism are:
1. The stats are updated before the message board.
2. If your health is low and you attack, if your attack doesn't defeat the opponent and their counterattack defeats you, the message board only shows the 'Aargh' message.  Ideally you'd see the result of your attack first and then get the 'Aargh' message. */