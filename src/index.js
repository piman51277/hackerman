#!/usr/bin/env node

const wait = require("./helpers/wait");

console.clear();

const modules = {
  password_decrypt: require("./modules/password_decrypt"),
  scan_ips: require("./modules/scan_ips"),
  send_virus: require("./modules/send_virus"),
};

const playlist = [
  modules.scan_ips,
  modules.send_virus,
  modules.password_decrypt,
];

async function main() {
  for (let i = 0; i < playlist.length; i++) {
    await playlist[i]();
	await wait(3000)
	console.clear();
  }
}

main();