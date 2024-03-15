
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- Drops tables or replace tables
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Stadiums;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Coaches;
DROP TABLE IF EXISTS Games;
DROP TABLE IF EXISTS Positions;
DROP TABLE IF EXISTS TeamsPlayers;
DROP TABLE IF EXISTS TeamsCoaches;
DROP TABLE IF EXISTS TeamsGames;



--Create Tables
-- Create Teams table
CREATE TABLE Teams (
    teamID INT AUTO_INCREMENT UNIQUE NOT NULL,
    teamName VARCHAR(50) NOT NULL,
    stadiumID INT,
    inception DATE NOT NULL,
    totalWins INT NOT NULL,
    totalGames INT NOT NULL,
    PRIMARY KEY (teamID),
    FOREIGN KEY (stadiumID) REFERENCES Stadiums(stadiumID) ON DELETE CASCADE
);

-- Create Stadiums table
CREATE TABLE Stadiums (
    stadiumID INT AUTO_INCREMENT UNIQUE NOT NULL,
    location VARCHAR(145) NOT NULL,
    capacity INT NOT NULL,
    indoors TINYINT NOT NULL,
    PRIMARY KEY (stadiumID)
);

-- Create Players table
CREATE TABLE Players (
    playerID INT AUTO_INCREMENT UNIQUE NOT NULL,
    fname VARCHAR(45),
    lname VARCHAR(45),
    positionID VARCHAR(45),
    salary DECIMAL(10,2),
    PRIMARY KEY (playerID),
    FOREIGN KEY (positionID) REFERENCES Positions(positionID) ON DELETE CASCADE
);
-- Create Coaches table
CREATE TABLE Coaches (
    coachID INT AUTO_INCREMENT UNIQUE NOT NULL,
    fname VARCHAR(45),
    lname VARCHAR(45),
    salary DECIMAL(10,2),
    totalWins INT NOT NULL,
    totalGames INT NOT NULL,
    PRIMARY KEY (coachID)
);

-- Create Games table
CREATE TABLE Games (
    gameID INT AUTO_INCREMENT UNIQUE NOT NULL,
    season YEAR NOT NULL,
    weekNum INT NOT NULL,
    homeTeamScore INT NOT NULL,
    awayTeamScore INT NOT NULL,
    homeTeamTotalYards INT NOT NULL,
    awayTeamTotalYards INT NOT NULL,
    PRIMARY KEY (gameID)
);

-- Create Positions table
CREATE TABLE Positions (
    positionID VARCHAR(45) UNIQUE NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (positionID)
);

-- Create Intermediary tables
CREATE TABLE TeamsPlayers (
    teamPlayerID INT AUTO_INCREMENT UNIQUE NOT NULL,
    teamID INT,
    playerID INT,
    PRIMARY KEY (teamPlayerID),
    FOREIGN KEY (teamID) REFERENCES Teams(teamID) ON DELETE CASCADE,
    FOREIGN KEY (playerID) REFERENCES Players(playerID) ON DELETE CASCADE
);

CREATE TABLE TeamsCoaches (
    teamCoachID INT AUTO_INCREMENT UNIQUE NOT NULL,
    teamID INT,
    coachID INT,
    PRIMARY KEY (teamCoachID), -- Added comma here
    FOREIGN KEY (teamID) REFERENCES Teams(teamID) ON DELETE CASCADE,
    FOREIGN KEY (coachID) REFERENCES Coaches(coachID) ON DELETE CASCADE
);

CREATE TABLE TeamsGames (
    teamGameID INT AUTO_INCREMENT UNIQUE NOT NULL,
    teamID INT,
    gameID INT,
    isHomeTeam TINYINT NOT NULL,
    PRIMARY KEY (teamGameID),
    FOREIGN KEY (teamID) REFERENCES Teams(teamID) ON DELETE CASCADE,
    FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE
);



--Data Insertion

-- Stadiums table data
INSERT INTO Stadiums (stadiumID, location, capacity, indoors)
VALUES
(1, 'East Rutherford', 82500, 0),
(2, 'Pittsburgh', 68400, 0),
(3, 'Inglewood', 70000, 1);

-- Teams table data
INSERT INTO Teams (teamID, teamName, stadiumID, inception, totalWins, totalGames)
VALUES
(1, 'Jets', 1, '1959-01-01', 428, 983),
(2, 'Giants', 1, '1925-01-01', 721, 1404),
(3, 'Steelers', 2, '1933-07-08', 671, 1271),
(4, 'Rams', 3, '1936-01-01', 614, 1234),
(5, 'Chargers', 3, '1959-08-14', 483, 983);

-- Coaches table data
INSERT INTO Coaches (coachID, fname, lname, salary, totalWins, totalGames)
VALUES
(1, 'John', 'Doe', 5000000, 18, 51),
(2, 'Jane', 'Smith', 3000000, 15, 34),
(3, 'Michael', 'Johnson', 12500000, 173, 275),
(4, 'Emily', 'Williams', 15000000, 70, 115),
(5, 'Christopher', 'Brown', 16000000, 44, 64);

-- Positions table data
INSERT INTO Positions (positionID, description)
VALUES
('QB', 'The quarterback directs the offense, making key decisions and throwing passes.'),
('RB', 'A running back primarily runs with the ball and also assists in passing plays.'),
('WR', 'Wide receivers catch passes from the quarterback, aiming to advance the ball and score.'),
('TE', 'Tight ends play both offensive line and receiver roles, blocking and catching passes.'), 
('OL', 'Offensive linemen protect the quarterback and block for running plays.'), 
('DL', 'Defensive linemen confront the offensive line to stop runs and pressure the quarterback.'), 
('LB', 'Linebackers defend against the run, cover pass receivers, and rush the quarterback.'), 
('CB', 'Cornerbacks primarily cover wide receivers to prevent them from catching passes.'), 
('S', 'Safeties provide deep pass coverage and support in stopping the running play.'), 
('K', 'Kickers are responsible for field goals and kickoffs.'), 
('P', 'Punters kick the ball to the opposing team, aiming for field position over distance.');

-- Players table data
INSERT INTO Players (playerID, fname, lname, salary, positionID)
VALUES
(1, 'John', 'Doe', 6644689, 'QB'),
(2, 'Jane', 'Smith', 10091000, 'RB'),
(3, 'Michael', 'Johnson', 1688045, 'WR');

-- Games table data
INSERT INTO Games (gameID, season, weekNum, homeTeamScore, awayTeamScore, homeTeamTotalYards, awayTeamTotalYards)
VALUES
(1, 2024, 1, 17, 24, 354, 300),
(2, 2024, 1, 6, 27, 270, 191),
(3, 2024, 2, 25, 26, 389, 391);

-- TeamsPlayers table data
INSERT INTO TeamsPlayers (teamPlayerID, teamID, playerID)
VALUES
(1, 5, 1),
(2, 2, 2),
(3, 3, 3),
(4, 3, 2);

-- TeamsCoaches table data
INSERT INTO TeamsCoaches (teamCoachID, teamID, coachID)
VALUES
(1, 2, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 5),
(5, 4, 4);

-- TeamsGames table data
INSERT INTO TeamsGames (teamgameID, teamID, gameID, isHomeTeam)
VALUES
(1, 1, 2, 0),
(2, 3, 2, 1),
(3, 1, 1, 1),
(4, 4, 1, 0);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;