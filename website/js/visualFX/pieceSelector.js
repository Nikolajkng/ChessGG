const highlightPiece = (btn) => {
    btn.classList.add('highlight');
}

const removePieceTrail = (btn) => {
    while (btn.firstChild) {
        btn.removeChild(btn.firstChild);
    }
}

const removeHighlight = () => {
    if (selectedBtn != null) {
        selectedBtn.classList.remove('highlight');
        selectedBtn.setAttribute('selected', 'no');
        canSelect = true;
    }
}