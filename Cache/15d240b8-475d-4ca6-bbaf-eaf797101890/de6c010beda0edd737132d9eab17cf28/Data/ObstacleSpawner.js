// @input Asset.ObjectPrefab obstaclePrefab
// @input Asset.ObjectPrefab coinPrefab
// @input SceneObject obstaclesParent
// @input float distBetweenGens = 10

var road;
var timer = 0;

function spawnObstacleOrCoin(zPos) {
    var r = Math.random();
    var prefab = r < 0.75 ? script.obstaclePrefab : script.coinPrefab;
    if (!prefab) return;
    var parent = script.obstaclesParent;
    var newObj = prefab.instantiate(parent);


    var transform = newObj.getTransform();
    var lanes = [road.laneXLeft, road.laneXMid, 
        road.laneXRight];
    var laneX = lanes[Math.floor(Math.random() * lanes.length)];
    print(laneX);
    transform.setLocalPosition(new vec3(laneX, 0.0, zPos));
    return newObj;
}

/**
 * @param {Road} _road 
 */
function init(_road){
    road = _road;
}

function generateObstacles(){
    spawnObstacleOrCoin(0);
}

script.init = init;
script.generateObstacles = generateObstacles;