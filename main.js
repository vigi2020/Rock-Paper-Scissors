const hands = ["Rock", "Paper", "Scissors"];

const winnerConditions = { Rock: "Scissors", Paper: "Rock", Scissors: "Paper" };

const playUntil = 3;

var players = [
  { id: 1, name: "Arya", score: 0, status: "None", getHand: getHand },
  { id: 2, name: "Sansa", score: 0, status: "None", getHand: getHand },
  { id: 3, name: "Jon", score: 0, status: "None", getHand: getHand },
  { id: 4, name: "Bran", score: 0, status: "None", getHand: getHand },
];

var tournamentsPlayers = [];

window.onload = () => {
  reset();
  document.querySelector("#play").addEventListener("click", letsPlay);
  document.querySelector("#reset").addEventListener("click", reset);
};

function letsPlay() {
  document.getElementById("winnerOfTheGame").innerHTML = "";
  if (tournamentsPlayers.length === 0) {
    playRound(players[0], players[1]);
  } else if (tournamentsPlayers.length === 1) {
    playRound(players[2], players[3]);
  } else if (tournamentsPlayers.length === 2) {
    playRound(tournamentsPlayers[0], tournamentsPlayers[1]);
  }
}

function playRound(player1, player2) {
  document.getElementById("playerStatus" + player1.id).innerHTML = "Playing";
  document.getElementById("playerStatus" + player2.id).innerHTML = "Playing";
  document.getElementById("teams").innerHTML =
    player1.name + " vs " + player2.name;
  var player1Hand = player1.getHand();
  var player2Hand = player2.getHand();

  document.getElementById("player1").innerHTML = player1.name + " selected: ";
  document.getElementById("player2").innerHTML = player2.name + " selected: ";
  document.getElementById("player1Selection").innerHTML = player1Hand;
  document.getElementById("player2Selection").innerHTML = player2Hand;

  var winner = "";

  if (player1Hand === player2Hand) {
    winner = "No one";
  } else if (winnerConditions[player1Hand] === player2Hand) {
    winner = player1.name;
    player1.score++;
  } else {
    winner = player2.name;
    player2.score++;
  }

  document.getElementById("thisRoundWinner").innerHTML = winner;
  document.getElementById("playerScore" + player1.id).innerHTML = player1.score;
  document.getElementById("playerScore" + player2.id).innerHTML = player2.score;

  if (player1.score === playUntil) {
    player1.score = 0;
    tournamentsPlayers.push(player1);
    document.getElementById("playerStatus" + player1.id).innerHTML = "Winner";
    document.getElementById("playerStatus" + player2.id).innerHTML = "Lost";
    document.getElementById("winnerOfTheGame").innerHTML =
      "Winner of this Game is " + player1.name + " !!!";
  } else if (player2.score === playUntil) {
    player2.score = 0;
    tournamentsPlayers.push(player2);
    document.getElementById("playerStatus" + player1.id).innerHTML = "Lost";
    document.getElementById("playerStatus" + player2.id).innerHTML = "Winner";
    document.getElementById("winnerOfTheGame").innerHTML =
      "Winner of this Game is " + player2.name + " !!!";
  }
}

function getHand() {
  return hands[Math.floor(Math.random() * hands.length)];
}

function reset() {
  for (let index = 0; index < players.length; index++) {
    players[index].score = 0;
    players[index].status = "None";
    document.getElementById("playerName" + (index + 1)).innerHTML =
      players[index].name;
    document.getElementById("playerScore" + (index + 1)).innerHTML = 0;
    document.getElementById("playerStatus" + (index + 1)).innerHTML = "None";
  }

  document.getElementById("thisRoundWinner").innerHTML = "None";
  document.getElementById("teams").innerHTML = "";
  document.getElementById("player1").innerHTML = "";
  document.getElementById("player1Selection").innerHTML = "";
  document.getElementById("player2").innerHTML = "";
  document.getElementById("player2Selection").innerHTML = "";
}
