import _ from "lodash";
import "./GamePlay.css";
import React, { useEffect, useState } from "react";
import axios from "../apis/localhost";
import LeaderBoard from "./LeaderBoard";
const INSTRUCTION_MESS =
  "Game already end. Please Reset the game Or Chose Click Continue button to conitue";

const GamePlay = (props) => {
  const { player1Name, player2Name, server, isGamePlaying } = props;
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [isPlayer1Server, setIsPlayer1Server] = useState(null);
  const [totalRoundPoints, setTotalRoundPoints] = useState(1);
  const [result, setResult] = useState([]);

  useEffect(() => {
    // if server = 0 then player1 is the server
    if (server === 0) {
      setIsPlayer1Server(true);
    } else if (server === 1) {
      setIsPlayer1Server(false);
    }
    axios.get("/players").then((res) => console.log("fetch players"));
    setResult([]);
  }, [server, isGamePlaying]);

  // the game can only play if
  // there is a server && both players have names && isGamePlaying flag is true
  const checkGameCanPlay = () => {
    if (server !== 0 && server !== 1) {
      alert("Server not decided");
      return false;
    }
    if (_.isEmpty(player1Name) || _.isEmpty(player2Name)) {
      alert("Game cannot start. Player Name must not empty");
      return false;
    }

    if (!isGamePlaying) {
      alert(INSTRUCTION_MESS);
      return false;
    }
    return;
  };

  const handleIncreasePlayerPointClick = (number) => {
    if (checkGameCanPlay() === false) {
      return;
    }

    switch (number) {
      case 0:
        setPlayer1Score(player1Score + 1);
        setTotalRoundPoints(totalRoundPoints + 1);
        determineTheServer();
        break;
      case 1:
        setPlayer2Score(player2Score + 1);
        setTotalRoundPoints(totalRoundPoints + 1);
        determineTheServer();
        break;
      default:
        return;
    }
  };

  const determineTheServer = () => {
    if (totalRoundPoints % 2 === 0) {
      const result = isPlayer1Server ? false : true;
      setIsPlayer1Server(result);
    }
  };

  const passConditionsForWinner = (personScore, opponentScore) => {
    const OUT_RANGE = 2;
    if (personScore === 11 && opponentScore < 10) {
      return true;
    }

    if (
      personScore >= 10 &&
      opponentScore >= 10 &&
      personScore - opponentScore === OUT_RANGE
    ) {
      return true;
    }

    return null;
  };

  const updatePlayerRecordOnDatabase = (name, newScores) => {
    axios.post("/updateScore", {
      name: name,
      newScores: newScores,
    });
  };

  // if we find a winner, update their record on server,
  // clear the score of current Match, update the report
  const determinePlayer1IsTheWinner = () => {
    if (passConditionsForWinner(player1Score, player2Score)) {
      updatePlayerRecordOnDatabase(player1Name, player1Score);
      // to prevent send multiple player1 record to server
      setPlayer1Score(0);
      setPlayer2Score(0);
      const newReport = `${player1Name} is the winner against ${player2Name} with score ${player1Score} - ${player2Score}`;
      setResult([...result, newReport]);
      return true;
    }

    if (passConditionsForWinner(player2Score, player1Score)) {
      updatePlayerRecordOnDatabase(player2Name, player2Score);
      // to prevent send multiple player2 record to server
      setPlayer1Score(0);
      setPlayer2Score(0);
      const newReport = `${player2Name} is the winner against ${player1Name} with score ${player2Score} - ${player1Score}`;
      setResult([...result, newReport]);
      return false;
    }

    return null;
  };

  /**
   * Shows the report on the Game Report.
   * The default number is 10 reports
   * @constructor
   */
  const showReport = () => {
    const maximumReports = 10;
    return result.map((item, index) => {
      if (index >= maximumReports) return;
      return (
        <span key={item + index}>
          {item}
          <br />
        </span>
      );
    });
  };

  const resetTheGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTotalRoundPoints(0);
    props.setPlayer1Name("");
    props.setPlayer2Name("");
    props.setIsGamePlaying(true);
  };

  const continuePlaying = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTotalRoundPoints(0);
    props.setIsGamePlaying(true);
  };

  determinePlayer1IsTheWinner();
  return (
    <div className="row">
      <h2>The Game Play</h2>
      <div className="ui two column doubling stackable grid container">
        <div className="column">
          <h2
            style={{ fontSize: "20px", fontWeight: "600" }}
            className="ui header"
          >
            <span style={{ marginRight: "20px" }}>
              Player 1 name:
              {player1Name}
            </span>{" "}
            Score: {player1Score}
            <span style={{ color: "red" }}>
              {isPlayer1Server === true ? "  Server" : ""}
            </span>
            <br />
          </h2>

          <button
            className="ui green button"
            onClick={() => {
              handleIncreasePlayerPointClick(0);
            }}
          >
            Increase 1 point
          </button>
        </div>

        <div className="column">
          <h2
            style={{ fontSize: "20px", fontWeight: "600" }}
            className="ui header"
          >
            <span style={{ marginRight: "20px" }}>
              Player 2 name:
              {player2Name}
            </span>{" "}
            Score: {player2Score}
            <span style={{ color: "red" }}>
              {isPlayer1Server === false ? "   Server" : null}
            </span>
          </h2>
          <button
            className="ui green button"
            onClick={() => {
              handleIncreasePlayerPointClick(1);
            }}
          >
            Increase 1 point
          </button>
        </div>

        <div className="m-b">
          <button className="ui red button" onClick={resetTheGame}>
            Reset The Game
          </button>
          <button className="ui blue button" onClick={continuePlaying}>
            Continue Game With Current Players
          </button>
          <br />
        </div>
      </div>

      <hr />
      <div className="ui two column doubling stackable grid container">
        <div className="column">
          <h3>Game Report: </h3>
          <div>{showReport()}</div>
        </div>
        <div className="column">
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
