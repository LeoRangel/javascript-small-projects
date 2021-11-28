let order = [];
let clickedOrder = [];
let score = 0;

//0 - blue
//1 - red
//2 - green
//3 - yellow

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Create random color order
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    console.log(colorOrder)
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        console.log("Number(i):", Number(i))
        lightColor(elementColor, Number(i) + 1);
    }
}

// Light up the next color
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

// Checks if the buttons clicked are the same as the order generated in the game
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        // alert(`Score: ${score}\nYou got it right! Starting next level!`);
        nextLevel();
    }
}

// Function for user click
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

// Color return function
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Function for next game level
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// Game over function
let gameOver = () => {
    alert(`Score: ${score}!\nYou lost the game!\nClick OK to start a new game`);
    order = [];
    clickedOrder = [];

    playGame();
}

// Game start function
let playGame = () => {
    alert('Welcome to Genesis! Starting new game!');
    score = 0;

    nextLevel();
}

// Click events for colors
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


// Beginning of the game
playGame();