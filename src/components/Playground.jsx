import React, { useState, useRef } from "react";
import produce from "immer";
import Cell from "./Cell";

/* helper functions */
import generateEmptyGrid from "../helpers/generateEmptyGrid";
import generateRandomGrid from "../helpers/generateRandomGrid";

/* constants */
import coordinates from "../constants/coordinates";
import marks from "../constants/marks";

/* styles */
import "../styles/playground.scss";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";

function Playground(props) {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [generations, setGenerations] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(100);

  // toggle the cell's state and background color manually
  const toggleLife = (i, j) => {
    if (!runningRef.current) {
      const newGrid = produce(grid, (gridCopy) => {
        gridCopy[i][j] = gridCopy[i][j] ? 0 : 1;
      });
      setGrid(newGrid);
    }
  };

  // create a reference of the running state that persists across renders and doesn't trigger a re-render
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = () => {
    // base case: if simulation is not running, stop the algorithm
    if (!runningRef.current) {
      return;
    }

    // recursive step
    // create a new grid with the new changes
    setGrid((currentGrid) => {
      return produce(currentGrid, (gridCopy) => {
        for (let i = 0; i < currentGrid.length; i++) {
          for (let j = 0; j < currentGrid.length; j++) {
            // check how many neighbors each cell has
            let neighbors = 0;
            coordinates.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (
                newI >= 0 &&
                newI < currentGrid.length &&
                newJ >= 0 &&
                newJ < currentGrid.length
              ) {
                neighbors += currentGrid[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (currentGrid[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    // keep calling yourself after 100 milliseconds
    setTimeout(() => {
      runSimulation();
      setGenerations((generation) => generation + 1);
    }, playbackSpeed);
  };

  const manualSimulation = () => {
    // create a new grid with the new changes
    setGrid((currentGrid) => {
      return produce(currentGrid, (gridCopy) => {
        for (let i = 0; i < currentGrid.length; i++) {
          for (let j = 0; j < currentGrid.length; j++) {
            // check how many neighbors each cell has
            let neighbors = 0;
            coordinates.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (
                newI >= 0 &&
                newI < currentGrid.length &&
                newJ >= 0 &&
                newJ < currentGrid.length
              ) {
                neighbors += currentGrid[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (currentGrid[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    // update the number of generations
    setGenerations((generation) => generation + 1);
  };

  const handleChange = (event, newValue) => {
    setPlaybackSpeed(newValue);
  };

  return (
    <div className="playground">
      <h2>Generations: {generations}</h2>
      <div className="grid">
        {grid.map((rows, i) =>
          rows.map((columns, j) => (
            <Cell
              key={`${i}-${j}`}
              // toggle the cell's state and background color manually
              x={i}
              y={j}
              grid={grid}
              toggleLife={toggleLife}
            />
          ))
        )}
      </div>
      <ButtonGroup>
        <Button
          disabled={running ? true : false}
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          Start
        </Button>
        <Button
          disabled={!running ? true : false}
          onClick={() => {
            setRunning(!running);
          }}
        >
          Stop
        </Button>
        <Button
          onClick={() => {
            manualSimulation();
          }}
        >
          Step
        </Button>
        <Button
          onClick={() => {
            setGrid(generateRandomGrid());
          }}
        >
          Random
        </Button>
        <Button
          onClick={() => {
            setGrid(generateEmptyGrid());
            setGenerations(0);
          }}
        >
          Clear
        </Button>
      </ButtonGroup>
      <Slider
        value={playbackSpeed}
        onChange={handleChange}
        min={100}
        max={1000}
        step={100}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
}

export default Playground;
