import React from "react";

function Cell(props) {
  const { x, y, grid, toggleLife } = props;
  return (
    <div
      className="cell"
      onClick={() => {
        toggleLife(x, y);
      }}
      style={{
        width: 12,
        height: 12,
        backgroundColor: grid[x][y] ? "black" : undefined,
        border: "solid 1px black",
      }}
    ></div>
  );
}

export default Cell;
