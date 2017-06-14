//'use strict';
//var http = require('http');
//var port = process.env.PORT || 1337;

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);

/**
 * ************************************************
 */
//var http = require("http");

//function onRequest(request, response) {
//    response.writeHead(200, { "Content-Type": "text/plain" });
//    response.write("Hello World 8888");
//    response.end();
//}

//http.createServer(onRequest).listen(8888);

/**************************************************************/
//http://www.drdobbs.com/tools/building-nodejs-projects-in-visual-studi/240169356?pgno=1
'use strict';
// Require the HTTP library
var http = require("http");
// Require the URL library
var url = require('url');

var port = process.env.port || 1337;

var server = http.createServer(function (request, response) {

    var parsedUrl = url.parse(request.url, true);
    var query = parsedUrl.query;

    if ((request.method == 'GET') && (parsedUrl.pathname == '/status')) {
        status(query, response);
    }
});

//http://localhost:1337/status?position=left
function status(query, response) {

    var cameraToQuery = 0;
    var detectedFacesCount = 0;
    var globalStatus = 'N/A';
    var lensStatus = 'N/A';
    var environmentScore = 0;
    if (query.position) {
        switch (query.position) {
            case 'front': cameraToQuery = 1;
                globalStatus = 'OK';
                lensStatus = 'OK';
                environmentScore = 4;
                detectedFacesCount = 300;
                break;
            case 'back': cameraToQuery = 2;
                globalStatus = 'OK';
                lensStatus = 'OK';
                environmentScore = 3;
                detectedFacesCount = 150;
                break;
            case 'left': cameraToQuery = 3;
                globalStatus = 'OK';
                lensStatus = 'OK';
                environmentScore = 3;
                detectedFacesCount = 200;
                break;
            case 'right': cameraToQuery = 4;
                globalStatus = 'OK';
                lensStatus = 'OK';
                environmentScore = 2;
                detectedFacesCount = 170;
                break;
        }
    }

    console.log("Requesting status information for camera #: " + cameraToQuery);

    // Write the response HEAD
    response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
    });

    var obj = {
        cameraId: cameraToQuery,
        globalStatus: globalStatus,
        lensStatus: lensStatus,
        environmentScore: environmentScore,
        detectedFacesCount: detectedFacesCount,
    };

    // Write the response body
    response.write(JSON.stringify(obj));
    // End of the response
    response.end();
}

// Start listening at port 1337 or the port number specified in process env port
server.listen(port);
console.log("Server is listening at port " + port);



//http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/
//https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
//