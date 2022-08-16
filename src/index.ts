#!/usr/bin/env node

import { wait } from "./helpers/wait";
import { password_decrypt } from "./modules/password_decrypt";
import { scan_ips } from "./modules/scan_ips";
import { send_virus } from "./modules/send_virus";

console.clear();

const modules = {
  password_decrypt,
  scan_ips,
  send_virus
};

const playlist = [
  modules.scan_ips,
  modules.send_virus,
  modules.password_decrypt,
];

async function main() {
  for (let i = 0; i < playlist.length; i++) {
    await playlist[i]();
    await wait(3000);
    console.clear();
  }
}

main();
