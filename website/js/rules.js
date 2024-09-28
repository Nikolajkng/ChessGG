
const legalMove = (selectedBtn, targetBtn) => {
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
}

const pawnRules = () => {

}