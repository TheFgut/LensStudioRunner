if (script.onAwake) {
    script.onAwake();
    return;
}
function checkUndefined(property, showIfData) {
    for (var i = 0; i < showIfData.length; i++) {
        if (showIfData[i][0] && script[showIfData[i][0]] != showIfData[i][1]) {
            return;
        }
    }
    if (script[property] == undefined) {
        throw new Error("Input " + property + " was not provided for the object " + script.getSceneObject().name);
    }
}
// @input float bitmojiType {"widget":"combobox", "values":[{"label":"None", "value":-1}, {"label":"Me", "value":0}, {"label":"My Friend", "value":1}, {"label":"My AI", "value":2}]}
// @input Component friendsComponent {"hint":"Optional: \nInstall Friends Custom Component from Asset Library\nAdd it to Scene \nReference added component here", "showIf":"bitmojiType", "showIfValue":"1"}
// @input int friendIndex {"showIf":"bitmojiType", "showIfValue":"1"}
// @ui {"widget":"separator"}
// @input bool mixamoAnimation = true {"label":"Adapt to Mixamo", "hint":"Adapt to a Mixamo style rig"}
// @ui {"widget":"separator"}
// @input bool autoDownload = true {"hint":"download using Bitmoji.download() api instead"}
// @ui {"widget":"separator"}
// @input int renderOrder
// @input bool castShadow = true {"hint":"To see this in action add shadow plane and enable shadows on the light source"}
// @ui {"widget":"separator"}
// @input bool autoMention = true {"hint":"Mention owner in recoded snap. Note - if enabled for multiple - last downloaded avatar's owner will be mentioned."}
// @input Asset.Material materialHolder
// @input bool printDebug = true
// @input Asset.ObjectPrefab loaderPrefab
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Assets/Scripts/Player/Bitmoji 3D.lsc/Bitmoji 3D.lsc/Bitmoji 3D");
Object.setPrototypeOf(script, Module.Bitmoji3D.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("bitmojiType", []);
    checkUndefined("friendIndex", [["bitmojiType","1"]]);
    checkUndefined("mixamoAnimation", []);
    checkUndefined("autoDownload", []);
    checkUndefined("renderOrder", []);
    checkUndefined("castShadow", []);
    checkUndefined("autoMention", []);
    checkUndefined("materialHolder", []);
    checkUndefined("printDebug", []);
    checkUndefined("loaderPrefab", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
