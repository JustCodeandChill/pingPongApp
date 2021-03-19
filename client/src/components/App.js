import React, { useState } from "react";
import Registration from "./Registration";
import GamePlay from "./GamePlay";

const App = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [server, setServer] = useState(null);
  const [isGamePlaying, setIsGamePlaying] = useState(true);

  return (
    <div className="ui container">
      {/* Registration */}
      <Registration
        player1Name={player1Name}
        setPlayer1Name={setPlayer1Name}
        player2Name={player2Name}
        setPlayer2Name={setPlayer2Name}
        server={server}
        setServer={setServer}
      />

      {/* Game Feild */}
      <GamePlay
        server={server}
        player1Name={player1Name}
        player2Name={player2Name}
        setPlayer1Name={setPlayer1Name}
        setPlayer2Name={setPlayer2Name}
        isGamePlaying={isGamePlaying}
        setIsGamePlaying={setIsGamePlaying}
      />
    </div>
  );
};

export default App;
