// @input Component.Text scoreText
// @input Component.Text livesText
// @input Component.ScriptComponent gameManager

function init(){
    global.EventBus.on("TakenDamage", updateUI);
    global.EventBus.on("ScoreChanged", updateUI);
    updateUI();
}

function updateUI() {
    if (script.scoreText) script.scoreText.text = "SCORE: " 
        + script.gameManager.score;
    if (script.livesText) script.livesText.text = "LIVES: " 
        + script.gameManager.lives;
}

init();