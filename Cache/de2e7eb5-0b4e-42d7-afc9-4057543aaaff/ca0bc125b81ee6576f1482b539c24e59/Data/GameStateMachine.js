var state;

function toIdleState(){
    if(state === "Idle") return;
    state = "Idle";
    global.EventBus.emit("GameStateChanged", state);
}


function toLooseState(){
    if(state === "Loose") return;
    state = "Loose";
    global.EventBus.emit("GameStateChanged", state);
}


function toRunState(){
    if(state === "Run") return;
    state = "Run";
    global.EventBus.emit("GameStateChanged", state);
}

script.toIdleState = toIdleState;
script.toLooseState = toLooseState;
script.toRunState = toRunState;