// @input float len = 500.0

script.length = script.len;

script.reset = function() {
    // Пример — включить все дочерние объекты
    var children = script.getSceneObject().getChildren();
    for (var i = 0; i < children.length; i++) {
        children[i].enabled = true;
    }
};