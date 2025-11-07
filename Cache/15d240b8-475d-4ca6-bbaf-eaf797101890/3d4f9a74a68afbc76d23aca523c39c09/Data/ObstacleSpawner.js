// @input Asset.ObjectPrefab obstaclePrefab
// @input Asset.ObjectPrefab coinPrefab
// @input SceneObject obstaclesParent
// @input float distBetweenGens = 10
// @input float coinGenChance = 0.25

var gameManager;
var road;
var timer = 0;

var segments = [];

function spawnLine(zPos) {
    var elementsCount = Math.round(Math.random() * 2);
    var lanes = [road.laneXLeft, road.laneXMid, 
        road.laneXRight];
    for(var i = 0; i < elementsCount;i++){
        var r = Math.random();
        var prefab = r > script.coinGenChance ? script.obstaclePrefab 
            : script.coinPrefab;
        if (!prefab) return;
        var parent = script.obstaclesParent;
        var newObj = prefab.instantiate(parent);
        var obstacleScr = newObj.getComponent("Component.ScriptComponent");

        var lineWidth = road.lineWidth;
        obstacleScr.init(lineWidth, gameManager);

        segments.push(newObj);

        var transform = newObj.getTransform();
        var lineIndex = Math.floor(Math.random() * lanes.length);
        var laneX = lanes[lineIndex];
        lanes.splice(lineIndex, 1);
        transform.setLocalPosition(new vec3(laneX, 0.0, zPos));
    }
}

/**
 * @param {Road} _road 
 */
function init(_road, _gameManager){
    gameManager = _gameManager;
    road = _road;
}

function generateObstacles(){
    spawnLine(0);
}

function clearAll(){
    for (var i = 0; i < segments.length; i++){
        if(segments[i] === null) continue;
        var sceneObj = segments[i];
        if(isNull(sceneObj)) continue;
        sceneObj.destroy();
    }
    segments.length = 0;
}

script.init = init;
script.generateObstacles = generateObstacles;
script.clearAll = clearAll;