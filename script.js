const grid = document.querySelector("#grid");
const replayButton = document.querySelector("#replay")
replayButton.addEventListener("click", () => { window.location.reload() })
let foodPosition;
let snakeArray = [104];
let direction = "right";
let moving;

// starts the snake moving when space bar is pressed
document.addEventListener("keydown", function startSnake(e) {
    if(e.keyCode == 32){
        moving = setInterval(moveSnake, 80);
        document.removeEventListener("keydown", startSnake);
    }
})

// make 20x20 grid inside of container
for (let i = 0; i < 400; i++) {
    let div = document.createElement("div");
    div.classList.add("box");
    grid.appendChild(div);
}
let divs = grid.childNodes;

divs[snakeArray[0]].classList.add("snake");

// add arrow key controls
document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37 && direction !== "right")
        direction = "left"
    if (e.keyCode === 38 && direction !== "down")
        direction = "up";
    if (e.keyCode === 39 && direction !== "left")
        direction = "right";
    if (e.keyCode === 40 && direction !== "up")
        direction = "down";
});

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
        divs[head].classList.remove("snake");
        clearInterval(moving);
        return true;
    }

    if (head % 20 === 19 && direction === "left") {
        console.log("out of bounds / left side");
        divs[head].classList.remove("snake");
        clearInterval(moving);
        return true;
    }
    
    if (head >= 0 && head < 400) {
        if (divs[head].classList.contains("snake")) {
            console.log("hit");
            clearInterval(moving);
            return true;
        }
    }
}

// move snake head
function moveSnake() {        

    let headPosition = snakeArray[0];

    // move index of head, but don't alter the board yet
    if (direction === "up") {
        headPosition -= 20;
    }
    else if (direction === "down") {
        headPosition += 20;
    }
    else if (direction === "right") {
        headPosition++;
    }
    else if (direction === "left") {
        headPosition--;
    }

    let bumped = bump(headPosition);

    // build the snake, passing in new head position
    if (bumped !== false)
        buildSnake(headPosition);

    // eat the food if head reaches food position (maybe move this in front of the buildSnake function)
    if (headPosition === foodPosition) {
        eatFood();
    }
}

// headPosition is the new front of the snake
// snakeArray holds the previous snake

function buildSnake(headPosition) {

    // add class to the new head of the snake
    divs[headPosition].classList.add("snake");

    // puts the headPosition at the front of the snake
    snakeArray.unshift(headPosition);

    // assigns index and pops off the last index in the snakearray
    let last = snakeArray.pop();

    // removes the snake class from the last div on the tail
    divs[last].classList.remove("snake");

}

// eatfood, add 2 to snake length

function eatFood() {
    divs[foodPosition].classList.remove("food");
    generateFood();

    // updates score div
    document.querySelector("#score").innerHTML = `Score ${snakeArray.length}`;

    snakeArray.push(snakeArray[snakeArray.length - 1]);

}


// generate random food

function generateFood() {
    foodPosition = Math.floor(Math.random() * 399);

    // selects a different div if the foodPosition is already occupied
    while (divs[foodPosition].classList.contains("snake"))
        foodPosition = foodPosition = Math.floor(Math.random() * 399);

    divs[foodPosition].classList.add("food");
}

generateFood();





