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

    // TEAMS ROUTES

    app.get('/teams.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Teams;"

        let query2 = "SELECT * FROM Stadiums;"
    
        db.pool.query(query1, function(error, rows, fields){

            let teams = rows;

            db.pool.query(query2, function(error, rows, fields){

                let stadiums = rows;

                res.render('teams', {data: teams, stadiums: stadiums})
            });
        });
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
    });

    app.post('/updateTeam', function(req, res){
        // Create and run the query on the database
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

        let query = `UPDATE Teams SET teamName = '${data['teamNameInput']}', stadiumID = ${stadiumID}, inception = '${data['inceptionInput']}', totalWins = ${totalWins}, totalGames = ${totalGames} WHERE teamID = '${data['teamID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/teams.hbs');
            }
        })
    });

    // DELETE an existing team
    app.post('/deleteTeam', function(req, res){
        let data = req.body;

        // Create sand run the query on the database
        let query = `DELETE FROM Teams WHERE teamID = '${data['teamID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/teams.hbs');
            }
        })
    });

app.get('/', function(req, res)
    {
        res.render('index');                    
    });                                        

    app.get('/players.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Players;"
    
        db.pool.query(query1, function(error, rows, fields){
            res.render('players', {data: rows})
        })
    });

    app.post('/addPlayer', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let salary = parseInt(data['salaryInput']);
        if (isNaN(salary))
        {
            salary = 'NULL'
        }
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Players (fname, lname, salary, positionID) VALUES ('${data['fnameInput']}', '${data['lnameInput']}', ${salary}, '${data['positionIDInput']}')`;
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
                res.redirect('/players.hbs');
            }
        })
    });

    app.post('/updatePlayer', function(req, res){
        // Create and run the query on the database
        let data = req.body;
        // Capture NULL values
        let salary = parseInt(data['salaryInput']);
        if (isNaN(salary))
        {
            salary = 'NULL'
        }
    
        let query = `UPDATE Players SET fname = '${data['fnameInput']}', lname = '${data['lnameInput']}', salary = ${salary}, positionID = '${data['positionIDInput']}' WHERE playerID = '${data['playerID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/players.hbs');
            }
        })
    });

    // DELETE an existing player
    app.post('/deletePlayer', function(req, res){
        let data = req.body;

        // Create sand run the query on the database
        let query = `DELETE FROM Players WHERE playerID = '${data['playerID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/players.hbs');
            }
        })
    });

    app.get('/teamsPlayers.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM TeamsPlayers;"

        let query2 = "SELECT * FROM Teams;"

        let query3 = "SELECT * FROM Players"

        db.pool.query(query1, function(error, rows, fields){
        
            let teamsPlayers = rows;

            db.pool.query(query2, function(error, rows, fields){

                let teams = rows;

                db.pool.query(query3, function(error, rows, fields){

                    let players = rows;
                    console.log(players);
                    return res.render('teamsPlayers', {data: teamsPlayers, teams: teams, players: players});

                });

            });
        });
    });

    app.post('/addTeamPlayer', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let teamID = parseInt(data['teamIDInput']);
        if (isNaN(teamID))
        {
            teamID = 'NULL'
        }
    
        let playerID = parseInt(data['playerIDInput']);
        if (isNaN(playerID))
        {
            playerID = 'NULL'
        }

        // Create the query and run it on the database
        query1 = `INSERT INTO TeamsPlayers (teamID, playerID) VALUES (${teamID}, ${playerID})`;
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
                res.redirect('/teamsPlayers.hbs');
            }
        })
    });

    app.post('/updateTeamPlayer', function(req, res){
        // Create and run the query on the database
        let data = req.body;
        
        // Capture NULL values
        let teamID = parseInt(data['teamIDInput']);
        if (isNaN(teamID))
        {
            teamID = 'NULL'
        }
    
        let playerID = parseInt(data['playerIDInput']);
        if (isNaN(playerID))
        {
            playerID = 'NULL'
        }

        let query = `UPDATE TeamsPlayers SET teamID = ${teamID}, playerID = ${playerID} WHERE teamPlayerID = '${data['teamPlayerID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/teamsPlayers.hbs');
            }
        })
    });

    // DELETE an existing team-player relationship
    app.post('/deleteTeamPlayer', function(req, res){
        let data = req.body;

        // Create sand run the query on the database
        let query = `DELETE FROM TeamsPlayers WHERE teamPlayerID = '${data['teamPlayerID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/teamsPlayers.hbs');
            }
        })
    });

    app.get('/coaches.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Coaches;"
    
        db.pool.query(query1, function(error, rows, fields){
            res.render('coaches', {data: rows})
        })
    });

    app.post('/addCoach', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let salary = parseInt(data['salaryInput']);
        if (isNaN(salary))
        {
            salary = 'NULL'
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
        query1 = `INSERT INTO Coaches (fname, lname, salary, totalWins, totalGames) VALUES ('${data['fnameInput']}', '${data['lnameInput']}', ${salary}, ${totalWins}, ${totalGames})`;
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
                res.redirect('/coaches.hbs');
            }
        })
    });

    app.post('/updateCoach', function(req, res){
        // Create and run the query on the database
        let data = req.body;

        // Capture NULL values
        let salary = parseInt(data['salaryInput']);
        if (isNaN(salary))
        {
            salary = 'NULL'
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

        let query = `UPDATE Coaches SET fname = '${data['fnameInput']}', lname = '${data['lnameInput']}', salary = ${salary}, totalWins = ${totalWins}, totalGames = ${totalGames} WHERE coachID = '${data['coachID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/coaches.hbs');
            }
        })
    });

    // DELETE an existing coach
    app.post('/deleteCoach', function(req, res){
        let data = req.body;

        // Create sand run the query on the database
        let query = `DELETE FROM Coaches WHERE coachID = '${data['coachID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/coaches.hbs');
            }
        })
    });

    app.get('/teamsCoaches.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM TeamsCoaches;"

        let query2 = "SELECT * FROM Teams;"

        let query3 = "SELECT * FROM Coaches"

        db.pool.query(query1, function(error, rows, fields){
        
            let teamsCoaches = rows;

            db.pool.query(query2, function(error, rows, fields){

                let teams = rows;

                db.pool.query(query3, function(error, rows, fields){

                    let coaches = rows;

                    return res.render('teamsCoaches', {data: teamsCoaches, teams: teams, coaches: coaches});

                });

            });
        });
    });

    app.post('/addTeamCoach', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let teamID = parseInt(data['teamIDInput']);
        if (isNaN(teamID))
        {
            teamID = 'NULL'
        }
    
        let coachID = parseInt(data['coachIDInput']);
        if (isNaN(coachID))
        {
            coachID = 'NULL'
        }

        // Create the query and run it on the database
        query1 = `INSERT INTO TeamsCoaches (teamID, coachID) VALUES (${teamID}, ${coachID})`;
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
                res.redirect('/teamsCoaches.hbs');
            }
        })
    });

    app.post('/updateTeamCoach', function(req, res){
        // Create and run the query on the database
        let data = req.body;

        // Capture NULL values
        let teamID = parseInt(data['teamIDInput']);
        if (isNaN(teamID))
        {
            teamID = 'NULL'
        }
    
        let coachID = parseInt(data['coachIDInput']);
        if (isNaN(coachID))
        {
            coachID = 'NULL'
        }

        let query = `UPDATE TeamsCoaches SET teamID = ${teamID}, coachID = ${coachID} WHERE teamCoachID = '${data['teamCoachID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/teamsCoaches.hbs');
            }
        })
    });

    // DELETE an existing team-coach relationship
    app.post('/deleteTeamCoach', function(req, res){
        let data = req.body;

        // Create sand run the query on the database
        let query = `DELETE FROM TeamsCoaches WHERE teamCoachID = '${data['teamCoachID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/teamsCoaches.hbs');
            }
        })
    });

    app.get('/games.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Games;"
    
        db.pool.query(query1, function(error, rows, fields){
            res.render('games', {data: rows})
        })
    });

    app.post('/addGame', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let weekNum = parseInt(data['weekNumInput']);
        if (isNaN(weekNum))
        {
            weekNum = 'NULL'
        }
    
        let homeTeamScore = parseInt(data['homeTeamScoreInput']);
        if (isNaN(homeTeamScore))
        {
            homeTeamScore = 'NULL'
        }
    
        let awayTeamScore = parseInt(data['awayTeamScoreInput']);
        if (isNaN(awayTeamScore))
        {
            awayTeamScore = 'NULL'
        }

        let homeTeamTotalYards = parseInt(data['homeTeamTotalYardsInput']);
        if (isNaN(homeTeamTotalYards))
        {
            homeTeamTotalYards = 'NULL'
        }
    
        let awayTeamTotalYards = parseInt(data['awayTeamTotalYardsInput']);
        if (isNaN(awayTeamTotalYards))
        {
            awayTeamTotalYards = 'NULL'
        }
        // Create the query and run it on the database
        query1 = `INSERT INTO Games (season, weekNum, homeTeamScore, awayTeamScore, homeTeamTotalYards, awayTeamTotalYards) VALUES ('${data['seasonInput']}', ${weekNum}, ${homeTeamScore}, ${awayTeamScore}, ${homeTeamTotalYards}, ${awayTeamTotalYards})`;
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
                res.redirect('/games.hbs');
            }
        })
    });

    app.post('/updateGame', function(req, res){
        // Create and run the query on the database
        let data = req.body;

        // Capture NULL values
        let weekNum = parseInt(data['weekNumInput']);
        if (isNaN(weekNum))
        {
            weekNum = 'NULL'
        }
    
        let homeTeamScore = parseInt(data['homeTeamScoreInput']);
        if (isNaN(homeTeamScore))
        {
            homeTeamScore = 'NULL'
        }
    
        let awayTeamScore = parseInt(data['awayTeamScoreInput']);
        if (isNaN(awayTeamScore))
        {
            awayTeamScore = 'NULL'
        }

        let homeTeamTotalYards = parseInt(data['homeTeamTotalYardsInput']);
        if (isNaN(homeTeamTotalYards))
        {
            homeTeamTotalYards = 'NULL'
        }
    
        let awayTeamTotalYards = parseInt(data['awayTeamTotalYardsInput']);
        if (isNaN(awayTeamTotalYards))
        {
            awayTeamTotalYards = 'NULL'
        }

        let query = `UPDATE Games SET season = '${data['seasonInput']}', weekNum = ${weekNum}, homeTeamScore = ${homeTeamScore}, awayTeamScore = ${awayTeamScore}, homeTeamTotalYards = ${homeTeamTotalYards}, awayTeamTotalYards = ${awayTeamTotalYards} WHERE gameID = '${data['gameID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/games.hbs');
            }
        })
    });

    // DELETE an existing game
    app.post('/deleteGame', function(req, res){
        let data = req.body;

        // Create sand run the query on the database
        let query = `DELETE FROM Games WHERE gameID = '${data['gameID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/games.hbs');
            }
        })
    });

    app.get('/teamsGames.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM TeamsGames;"

        let query2 = "SELECT * FROM Teams;"

        let query3 = "SELECT * FROM Games;"

        db.pool.query(query1, function(error, rows, fields){
        
            let teamsGames = rows;

            db.pool.query(query2, function(error, rows, fields){

                let teams = rows;

                db.pool.query(query3, function(error, rows, fields){

                    let games = rows;

                    return res.render('teamsGames', {data: teamsGames, teams: teams, games: games});

                });

            });
        });
    });

    app.post('/addTeamGame', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let teamID = parseInt(data['teamIDInput']);
        if (isNaN(teamID))
        {
            teamID = 'NULL'
        }
    
        let gameID = parseInt(data['gameIDInput']);
        if (isNaN(gameID))
        {
            gameID = 'NULL'
        }

        // Create the query and run it on the database
        query1 = `INSERT INTO TeamsGames (teamID, gameID, isHomeTeam) VALUES (${teamID}, ${gameID}, '${data['isHomeTeamInput']}')`;
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
                res.redirect('/teamsGames.hbs');
            }
        })
    });

    app.post('/updateTeamGame', function(req, res){
        // Create and run the query on the database
        let data = req.body;
        
        // Capture NULL values
        let teamID = parseInt(data['teamIDInput']);
        if (isNaN(teamID))
        {
            teamID = 'NULL'
        }
    
        let gameID = parseInt(data['gameIDInput']);
        if (isNaN(gameID))
        {
            gameID = 'NULL'
        }

        let query = `UPDATE TeamsGames SET teamID = ${teamID}, gameID = ${gameID}, isHomeTeam = '${data['isHomeTeamInput']}' WHERE teamGameID = '${data['teamGameID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/teamsGames.hbs');
            }
        })
    });

    // DELETE an existing team-player relationship
    app.post('/deleteTeamGame', function(req, res){
        let data = req.body;

        // Create sand run the query on the database
        let query = `DELETE FROM TeamsGames WHERE teamGameID = '${data['teamGameID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/teamsGames.hbs');
            }
        })
    });

    app.get('/stadiums.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Stadiums;"
    
        db.pool.query(query1, function(error, rows, fields){
            res.render('stadiums', {data: rows})
        })
    });

    app.post('/addStadium', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let capacity = parseInt(data['capacityInput']);
        if (isNaN(capacity))
        {
            capacity = 'NULL'
        }
    
        let indoors = parseInt(data['indoorsInput']);
        if (isNaN(indoors))
        {
            indoors = 'NULL'
        }
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Stadiums (location, capacity, indoors) VALUES ('${data['locationInput']}', ${capacity}, ${indoors})`;
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
                res.redirect('/stadiums.hbs');
            }
        })
    });

    app.post('/updateStadium', function(req, res){
        // Create and run the query on the database
        let data = req.body;

        // Capture NULL values
        let capacity = parseInt(data['capacityInput']);
        if (isNaN(capacity))
        {
            capacity = 'NULL'
        }
    
        let indoors = parseInt(data['indoorsInput']);
        if (isNaN(indoors))
        {
            indoors = 'NULL'
        }

        let query = `UPDATE Stadiums SET location = '${data['locationInput']}', capacity = ${capacity}, indoors = ${indoors} WHERE stadiumID = '${data['stadiumID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/stadiums.hbs');
            }
        })
    });

    // DELETE an existing stadium
    app.post('/deleteStadium', function(req, res){
        let data = req.body;

        // Create sand run the query on the database
        let query = `DELETE FROM Stadiums WHERE stadiumID = '${data['stadiumID']}'`;
        db.pool.query(query, function(error, rows, fields){

            // Check for errors
            if (error) {

                // Log the error and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there's no errors, it will redirect back to our root route and run the SELECT * FROM bsg_people 
            else
            {
                res.redirect('/stadiums.hbs');
            }
        })
    });

    app.get('/positions.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Positions;"
    
        db.pool.query(query1, function(error, rows, fields){
            res.render('positions', {data: rows})
        })
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});