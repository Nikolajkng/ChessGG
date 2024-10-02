
const highlightPlayerMenu = () => {

    let whiteMenu = document.getElementById("whiteMenu");
    let blackMenu = document.getElementById("blackMenu");
    if (playerTurn === "White") {
        whiteMenu.classList.remove("whiteMenuDisable");
        whiteMenu.classList.add("whiteMenuEnable");
        blackMenu.classList.remove("blackMenuEnable");
        blackMenu.classList.add("blackMenuDisable");
    } else if (playerTurn === "Black") {
        blackMenu.classList.remove("blackMenuDisable");
        blackMenu.classList.add("blackMenuEnable");
        whiteMenu.classList.remove("whiteMenuEnable");
        whiteMenu.classList.add("whiteMenuDisable");

    }
}