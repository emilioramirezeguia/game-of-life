export default function generateRandomGrid() {
  // create a one-dimensional array capable of storing 50 objects
  let grid = new Array(50);

  // loop through the array, adding a new array to each location
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(50);
  }

  // populate half of two-dimensional array with the initial state of 0 ("dead") and the other half with 1 ("alive");
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = Math.random() > 0.6 ? 1 : 0;
    }
  }

  return grid;
}
