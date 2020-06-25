import React, { useState, useEffect } from "react";

// StyleSheet
import "./JumpSearch.css";

// Semantic UI
import { Button, Input, Divider } from "semantic-ui-react";

const JumpSearch = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [stepIndex, setStepIndex] = useState(-1);
  const [target, setTarget] = useState(-1);
  const [resultIndex, setResultIndex] = useState(-1);

  const generateArray = () => {
    setCurrentIndex(-1);
    setResultIndex(-1);
    setPrevIndex(-1);
    setStepIndex(-1);
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

  // jump Search
  const jumpSearch = async () => {
    var step = Math.floor(Math.sqrt(array.length));
    setStepIndex(step);
    await sleep(1000);
    var prev = 0;
    var n = array.length;
    while (array[Math.min(step, n) - 1] < target) {
      prev = step;
      setPrevIndex(prev);
      await sleep(1000);
      step += Math.floor(Math.sqrt(n));
      setStepIndex(step);
      await sleep(1000);
      if (prev >= n) {
        setCurrentIndex(-1);
        setResultIndex(-1);
        break;
      }
    }

    while (array[prev] < target) {
      prev++;
      setPrevIndex(prev);
      await sleep(1000);
      if (prev === Math.min(step, n)) {
        setCurrentIndex(-1);
        setResultIndex(-1);
        break;
      }
    }

    if (array[prev] === parseInt(target)) {
      setResultIndex(prev);
      setCurrentIndex(prev);
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
        <Button color="green" onClick={jumpSearch}>
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
                  : index === prevIndex
                  ? "node rangeNode"
                  : index >= stepIndex - Math.floor(Math.sqrt(array.length)) &&
                    index <= stepIndex
                  ? "node stepIndexNode"
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

export default JumpSearch;
