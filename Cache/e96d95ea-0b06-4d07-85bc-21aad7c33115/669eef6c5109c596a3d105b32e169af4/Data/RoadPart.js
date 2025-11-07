// @input float len = 500.0
// @input string obstacleSpawnerName
// @input Component.ScriptComponent obstaclesSpawner

script.len = script.len;

script.reset = function() {

};

/**
 * @param {Road} _road 
 */
function init(_road){
    obstaclesSpawner.init(_road);
}

script.init = init;