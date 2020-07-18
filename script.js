initResultsLocalDb = () => {
  localStorage.setItem('EvenShookWon', 0);
  localStorage.setItem('EvenShookLost', 0);
  localStorage.setItem('EvenShookEven', 0);
};

addResultToLocalDb = (result) => {
  let dbCurrVal = localStorage.getItem(`EvenShook${result}`);
  localStorage.setItem(`EvenShook${result}`, ++dbCurrVal);
};

updateChart = () => {
  let dbWon = parseInt(localStorage.getItem('EvenShookWon'));
  let dbLost = parseInt(localStorage.getItem('EvenShookLost'));
  let dbTotal = dbWon + dbLost || 1;
  let winPercentage = dbWon / dbTotal * 100;
  console.log(winPercentage);
  document.getElementById('chart').style.background="radial-gradient(circle closest-side, transparent 66%, white 0), conic-gradient(#4e79a7 0 "+ winPercentage +"%, #f28e2c 0 100%)";
}

doResult = (result) => {
  if (result === 0) {
    addResultToLocalDb("Even");
    alert("No one wins, play again");
  }
  else if (result < 0) {
    addResultToLocalDb("Lost");
    alert("You lose...");
    updateChart();
  }
  else {
    addResultToLocalDb("Won");
    alert("You Win!");
    updateChart();
  }
}

compareEvenShook = (player1, player2) => {
  //validate(player1);
  //validate(player2);

  if (player1 === player2) {
    return 0;
  }
  else {
    if (((player1 === "even") && (player2 === "nyar")) ||
        ((player1 === "nyar") && (player2 === "misp")) ||
        ((player1 === "misp") && (player2 === "even"))
     ) {
      return -1;
    }
    if (((player1 === "even") && (player2 === "misp")) ||
        ((player1 === "nyar") && (player2 === "even")) ||
        ((player1 === "misp") && (player2 === "nyar"))
     ) {
      return 1;
    }
  }
}

randomForSystem = () => {
  const options = ["even", "nyar", "misp"];
  return options[Math.floor(Math.random() * 3)];
}

showChoise = (id, entity) => {
  // TODO
  alert(entity + " chose " + id);
}

handleChoosingAction = (e) => {
  const { id } = e.target;
  const system = randomForSystem();
  showChoise(id, "you");
  showChoise(system, "system");
  doResult(compareEvenShook(id, system));
}
  
addListeners = () => {
  console.log("running");
  ["even", "nyar", "misp"].forEach((id) => {
    document.getElementById(id).addEventListener("click", handleChoosingAction);
  });
};

document.addEventListener("DOMContentLoaded", addListeners);
initResultsLocalDb();
