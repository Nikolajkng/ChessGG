const socket = io(`${window.location.host}/`);
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

//////////////////////////////// Socket.emit (SEND TO SERVER) ///////////////////////////////////

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

// Show player has joined in chat:
const playerName = prompt('Please enter your name 🖊️');
appendMessage('you joined!');
socket.emit('new-player', playerName);


//////////////////////////////// Socket.on (LISTEN FOR SERVER) ///////////////////////////////////

// Listens for server 'chat-messages' and output msg to client... 
socket.on('chat-message', data => {
    appendMessage(data.playerName + ": " + data.message);

})

// Listen for user connection:
socket.on('user-connected', playerName => {
    appendMessage(playerName + " has joined!");
})

socket.on("new-user-list", console.log);


// Listen for user disconnection:
socket.on('user-disconnected', playerName => {
    appendMessage(playerName + " has disconnected!");
})


// Listen for piece movement broadcast:
socket.on('piece-move-confirmed', () => {
    console.log("4) Received broadcast from server");
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