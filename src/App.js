import React from "react";
import Playground from "./components/Playground";
import Rules from "./components/Rules";
import Container from "@material-ui/core/Container";

/* styles */
import "./styles/app.scss";

function App() {
  return (
    <Container maxWidth={false}>
      <h1>
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
        >
          Conway's Game of Life
        </a>
      </h1>
      <div className="top-section">
        <Playground />
        <div className="right-section">
          <Rules />
        </div>
      </div>
    </Container>
  );
}

export default App;
