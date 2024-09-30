const socket = io(`${window.location.host}/`);
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

//////////////////////////////// Channel listeners for server response/data ///////////////////////////////////

// Listens for server 'chat-messages' and output msg to client... 
socket.on('chat-message', data => {
    appendMessage(data.playerName + ": " + data.message);

})

// Listen for user connection:
socket.on('user-connected', playerName => {
    appendMessage(playerName + " has joined!");
})


// Listen for user disconnection:
socket.on('user-disconnected', playerName => {
    appendMessage(playerName + " has disconnected!");
})

//////////////////////////////// Functions and channel senders ///////////////////////////////////

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


// Append message to chatbox:
function appendMessage(msg) {
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    messageStyle(messageElement);
    messageContainer.append(messageElement);
    messageElement.scrollIntoView();
    console.log("JWEOIEH")
    // messageContainer.scrollTo(messageContainer.getBoundingClientRect().bottom);
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