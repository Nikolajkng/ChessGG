/////////////////////// imports //////////////////////////
const port = 6969;
const path = require('path')
const http = require('http')
const express = require('express');
const app = express();
const server = http.createServer(app);


//////////////////////// EXPRESS setup /////////////////////////////////

// Links the server to HTML file:
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../website', 'index.html'))
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../website', 'startgame.html'))
});

// Handles all static files in website folder (such as .css):
app.use(express.static(path.join(__dirname, '../website')));


// Webhook that responds on "git push"
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const {
    exec
} = require('child_process');

app.post("/super-secret-reload", async (req, res) => {
    console.log("RELOADING with body", req.body);
    res.sendStatus(200);
    exec("git pull");

})

// Load and initialize Socket.io (from socket.js)
require('./socket')(server);  // Passing the server instance to socket.js


// Server checks:
server.listen(port, function () {
    console.log(`Server running at http://localhost:${port}/`);

});