// Citation for the following lines of code: 7-59
// Date: 2/29/2024
// Copied from starter code on CS 340 Activity 2.
// Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456203?module_item_id=23809270


/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        =  2358;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Form Data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.

app.get('/teams.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Teams;"

        db.pool.query(query1, function(error, rows, fields){
            res.render('teams', {data: rows})
        })
    });

app.post('/addTeam', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let stadiumID = parseInt(data['stadiumIDInput']);
    if (isNaN(stadiumID))
    {
        stadiumID = 'NULL'
    }

    let totalWins = parseInt(data['totalWinsInput']);
    if (isNaN(totalWins))
    {
        totalWins = 'NULL'
    }

    let totalGames = parseInt(data['totalGamesInput']);
    if (isNaN(totalGames))
    {
        totalGames = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Teams (teamName, stadiumID, inception, totalWins, totalGames) VALUES ('${data['teamNameInput']}', ${stadiumID}, '${data['inceptionInput']}', ${totalWins}, ${totalGames})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/teams.hbs');
        }
    })
})

app.get('/players.hbs', function(req, res)
    {
        res.render('players')
    });

app.get('/teamsPlayers.hbs', function(req, res)
    {
        res.render('teamsPlayers')
    });

app.get('/coaches.hbs', function(req, res)
    {
        res.render('coaches')
    });

app.get('/teamsCoaches.hbs', function(req, res)
    {
        res.render('teamsCoaches')
    });

app.get('/games.hbs', function(req, res)
    {
        res.render('games')
    });

app.get('/teamsGames.hbs', function(req, res)
    {
        res.render('teamsGames')
    });

app.get('/stadiums.hbs', function(req, res)
    {
        res.render('stadiums')
    });

app.get('/positions.hbs', function(req, res)
    {
        res.render('positions')
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});