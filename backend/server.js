const express = require('express');
const path = require('path')
const app = express();

const hostname = '127.0.0.1';
const port = 8080;

// Links the server to HTML file:
app.get('/', function(req, res){
res.sendFile(path.join(__dirname, '../website', 'index.html'))
});

// Server checks:
app.listen(port, function(){
    console.log(`Server running at http://${hostname}:${port}/`);

});
