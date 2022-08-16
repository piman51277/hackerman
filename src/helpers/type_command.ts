import { wait } from "./wait";

export async function type_command(command: string) {
  process.stdout.write("\x1b[0m");

  //wait 1 second before typing
  await wait(1000);

  for (const char of command) {
    process.stdout.write(char);
    await wait(Math.floor(Math.random() * 100));
  }
  process.stdout.write("\n");

  //wait random amount of time before typing next command
  await wait(Math.floor(Math.random() * 1000) + 1000);
}
