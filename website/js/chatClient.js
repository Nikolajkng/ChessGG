const socket = io('http://localhost:6969/');
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");


// Listeninig for server... 
socket.on('chat-message', messageData => {
    // Appends the message received from server to client...
    console.log(messageData)
    appendMessage(messageData);

})

// On-press "Enter" event:
messageForm.addEventListener('submit', e => {

    // Stops the whole website from refresh on-press "Enter"...
    e.preventDefault();

    // Sending from client to server on submit
    const msg = messageInput.value;
    socket.emit('send-chat-message', msg);

    // Clear input
    messageInput.value = '';
})


// Append message to chatbox:
const appendMessage = (msg) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    messageContainer.append(messageElement);

}
