
const hideWaitingScreen = () => {
    console.log("hiding loading screen...")
    const waitDiv = document.getElementById("waitingScreen");
    const waitText = document.getElementById("waitingText");
    const loader = document.getElementById("loader");

    waitText.display = "none";
    loader.display = "none";
    waitDiv.display = "none";
    waitText.remove();
    loader.remove();
    waitDiv.remove();
}