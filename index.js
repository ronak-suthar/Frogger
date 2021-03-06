// DOM Elements
const timeLeftOut = document.querySelector("#time-left");
const result = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause");
const boxes = document.querySelectorAll(".game-board div");
const leftLogs = document.querySelectorAll(".logs-left");
const rightLogs = document.querySelectorAll(".logs-right");
const leftCars = document.querySelectorAll(".cars-left");
const rightCars = document.querySelectorAll(".cars-right");

let currentIndex = 76; //Initial Index of Frog on Board as Starting Position
const width = 9; //Width of the Board
let obstacleMoveInterval = null; //for set time interval to move the cars and logs
let currTime = 20; //inital time left for completing the game
let playTimeInterval=null;//time set interval for reduing the play time
let checkWinLoose = null; //for set time interval to check if frog wins or hits
let gameRunningStatus = false;

function moveFrog(e) {
  console.log('called',currentIndex)
  //handle keyboard event of moving frog
  boxes[currentIndex].classList.remove("frog");

  switch (e.key) {
    case "ArrowUp":
      if (currentIndex - width >= 0) {
        currentIndex -= width;
      }
      break;
    case "ArrowDown":
      if (currentIndex + width < width * width) {
        currentIndex += width;
      }
      break;
    case "ArrowLeft":
      if (currentIndex % width != 0) {
        currentIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (currentIndex % width < width - 1) {
        currentIndex += 1;
      }
      break;
    default:
      break;
  }

  boxes[currentIndex].classList.add("frog");
}

function moveLeft(obstacle) {
  //move the obstacles to left
  let pos = parseInt(obstacle.classList[1][1]);
  let ele = obstacle.classList[1][0];

  if ((ele == "l" && pos == 5) || (ele == "c" && pos == 3)) {
    pos = 1;
  } else {
    pos += 1;
  }

  obstacle.classList.remove(obstacle.classList[1]);

  if (obstacle.classList.contains("frog")) {
    obstacle.classList.remove("frog");
    obstacle.classList.add(ele + pos.toString());
    obstacle.classList.add("frog");
  } else {
    obstacle.classList.add(ele + pos.toString());
  }
}

function moveRight(obstacle) {
  //move the obstacles to right
  let pos = parseInt(obstacle.classList[1][1]);
  let ele = obstacle.classList[1][0];
  pos -= 1;

  if (ele == "l" && pos == 0) {
    pos = 5;
  } else if (ele == "c" && pos == 0) {
    pos = 3;
  }

  obstacle.classList.remove(obstacle.classList[1]);
  if (obstacle.classList.contains("frog")) {
    obstacle.classList.remove("frog");
    obstacle.classList.add(ele + pos.toString());
    obstacle.classList.add("frog");
  } else {
    obstacle.classList.add(ele + pos.toString());
  }
}

function autoMoveObstacles() {
  leftLogs.forEach((logLeft) => moveLeft(logLeft));
  rightLogs.forEach((logRight) => moveRight(logRight));
  leftCars.forEach((carLeft) => moveLeft(carLeft));
  rightCars.forEach((carRight) => moveRight(carRight));
}

function timeElapse(){
  currTime -= 1;
  timeLeftOut.innerHTML = currTime;
}

function addKeyEventListner(fun) {
  document.addEventListener("keyup", fun);
}

function removeKeyEventListner(fun) {
  document.removeEventListener("keyup", fun);
}

function startIntervalTimers() {
  obstacleMoveInterval = setInterval(autoMoveObstacles, 500);
  checkWinLoose = setInterval(handleWinLoose, 100);
  playTimeInterval = setInterval(timeElapse,1000);
}
function stopIntervalTimer() {
  clearInterval(obstacleMoveInterval);
  obstacleMoveInterval = null;
  clearInterval(checkWinLoose);
  checkWinLoose = null;
  clearInterval(playTimeInterval);
  playTimeInterval=null;
}

function loose() {
  let currPos = boxes[currentIndex].classList;

  if (
    currPos.contains("c1") ||
    currPos.contains("l4") ||
    currPos.contains("l5") ||
    currTime <= 0
  ) {
    result.innerHTML = "Oh No You Failed Start Again";

    //reset the keyboard event listner,obstacle mover set interval and checkwinloose set time
    removeKeyEventListner(moveFrog);
    stopIntervalTimer();

    //move back frog to starting
    boxes[currentIndex].classList.remove("frog");
    currentIndex = 76;
    boxes[currentIndex].classList.add("frog");

    //reset the left time back to 20
    currTime = 20;
    timeLeftOut.innerHTML = currTime;
    gameRunningStatus = false;
  }
}

function win() {
  let currPos = boxes[currentIndex].classList;

  if (currPos.contains("ending-block")) {
    result.innerHTML = "You Did It Great !";
    //reset the keyboard event listner , obstacle mover set interval and checkwinloose set time
    removeKeyEventListner(moveFrog);
    stopIntervalTimer();

    //move back frog to starting
    boxes[currentIndex].classList.remove("frog");
    currentIndex = 76;
    boxes[currentIndex].classList.add("frog");
    gameRunningStatus = false;
  }
}

function handleWinLoose() {
  loose();
  win();
}

startPauseButton.addEventListener("click", () => {
  if (obstacleMoveInterval) {
    stopIntervalTimer();
    removeKeyEventListner(moveFrog);
  } else {
    if (gameRunningStatus != true) {
      //reset the left time back to 20 and the result
      result.innerHTML = "Keep Playing";
      currTime = 20;
    }

    timeLeftOut.innerHTML = currTime;
    gameRunningStatus = true;
    startIntervalTimers();
    addKeyEventListner(moveFrog);
  }
});
