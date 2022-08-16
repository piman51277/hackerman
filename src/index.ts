#!/usr/bin/env node

import { wait } from "./helpers/wait";
import { matrixScreen } from "./modules/matrix";
import { password_decrypt } from "./modules/password_decrypt";
import { scan_ips } from "./modules/scan_ips";
import { send_virus } from "./modules/send_virus";

console.clear();

const modules = {
  password_decrypt,
  scan_ips,
  send_virus,
  matrixScreen
};

const playlist = [
  modules.scan_ips,
  modules.send_virus,
  modules.matrixScreen,
];

async function main() {
  for (let i = 0; i < playlist.length; i++) {
    await playlist[i]();
    await wait(3000);
    console.clear();
  }
}

main();
