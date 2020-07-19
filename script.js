const options = ["even", "nyar", "misp"];

///// Local DB stuff to aggregate results /////

initResultsLocalDb = () => {
  localStorage.setItem('EvenShookWon', 0);
  localStorage.setItem('EvenShookLost', 0);
  localStorage.setItem('EvenShookEven', 0);
};

addResultToLocalDb = (result) => {
  let dbCurrVal = localStorage.getItem(`EvenShook${result}`);
  localStorage.setItem(`EvenShook${result}`, ++dbCurrVal);
};


///// UI Stuff /////

updateChart = () => {
  let dbWon = parseInt(localStorage.getItem('EvenShookWon'));
  let dbLost = parseInt(localStorage.getItem('EvenShookLost'));
  let dbTotal = dbWon + dbLost || 1;
  let winPercentage = dbWon / dbTotal * 100;
  document.getElementById('chart').style.background="radial-gradient(circle closest-side, transparent 66%, white 0), conic-gradient(#4e79a7 0 "+ winPercentage +"%, #f28e2c 0 100%)";
}

handleResult = (result) => {
  const resultHTML = document.getElementById("result"); 
  if (result === 0) {
    addResultToLocalDb("Even");
    resultHTML.innerHTML = "No one wins, play again";
  }
  else if (result < 0) {
    addResultToLocalDb("Lost");
    resultHTML.innerHTML = "You lose... try again!";
    updateChart();
  }
  else {
    addResultToLocalDb("Won");
    resultHTML.innerHTML = "You Win! Do it again!";
    updateChart();
  }
}

handleSystem = (systemChoise) => {
  document.getElementById("system").innerHTML = `Computer chose ${systemChoise}`;
}


///// Other logical utils /////

compareEvenShook = (player1, player2) => {
  //TODO validate(player1);
  //TODO validate(player2);

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
  return options[Math.floor(Math.random() * 3)];
}

handleChoosingAction = (e) => {
  const { id } = e.target;
  const system = randomForSystem();
  handleSystem(system);
  handleResult(compareEvenShook(id, system));
}
  
addListeners = () => {
  options.forEach((id) => {
    document.getElementById(id).addEventListener("click", handleChoosingAction);
  });
};


///// Init /////

document.addEventListener("DOMContentLoaded", addListeners);
initResultsLocalDb();
