const socket = io(`${window.location.host}/`);
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

//////////////////////////////// Socket.emit (SEND TO SERVER - for broadcasting ///////////////////////////////////

// On-press "Enter" event:
messageForm.addEventListener('submit', e => {
    // Stops the whole website from refresh on-press "Enter"...
    e.preventDefault();

    // Sending from client to server on submit
    const msg = messageInput.value;
    // messageFilter();        TO DO ()
    socket.emit('send-chat-message', msg);
    appendMessage("me: " + msg);

    // Clear input
    messageInput.value = '';
})

/* PROMPT */
const playerName = prompt('Please enter your name 🖊️');
appendMessage('you joined!');
socket.emit('new-player', playerName);


//////////////////////////////// Socket.on (LISTEN FOR SERVER) ///////////////////////////////////

/* CONNECTION || DISCONNECTION*/
socket.on('user-connected', playerName => {
    appendMessage(playerName + " has joined!");
})

socket.on('user-disconnected', playerName => {
    appendMessage(playerName + " has disconnected!");
})

/* CHAT */
socket.on('chat-message', data => {
    appendMessage(data.playerName + ": " + data.message);
})

/* Collect player joined */
socket.on("new-user-list", console.log);



/* PIECE MOVEMENT */
socket.on('piece-has-moved', data => {
    const sValue = data.sValue
    const tValue = data.tValue
    const x = data.x;
    const y = data.y;
    const tX = data.tX;
    const tY = data.tY;
    const sButtonID = "button(" + x + "," + y + ")";
    const tButtonID = "button(" + tX + "," + tY + ")";
    const sBtn = document.getElementById(sButtonID);
    const tBtn = document.getElementById(tButtonID);
    console.log("Payload from (piece-has-moved) => " + data.sValue + " at (" + x + "," + y + ") move on " + data.tValue + " at (" + tX + "," + tY + ")");

    // Remove trail piece from old position:
    removePieceTrail(sBtn);

    // Remove attacked piece:
    removePieceTrail(tBtn);

    // Place selected piece on target using `data.sValue` instead of `selectedBtn`:
    const newPieceFigure = document.createElement("span");
    newPieceFigure.style.cssText = "font-size:" + pieceSize + ";";
    newPieceFigure.textContent = getPieceSymbol(sValue); // Use the server value
    tBtn.innerHTML = ''; // Clear previous piece
    tBtn.appendChild(newPieceFigure);

    // Update the values on pieces by swapping:
    sBtn.setAttribute('value', 'none'); // Old position should now be "none"
    tBtn.setAttribute('value', data.sValue); // New position takes the selected piece's value


    // Clears selection highlight:
    removeHighlight();

    // Switch player turn
    clickCount++;
})


//////////////////////////////// Functions ///////////////////////////////////

// Append message to chatbox:
function appendMessage(msg) {
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    messageStyle(messageElement);
    messageContainer.append(messageElement);
    messageElement.scrollIntoView();
}

function messageStyle(messageElement) {
    if (messageElement.innerText.includes("joined") || messageElement.innerText.includes("disconnect")) {
        messageElement.style.fontWeight = 'bold'
    }
    messageElement.style.backgroundColor = 'lightblue';
    messageElement.style.fontSize = '17px';
    messageElement.style.color = 'black';

    messageElement.style.borderRadius = '5px';
    messageElement.style.textAlign = 'left';

    messageElement.style.margin = '10px';
    messageElement.style.padding = '10px';
}