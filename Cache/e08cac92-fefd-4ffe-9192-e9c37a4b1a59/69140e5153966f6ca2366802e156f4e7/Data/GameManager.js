// @input Component.ScriptComponent gameStateMachine
// @input float startSpeed = 2.0
// @input float speedIncreasePerSecond = 0.05
// @input float maxSpeed = 4.0
// @input Component.ScriptComponent player
// @input int maxLives = 3

var gold = 0;
var range = 0;
var lives = script.maxLives;
var speed = script.startSpeed;
var running = true;

script.getRange = function() {
        return Math.round(range * 10) / 10;
    };
script.getLives = function() {
        return lives;
    };
script.getGold = function() {
        return gold;
    };
script.getSpeed = function() {
    return speed;
};

script.addGold = function(points) {
    gold += points;
    global.EventBus.emit("GoldChanged", { gold: gold });
};

script.takeDamage = function() {
    lives--;
    global.EventBus.emit("TakenDamage", { lives: lives });
    speed = script.startSpeed;
    if (lives <= 0) {
        gameOver();
    }
};

function gameOver() {
    running = false;
    global.EventBus.emit("GameOver", {isDead : true});
    script.gameStateMachine.toLooseState();
}

function launch(){
    running = true;
}

script.restart = function() {
    gold = 0;
    lives = 3;
    range = 0;
    speed = script.startSpeed;
    global.EventBus.emit("GoldChanged", { gold: gold });
};

// ускорение со временем
var event = script.createEvent("UpdateEvent");
event.bind(function(eventData) {
    if (!running || speed > script.maxSpeed) return;
    range += speed * eventData.getDeltaTime() / script.startSpeed * 2;
    speed += script.speedIncreasePerSecond * eventData.getDeltaTime();
    global.EventBus.emit("RangeChanged", { range: range });
});

script.launch = launch;