
const legalMove = (selectedBtn, targetBtn) => {

    if(selectedBtn != null){
        
    const targetValue = targetBtn.getAttribute("value");
    const selectValue = selectedBtn.getAttribute("value");

   switch (selectValue){
        case "whiteP": 
        pawnRules(selectedBtn, targetBtn);
        break;

    }

    console.log("checking legal move for: " + selectValue);
    console.log("target move is: " + targetValue )

    return true;
    } else {
        // TO DO: add chess illegal move sound
        console.error("Error: Selectedbtn === null -> Cause: (1): not your turn, (2): not your pieces");
    }

}

const pawnRules = () => {

}