// @input Asset.ObjectPrefab obstaclePrefab
// @input Asset.ObjectPrefab coinPrefab
// @input SceneObject obstaclesParent
// @input float distBetweenGens = 10

var player;
var road;
var timer = 0;

var segments = [];

function spawnObstacleOrCoin(zPos) {
    var r = Math.random();
    var prefab = r < 0.75 ? script.obstaclePrefab : script.coinPrefab;
    if (!prefab) return;
    var parent = script.obstaclesParent;
    var newObj = prefab.instantiate(parent);
    var obstacleScr = newObj.getComponent("Component.ScriptComponent");

    var lineWidth = road.lineWidth;
    obstacleScr.init(lineWidth, player);

    var transform = newObj.getTransform();
    var lanes = [road.laneXLeft, road.laneXMid, 
        road.laneXRight];
    var laneX = lanes[Math.floor(Math.random() * lanes.length)];
    transform.setLocalPosition(new vec3(laneX, 0.0, zPos));
    return newObj;
}

/**
 * @param {Road} _road 
 */
function init(_road, _player){
    player = _player;
    road = _road;
}

function generateObstacles(){
    spawnObstacleOrCoin(0);
}

function clearAll(){
    for (var i = 0; i < segments.length; i++){
        if(!segments[i]) continue;
        segments[i].getSceneObject().destroy();
    }
    segments.length = 0;
}

script.init = init;
script.generateObstacles = generateObstacles;
script.clearAll = clearAll;