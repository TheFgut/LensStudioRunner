// @input SceneObject[] screens

var currentScreen = null;

/**
 * @param {number} index
 */
function showScreen(index) {
    if (index < 0 || index >= script.screens.length) {
        print("ScreenManager: incorrect index" + index);
        return;
    }

    for (var i = 0; i < script.screens.length; i++) {
        script.screens[i].enabled = false;
    }

    script.screens[index].enabled = true;
    currentScreen = script.screens[index];
    print("ScreenManager: screen showed " + currentScreen.name);
}

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
    print("ScreenManager: screen with name '" + name + "' not found");
}

script.showScreen = showScreen;
script.showScreenByName = showScreenByName;