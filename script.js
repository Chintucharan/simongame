let gameSeq = [];
let userSeq = [];

let btns = ["red", "blue", "purple", "yellow"];

let started = false;
let level = 0;
let acceptingInput = false;

let h3 = document.querySelector("h3");
let startBtn = document.querySelector(".start-btn");


// Start Game
document.addEventListener("keypress", function () {

    if (!started) {
        started = true;
        levelUp();
    }

});


startBtn.addEventListener("click", function () {

    if (!started) {
        started = true;
        startBtn.classList.add("hidden");
        levelUp();
    }

});


// Game sequence flash
function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);

}




// User click light effect
function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 200);

}



// Play complete sequence
async function showSequence() {

    acceptingInput = false;

    for (let color of gameSeq) {

        let btn = document.querySelector(`#${color}`);

        await flashWait(btn);

    }

    acceptingInput = true;

}



// Delay flash
function flashWait(btn) {

    return new Promise(resolve => {

        gameFlash(btn);

        setTimeout(() => {

            resolve();

        }, 350);

    });

}



// Next Level
function levelUp() {

    userSeq = [];

    level++;

    h3.innerText = `Level ${level}`;


    let randIndex = Math.floor(Math.random() * btns.length);

    let randColor = btns[randIndex];


    gameSeq.push(randColor);


    console.log(gameSeq);


    showSequence();

}



// Check Answer
function checkAns(idx) {


    if (userSeq[idx] === gameSeq[idx]) {


        if (userSeq.length === gameSeq.length) {

            setTimeout(() => {

                levelUp();

            }, 700);

        }


    } else {


        h3.innerHTML =
        `Game Over!! Score: <b>${level}</b><br>
        Press any key to restart`;


        document.body.style.backgroundColor = "red";


        setTimeout(() => {

            document.body.style.backgroundColor = "#053464";

        },300);


        reset();

    }

}



// Button Click
function btnPress() {


    if (!started || !acceptingInput) {
        return;
    }


    let btn = this;


    let userColor = btn.id;


    userSeq.push(userColor);


    userFlash(btn);


    checkAns(userSeq.length - 1);

}



// Add buttons
let allBtns = document.querySelectorAll(".btn");


for (let btn of allBtns) {

    btn.addEventListener("click", btnPress);

}



// Reset
function reset() {

    started = false;

    level = 0;

    gameSeq = [];

    userSeq = [];

    acceptingInput = false;

    startBtn.classList.remove("hidden");

}