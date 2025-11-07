// @input SceneObject[] screens

var currentScreen = null;

/**
 * @param {string} name
 */
function showScreenByName(name) {
    for (var i = 0; i < script.screens.length; i++) {
        if (script.screens[i].name == name) {
            showScreen(i);
            return;
        }
    }
}

script.showScreenByName = showScreenByName;