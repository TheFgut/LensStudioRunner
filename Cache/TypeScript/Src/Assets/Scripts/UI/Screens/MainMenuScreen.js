// @input Component.TouchComponent startGameBut
// @input Component.ScriptComponent gameStateMachine

function startGame(eventData) {
    script.gameStateMachine.toRunState();
}

script.startGameBut.onTap.add(startGame);
