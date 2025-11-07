// @input Component.AnimationPlayer animPlayer

function playRun() {
    script.animPlayer.playClip("Run");
}

function playJump() {
    script.animPlayer.playClip("Jump");
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
playRun();
});