//check that the JavaScript file is set up with the correct file path
console.log("script loaded");

//set up root element in index.html file
const rootDiv = $("#root");

//generate a random starting position
let randomCol = Math.floor(Math.random() * Math.floor(5));
let randomRow = Math.floor(Math.random() * Math.floor(10));

let randomCol2 = Math.floor(Math.random() * (9 - 6 + 1) + 6);
let randomRow2 = Math.floor(Math.random() * Math.floor(10));


//Set player move variables
let currentCol;
let maxCol;
let minCol;
let currentRow;
let maxRow;
let minRow;

//Set player battle variables
const playerOneHealth = document.getElementById("player-one-health");
const playerTwoHealth = document.getElementById("player-two-health");
const playerOneWeapon = document.getElementById("player-one-current-weapon");
const playerTwoWeapon = document.getElementById("player-two-current-weapon");

/***************************** OBJECTS *******************************/

/*********************** PLAYER OBJECTS ******************************/

function Player(playerID, health, currentWeapon) {
    this.playerID = playerID;
    this.health = health;
    this.active = false;
    this.currentWeapon = currentWeapon;
    this.attack = function () {
        console.log("attack");
    };
    this.defend = function () {
        console.log("defend");
    };
}

const player1 = new Player("player1", 100, "sword");
const player2 = new Player("player2", 100, "gun");


playerOneHealth.innerHTML = player1.health;
playerOneWeapon.innerHTML = player1.currentWeapon;
playerTwoHealth.innerHTML = player2.health;
playerTwoWeapon.innerHTML = player2.currentWeapon;

/************************** WEAPON OBJECTS ****************************/

function Weapon(weaponType, weaponDamage) {
    this.weaponType = weaponType;
    this.weaponDamage = weaponDamage;
}

let sword = new Weapon("sword", 20);
let axe = new Weapon("axe", 20);
let gun = new Weapon("gun", 30);
let staff = new Weapon("staff", 10);


/**************************** create a board of 100 tiles ***************************/
for (let i = 0; i < 10; i++) {
    const row = $("<div></div>");
    for (let j = 0; j < 10; j++) {
        const tile = $("<div></div>").addClass("tile")
            .attr("data-col", i)
            .attr("data-row", j)
        row.append(tile)
    }
    rootDiv.append(row);
}
/********************************************************************************************/



//Get a Node list of all tile divs
let tiles = document.querySelectorAll(".tile");


//player starting position
let player1Tile = $("#root").find(`[data-col='${randomCol}'][data-row='${randomRow}']`);
player1Tile.addClass("active1");

//player starting position
let player2Tile = $("#root").find(`[data-col='${randomCol2}'][data-row='${randomRow2}']`);
player2Tile.addClass("active2");


const calculateMoves = (player) => {
    //calculate allowed lateral moves
    currentCol = Number(player.attr("data-col"));
    maxCol = currentCol + 3;
    minCol = currentCol - 3;

    //calculate allowed vertical moves
    currentRow = Number(player.attr("data-row"));
    maxRow = currentRow + 3;
    minRow = currentRow - 3;
    for (let i = 0; i <= 99; i++) {
        if (Number(tiles[i].getAttribute("data-row")) === currentRow && Number(tiles[i].getAttribute("data-col")) <= maxCol && Number(tiles[i].getAttribute("data-col")) > currentCol) {
            tiles[i].classList.add("new-move-green");
        }
        if (Number(tiles[i].getAttribute("data-row")) === currentRow && Number(tiles[i].getAttribute("data-col")) >= minCol && Number(tiles[i].getAttribute("data-col")) < currentCol) {
            tiles[i].classList.add("new-move-green");
        }
        if (Number(tiles[i].getAttribute("data-col")) === currentCol && Number(tiles[i].getAttribute("data-row")) <= maxRow && Number(tiles[i].getAttribute("data-row")) > currentRow) {
            tiles[i].classList.add("new-move-green");
        }
        if (Number(tiles[i].getAttribute("data-col")) === currentCol && Number(tiles[i].getAttribute("data-row")) >= minRow && Number(tiles[i].getAttribute("data-row")) < currentRow) {
            tiles[i].classList.add("new-move-green");
        }
    }
}

player1.active = true;

//add click event listener with event delegated to elements containing the tile class
rootDiv.click((e) => {
    //check if the clicked target contains the tile style
    if ($(e.target).hasClass("new-move-green") && player1.active) {
        $(tiles).removeClass("new-move-green");
        $(player1Tile).removeClass("active1");
        $(e.target).addClass("active1");
        player1Tile = $(e.target);
        player1.active = false;
        player2.active = true;
        calculateMoves(player2Tile);
    } else if ($(e.target).hasClass("new-move-green") && player2.active){
        $(tiles).removeClass("new-move-green");
        $(player2Tile).removeClass("active2");
        $(e.target).addClass("active2");
        player2Tile = $(e.target);
        player2.active = false;
        player1.active = true;
        calculateMoves(player1Tile);
    }
    
    //TODO: switch statement for battle conditions
    
});



if (player1.active) {
    calculateMoves(player1Tile);
} else {
    calculateMoves(player2Tile);
}


const battle = () => {
    alert("Let's get it on");
}


