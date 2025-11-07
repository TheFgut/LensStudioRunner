// @input Asset.ObjectPrefab obstaclePrefab
// @input Asset.ObjectPrefab coinPrefab
// @input SceneObject obstaclesParent
// @input SceneObject playerObject
// @input float spawnInterval = 1.2
// @input Component.ScriptComponent road

var timer = 0;

function spawnObstacleOrCoin() {
    var r = Math.random();
    var prefab = r < 0.75 ? script.obstaclePrefab : script.coinPrefab;
    if (!prefab) return;
    var parent = script.obstaclesParent ? script.obstaclesParent : script.getSceneObject();
    var newObj = prefab.instantiate(parent);

    // позиционирование: задаём позицию по Z (впереди камеры) и по X выбираем полосу (например -0.6, 0, +0.6)
    var transform = newObj.getTransform();
    var lanes = [script.road.laneXLeft, script.road.laneXMid, 
        script.road.laneXRight];
    var laneX = lanes[Math.floor(Math.random() * lanes.length)];
    var spawnZ = 5.0; // дальше по Z
    transform.setLocalPosition(new vec3(laneX, 0.0, spawnZ));

    // можно записать в скрипт компонента препятствия начальную скорость (берётся из GameManager)
    // newObj.getComponent("Component.ScriptComponent").api.init(...);

    return newObj;
}



/**
 * @param {Road} _road 
 */
function init(_road){
    var event = script.createEvent("UpdateEvent");
    event.bind(function(eventData) {
        timer += eventData.getDeltaTime();
        if (timer >= script.spawnInterval) {
            timer = 0;
            spawnObstacleOrCoin();
        }
    });
}

script.init = init;