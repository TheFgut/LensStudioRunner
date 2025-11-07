// @input Component.ScriptComponent gameStateMachine
// @input float startSpeed = 2.0
// @input float speedIncreasePerSecond = 0.05
// @input float maxSpeed = 4.0
// @input Component.ScriptComponent player
// @input int maxLives = 3

var score = 0;
var lives = script.maxLives;
var speed = script.startSpeed;
var running = true;

script.getLives = function() {
        return lives;
    };
script.getScore = function() {
        return score;
    };

script.addScore = function(points) {
    score += points;
    global.EventBus.emit("ScoreChanged", { score: score });
};

script.takeDamage = function() {
    lives--;
    global.EventBus.emit("TakenDamage", { lives: lives });
    speed = script.startSpeed;
    if (lives <= 0) {
        gameOver();
    }
};

script.getSpeed = function() {
    return speed;
};

function gameOver() {
    running = false;
    global.EventBus.emit("GameOver", {isDead : true});
    script.gameStateMachine.toLooseState();
}

script.restart = function() {
    score = 0;
    lives = 3;
    speed = script.startSpeed;
    global.EventBus.emit("ScoreChanged", { score: score });
};

// ускорение со временем
var event = script.createEvent("UpdateEvent");
event.bind(function(eventData) {
    if (!running || speed > script.maxSpeed) return;
    speed += script.speedIncreasePerSecond * eventData.getDeltaTime();
});