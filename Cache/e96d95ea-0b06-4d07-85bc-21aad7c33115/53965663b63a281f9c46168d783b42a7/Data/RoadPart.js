// @input float len = 500.0
// @input Component.ScriptComponent obstaclesSpawner

script.len = script.len;

script.reset = function() {

};

/**
 * @param {Road} _road 
 */
function init(_road){
    var obstaclesSpawner = script.getSceneObject()
    .getChildByName("ObstacleSpawner");
    obstaclesSpawner.init(_road);
}

script.init = init;