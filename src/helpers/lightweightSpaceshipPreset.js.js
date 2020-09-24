export default function lightweightSpaceshipPreset() {
  let canvas = new Array(26);
  for (let i = 0; i < canvas.length; i++) {
    canvas[i] = new Array(26);
  }

  // pre-popluate the grid with a Glider configuration
  for (let i = 0; i < canvas.length; i++) {
    for (let j = 0; j < canvas.length; j++) {
      if (
        canvas[i][j] === canvas[12][10] ||
        canvas[i][j] === canvas[13][9] ||
        canvas[i][j] === canvas[14][9] ||
        canvas[i][j] === canvas[15][9] ||
        canvas[i][j] === canvas[15][10] ||
        canvas[i][j] === canvas[15][11] ||
        canvas[i][j] === canvas[15][12] ||
        canvas[i][j] === canvas[14][13] ||
        canvas[i][j] === canvas[12][13]
      ) {
        canvas[12][10] = 1;
        canvas[13][9] = 1;
        canvas[14][9] = 1;
        canvas[15][9] = 1;
        canvas[15][10] = 1;
        canvas[15][11] = 1;
        canvas[15][12] = 1;
        canvas[14][13] = 1;
        canvas[12][13] = 1;
      } else {
        canvas[i][j] = 0;
      }
    }
  }

  return canvas;
}
