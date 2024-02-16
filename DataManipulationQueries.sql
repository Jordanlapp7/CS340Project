-- Selecting ALL Teams
SELECT * FROM Teams;

-- Get Team's name and stadium location by teamID
SELECT teamName, Stadiums.location
FROM Teams
LEFT JOIN Stadiums ON Teams.stadiumID = Stadiums.stadiumID
WHERE Teams.teamID = :teamIDInput;

-- Selecting ALL Players
SELECT * FROM Players;

-- Selecting ALL Players by teamID
SELECT *
FROM Players
JOIN TeamsPlayers ON Players.playerID = TeamsPlayers.playerID
WHERE TeamsPlayers.teamID = :teamIDInput;

-- Selecting ALL Players by position
SELECT *
FROM Players
JOIN Positions ON Players.positionID = Positions.positionID
WHERE Positions.description = :positionDescriptionInput;

-- Selecting all stats by playerID
SELECT * FROM PlayerStats WHERE playerID = :playerIDInput;

-- Selecting all stats by playerID and gameID
SELECT * FROM PlayerStats WHERE playerID = :playerIDInput AND gameID = :gameIDInput;

-- Selecting all player stats by teamID and gameID
SELECT *
FROM PlayerStats
JOIN TeamsPlayers ON PlayerStats.playerID = TeamsPlayers.playerID
JOIN Teams ON TeamsPlayers.teamID = Teams.teamID
JOIN TeamsGames ON Teams.teamID = TeamsGames.teamID
WHERE Teams.teamID = :teamIDInput AND TeamsGames.gameID = :gameIDInput;

-- Selecting ALL Coaches
SELECT * FROM Coaches;

-- Selecting Coach by teamID
SELECT *
FROM Coaches
JOIN TeamsCoaches ON Coaches.coachID = TeamsCoaches.coachID
WHERE TeamsCoaches.teamID = :teamIDInput;

-- Selecting ALL Games
SELECT * FROM Games;

-- Selecting ALL Games by teamID
SELECT *
FROM Games
JOIN TeamsGames ON Games.gameID = TeamsGames.gameID
WHERE TeamsGames.teamID = :teamIDInput;

-- Selecting all player stats by teamID and gameID
SELECT *
FROM PlayerStats
JOIN TeamsGames ON PlayerStats.gameID = TeamsGames.gameID
WHERE TeamsGames.teamID = :teamIDInput AND TeamsGames.gameID = :gameIDInput;

-- Selecting ALL Positions
SELECT * FROM Positions;

-- Selecting Position by positionID
SELECT * FROM Positions WHERE positionID = :positionIDInput;


-- Selecting ALL Stadiums
SELECT * FROM Stadiums;

-- Selecting Stadium by stadiumID
SELECT * FROM Stadiums WHERE stadiumID = :stadiumIDInput;

-- Selecting ALL Team-Player relationships
SELECT * FROM TeamsPlayers;

-- Selecting Team-Player relationship by teamID and playerID
SELECT * FROM TeamsPlayers WHERE teamID = :teamIDInput AND playerID = :playerIDInput;

-- Selecting ALL Team-Coach relationships
SELECT * FROM TeamsCoaches;

-- Selecting Team-Coach relationship by teamID and coachID
SELECT * FROM TeamsCoaches WHERE teamID = :teamIDInput AND coachID = :coachIDInput;

-- Selecting ALL Team-Game relationships
SELECT * FROM TeamsGames;

-- Selecting Team-Game relationship by teamID and gameID
SELECT * FROM TeamsGames WHERE teamID = :teamIDInput AND gameID = :gameIDInput;











-- Inserting a new team 
INSERT INTO Teams (teamName, stadiumID, inception, totalWins, totalGames)
VALUES (:teamNameInput, :stadiumIDInput, :inceptionInput, :totalWinsInput, :totalGamesInput);

-- Inserting a player
INSERT INTO Players(playerID, positionID, salary)
VALUES (:playerIDInput, :positionIDInput, :salaryInput);

-- Inserting a new coach
INSERT INTO Coaches(coachID, salary, totalWins, totalGames)
VALUES (:coachIDInput, :salaryInput, :totalWinsInput, :totalGamesInput);

-- Inserting a new game
INSERT INTO Games(homeTeamScore, awayTeamScore, totalHomeYards, totalAwayYards)
VALUES (:homeTeamScoreInput, :awayTeamScoreInput, :totalHomeYardsInput, :totalAwayYardsInput);

