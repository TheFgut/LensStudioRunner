// @input float lineWidth = 50

// @input Asset.ObjectPrefab roadPartPrefab
// @input int segmentCount = 5
// @input Component.ScriptComponent gameManager
// @input SceneObject roadParent
// @input float roadHideTreshold = 100

script.laneXLeft = -script.lineWidth;
script.laneXMid = 0;
script.laneXRight = script.lineWidth;

var segments = [];
var segmentLength = 0;
var isInitialized = false;
var stopGeneration = false;

function init() {
    if (!script.roadPartPrefab) {
        print("❌ Road: нет префаба сегмента дороги!");
        return;
    }

    if (!script.gameManager) {
        print("❌ Road: не назначен GameManager!");
        return;
    }

    // Спавним сегменты подряд
    var zPos = 0;
    for (var i = 0; i < script.segmentCount; i++) {
        var inst = script.roadPartPrefab.instantiate(script.roadParent);
        inst.getTransform().setLocalPosition(new vec3(0, 0, zPos));
        
        // Получаем длину сегмента
        var roadPartScript = inst.getComponent("Component.ScriptComponent");
        segmentLength = roadPartScript.len;
        roadPartScript.init(script, script.gameManager);
        segments.push({
            obj: inst,
            transform: inst.getTransform(),
            script: roadPartScript
        });

        zPos += segmentLength;
    }
    global.EventBus.on("GameOVer", stopRoadGeneration);
    isInitialized = true;
}

init();

// Обновление движения дороги
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
    if (!isInitialized || stopGeneration) return;
    if (!script.gameManager
    || !script.gameManager.getSpeed) return;

    var speed = script.gameManager.getSpeed();
    var delta = eventData.getDeltaTime();
    var moveZ = -speed * delta;

    for (var i = 0; i < segments.length; i++) {
        var t = segments[i].transform;
        var pos = t.getLocalPosition();
        pos.z += moveZ;
        t.setLocalPosition(pos);
    }

    var first = segments[0];
    var firstPos = first.transform.getLocalPosition();

    if (firstPos.z < script.roadHideTreshold - segmentLength) {
        var last = segments[segments.length - 1];
        var lastPos = last.transform.getLocalPosition();

        var newZ = lastPos.z + segmentLength;
        first.transform.setLocalPosition(new vec3(0, 0, newZ));

        if (first.script) {
            first.script.reset();
        }

        segments.push(segments.shift());
    }
});

function stopRoadGeneration(){
    print("stopped");
    stopGeneration = true;
}