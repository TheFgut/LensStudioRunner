// @input SceneObject character
// @input float jumpHeight = 0.8
// @input float jumpTime = 0.4
// @input float laneXLeft = -50
// @input float laneXMid = 0.0
// @input float laneXRight = 50
// @input Component.ScriptComponent animator
// @input Component.ScriptComponent gameManager

var transform = script.getTransform();
var targetX = script.laneXMid;
var isJumping = false;
var jumpTimer = 0;

// текущая полоса: 0 left, 1 mid, 2 right
var lane = 1;

// touch handling — определяем свайп
var touchStart = null;
var touchStartPos = null;

function init() {
    var touchStartEvent = script.createEvent("TouchStartEvent");
    touchStartEvent.bind(function(eventData) {
        touchStart = Date.now();
        touchStartPos = new vec2(eventData.getTouchPosition().x, eventData.getTouchPosition().y);
    });

    var touchEndEvent = script.createEvent("TouchEndEvent");
    touchEndEvent.bind(function(eventData) {
        if (!touchStartPos) return;
        var endPos = new vec2(eventData.getTouchPosition().x, eventData.getTouchPosition().y);
        var delta = endPos.sub(touchStartPos);

        if (Math.abs(delta.x) > Math.abs(delta.y)) {
            if (delta.x > 0.02) moveRight();
            else if (delta.x < -0.02) moveLeft();
        } else {
            if (delta.y < -0.02) jump();
        }
        touchStartPos = null;
    });
}

init();

function moveLeft() {
    lane = Math.max(0, lane - 1);
    updateTargetX();
}

function moveRight() {
    lane = Math.min(2, lane + 1);
    updateTargetX();
}

function updateTargetX() {
    var lanes = [script.laneXLeft, script.laneXMid, script.laneXRight];
    targetX = lanes[lane];
}

// jump
function jump() {
    if (isJumping) return;
    isJumping = true;
    jumpTimer = 0;
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
    // горизонтальный смык (плавное перемещение в цель)
    var pos = transform.getLocalPosition();
    pos.x = pos.x + (targetX - pos.x) * Math.min(1, 10 * eventData.getDeltaTime());

    // прыжок: простой параболический подъем
    if (isJumping) {
        script.animator.playJump();
        jumpTimer += eventData.getDeltaTime();
        var t = jumpTimer / script.jumpTime;
        if (t >= 1) {
            isJumping = false;
            pos.y = 0;
        } else {
            // парабола: 4t(1-t) * height
            pos.y = 4 * t * (1 - t) * script.jumpHeight;
        }
    } else {
        script.animator.playRun();
        pos.y = 0;
    }

    transform.setLocalPosition(pos);
});