// @input Component.ScriptComponent animManager

var currenAnim = "";

function playRun() {
    if(currenAnim === "Run") return;
    currenAnim = "Run";
    script.animManager.setState('Run', 0);
}

function playJump() {
    if(currenAnim === "Jump") return;
    currenAnim = "Jump";
    script.animManager.setState('Jump', 0);
}

script.playRun = playRun;
script.playJump = playJump;