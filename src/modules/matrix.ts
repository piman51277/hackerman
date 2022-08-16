import { type_command } from "../helpers/type_command";
import { wait } from "../helpers/wait";

//helper to gert random character
const getRandomChar = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return chars[Math.floor(Math.random() * chars.length)];
};

export async function matrixScreen() {
  process.stdout.write("\x1b[0m$: ");
  await type_command("simulate --sim=matrix");

  process.stdout.write(`Simulating Matrix...\n\x1b[32m`);
  await wait(1000);

  const width = Math.floor(process.stdout.columns);
  const rows = Math.max(process.stdout.rows - 2, 15);

  //generate matrix representing the the screen
  let matrix = new Array(width * (rows + 5)).fill(false);

  //~0.07% of the cells are infected from the start
  for (let i = 0; i < matrix.length * 0.007; i++) {
    matrix[Math.floor(Math.random() * matrix.length)] = true;
  }

  //display cycles
  for (let cycle = 0; cycle < 100; cycle++) {
    //create display matrix
    const display = new Array(width * (rows + 5)).fill(false);

    //for every cell in the matrix, infect the 10 cells above it
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i]) {
        for (let j = 0; j < 10; j++) {
          display[i + j * width] = true;
        }
      }
    }

    //display cells
    let pos = width * 5;
    let str = "";
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < width; column++) {
        if (display[pos]) {
          str += getRandomChar();
        } else {
          str += " ";
        }
        pos++;
      }
      str += "\n";
    }
    process.stdout.write(str);

    //remove the last row
    matrix = matrix.slice(0, matrix.length - width);

    //add a new row with 0.07% of the cells infected
    for (let i = 0; i < width; i++) {
      matrix.unshift(Math.random() < 0.007);
    }
    process.stdout.moveCursor(0, -rows);
    process.stdout.write("\x1b[32m");

    await wait(200);
  }
}
