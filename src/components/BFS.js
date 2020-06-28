import React, { useState, useEffect, useRef } from "react";

import "./BFS.css";

class QItem {
  constructor(row, col, dist) {
    this.row = row;
    this.col = col;
    this.dist = dist;
  }
}

const BFS = () => {
  const [grid, setGrid] = useState([
    ["0", "*", "0", "s"],
    ["*", "0", "*", "*"],
    ["0", "*", "*", "*"],
    ["d", "*", "*", "*"],
  ]);
  const [data, setData] = useState(-1);

  const [visited, setVisited] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const minDistance = async () => {
    var source = new QItem(0, 0, 0);
    var N = grid.length;
    var M = grid[0].length;

    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "0") {
          var tempVisited = visited;
          tempVisited[i][j] = 1;
          setVisited(tempVisited);
        } else {
          var tempVisited = visited;
          tempVisited[i][j] = 0;
          setVisited(tempVisited);
        }

        // Finding source
        if (grid[i][j] === "s") {
          source.row = i;
          source.col = j;
        }
      }
    }

    // BFS
    var q = [];
    q.push(source);
    var tempVisited = visited;
    tempVisited[source.row][source.col] = 1;
    setVisited(tempVisited);
    await sleep(1000);

    while (q.length > 0) {
      var p = q[0];
      q.shift();

      //   console.log(q.length);

      if (grid[p.row][p.col] === "d") {
        setVisited(visited);
        break;
      }

      // moving up
      if (p.row - 1 >= 0 && visited[p.row - 1][p.col] == false) {
        q.push(new QItem(p.row - 1, p.col, p.dist + 1));

        var tempVisited = visited;
        tempVisited[p.row - 1][p.col] = true;

        setVisited(tempVisited);
      }

      // moving down
      if (p.row + 1 < N && visited[p.row + 1][p.col] == false) {
        q.push(new QItem(p.row + 1, p.col, p.dist + 1));

        var tempVisited = visited;
        tempVisited[p.row + 1][p.col] = true;
        setVisited(tempVisited);
      }

      // moving left
      if (p.col - 1 >= 0 && visited[p.row][p.col - 1] == false) {
        q.push(new QItem(p.row, p.col - 1, p.dist + 1));

        var tempVisited = visited;

        tempVisited[p.row][p.col - 1] = true;
        setVisited(tempVisited);
      }

      // moving right
      if (p.col + 1 < M && visited[p.row][p.col + 1] == false) {
        q.push(new QItem(p.row, p.col + 1, p.dist + 1));

        var tempVisited = visited;
        tempVisited[p.row][p.col + 1] = true;
        setVisited(tempVisited);
      }

      setData(data + 1);
    }

    return -1;
  };

  //   Component Did Mount
  useEffect(() => {
    console.log(minDistance());
  }, []);

  console.log(visited);
  return (
    <div>
      {data}
      {/* <button onClick={minDistance}>click</button> */}
      {visited.map((row, rowIndex) => {
        return (
          <div className="grid-row" key={rowIndex}>
            {row.map((column, columnIndex) => {
              return (
                <div
                  className={
                    visited[rowIndex][columnIndex]
                      ? "grid-column exploredNode"
                      : grid[rowIndex][columnIndex] === "s"
                      ? "grid-column startNode"
                      : "grid-column "
                  }
                >
                  {visited[rowIndex][columnIndex]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BFS;
