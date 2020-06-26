import React, { useState, useEffect } from "react";

import "./NQueens.css";

import { Message, Form, Button, Grid } from "semantic-ui-react";

const NQueens = () => {
  const [boardValue, setBoardValue] = useState();
  const [board, setBoard] = useState([]);
  const [currentGrid, setCurrentGrid] = useState([-1, -1]);
  const [messages, setMessages] = useState([]);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const isSafe = (board, row, col) => {
    var i, j;
    var N = board.length;

    /* Check this row on left side */
    for (i = 0; i < col; i++) if (board[row][i]) return false;

    /* Check upper diagonal on left side */
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
      if (board[i][j]) return false;

    /* Check lower diagonal on left side */
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
      if (board[i][j]) return false;

    return true;
  };

  // recursive call
  const solveNQ = async (board, col) => {
    if (col >= board.length) return true;

    for (var i = 0; i < board.length; i++) {
      setMessages((messages) => [...messages, `Checking row ${i} col  ${col}`]);

      //   console.log(i, col);
      setCurrentGrid([i, col]);
      await sleep(100);

      if (isSafe(board, i, col)) {
        setMessages((messages) => [
          ...messages,
          `Placing Queen at row ${i} col  ${col}`,
        ]);

        var tempBoard = board;
        tempBoard[i][col] = 1;
        setBoard(tempBoard);

        await sleep(1000);
        if (await solveNQ(board, col + 1)) {
          setCurrentGrid([-1, -1]);
          return true;
        }

        tempBoard = await board;
        setMessages((messages) => [
          ...messages,
          `Backtracking row ${i} col ${col}`,
        ]);

        tempBoard[i][col] = 0;
        setBoard(tempBoard);
        await sleep(1000);
      }
    }

    return false;
  };

  //   driver code
  const solve = () => {
    if (solveNQ(board, 0) === false) {
      console.log("Solution does not exist");
      return false;
    }
    return true;
  };

  useEffect(() => {
    // solve();
  }, []);

  const options = [
    { key: "4", text: "4 x 4", value: "4" },
    { key: "8", text: "8 x 8", value: "8" },
  ];

  const handleChange = (e, data) => {
    setBoardValue(parseInt(data.value));
    var tempBoard = [];
    var n = data.value;
    for (var i = 0; i < n; i++) {
      var row = [];
      for (var j = 0; j < n; j++) {
        row.push(0);
      }
      tempBoard.push(row);
    }

    setBoard(tempBoard);
  };
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Form.Select
              fluid
              label="Board Size"
              options={options}
              onChange={handleChange}
              placeholder="Board Size"
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Button color="green" onClick={solve} className="button">
              Visualize
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <br />
      {board.map((row, rowIndex) => {
        return (
          <div className="grid-row" key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <div
                  className={
                    rowIndex === currentGrid[0] && colIndex === currentGrid[1]
                      ? "grid-column current-grid"
                      : board[rowIndex][colIndex] === 1
                      ? "grid-column queen-grid"
                      : "grid-column"
                  }
                ></div>
              );
            })}
          </div>
        );
      })}
      <Message className="console">
        <Message.Header>Console</Message.Header>
        <Message.List items={messages} />
      </Message>
    </div>
  );
};
export default NQueens;
