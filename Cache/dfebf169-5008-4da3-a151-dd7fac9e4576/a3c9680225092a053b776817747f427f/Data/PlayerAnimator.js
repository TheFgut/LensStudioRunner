// @input Component.AnimationPlayer animPlayer

function playRun() {
    script.animPlayer.playClip("Run");
}

function playJump() {
    script.animPlayer.playClip("Jump");
}

script.api.playRun = playRun;