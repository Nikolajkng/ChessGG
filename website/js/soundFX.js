function moveSound() {
    var sound = new Audio("sound/move-self.mp3");
    sound.play();
}

function illegalMoveSound() {
    var sound = new Audio("sound/illegal.mp3");
    sound.play();
}


function captureSound() {
    var sound = new Audio("sound/capture.mp3");
    sound.play();
}

// If the user has interacted, allow sound to play (without further interaction, clicks etc...)
if (sessionStorage.getItem("userInteraction") === "true") {
    function gameStartSound() {
        var sound = new Audio("sound/notify.mp3");
        sound.play();
        console.log("triggered game start sound...")

    }
}