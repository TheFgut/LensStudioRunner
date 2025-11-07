// @input Component.ScriptComponent gameStateMachine
// @input Component.ScriptComponent screenManager

global.EventBus.emit("Init", {});
script.gameStateMachine.toIdleState();
screenManager.showScreenByName("MenuScreen");