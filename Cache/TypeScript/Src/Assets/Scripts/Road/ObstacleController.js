var collisionRadius;
var transform = script.getTransform();
var running = true;
var player;
var scene = global.scene;
var gameManager;

function init(lineWidth, _gameManager){
    collisionRadius = lineWidth / 2;
    gameManager = _gameManager;
    player = gameManager.player;
    var updateEvent = script.createEvent("UpdateEvent");
    updateEvent.bind(function(eventData) {
        if (player) {
            var ppos = player.getTransform().getWorldPosition();
            var wpos = transform.getWorldPosition();
            var distance = ppos.distance(wpos);

            if (distance < collisionRadius) {
                onHit();
            }
        }
    });
}


function onHit() {
    destroySelf();
    gameManager.takeDamage();
    return;
}

function destroySelf() {
    try {
        script.getSceneObject().destroy();
    } catch (e) {}
}

script.init = init;