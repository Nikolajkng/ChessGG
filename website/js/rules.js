const legalMove = (selectedBtn, targetBtn) => {

    if (selectedBtn != null) {

        const targetValue = targetBtn.getAttribute("value");
        const selectValue = selectedBtn.getAttribute("value");
        console.log("checking legal move for: " + selectValue);
        console.log("target move is: " + targetValue)

        if (selectValue.includes("P")) {
            return pawnRules(selectedBtn, targetBtn);
        }


        return false;
    } else {
        // TO DO: add chess illegal move sound
        console.error("Error: Selectedbtn === null -> Cause: (1): not your turn, (2): not your pieces");
    }

}

const pawnRules = (mySelectBtn, targetBtn) => {
    const y = parseInt(mySelectBtn.getAttribute("x"));
    const tY = parseInt(targetBtn.getAttribute("x"));
    const diff = Math.abs(y - tY);
    console.log("SE MIG: " + targetBtn.getAttribute("value"));
    const noCapture = targetBtn.getAttribute("value") === "none";
    return (diff >= 0 && diff <= 2) && noCapture;
}