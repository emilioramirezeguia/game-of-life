import React, { useState, useRef, useCallback } from "react";
import produce, { produceWithPatches } from "immer";

/* helper functions */
import generateEmptyCanvas from "../helpers/generateEmptyCanvas";
import generateRandomCanvas from "../helpers/generateRandomCanvas";

/* styles */
import "../styles/playground.scss";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import gliderPreset from "../helpers/gliderPreset";
import lightweightSpaceshipPreset from "../helpers/lightweightSpaceshipPreset.js";

// values used to help count a cell's number of neighbors inside runSimulation()
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function Playground(props) {
  const [grid, setGrid] = useState(() => generateEmptyCanvas());
  const [running, setRunning] = useState(false);
  const [generations, setGenerations] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(100);

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
            operations.forEach(([x, y]) => {
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
            operations.forEach(([x, y]) => {
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

  // values used for slider simulation speed
  const marks = [
    {
      value: 100,
      label: "0.1s",
    },
    {
      value: 200,
      label: "0.2s",
    },
    {
      value: 300,
      label: "0.3s",
    },
    {
      value: 400,
      label: "0.4s",
    },
    {
      value: 500,
      label: "0.5s",
    },
    {
      value: 600,
      label: "0.6s",
    },
    {
      value: 700,
      label: "0.7s",
    },
    {
      value: 800,
      label: "0.8s",
    },
    {
      value: 900,
      label: "0.9s",
    },
    {
      value: 1000,
      label: "1s",
    },
  ];

  const handleChange = (event, newValue) => {
    setPlaybackSpeed(newValue);
  };

  return (
    <div className="playground">
      <h2>Generations: {generations}</h2>
      <div className="grid">
        {grid.map((rows, i) =>
          rows.map((columns, j) => (
            <div
              key={`${i}-${j}`}
              // toggle the cell's state and background color manually
              onClick={() => {
                if (!running) {
                  const newCanvas = produce(grid, (gridCopy) => {
                    gridCopy[i][j] = gridCopy[i][j] ? 0 : 1;
                  });
                  setGrid(newCanvas);
                }
              }}
              style={{
                width: 10,
                height: 10,
                backgroundColor: grid[i][j] ? "black" : undefined,
                border: "solid 1px black",
              }}
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
            setGrid(generateRandomCanvas());
          }}
        >
          Random
        </Button>
        {/* <Button
          onClick={() => {
            setGrid(gliderPreset());
          }}
        >
          Glider
        </Button>
        <Button
          onClick={() => {
            setGrid(lightweightSpaceshipPreset());
          }}
        >
          Lightweight Spaceship
        </Button> */}
        <Button
          onClick={() => {
            setGrid(generateEmptyCanvas());
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
