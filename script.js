const grid = document.querySelector("#grid");
const replayButton = document.querySelector("#replay");
replayButton.addEventListener("click", () => {
  window.location.reload();
});

let foodPosition;
let snakeArray = [104];
let direction = "right";
let moving;
let speed = null;

// event listeners for difficulty levels
let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let hard = document.querySelector("#hard");
let insane = document.querySelector("#insane");

easy.addEventListener("click", () => {
  speed = 110;
  easy.classList.add("selected");
  medium.classList.remove("selected");
  hard.classList.remove("selected");
  insane.classList.remove("selected");
});

medium.addEventListener("click", () => {
  speed = 80;
  easy.classList.remove("selected");
  medium.classList.add("selected");
  hard.classList.remove("selected");
  insane.classList.remove("selected");
});

hard.addEventListener("click", () => {
  speed = 65;
  easy.classList.remove("selected");
  medium.classList.remove("selected");
  hard.classList.add("selected");
  insane.classList.remove("selected");
});

insane.addEventListener("click", () => {
  speed = 50;
  easy.classList.remove("selected");
  medium.classList.remove("selected");
  hard.classList.remove("selected");
  insane.classList.add("selected");
});

// starts the snake moving when space bar is pressed
document.addEventListener("keydown", function startSnake(e) {
  if (speed && e.keyCode == 32) {
    moving = setInterval(moveSnake, speed);
    document.removeEventListener("keydown", startSnake);
    addArrows();
  }
});

// make 20x20 grid inside of container
for (let i = 0; i < 400; i++) {
  let div = document.createElement("div");
  div.classList.add("box");
  grid.appendChild(div);
}
let divs = grid.childNodes;

divs[snakeArray[0]].classList.add("snake");

// add arrow key controls
function addArrows() {
  document.addEventListener("keydown", function changeDirection(e) {
    if (e.keyCode === 37 && direction !== "right") direction = "left";
    if (e.keyCode === 38 && direction !== "down") direction = "up";
    if (e.keyCode === 39 && direction !== "left") direction = "right";
    if (e.keyCode === 40 && direction !== "up") direction = "down";
    document.removeEventListener("keydown", changeDirection);
  });
}

// checks if head has bumped into the snake or the boundary
function bump(head) {
  if (head > 399 && direction === "down") {
    console.log("out of bounds / bottom");
    clearInterval(moving);
    return true;
  }

  if (head < 0 && direction === "up") {
    console.log("out of bounds / top");
    clearInterval(moving);
    return true;
  }

  if (head % 20 === 0 && direction === "right") {
    console.log("out of bounds / right side");
    clearInterval(moving);
    return true;
  }

  if (head % 20 === 19 && direction === "left") {
    console.log("out of bounds / left side");
    clearInterval(moving);
    return true;
  }

  if (head < 0 && direction === "left") {
    console.log("out of bounds");
    clearInterval(moving);
    return true;
  }

  if (head >= 0 && head < 400) {
    if (divs[head].classList.contains("snake")) {
      // don't count if direction === left and on the same line
      console.log("hit");
      clearInterval(moving);
      return true;
    }
  }
  return false;
}

// move snake head
function moveSnake() {
  let headPosition = snakeArray[0];

  // move index of head, but don't alter the board yet
  if (direction === "up") {
    headPosition -= 20;
  } else if (direction === "down") {
    headPosition += 20;
  } else if (direction === "right") {
    headPosition++;
  } else if (direction === "left") {
    headPosition--;
  }

  buildSnake(headPosition);

  // eat the food if head reaches food position (maybe move this in front of the buildSnake function)
  if (headPosition === foodPosition) {
    eatFood();
  }
}

// headPosition is the new front of the snake
// snakeArray holds the previous snake

function buildSnake(headPosition) {
  // checks first if snake has bumped into an obstacle
  if (bump(headPosition) === false) {
    // add class to the new head of the snake
    divs[headPosition].classList.add("snake");

    // puts the headPosition at the front of the snake
    snakeArray.unshift(headPosition);

    // assigns index and pops off the last index in the snakearray
    let last = snakeArray.pop();

    // removes the snake class from the last div on the tail
    divs[last].classList.remove("snake");
  }
  addArrows();
}

// eatfood, add to snake length
function eatFood() {
  divs[foodPosition].classList.remove("food");
  generateFood();

  // updates score div
  document.querySelector("#score").innerHTML = `Score: ${snakeArray.length}`;

  // adds to the back of the snake
  snakeArray.push(snakeArray[snakeArray.length - 1]);
}

// generate random food
function generateFood() {
  foodPosition = Math.floor(Math.random() * 399);

  // selects a different div if the foodPosition is already occupied
  while (divs[foodPosition].classList.contains("snake"))
    foodPosition = foodPosition = Math.floor(Math.random() * 399);

  divs[foodPosition].classList.add("food");
  return foodPosition;
}

// generates first food
generateFood();
