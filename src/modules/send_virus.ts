import { generate_ip } from "../helpers/generate_ip";
import { type_command } from "../helpers/type_command";
import { wait } from "../helpers/wait";

export async function send_virus() {
  process.stdout.write("\x1b[0m$: ");
  await type_command("scp -r virus.exe root@" + generate_ip() + ":/tmp/");

  process.stdout.write(`Sending virus...\n\x1b[32m`);
  await wait(1000);

  const width = Math.floor(process.stdout.columns / 30);
  const rows = Math.max(process.stdout.rows - 10, 15);
  const ips = new Array(width * rows).fill(0).map(generate_ip);
  const is_infected = new Array(width * rows)
    .fill(0)
    .map(() => Math.random() * 10 + 5);

  while (!is_infected.every((infected) => infected < 0)) {
    for (let k = 0; k < rows; k++) {
      for (let i = 0; i < width; i++) {
        is_infected[i + k * width] -= 0.1;
        if (is_infected[i + k * width] < 0) {
          process.stdout.write(
            `\x1b[31m${ips[i + k * width].padEnd(
              15,
              " "
            )} INFECTED      \x1b[0m`
          );
        } else {
          process.stdout.write(
            `\x1b[32m${ips[i + k * width].padEnd(
              15,
              " "
            )} SENDING       \x1b[0m`
          );
        }
      }
      process.stdout.write("\n");
    }
    await wait(100);
    process.stdout.moveCursor(0, -rows);
  }

  //move cursor back
  process.stdout.moveCursor(0, rows);
}
