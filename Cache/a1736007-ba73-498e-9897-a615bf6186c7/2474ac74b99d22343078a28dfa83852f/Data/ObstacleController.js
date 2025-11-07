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
    // берем скорость из GameManager, если доступна
    var speed = 2.0;
    if (gm && gm.getComponent) {
        // если GameManager — это SceneObject с скриптом, можно получить его scriptComponent и вызвать api.getSpeed
    } else if (global.gameManager && global.gameManager.getSpeed) {
        speed = global.gameManager.getSpeed();
    }
    // простое движение по Z к игроку
    var pos = transform.getLocalPosition();
    pos.z -= speed * eventData.getDeltaTime();
    transform.setLocalPosition(pos);

    // если ушли за камеру — удалить
    if (pos.z < script.destroyZ) {
        destroySelf();
        return;
    }

    // простая проверка коллизии (расстояние до игрока)
    if (script.player) {
        var ppos = script.player.getTransform().getWorldPosition();
        var wpos = transform.getWorldPosition();
        var dist = vec3.distance(ppos, wpos);
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