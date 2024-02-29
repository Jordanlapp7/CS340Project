// Citation for the following lines of code: 7-59
// Date: 1/13/2024
// Copied from starter code on CS 340 Activity 2.
// Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456203?module_item_id=23809270


/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 4570;                 // Set a port number at the top so it's easy to change in the future


/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.send("The server is running!")
    });


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});