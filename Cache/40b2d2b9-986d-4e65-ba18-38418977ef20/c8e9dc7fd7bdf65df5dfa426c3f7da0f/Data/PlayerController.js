// @input SceneObject character
// @input float jumpHeight = 0.8
// @input float jumpTime = 0.4
// @input float laneXLeft = -50
// @input float laneXMid = 0.0
// @input float laneXRight = 50
// @input Component.ScriptComponent animator
// @input Component.ScriptComponent gameManager

var state = "";
var transform = script.getTransform();
var targetX = script.laneXMid;
var isJumping = false;
var jumpTimer = 0;

var lane = 1;
var touchStart = null;
var touchStartPos = null;

function init() {
    var touchStartEvent = script.createEvent("TouchStartEvent");
    touchStartEvent.bind(function(eventData) {
        touchStart = Date.now();
        touchStartPos = new vec2(eventData.getTouchPosition().x, 
            eventData.getTouchPosition().y);
    });

    var touchEndEvent = script.createEvent("TouchEndEvent");
    touchEndEvent.bind(function(eventData) {
        if (!touchStartPos) return;
        var endPos = new vec2(eventData.getTouchPosition().x,
            eventData.getTouchPosition().y);
        var delta = endPos.sub(touchStartPos);

        if (Math.abs(delta.x) > Math.abs(delta.y)) {
            if (delta.x > 0.02) moveLeft();
            else if (delta.x < -0.02) moveRight();
        } else {
            if (delta.y < -0.02) jump();
        }
        touchStartPos = null;
    });
    
    global.EventBus.on("GameOver", gameOver);

    var updateEvent = script.createEvent("UpdateEvent");
    updateEvent.bind(function(eventData) {
        if(state != "Run") return;
        var pos = transform.getLocalPosition();
        pos.x = pos.x + (targetX - pos.x) * 
            Math.min(1, 10 * eventData.getDeltaTime());

        if (isJumping) {
           script.animator.playJump();
            jumpTimer += eventData.getDeltaTime();
            var t = jumpTimer / script.jumpTime;
            if (t >= 1) {
                isJumping = false;
                pos.y = 0;
            } else {
                pos.y = 4 * t * (1 - t) * script.jumpHeight;
            }
        } else {
            script.animator.playRun();
            pos.y = 0;
        }

        transform.setLocalPosition(pos);
    });
}

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

function jump() {
    if (isJumping) return;
    isJumping = true;
    jumpTimer = 0;
}

function gameOver(isDead){
    if(isDead) toDeadState();
    else toIdleState();

}

function toDeadState(){
    state = "Dead";
    script.animator.playDead();
}

function toIdleState(){
    if(state === "Idle") return;
    state = "Idle";
    script.animator.playIdle();
}

function toRunState(){
    if(state === "Run") return;
    state = "Run";
    script.animator.playRun();
}

function gameStateChanged(newState){
    print(newState);
    if(newState === "Idle") toIdleState();
    else if(newState === "Dead") toDeadState();
    else if (newState === "Run") toRunState();
}

global.EventBus.on("Init", init);
global.EventBus.on("GameStateChanged", gameStateChanged);