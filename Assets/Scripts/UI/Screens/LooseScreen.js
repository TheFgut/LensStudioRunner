// @input Component.TouchComponent mainMenuBut
// @input Component.ScriptComponent gameStateMachine

function goToMainMenu(eventData) {
    script.gameStateMachine.toIdleState();
}

script.mainMenuBut.onTap.add(goToMainMenu);
