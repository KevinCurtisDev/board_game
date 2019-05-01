$(document).ready(function () {
    //check that the JavaScript file is set up with the correct file path
    console.log("script loaded");

    //set up root element in index.html file
    const rootDiv = $("#root");

    const battleDiv = document.getElementById("battle");
    const playerOneBattleCard = document.getElementById("player-one-battle-card");
    const playerTwoBattleCard = document.getElementById("player-two-battle-card");

    //generate random starting positions
    let randomCol = Math.floor(Math.random() * Math.floor(4));
    let randomRow = Math.floor(Math.random() * Math.floor(10));

    let randomCol2 = Math.floor(Math.random() * (9 - 6 + 1) + 6);
    let randomRow2 = Math.floor(Math.random() * Math.floor(10));


    let currentPlayer;
    let inactivePlayer;

    //Set player move variables
    let player1Moves = [];
    let player2Moves = [];
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

    function Player(playerID, health) {
        this.playerID = playerID;
        this.health = health;
        this.active = false;
        this.currentWeapon = [];
        this.attack = function () {
            if(player1.active) {
                player2.health -= currentWeapon.weaponDamage;
            } else {
                player1.health -= currentWeapon.weaponDamage;
            }
        };
        this.defend = function () {
            console.log("defend");
        };
    }


    /************************** WEAPON OBJECTS ****************************/

    function Weapon(weaponType, weaponDamage) {
        this.weaponType = weaponType;
        this.weaponDamage = weaponDamage;
    }

    let banana = new Weapon("banana", 10);
    let redShell = new Weapon("redShell", 30);
    let greenShell = new Weapon("greenShell", 20);
    let bomb = new Weapon("bomb", 30);




    const player1 = new Player("player1", 100);
    const player2 = new Player("player2", 100);


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

    for(let i = 0; i < tiles.length; i++) {
        tiles[i].setAttribute("id", i);
    }


    //player one starting position
    let player1Tile = $("#root").find(`[data-col='${randomCol}'][data-row='${randomRow}']`);
    player1Tile.addClass("active1");

    //player two starting position
    let player2Tile = $("#root").find(`[data-col='${randomCol2}'][data-row='${randomRow2}']`);
    player2Tile.addClass("active2");


    //set obstruction tiles
    for (let i = 0; i < 15; i++) {
        //generate a random tile id
        let randomtile = Math.floor(Math.random() * Math.floor(99));
        let block = document.getElementById(randomtile);

        $(block).addClass("obstruction");

        if (block.classList.contains("active1") || block.classList.contains("active2")) {
            block.classList.remove("obstruction")
        }
    }


    let weaponsArray = ["banana", "bomb", "redShell", "greenShell"];

    //set weapon tiles
    for (let i = 0; i < 4; i++) {
        //generate a random tile id
        let randomtile = Math.floor(Math.random() * Math.floor(99));
        let block = document.getElementById(randomtile);

        $(block).addClass(weaponsArray[i]);
        $(block).attr("data-weapon", "[]");

        let blockWeaponArray = $(block).data('weapon');
        
        blockWeaponArray.push(weaponsArray[i]);

        if (block.classList.contains("active1") || block.classList.contains("active2")) {
            block.classList.remove(weaponsArray[i]);
        }

        if (block.classList.contains("obstruction")) {
            block.classList.remove("obstruction");
        }
    }



    player1.active = true;
    console.log(player1);
    //add click event listener with event delegated to elements containing the tile class
    rootDiv.click((e) => {

        if(player1.active) {
            currentPlayer = player1;
            inactivePLayer = player2;
        } else {
            currentPlayer = player2;
            inactivePlayer = player1;
        }

        //check if the clicked target contains the tile style
        if ($(e.target).hasClass("new-move-green") && player1.active) {
            $(tiles).removeClass("new-move-green");
            $(player1Tile).removeClass("active1");
            $(e.target).addClass("active1");
            player1Tile = $(e.target);

            //array containing IDs of tiles player 1 has visited
            player1Moves.push(`${$(e.target).attr('id')}`);
            player1.active = false;
            player2.active = true;

            calculateMoves(player2Tile);
        } else if ($(e.target).hasClass("new-move-green") && player2.active){
            $(tiles).removeClass("new-move-green");
            $(player2Tile).removeClass("active2");
            $(e.target).addClass("active2");
            player2Tile = $(e.target);

            //array containing IDs of tiles player 2 has visited
            player2Moves.push($(e.target).attr('id'));

            player2.active = false;
            player1.active = true;
            calculateMoves(player1Tile);
        }

        //check if the clicked tile has a data-weapon attribute
        if ($(e.target).data("weapon")){
            if ($(e.target).data("weapon")[$(e.target).data("weapon").length - 1] === "banana") {
                currentPlayer.currentWeapon.push(banana);
            } else if ($(e.target).data("weapon")[$(e.target).data("weapon").length - 1] === "bomb") {
                currentPlayer.currentWeapon.push(bomb);
            } else if ($(e.target).data("weapon")[$(e.target).data("weapon").length - 1] === "redShell") {
                currentPlayer.currentWeapon.push(redShell);
            } else if ($(e.target).data("weapon")[$(e.target).data("weapon").length - 1] === "greenShell") {
                currentPlayer.currentWeapon.push(greenShell);
            }
        }
        

        if (player1.currentWeapon.length > 1) {
            $(player1Tile).removeClass("banana bomb redShell greenShell");

            /******************************************************************************************************* */
            if($(`#${player1Moves[player1Moves.length - 2]}`).data("weapon")) {
                $(`#${player1Moves[player1Moves.length - 2]}`).data("weapon").push(player1.currentWeapon[player1.currentWeapon.length - 2].weaponType);
                $(`#${player1Moves[player1Moves.length - 2]}`).addClass(`${player1.currentWeapon[player1.currentWeapon.length - 2].weaponType}`);
            }
            /******************************************************************************************************* */

            playerOneWeapon.innerHTML = player1.currentWeapon[player1.currentWeapon.length - 1].weaponType;
        } else if (player1.currentWeapon.length === 1) {
            playerOneWeapon.innerHTML = player1.currentWeapon[0].weaponType;
            $(player1Tile).removeClass("banana bomb redShell greenShell");
            //Remove data-weapon attribute when player collects their first weapon
            $(player1Tile).removeAttr("data-weapon");
        } else {
            playerOneWeapon.innerHTML = "nothing";
        }

        if (player2.currentWeapon.length > 1) {
            $(player2Tile).removeClass("banana bomb redShell greenShell");

            /******************************************************************************************************* */
            if ($(`#${player2Moves[player2Moves.length - 2]}`).data("weapon")) {
                $(`#${player2Moves[player2Moves.length - 2]}`).data("weapon").push(player2.currentWeapon[player2.currentWeapon.length - 2].weaponType);
                $(`#${player2Moves[player2Moves.length - 2]}`).addClass(`${player2.currentWeapon[player2.currentWeapon.length - 2].weaponType}`);
            }
            /******************************************************************************************************* */

            playerTwoWeapon.innerHTML = player2.currentWeapon[player2.currentWeapon.length - 1].weaponType;
        } else if (player2.currentWeapon.length === 1) {
            playerTwoWeapon.innerHTML = player2.currentWeapon[0].weaponType;
            $(player2Tile).removeClass("banana bomb redShell greenShell");
            //Remove data-weapon attribute when player collects their first weapon
            $(player2Tile).removeAttr("data-weapon");
        } else {
            playerTwoWeapon.innerHTML = "nothing";
        }
        
        //Battle conditions
        if(
            Number($(player1Tile).attr("data-col")) + 1 === Number($(player2Tile).attr("data-col")) && $(player1Tile).attr("data-row") === $(player2Tile).attr("data-row") ||
            Number($(player1Tile).attr("data-col")) - 1 === Number($(player2Tile).attr("data-col")) && $(player1Tile).attr("data-row") === $(player2Tile).attr("data-row") ||
            Number($(player1Tile).attr("data-row")) + 1 === Number($(player2Tile).attr("data-row")) && $(player1Tile).attr("data-col") === $(player2Tile).attr("data-col") ||
            Number($(player1Tile).attr("data-row")) - 1 === Number($(player2Tile).attr("data-row")) && $(player1Tile).attr("data-col") === $(player2Tile).attr("data-col")
        ) {
            battle();
        }
    });

    //caltulate allowed moves for each player
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
            if (Number(tiles[i].getAttribute("data-row")) === currentRow
                && Number(tiles[i].getAttribute("data-col")) <= maxCol
                && Number(tiles[i].getAttribute("data-col")) > currentCol) {
                tiles[i].classList.add("new-move-green");
            }

            if (Number(tiles[i].getAttribute("data-row")) === currentRow
                && Number(tiles[i].getAttribute("data-col")) >= minCol
                && Number(tiles[i].getAttribute("data-col")) < currentCol) {
                tiles[i].classList.add("new-move-green");
            }

            if (Number(tiles[i].getAttribute("data-col")) === currentCol
                && Number(tiles[i].getAttribute("data-row")) <= maxRow
                && Number(tiles[i].getAttribute("data-row")) > currentRow) {
                tiles[i].classList.add("new-move-green");
            }

            if (Number(tiles[i].getAttribute("data-col")) === currentCol
                && Number(tiles[i].getAttribute("data-row")) >= minRow
                && Number(tiles[i].getAttribute("data-row")) < currentRow) {
                tiles[i].classList.add("new-move-green");
            }
        }
    }



    if (player1.active) {
        calculateMoves(player1Tile);
    } else {
        calculateMoves(player2Tile);
    }


    const battle = () => {
        battleDiv.style.display = "block"
        alert("fight");
    }


    playerOneHealth.innerHTML = player1.health;
    playerTwoHealth.innerHTML = player2.health;
    playerOneWeapon.innerHTML = "nothing";
    playerTwoWeapon.innerHTML = "nothing";

});
