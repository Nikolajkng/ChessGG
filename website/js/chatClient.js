const socket = io('http://localhost:6969/');
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

//////////////////////////////// Channel listeners for server response/data ///////////////////////////////////

// Listens for server 'chat-messages' and output msg to client... 
socket.on('chat-message', data => {
    console.log(data.playerName+": "+data.message);
    appendMessage(data.playerName+": "+data.message);

})

// Listen for confirmation on user connection:
socket.on('user-connected', playerName => {
    appendMessage(playerName + " has joined!");
    console.log(playerName + " has joined!");
})

//////////////////////////////// Functions and channel senders ///////////////////////////////////

// On-press "Enter" event:
messageForm.addEventListener('submit', e => {
    // Stops the whole website from refresh on-press "Enter"...
    e.preventDefault();

    // Sending from client to server on submit
    const msg = messageInput.value;
    socket.emit('send-chat-message', msg);
    appendMessage("You: " + msg);

    // Clear input
    messageInput.value = '';
})

// Append message to chatbox:
function appendMessage(msg){
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    messageContainer.append(messageElement);

}

// Show player has joined in chat:
const playerName = prompt('Please enter your name 🖊️');
appendMessage('You joined');
socket.emit('new-player', playerName);
