# pingPongApp

### Description:
This app is a demo version of a Ping Pong score tracking application. 
This app has the abilities of:
- letting people register name for competition
- Letting people increase their points to represent real scenerios
- Tracking points of both players for each games and announcing the winner at each game.
- Terminating game or continuing game
- Ranking people by their performance

### Installation:
Please make sure your local computer has installed Node.js environment. If not, download it here: https://nodejs.org/en/download/ . Please clone the github repo, after that go in "client" folder and run "npm install" with your terminal, go in "server" folder and run "npm install" with your terminal. 

### Running:
In "client" folder, with your terminal run "npm start". In "server" folder,  with your terminal run "npm run dev".

### Documentation:
---
name: Documentation
route: /
menu: Documents
fullpage: true
---

# Documentation

There are 4 components in this application, the App.js component,
the Registration component, the GamePlay.js component and the LeaderBoard.js component. Each has its own functionalities
and it will be explain gradually.

## App.js

> Purpose: The App component is the parent component that wraps around the remain components,
> holding global states to pass down to its children components

### States in App.js:

- player1Name |string|: stores name of the first person who register name.
- player2Name |string|: stores name of the second person who register name.
- server |number|: show who is the first to serve the ball, 0 denotes the first person, 1 denotes the second person.
- isGamePlaying |boolean|: determine whether there is a game playing or not, to prevent game play errorness.

## Registration.js

> Purpose: The Registration.js is the preperation step to start the game.
> It lets players register their names. Randomly picking the server and
> announces the server. Error detection is provided to guide the player
> follow the correct path

### Props in Registration.js

You can navigate to App.js to read more about the states that got passed down to props.

- player1Name |string|: passed down by the App.js. It stores name of the first person who register name.
- player2Name |string|: passed down by the App.js. It stores name of the second person who register name.
- server |number|: passed down by the App.js, show who is the first to serve the ball

### Functions in Registration.js

- handleRegesterPlayer1NameClick() -> void

When invoked, the name that is written on the player 1 input is going to be registered as player 1 name.
Error message appears when the name is empty or they are similar to the player 2 name.

- handleRegesterPlayer2NameClick() -> void

When invoked, the name that is written on the player 2 input is going to be registered as player 2 name.
Error message appears when the name is empty or they are similar to the player 1 name.

- chooseWhoServeFirst(number) -> number

When invoked, the function return a random number in the range of 0 to number. By default, there are 2 players
so **_(0 or 1)_** are expected to be return.

- nameOfTheServer() -> string

When invoked, based on the server **_(0 or 1) _**, return the name of player  
0 for name player 1, 1 for name player 2.

## GamePlay.js

> Purpose: this is the place where the score tracking is happenned. It followed few rules
>
> > The ping pong game will follow the 10 point system, where a player wins when he exceeds 10 points
> > If both players reach 10 points, the players need to win by 2 points to win
> > Serving switches every 2 points

> Addition: GamePlay.js encompassed the point management system that followed few rules
>
> > The point management system will allow the players to update their points per round and the point management system will also denote the server per round
> > The point management system will also announce the winner and update the players position on the leader board

### States in GamePlay.js:

- player1Score |number|: stores the player 1 score in the most current game.
- player2Score |number|: stores the player 2 score in the most current game.
- isPlayer1Server |boolean|: indicated whether player 1 is the server for graphical purpose
- totalRoundPoints |number|: stores the summation of player1Score and player2Score
- result |array of string|: stores the score ratio for game report.

### Props in GamePlay.js:

You can navigate to App.js to read more about the states that got passed down to props.

- player1Name |string|: passed down by the App.js. It stores name of the first person who register name.
- player2Name |string|: passed down by the App.js. It stores name of the second person who register name.
- server |number|: passed down by the App.js, show who is the first to serve the ball
- isGamePlaying |boolean|: passed down by the App.js, determine whether there is a game playing or not, to prevent game play errorness.

### Functions in GamePlay.js:

- checkGameCanPlay() -> void:

Will be automatically invoked whenever player not follow the game
instructions such as **_ not registering, not choose server _**

- handleIncreasePlayerPointClick(number) -> void:

Increase the score of a player by 1 point. It also increase the total game point and may switch the server as the result

- determineTheServer() -> void:

when invoked, based on the total round point to decide player1 or player2 is the server.

- passConditionsForWinner(number, number) -> boolean:

When invoked, based on pingpong rules, comparing the score of 2 player to determine who is the winner.

- updatePlayerRecordOnDatabase(string, number) -> void

Send request to server to update player record.

- determinePlayer1IsTheWinner() -> boolean:

When invoked, using passConditionsForWinner function result, to update the record of the winner on database, and the record of game report

## LeaderBoard.js 

> Purpose: Showing the top players based on few rules
>> The leaderboard should be visible at some point in the flow. 
>> Leaderboard should order leaderboard position by wins primary,  and lowest cumulative secondary.
>> Cumulative points only get counted for the winner

### States in LeaderBoard.js:
- players |array of objects|: stores the list of players records from server.

### Functions in LeaderBoard.js:
- renderResult() -> jsx: 

Ranking the players based on their statistic. Return the list of players visually


### Author:
This is the first version created by Bao Tran
