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
    var parent = script.getSceneObject();
    var obj = parent.getChild(0);
    if(!obj) return;
    obstaclesSpawner = obj.getComponent("Component.ScriptComponent");  
    print(parent.getChildrenCount());
    obstaclesSpawner.init(_road);
}

script.init = init;