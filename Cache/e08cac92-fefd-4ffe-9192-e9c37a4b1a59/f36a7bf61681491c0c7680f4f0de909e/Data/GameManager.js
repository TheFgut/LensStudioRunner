// @input SceneObject obstaclesContainer
// @input float startSpeed = 2.0
// @input float speedIncreasePerSecond = 0.05
// @input float maxSpeed = 4.0
// @input Component.ScriptComponent player
// @input int maxLives = 3

var score = 0;
var lives = script.maxLives;
var speed = script.startSpeed;
var running = true;

script.addScore = function(points) {
    if(!running) return;
    score += points;
    global.EventBus.emit("ScoreChanged", { score: score });
};

script.takeDamage = function() {
    if(!running) return;
    lives--;
    global.EventBus.emit("TakenDamage", { lives: lives });
    if (lives <= 0) {
        gameOver();
    }
};

script.getSpeed = function() {
    return speed;
};

function gameOver() {
    running = false;
    if (script.obstaclesContainer) {
        var children = script.obstaclesContainer.getChildrenCount();
        for (var i = children - 1; i >= 0; i--) {
            var c = script.obstaclesContainer.getChild(i);
            c.enabled = false;
            c.destroy();
        }
    }
}

script.restart = function() {
    score = 0;
    lives = 3;
    speed = script.startSpeed;
    running = true;
    updateUI();
};

updateUI();

// ускорение со временем
var event = script.createEvent("UpdateEvent");
event.bind(function(eventData) {
    if (!running || speed > script.maxSpeed) return;
    speed += script.speedIncreasePerSecond * eventData.getDeltaTime();
});