export default function gliderPreset() {
  let canvas = new Array(26);
  for (let i = 0; i < canvas.length; i++) {
    canvas[i] = new Array(26);
  }

  // pre-popluate the grid with a Glider configuration
  for (let i = 0; i < canvas.length; i++) {
    for (let j = 0; j < canvas.length; j++) {
      if (
        canvas[i][j] === canvas[12][12] ||
        canvas[i][j] === canvas[13][13] ||
        canvas[i][j] === canvas[13][14] ||
        canvas[i][j] === canvas[12][14] ||
        canvas[i][j] === canvas[11][14]
      ) {
        canvas[12][12] = 1;
        canvas[13][13] = 1;
        canvas[13][14] = 1;
        canvas[12][14] = 1;
        canvas[11][14] = 1;
      } else {
        canvas[i][j] = 0;
      }
    }
  }

  return canvas;
}
