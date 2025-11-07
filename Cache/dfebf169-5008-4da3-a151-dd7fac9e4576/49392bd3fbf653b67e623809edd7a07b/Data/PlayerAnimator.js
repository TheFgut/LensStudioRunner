// @input Component.AnimationPlayer animPlayer

function playRun() {
    script.animPlayer.play("Run");
}

function playJump() {
    script.animPlayer.play("Jump");
}

module.exports = {
  playRun: playRun,
  playJump: playJump,
};