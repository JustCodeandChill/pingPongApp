import React, { useRef } from "react";
import {
  NAME_REGISTRATION_ERR_MESSAGE,
  SERVER_PICKING_ERR_MESSAGE,
} from "../configs";

import axios from "../apis/localhost";
import _ from "lodash";

const Registration = (props) => {
  const { player1Name, player2Name, server } = props;
  const inputEl1 = useRef(null);
  const inputEl2 = useRef(null);
/* 
    If a player register a name that is not appear in the database, 
    A new record will be created by the server.
*/
  const handleRegesterPlayer1NameClick = async () => {
    if (
      inputEl1.current.value !== inputEl2.current.value &&
      !_.isEmpty(inputEl1.current.value)
    ) {
      await props.setPlayer1Name(inputEl1.current.value);
      axios.post("/register", {
        name: inputEl1.current.value,
      });
    } else {
      alert(NAME_REGISTRATION_ERR_MESSAGE);
      return;
    }
  };

  const handleRegesterPlayer2NameClick = async () => {
    if (
      inputEl1.current.value !== inputEl2.current.value &&
      !_.isEmpty(inputEl2.current.value)
    ) {
      await props.setPlayer2Name(inputEl2.current.value);
      axios.post("/register", {
        name: inputEl2.current.value,
      });
    } else {
      alert(NAME_REGISTRATION_ERR_MESSAGE);
      return;
    }
  };

  const chooseWhoServeFirst = (numberOfPlayers) => {
    if (!_.isEmpty(inputEl1.current.value)) {
      const server = Math.floor(Math.random() * Math.floor(numberOfPlayers));
      props.setServer(server);
    } else {
      alert(SERVER_PICKING_ERR_MESSAGE);
    }
  };

  const nameOfTheServer = () => {
    if (server === 0) {
      return player1Name;
    } else if (server === 1) {
      return player2Name;
    }
  };

  const theServer = nameOfTheServer();
  return (
    <div className="row">
      <h2>Name Registration</h2>
      <p style={{ color: "red" }}>
        Important: Players must regiester his/her name and choose the Server
        before starting the match.
      </p>
      <div className="ui two column doubling stackable grid container">
        <div className="column">
          Player 1: {player1Name} <br />
          <div className="ui input">
            <input type="text" ref={inputEl1} placeholder="Enter your name" />
            <button
              style={{ marginLeft: "10px" }}
              className="ui green button"
              onClick={handleRegesterPlayer1NameClick}
            >
              Confirm name
            </button>{" "}
          </div>
        </div>
        <div className="column">
          Player 2: {player2Name} <br />
          <div className="ui input">
            <input
              className="ui input"
              type="text"
              ref={inputEl2}
              placeholder="Enter your name"
            />
            <button
              style={{ marginLeft: "10px" }}
              className="ui green button"
              onClick={handleRegesterPlayer2NameClick}
            >
              Confirm name
            </button>{" "}
          </div>
        </div>

        <br />
      </div>
      <br />
      <button
        className="large ui blue button"
        onClick={() => chooseWhoServeFirst(2)}
      >
        Choose who serve
      </button>
      <br />
      <h3>The person who serve first is {theServer}</h3>
      <hr />
    </div>
  );
};

export default Registration;
