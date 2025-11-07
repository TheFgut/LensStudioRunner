// @input float len = 500.0
// @input string obstacleSpawnerName

var obstaclesSpawner;
script.len = script.len;

script.reset = function() {

};

/**
 * @param {Road} _road 
 */
function init(_road){
    var obj = script.getSceneObject().getChildByName("ObstacleSpawner");
    script.obstaclesSpawner = child.getComponent("ScriptComponent");
    
    obstaclesSpawner.init(_road);
}

script.init = init;