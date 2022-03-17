const grid = document.querySelector("#grid");
const replayButton = document.querySelector("replay");
let foodPosition;
let prevPosition;
let snakeLength = 1;
let tail = [];
    
    // make 20x20 grid inside of container
    for (let i = 0; i < 400; i++) {
        let div = document.createElement("div");
        div.classList.add("box");
        grid.appendChild(div);
    }
    let divs = grid.childNodes;

    // put 1px snake on box 84
    let headPosition = 84;
    divs[headPosition].classList.add("snake");

    // add arrow key controls
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 37)
            moveSnake("left");
        if (e.keyCode === 38)
            moveSnake("up");
        if (e.keyCode === 39)
            moveSnake("right");
        if (e.keyCode === 40)
            moveSnake("down");
    });



    // move snake head
    function moveSnake(direction) {        

        prevPosition = headPosition;

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
        console.log(headPosition);
        console.log(tail);

        buildSnake();

        if (headPosition === foodPosition) {
            eatFood();
        }
    }

// headPosition is the front of the snake
// tail array holds the rest of the snake minus the head
// tail length starts at 0, increments by 1 each time the snake eats food

    function buildSnake() {
        
        divs[prevPosition].classList.remove("snake")
        divs[headPosition].classList.add("snake");
       
        tail.unshift(prevPosition);

        for (let i = 0; i < tail.length; i++) {
             
        }

    }

    // move 1px snake using setinterval

    // eatfood, add 2 to snake length
    
    function eatFood() {
        divs[foodPosition].classList.remove("food");
        generateFood();
        tail.unshift(headPosition);
        console.log(tail);
    }


    // generate random food

    function generateFood() {
        foodPosition = Math.floor(Math.random() * 399);
        divs[foodPosition].classList.add("food");
    }
    
    generateFood();

    // eat food function to increment tail length and create a new food

    // snake crash

    // keycodes: left 37, up 38, right 39, down 40
