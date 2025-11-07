// @input float laneXLeft = -50
// @input float laneXMid = 0.0
// @input float laneXRight = 50

// @input Asset.ObjectPrefab roadPartPrefab
// @input int segmentCount = 5
// @input Component.ScriptComponent gameManager
// @input SceneObject roadParent
// @input float roadHideTreshold = 100

var segments = [];
var segmentLength = 0;
var isInitialized = false;

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
        if (roadPartScript && roadPartScript.len) {
            segmentLength = roadPartScript.len;
        } else {
            // Если не найдено — ставим значение по умолчанию
            segmentLength = 100;
                    print("no info!");
        }
        roadPartScript.init(script, script.gameManager);
        segments.push({
            obj: inst,
            transform: inst.getTransform(),
            script: roadPartScript
        });

        zPos += segmentLength;
    }

    isInitialized = true;
}

init();

// Обновление движения дороги
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
    if (!isInitialized) return;
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

    // Проверяем, ушёл ли первый сегмент за экран
    var first = segments[0];
    var firstPos = first.transform.getLocalPosition();

    if (firstPos.z < script.roadHideTreshold - segmentLength) {
        // Берем первый сегмент и переносим его в конец
        var last = segments[segments.length - 1];
        var lastPos = last.transform.getLocalPosition();

        var newZ = lastPos.z + segmentLength;
        first.transform.setLocalPosition(new vec3(0, 0, newZ));

        // Сбрасываем состояние сегмента, если нужно
        if (first.script && first.script.reset) {
            first.script.reset();
        }

        // Меняем порядок в массиве (перемещаем первый элемент в конец)
        segments.push(segments.shift());
    }
});