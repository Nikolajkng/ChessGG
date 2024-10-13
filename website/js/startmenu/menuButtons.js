let startBtn = document.getElementById("startgameBtn");
let modeBtn = document.getElementById("gamemodeBtn");
let settingsBtn = document.getElementById("settingsBtn");
let exitBtn = document.getElementById("exitBtn");


// Listens for clicks
startBtn.addEventListener('click', () => {

    // To prove that the user has interacted with the page (such permission to use media later is allowed)
    sessionStorage.setItem("userInteraction", "true");
});