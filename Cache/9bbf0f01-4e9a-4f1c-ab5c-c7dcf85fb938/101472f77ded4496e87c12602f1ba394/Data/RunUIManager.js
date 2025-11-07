// @input Component.Text scoreText
// @input Component.Text livesText
// @input Component.Text distanceText
// @input Component.ScriptComponent gameManager

global.EventBus.on("Init", init);

function init(){
    global.EventBus.on("TakenDamage", updateUI);
    global.EventBus.on("ScoreChanged", updateUI);
    updateUI();
}

function updateUI() {
    if (script.scoreText) script.scoreText.text = "SCORE: " 
        + script.gameManager.getScore();
    if (script.livesText) script.livesText.text = "LIVES: " 
        + script.gameManager.getLives();
}