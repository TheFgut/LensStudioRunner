// @input Component.ScriptComponent screenManager
// @input Component.ScriptComponent gameManager

var state;

function toIdleState(){
    if(state === "Idle") return;
    state = "Idle";
    global.EventBus.emit("GameStateChanged", state);
    script.screenManager.showScreenByName("MenuScreen");
    script.gameManager.restart();
}


function toLooseState(){
    if(state === "Loose") return;
    state = "Loose";
    global.EventBus.emit("GameStateChanged", state);
    script.screenManager.showScreenByName("LooseScreen");
}


function toRunState(){
    if(state === "Run") return;
    state = "Run";
    global.EventBus.emit("GameStateChanged", state);
    script.screenManager.showScreenByName("GameScreen");
}

script.toIdleState = toIdleState;
script.toLooseState = toLooseState;
script.toRunState = toRunState;