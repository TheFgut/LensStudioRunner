// @input Component.AnimationPlayer animPlayer
var currenAnim = "";

function playRun() {
    if(currenAnim === "Run") return;
    currenAnim = "Run";
    script.animPlayer.playClip("Run");
}

function playJump() {
    if(currenAnim === "Jump") return;
    currenAnim = "Jump";
    script.animPlayer.playClip("Jump");
}

script.playRun = playRun;
script.playJump = playJump;