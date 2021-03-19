import React, { useEffect, useState } from "react";
import axios from "../apis/localhost";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/players");
      setPlayers(data);
    };
    getData();
  }, []);

  const renderResult = () => {
    const currentPlayers = players;
    // sort by wins as the primary factor
    currentPlayers.sort(function (a, b) {
      return b.wins - a.wins;
    });

    // if both have same wins, sort by average score
    currentPlayers.sort(function (a, b) {
      if (a.wins === b.wins) {
        return a.averageScore - b.averageScore;
      }
    });

    return currentPlayers.map((player, index) => {
      if (index >= 11) return;
      return (
        <div key={player.name}>
          Name <span className="name"> {player.name} </span>
          || wins <span className="wins"> {player.wins} </span>
          || Average Score:{" "}
          <span className="avs">
            {player.wins === 0 ? 0 : player.averageScore}{" "}
          </span>
          || Ranking: <span className="ranking">{index + 1}</span>
        </div>
      );
    });
  };

  return (
    <div>
      <h2>LeaderBoard Board</h2>

      <div className="bdr">
        Ranking:
        {renderResult()}
      </div>
    </div>
  );
};

export default LeaderBoard;