-- Inserting a player's game stats
INSERT INTO PlayerStats(gameID, playerID, points, assists, rebounds, fgAttempts, fgMade, ftAttempts, ftMade, threePointAttempts, threePointMade, blocks, steals, fouls, minutes)
VALUES (:gameIDInput, :playerIDInput, :pointsInput, :assistsInput, :reboundsInput, :fgAttemptsInput, :fgMadeInput, :ftAttemptsInput, :ftMadeInput, :threePointAttemptsInput, :threePointMadeInput, :blocksInput, :stealsInput, :foulsInput, :minutesInput);

-- Inserting a new stadium 
INSERT INTO Stadiums (location, capacity, indoors)
VALUES (:locationInput, :capacityInput, :indoorsInput);

-- Inserting a new position 
INSERT INTO Positions (positionID, description)
VALUES (:positionIDInput, :descriptionInput);

-- Inserting a new team-player relationship 
INSERT INTO TeamsPlayers (teamID, playerID)
VALUES (:teamIDInput, :playerIDInput);

-- Inserting a new team-coach relationship 
INSERT INTO TeamsCoaches (teamID, coachID)
VALUES (:teamIDInput, :coachIDInput);

-- Inserting a new team-game relationship 
INSERT INTO TeamsGames (teamID, gameID, isHomeTeam)
VALUES (:teamIDInput, :gameIDInput, :isHomeTeamInput);











-- Deleting a team
DELETE FROM Teams WHERE teamID = :teamIDInput;

-- Deleting a player
DELETE FROM Players WHERE playerID = :playerIDInput;

-- Deleting a coach 
DELETE FROM Coaches WHERE coachID = :coachIDInput;

-- Deleting a game
DELETE FROM Games WHERE gameID = :gameIDInput;

-- Deleting player stats
DELETE FROM PlayerStats WHERE playerID = :playerIDInput AND gameID = :gameIDInput;

-- Deleting a stadium
DELETE FROM Stadiums WHERE stadiumID = :stadiumIDInput;

-- Deleting a position
DELETE FROM Positions WHERE positionID = :positionIDInput;

-- Deleting a team-player relationship
DELETE FROM TeamsPlayers WHERE teamID = :teamIDInput AND playerID = :playerIDInput;

-- Deleting a team-coach relationship
DELETE FROM TeamsCoaches WHERE teamID = :teamIDInput AND coachID = :coachIDInput;

-- Deleting a team-game relationship
DELETE FROM TeamsGames WHERE teamID = :teamIDInput AND gameID = :gameIDInput;









-- Updating a team 
UPDATE Teams 
SET teamName = :teamNameInput, stadiumID = :stadiumIDInput, inception = :inceptionInput, totalWins = :totalWinsInput, totalGames = :totalGamesInput 
WHERE teamID = :teamIDInput;

-- Updating a player
UPDATE Players
SET positionID = :positionIDInput, salary = :salaryInput
WHERE playerID = :playerIDInput;

-- Updating a coach
UPDATE Coaches
SET salary = :salaryInput, totalWins = :totalWinsInput, totalGames = :totalGamesInput
WHERE coachID = :coachIDInput;

-- Updating a game
UPDATE Games
SET homeTeamScore = :homeTeamScoreInput, awayTeamScore = :awayTeamScoreInput, totalHomeYards = :totalHomeYardsInput, totalAwayYards = :totalAwayYardsInput
WHERE gameID = :gameIDInput;

-- Updating player stats
UPDATE PlayerStats
SET points = :pointsInput, assists = :assistsInput, rebounds = :reboundsInput, fgAttempts = :fgAttemptsInput, fgMade = :fgMadeInput, ftAttempts = :ftAttemptsInput, ftMade = :ftMadeInput, threePointAttempts = :threePointAttemptsInput, threePointMade = :threePointMadeInput, blocks = :blocksInput, steals = :stealsInput, fouls = :foulsInput, minutes = :minutesInput
WHERE playerID = :playerIDInput AND gameID = :gameIDInput;

-- Updating a stadium 
UPDATE Stadiums 
SET location = :locationInput, capacity = :capacityInput, indoors = :indoorsInput 
WHERE stadiumID = :stadiumIDInput;

-- Updating a position 
UPDATE Positions 
SET description = :descriptionInput 
WHERE positionID = :positionIDInput;

