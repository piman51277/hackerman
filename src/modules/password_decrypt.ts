import { type_command } from "../helpers/type_command";
import { wait } from "../helpers/wait";
import * as crypto from "crypto";

export async function password_decrypt() {
  process.stdout.write("\x1b[0m$: ");
  await type_command("decrypt0r -p pwrd.txt -o pwrd.txt.decrypted");

  const password_count = Math.floor(Math.random() * 10) + 20;

  process.stdout.write(`Decrypting passwords...\n`);
  await wait(1000);

  for (let k = 0; k < password_count; k++) {
    const password = crypto.randomBytes(64).toString("hex");
    process.stdout.write(`\x1b[31m[`);

    for (let i = 0; i < password.length; i++) {
      //how many times to "guess"
      const guessCount = Math.floor(Math.random() * 6) + 1;
      for (let j = 0; j < guessCount; j++) {
        //reset cursor
        process.stdout.cursorTo(i + 1);

        //generate filler
        const filler = crypto
          .randomBytes(64)
          .toString("hex")
          .slice(i + 1);
        process.stdout.write(password[i] + filler + "]");

        //wait 15 ms before next guess
        await wait(15);
      }
    }
    process.stdout.cursorTo(0);
    process.stdout.write(`\x1b[32m[${password}] DONE\n\x1b[0m`);
  }
}