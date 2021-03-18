const scores = require("./database/scores");
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req,res) => {
    res.write("Welcome to the server");
})

// return records on database
app.get("/players", (req, res) => {
    res.json(scores);
})

// to register new player
app.post("/register", (req,res) => {
    const {name} = req.body;
    const isPlayerExist = scores.findIndex(
      (player) => player.name === name
    );

    if (isPlayerExist === -1) {
      const newRecord = {
        name: name,
        wins: 0,
        cummulativeScore: 0,
      };
      scores.push(newRecord);
    }
})

// update the player after he/she wins a game 
app.post("/updateScore", (req, res) => {
    console.log("updateScore", req.body);
    const {name, newScores} = req.body;
    // find player by name
    const index = scores.findIndex((player) => player.name === name);
    if (index != -1) {
        // new record
        let newWins = scores[index].wins + 1;
        let newCummulativeScore = scores[index].cummulativeScore + newScores;
        let newAverageScore = (newCummulativeScore / newWins).toFixed(2);
        // update record on databse
        scores[index].wins = newWins;
        scores[index].cummulativeScore = newCummulativeScore;
        scores[index].averageScore = newAverageScore;
        res.send(scores[index]);
    } else {
        res.send("error happens");
    }
}) 

app.listen(3001, () => {
  console.log("Listening on port 3001...");
});
