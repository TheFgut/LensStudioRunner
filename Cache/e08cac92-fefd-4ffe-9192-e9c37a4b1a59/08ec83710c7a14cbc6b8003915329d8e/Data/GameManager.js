// @input Component.Text scoreText
// @input Component.Text livesText
// @input SceneObject obstaclesContainer
// @input float startSpeed = 2.0
// @input float speedIncreasePerSecond = 0.05

var score = 0;
var lives = 3;
var speed = script.startSpeed;
var running = true;

// Expose API
script.addScore = function(points) {
    if(!running) return;
    score += points;
    updateUI();
};

script.takeDamage = function() {
    if(!running) return;
    lives--;
    updateUI();
    if (lives <= 0) {
        gameOver();
    }
};

script.getSpeed = function() {
    return speed;
};

function updateUI() {
    if (script.scoreText) script.scoreText.text = "SCORE: " + score;
    if (script.livesText) script.livesText.text = "LIVES: " + lives;
}

function gameOver() {
    running = false;
    // Остановить все препятствия (они сами будут проверять running через game manager)
    // Можно показать UI рестарта — в простом варианте: перезагрузить сцену через скрипт
    // Для прототипа: удалить все дети obstaclesContainer
    if (script.obstaclesContainer) {
        var children = script.obstaclesContainer.getChildrenCount();
        for (var i = children - 1; i >= 0; i--) {
            var c = script.obstaclesContainer.getChild(i);
            c.enabled = false;
            c.destroy();
        }
    }
    // Здесь можете показать кнопку "Restart" (связывается с restart())
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
    if (!running) return;
    speed += script.speedIncreasePerSecond * eventData.getDeltaTime();
});