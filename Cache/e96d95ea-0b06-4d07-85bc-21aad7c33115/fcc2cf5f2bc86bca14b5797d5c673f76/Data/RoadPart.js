// @input float len = 500.0
// @input Component.ScriptComponent obstaclesSpawner

script.len = script.len;

script.reset = function() {
    script.obstaclesSpawner.clearAll();
    //script.obstaclesSpawner.generateObstacles();
};

/**
 * @param {Road} _road 
 */
function init(_road, gameManager){
    script.obstaclesSpawner.init(_road, gameManager);
    script.obstaclesSpawner.generateObstacles();
}

script.init = init;