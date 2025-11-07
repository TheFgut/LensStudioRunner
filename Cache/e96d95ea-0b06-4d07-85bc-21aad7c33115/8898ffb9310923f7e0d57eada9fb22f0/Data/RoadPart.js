// @input float length = 100.0

script.length = script.length;

// Если у сегмента есть какое-то состояние (например, препятствия / монеты), сбрасываем его
script.reset = function() {
    // Пример — включить все дочерние объекты
    var children = script.getSceneObject().getChildren();
    for (var i = 0; i < children.length; i++) {
        children[i].enabled = true;
    }
};