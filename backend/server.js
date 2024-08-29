// Load node packages 
const http = require('node:http');
const fs = require('node:fs');

// Local host server
const hostname = '127.0.0.1';
const port = 8080;

//Relative path to html file
const htmlFile = "../website/html/index.html"  

// Server setup
const server = http.createServer(function (req, res) {
    // Load html file from path:
    fs.readFile(htmlFile, function (err, data) {
        if (err) {
            console.log("Failed to load html file...\n")
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length
            });
            res.write(data);
            res.end();
            console.log("Succesfully loaded html file! \n")
        }
    })
});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});