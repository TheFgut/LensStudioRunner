// @input Component.TouchComponent startGameBut
// @input Component.ScriptComponent gameStateMachine

function startGame(eventData) {
    gameStateMachine.toRunState();
}

script.startGameBut.onTap.add(startGame);
