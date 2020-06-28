import React from "react";

// Semantic UI Components
import { Tab, Container, Header } from "semantic-ui-react";

// Components
import LinearSearch from "./components/LinearSeach";
import BinarySearch from "./components/BinarySearch";
import JumpSearch from "./components/JumpSearch";

// Stylesheet
import "./App.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NQueens from "./components/NQueens";
import BFS from "./components/BFS";
import Fibonacci from "./components/Fibonacci";

const panes = [
  {
    menuItem: "Fibonacci",
    render: () => (
      <Tab.Pane>
        <Fibonacci />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "N Queen",
    render: () => (
      <Tab.Pane>
        <NQueens />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Linear Search",
    render: () => (
      <Tab.Pane>
        <LinearSearch />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Binary Search",
    render: () => (
      <Tab.Pane>
        <BinarySearch />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Jump Search",
    render: () => (
      <Tab.Pane>
        <JumpSearch />
      </Tab.Pane>
    ),
  },
];

const App = () => {
  return (
    <div className="root">
      <Container>
        <center>
          <Header as="h3">
            <FontAwesomeIcon icon={faSearch} className="color-red" />
            {/* <span className="color-red">
              {"     "} Search {"   "}
            </span> */}
            <span className="color-blue">
              {"   "} Algorithm {"  "}{" "}
            </span>
            <span className="color-green">Visualizer {"   "}</span>
          </Header>
        </center>
        <br />
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
        />

        <div className="footer">
          <center>
            {/* <p>
              Made By{" "}
              <a href="https://linkedin.com/in/saranrajshri" target="_blank">
                Shri Saran Raj
              </a>
            </p> */}
          </center>
        </div>
      </Container>
    </div>
  );
};

export default App;
