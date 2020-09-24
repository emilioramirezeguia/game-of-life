export default function generateEmptyCanvas() {
  // create a one-dimensional array capable of storing 25 objects
  let canvas = new Array(26);

  // loop through the array, adding a new array to each location
  for (let i = 0; i < canvas.length; i++) {
    canvas[i] = new Array(26); // new array of 25 locations
  }

  // populate the two-dimensional array with the initial state of 0 ("dead");
  for (let i = 0; i < canvas.length; i++) {
    for (let j = 0; j < canvas.length; j++) {
      canvas[i][j] = 0;
    }
  }

  return canvas;
}
