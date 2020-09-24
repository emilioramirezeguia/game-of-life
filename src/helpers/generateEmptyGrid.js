export default function generateEmptyGrid() {
  // create a one-dimensional array capable of storing 50 objects
  let grid = new Array(50);

  // loop through the array, adding a new array to each location
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(50); // new array of 50 locations
  }

  // populate the two-dimensional array with the initial state of 0 ("dead");
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = 0;
    }
  }

  return grid;
}
