import React, { useState, useEffect } from "react";

import "./BinarySearch.css";
import { Button, Input, Divider } from "semantic-ui-react";

const BinarySearch = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [leftIndex, setLeftIndex] = useState(-1);
  const [rightIndex, setRightIndex] = useState(-1);
  const [target, setTarget] = useState(-1);
  const [resultIndex, setResultIndex] = useState(-1);

  const generateArray = () => {
    setCurrentIndex(-1);
    setLeftIndex(-1);
    setRightIndex(-1);
    setResultIndex(-1);

    var tempArray = [];
    var number = Math.floor(Math.random() * 100 + 1);
    for (var i = number; i < number + 20; i++) {
      tempArray.push(i);
    }
    setArray(tempArray);
  };

  // Component Did Mount
  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const handleChange = (e) => {
    setTarget(e.target.value);
  };

  // binary Search
  const binarySearch = async () => {
    var left = 0;
    setLeftIndex(left);
    var right = array.length;
    setRightIndex(right);

    while (left <= right) {
      var mid = Math.floor(left + (right - left) / 2);
      setCurrentIndex(mid);
      if (array[mid] === parseInt(target)) {
        setResultIndex(mid);
        break;
      } else if (array[mid] < target) {
        left = mid + 1;
        setLeftIndex(left);
        await sleep(1000);
      } else {
        right = mid - 1;
        setRightIndex(right);
        await sleep(1000);
      }
    }
  };
  return (
    <div>
      <Button primary onClick={generateArray}>
        Generate new array
      </Button>
      <div className="formWrapper">
        <Input
          focus
          placeholder="Element to be found"
          className="inputField"
          onChange={handleChange}
        />
        <Button color="green" onClick={binarySearch}>
          Visualize
        </Button>
      </div>
      <div className="node-wrapper">
        {array.map((value, index) => {
          return (
            <div
              key={index}
              className={
                index === currentIndex
                  ? "node currentNode"
                  : index >= leftIndex && index <= rightIndex
                  ? "node rangeNode"
                  : "node"
              }
            >
              {value}
            </div>
          );
        })}
      </div>

      {resultIndex === -1 ? (
        <div>
          <Divider />
          <p>
            <b>Result</b> : Not Found
          </p>
        </div>
      ) : (
        <div>
          <Divider />
          <p>
            <b>Result</b> : Found at index {resultIndex}
          </p>
        </div>
      )}
    </div>
  );
};

export default BinarySearch;
