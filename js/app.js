$(document).ready(function () {
    //check that the JavaScript file is set up with the correct file path
    console.log("script loaded");

    //set variables for dom elements
    const rootDiv = $("#root");
    const battleDiv = $("#battle");
    const playerOneBattleCard = $("#player-one-battle-card");
    const playerOneBattleCardHealth = document.getElementById("battle__card-player-one-health");
    const playerTwoBattleCard = $("#player-two-battle-card");
    const playerTwoBattleCardHealth = document.getElementById("battle__card-player-two-health");
    const playerOneAttackBtn = document.getElementById("player1-attack");
    const playerOneDefendBtn = document.getElementById("player1-defend");
    const playerTwoAttackBtn = document.getElementById("player2-attack");
    const playerTwoDefendBtn = document.getElementById("player2-defend");
    const playerOneHealth = document.getElementById("player-one-health");
    const playerTwoHealth = document.getElementById("player-two-health");
    const playerOneWeapon = document.getElementById("player-one-current-weapon");
    const playerTwoWeapon = document.getElementById("player-two-current-weapon");

    //generate random starting positions
    let randomCol = 0;
    let randomRow = Math.floor(Math.random() * Math.floor(10));

    let randomCol2 = 9;
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


    /***************************** OBJECTS *******************************/

    /************************** WEAPON OBJECTS ****************************/

    function Weapon(weaponType, weaponDamage) {
        this.weaponType = weaponType;
        this.weaponDamage = weaponDamage;
    }

    let banana = new Weapon("banana", 10);
    let redShell = new Weapon("redShell", 30);
    let greenShell = new Weapon("greenShell", 20);
    let bomb = new Weapon("bomb", 30);

    /*********************** PLAYER OBJECTS ******************************/

    function Player(playerID, health) {
        this.playerID = playerID,
        this.health = health,
        this.active = false,
        this.currentWeapon = [banana],
        //attack method
        this.attack = function () {
            if(player1.active) {
                player2.health -= this.currentWeapon[this.currentWeapon.length - 1].weaponDamage;
                playerOneBattleCardHealth.innerHTML = this.health;
                if (player2.health <= 0 ) {
                    playerTwoBattleCardHealth.innerHTML = 0;
                    alert("Mario Wins!");
                } else {
                    playerTwoBattleCardHealth.innerHTML = player2.health;
                }
                this.active = false;
                player2.active = true;
            } 
            else if(player2.active){
                player1.health -= this.currentWeapon[this.currentWeapon.length - 1].weaponDamage;
                playerTwoBattleCardHealth.innerHTML = this.health;
                if (player1.health <= 0) {
                    playerOneBattleCardHealth.innerHTML = 0;
                    alert("Donkey Kong Wins!");
                } else {
                    playerOneBattleCardHealth.innerHTML = player1.health;
                }
                player1.active = true;
                this.active = false;
            }
        },
        //defend method
        this.defend = function () {
            if (player1.active) {
                this.health += player2.currentWeapon[player2.currentWeapon.length - 1].weaponDamage/2;
                this.active = false;
                player2.active = true;
            }
            else if (player2.active) {
                this.health += player1.currentWeapon[player1.currentWeapon.length - 1].weaponDamage / 2;
                player1.active = true;
                this.active = false;
            }
        }
    }

    let player1 = new Player("player1", 100);
    let player2 = new Player("player2", 100);


    player1.active = true;

    if (player1.active) {
        currentPlayer = player1;
    } else {
        currentPlayer = player2;
    }

/************************************** FUNCTIONS ************************************/
    const playerOneActiveCard = () => {
        playerTwoBattleCard.addClass("active-card");
        playerOneBattleCard.removeClass("active-card");
        $(playerOneAttackBtn).addClass("no-click");
        $(playerTwoAttackBtn).removeClass("no-click");
        $(playerOneDefendBtn).addClass("no-click");
        $(playerTwoDefendBtn).removeClass("no-click");
    }

    const playerTwoActiveCard = () => {
        playerOneBattleCard.addClass("active-card");
        playerTwoBattleCard.removeClass("active-card");
        $(playerTwoAttackBtn).addClass("no-click");
        $(playerOneAttackBtn).removeClass("no-click");
        $(playerTwoDefendBtn).addClass("no-click");
        $(playerOneDefendBtn).removeClass("no-click");
    }

    const battle = () => {
        battleDiv.css("display", "block");
        if (player1.active) {
            playerTwoBattleCard.addClass("active-card");
            playerOneBattleCard.removeClass("active-card");
            player1.active = false;
            player2.active = true;
        } else {
            playerOneBattleCard.addClass("active-card");
            playerTwoBattleCard.removeClass("active-card");
            player1.active = true;
            player2.active = false;
        }
        alert("fight");
    }

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

    tiles.forEach((tile, index) => {
        tile.setAttribute("id", index);
    });


    //player one starting position
    let player1Tile = $("#root").find(`[data-col='${randomCol}'][data-row='${randomRow}']`);
    player1Tile.addClass("active1");
    player1Moves.push(player1Tile.attr("id"));

    //player two starting position
    let player2Tile = $("#root").find(`[data-col='${randomCol2}'][data-row='${randomRow2}']`);
    player2Tile.addClass("active2");
    player2Moves.push(player2Tile.attr("id"));

    //set obstruction tiles
    for (let i = 0; i < 15; i++) {
        //generate a random tile id
        let randomtile = Math.floor(Math.random() * (90 - 10 + 1) + 10);
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
        let randomtile = Math.floor(Math.random() * (90 - 10 + 1) + 10);
        let block = document.getElementById(randomtile);

        $(block).addClass(weaponsArray[i]);
        $(block).attr("data-weapon", "[]");

        let blockWeaponArray = $(block).data('weapon');
        
        blockWeaponArray.push(weaponsArray[i]);

        if (block.classList.contains("obstruction")) {
            block.classList.remove("obstruction");
        }
    }



    //add click event listener with event delegated to elements containing the tile class
    rootDiv.click((e) => {

        if (player1.active) {
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }

        //check if the clicked target contains the new-move-green style
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
        
        console.log(player1Moves);
        console.log(player1);
        //current tile
        let currentTileId = player1Moves[player1Moves.length - 1];   
        //previous tile
        let previousTileId = player1Moves[player1Moves.length - 2];
//////////////////////////////////////////////////////////////////////////WORK ON THIS

        // if (currentTileId - 30 == previousTileId) {
        //     if ($(`#${currentTileId - 20}`).data("weapon")) {
                
        //         if ($(`#${currentTileId - 20}`).data("weapon") === "banana") {
        //             currentPlayer.currentWeapon.push(banana);
        //         } else if ($(`#${currentTileId - 20}`).data("weapon") === "bomb") {
        //             currentPlayer.currentWeapon.push(bomb);
        //         } else if ($(`#${currentTileId - 20}`).data("weapon") === "greenShell") {
        //             currentPlayer.currentWeapon.push(greenShell);
        //         } else if ($(`#${currentTileId - 20}`).data("weapon") === "redShell") {
        //             currentPlayer.currentWeapon.push(redShell);
        //         }
        //         $(`#${currentTileId - 20}`).removeClass("banana bomb redShell greenShell")
        //         .addClass(player1.currentWeapon[player1.currentWeapon.length - 1].weaponType);
        //         $(`#${currentTileId - 20}`).data("weapon").push(player1.currentWeapon[0].weaponType);
                
        //     }
        //     player1.currentWeapon.push($(`#${currentTileId - 20}`).data("weapon"));
        //     console.log(player1.currentWeapon)
        // }

        // playerOneWeapon.innerHTML = player1.currentWeapon[player1.currentWeapon.length - 1].weaponType;
        
///////////////////////////////////////////////////////////////////////////
        
        if (player1.currentWeapon.length > 0) {
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
            //Each player starts with a banana as their default weapon
            playerOneWeapon.innerHTML = "banana";
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
            playerTwoWeapon.innerHTML = "Banana";
        }
        
        //Battle conditions
        if(
            Number($(player1Tile).attr("data-col")) + 1 === Number($(player2Tile).attr("data-col")) 
            && $(player1Tile).attr("data-row") === $(player2Tile).attr("data-row") ||
            Number($(player1Tile).attr("data-col")) - 1 === Number($(player2Tile).attr("data-col")) 
            && $(player1Tile).attr("data-row") === $(player2Tile).attr("data-row") ||
            Number($(player1Tile).attr("data-row")) + 1 === Number($(player2Tile).attr("data-row")) 
            && $(player1Tile).attr("data-col") === $(player2Tile).attr("data-col") ||
            Number($(player1Tile).attr("data-row")) - 1 === Number($(player2Tile).attr("data-row")) 
            && $(player1Tile).attr("data-col") === $(player2Tile).attr("data-col")
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

            let tileRow = Number($(tiles[i]).attr("data-row"));
            let tileCol = Number($(tiles[i]).attr("data-col"));

            const conditions = () => {
                if (!$(tiles[i]).hasClass("obstruction")
                    && !$(tiles[i]).hasClass("active1")
                    && !$(tiles[i]).hasClass("active2")) {
                    $(tiles[i]).addClass("new-move-green");
                }
            }

            if (tileRow === currentRow
                && tileCol <= maxCol
                && tileCol > currentCol) {
                conditions();
            } else if (tileRow === currentRow
                && tileCol >= minCol
                && tileCol < currentCol) {
                conditions();
            }else if (tileCol === currentCol
                && tileRow  <= maxRow
                && tileRow  > currentRow) {
                conditions();
            }else if (tileCol === currentCol
                && tileRow  >= minRow
                && tileRow  < currentRow) {
                conditions();
            }
        }

        for (let i = 0; i <= 99; i++) {

            const obstruction = num => {
                if ($(tiles[i]).hasClass("obstruction") 
                    || $(tiles[i]).hasClass("active2") 
                    || $(tiles[i]).hasClass("active1")) {
                    if (document.getElementById(i + num)) {
                        if (document.getElementById(i + num).getAttribute("class", "new-move-green")) {
                            document.getElementById(i + num).classList.remove("new-move-green");
                        }
                    }
                }
            }

            let tileRow = Number($(tiles[i]).attr("data-row"));
            let tileCol = Number($(tiles[i]).attr("data-col"));

            if (tileRow === currentRow
                && tileCol <= maxCol
                && tileCol > currentCol) {
                obstruction(10);
                obstruction(20);
            }
            if (tileRow === currentRow
                && tileCol >= minCol
                && tileCol < currentCol) {
                obstruction(-10);
                obstruction(-20);
            }

            if (tileCol === currentCol
                && tileRow <= maxRow
                && tileRow > currentRow) {
                obstruction(1);
                obstruction(2);
            }
            if (tileCol === currentCol
                && tileRow >= minRow
                && tileRow < currentRow) {
                obstruction(-1);
                obstruction(-2);
            }
        }
    }


    if (player1.active) {
        calculateMoves(player1Tile);
    } else {
        calculateMoves(player2Tile);
    }


    $(playerOneAttackBtn).click(() => {
        player1.attack();
        playerOneActiveCard();
    });

    $(playerTwoAttackBtn).click(() => {
        player2.attack();
        playerTwoActiveCard();
    });

    $(playerOneDefendBtn).click(() => {
        player1.defend();
        playerOneActiveCard();
    });

    $(playerTwoDefendBtn).click(() => {
        player2.defend();
        playerTwoActiveCard();
    });


    playerOneHealth.innerHTML = player1.health;
    playerTwoHealth.innerHTML = player2.health;
    playerOneWeapon.innerHTML = "banana";
    playerTwoWeapon.innerHTML = "banana";

    playerOneBattleCardHealth.innerHTML = player1.health;
    playerTwoBattleCardHealth.innerHTML = player2.health;
});