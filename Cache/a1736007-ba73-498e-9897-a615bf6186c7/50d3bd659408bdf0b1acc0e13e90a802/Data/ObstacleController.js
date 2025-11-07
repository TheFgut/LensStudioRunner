// @input SceneObject player
// @input Asset.ObjectPrefab selfPrefab // (необязательно)
// @input float destroyZ = -1.5
// @input float collisionRadius = 0.4
// @input string gameManagerObjectName = "GameManager"

var transform = script.getTransform();
var gm = null;
var running = true;

// получить GameManager (по имени или назначьте ссылку через инспектор)
var scene = global.scene;
try {
    gm = scene.getRootObject(0).findFirstChildByName(script.gameManagerObjectName);
} catch(e) {
    // лучше прокинуть ссылку на GameManager через @input
}

// update движение
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
    // простая проверка коллизии (расстояние до игрока)
    if (script.player) {
        var ppos = script.player.getTransform().getWorldPosition();
        var wpos = transform.getWorldPosition();
        var dist = (ppos - wpos).dist;
        if (dist < script.collisionRadius) {
            // столкновение
            onHit();
        }
    }
});

function onHit() {
    // если это монетка — addScore; если препятствие — takeDamage
    // Пример: если имя объекта содержит "Coin":
    var name = script.getSceneObject().getName().toLowerCase();
    if (name.indexOf("coin") !== -1) {
        if (global.gameManager && global.gameManager.addScore) {
            global.gameManager.addScore(10);
        }
        destroySelf();
    } else {
        if (global.gameManager && global.gameManager.takeDamage) {
            global.gameManager.takeDamage();
        }
        // чтобы не засчитать двойное столкновение — помечаем и удаляем
        destroySelf();
    }
}

function destroySelf() {
    try {
        script.getSceneObject().destroy();
    } catch (e) {}
}