// @input Component.TouchComponent touch

function onTapped(eventData) {
    print("Button tapped!");
    restartGame();
}

function restartGame() {
    print("Game restarted!");
}

script.touch.addTapEvent(onTapped);
