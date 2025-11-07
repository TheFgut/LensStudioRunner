// @input Component.AnimationPlayer animPlayer

function playRun() {
    script.animPlayer.play("Run");
}

function playJump() {
    script.animPlayer.play("Jump");
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
script.playRun();
});