// @input Component.Text goldText
// @input Component.Text livesText
// @input Component.Text distanceText
// @input Component.ScriptComponent gameManager

global.EventBus.on("Init", init);

function init(){
    global.EventBus.on("TakenDamage", updateUI);
    global.EventBus.on("GoldChanged", updateUI);
    global.EventBus.on("RangeChanged", updateRange);
    updateUI();
}

function updateUI() {
    if (script.goldText) script.goldText.text = "Gold: " 
        + script.gameManager.getGold();
    if (script.livesText) script.livesText.text = "Lives: " 
        + script.gameManager.getLives();
}

function updateRange(){
    if (script.livesText) script.livesText.text = "Range: " 
        + script.gameManager.getRange();
}