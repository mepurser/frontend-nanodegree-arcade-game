//'use strict';
// Enemies our player must avoid
var Enemy = function(row, col, speed, url) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = url;
    this.y = row;
    this.x = col;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // This section will reset enemies to move back towards the
    // board once they've gone through. Results in enemies
    // endlessly cycling across the board.
    var speed = this.speed * dt * 75;
    if (this.x > 1000) {
        this.x = -200;
    } else if (this.x < -1000) {
        this.x = 800;
    } else {
        this.x += speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Prize is subclass of Enemy.
var Prize = function(row, col, speed, url) {
    Enemy.call(this, row, col, speed, url);
};

Prize.prototype = Object.create(Enemy.prototype);
Prize.prototype.constructor = Prize;

// Player class
var Player = function(row, col) {
    this.sprite = 'images/char-boy.png';
    this.y = row;
    this.x = col;

    this.handleInput = function(direction) {
        var rowIncr = 83;
        var colIncr = 100;
        var rowMove = this.y;
        var colMove = this.x;

        clearMsg();
        // These 'if' statements move the player and prevent the player from moving off the board
        if (direction === 'left' && this.x > 100) {
            colMove = -1 * colIncr;
            rowMove = 0;
        } else if (direction === 'up' && this.y > 0) {
            rowMove = -1 * rowIncr;
            colMove = 0;
        } else if (direction === 'right' && this.x < 400) {
            colMove = +1 * colIncr;
            rowMove = 0;
        } else if (direction === 'down' && this.y < 350) {
            rowMove = +1 * rowIncr;
            colMove = 0;
        } else {
            rowMove = 0;
            colMove = 0;
        }

        this.x += colMove;
        this.y += rowMove;
    };
};

// The Player.update method checks for collisions
Player.prototype.update = function(dt) {
    // Check for collisions with enemy.
    // If collision, reset and decrement score.
    allEnemies.forEach(function(enemy) {
        if ((player.y === enemy.y) && player.x >= (enemy.x - 75) && player.x <= (enemy.x + 75)) {
            player.y = startRow;
            player.x = startCol;
            score = score - 1;
            updateScore(score);
            msg("Try again. Bonuses lost: " + bonus + ".", "red");
            bonus = 0;
        }
    });

    // Check for collision with prize.
    // If collision, clear prize (move location off-screen) and increment score.
    allPrizes.forEach(function(prize) {
            if ((player.y === prize.y) && player.x >= (prize.x - 75) && player.x <= (prize.x + 75)) {
                prize.y = -1000;
                prize.x = -1000;
                prize.speed = 0;
                bonus = bonus + 1;
                msg("Bonus +" + bonus, "purple");
            }
        });
        // Check to see if success.
        // If success, reset and increment score.
    if (player.y === 83 * 0 - 20) {
        player.y = startRow;
        player.x = startCol;
        score = score + 1 + bonus;
        updateScore(score);
        if (bonus === 0) {
            msg("Good job! You made it safety!", "green");
        } else if (bonus === 1) {
            msg("Good job! You made it to safety and got 1 bonus!", "green");
        } else {
            msg("Good job! You made it to safety and got " + bonus + " bonuses!", "green");
        }
        bonus = 0;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update score banner
var updateScore = function(score) {
    ctx.clearRect(370, 20, 150, 50);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = "black";
    ctx.fillText("Points: " + score, 370, 40);
};

// Update message footer
var msg = function(msg, color) {
    clearMsg();
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = color;
    ctx.fillText(msg, 0, 610);
};

// Clear message footer
var clearMsg = function() {
    ctx.clearRect(0, 590, 600, 50);
};

// All enemy objects placed in an array called allEnemies

// Vars to instantiate enemy and prizes
var road1 = 83 * 1 - 20;
var road2 = 83 * 2 - 20;
var road3 = 83 * 3 - 20;
var moveLeftToRight = 0;
var moveRightToLeft = 500;
var bugnorm = 'images/enemy-bug.png';
var bugnormflip = 'images/enemy-bug-flip.png';

// Instantiate enemies
var allEnemies = [
    enemy1 = new Enemy(road1, moveLeftToRight - 300 * 0, 1, bugnorm),
    enemy2 = new Enemy(road3, moveLeftToRight - 300 * 0, 2, bugnorm),
    enemy3 = new Enemy(road2, moveLeftToRight - 300 * 0, 3, bugnorm),
    enemy4 = new Enemy(road1, moveLeftToRight - 300 * 1, 2, bugnorm),
    enemy5 = new Enemy(road1, moveRightToLeft + 300 * 1, -3, bugnormflip),
    enemy6 = new Enemy(road3, moveLeftToRight - 300 * 1, 2, bugnorm),
    enemy7 = new Enemy(road3, moveRightToLeft + 300 * 2, -3, bugnormflip),
    enemy8 = new Enemy(road2, moveLeftToRight - 300 * 2, 1, bugnorm),
    enemy9 = new Enemy(road2, moveLeftToRight - 300 * 2, 2, bugnorm)
];

// All prize objects placed in an array called allPrizes

// Addtl vars to instantiate prizes
gemOrange = 'images/Gem Orange.png';
gemGreen = 'images/Gem Green.png';
gemBlue = 'images/Gem Blue.png';
key = 'images/Key.png';
heart = 'images/Heart.png';
star = 'images/Star.png';

// Instantiate prizes
var allPrizes = [
    prize1 = new Prize(road1, 100, 0, gemOrange),
    prize2 = new Prize(road2, moveLeftToRight - 300 * 0, 1, gemGreen),
    prize3 = new Prize(road3, moveRightToLeft + 300 * 2, -2, heart),
    prize4 = new Prize(road1, moveLeftToRight - 300 * 2, 3, star),
    prize5 = new Prize(road2, moveLeftToRight - 300 * 3, 1, key),
    prize6 = new Prize(road3, moveRightToLeft + 300 * 3, -1, gemBlue)
];

// The Player object is a variable called player

// Vars to instantiate player
var startRow = 83 * 5 - 20;
var startCol = 202;

// Instantiate player
var player = new Player(startRow, startCol);

// Score and bonus starts at zero
var score = 0;
var bonus = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});