const generate_ip = require("../helpers/generate_ip");
const type_command = require("../helpers/type_command");
const wait = require("../helpers/wait");

const protocols = ["FTP", "TCP", "UDP", "NTP", "SSH", "MAC"];
const randomProtocol = () =>
  protocols[Math.floor(Math.random() * protocols.length)];

async function scan_ips() {
  process.stdout.write("\x1b[0m$: ");
  await type_command("nmap -iR -v -T4 -Pn -p- -oA");

  const ip_count = Math.floor(Math.random() * 100) + 100;

  process.stdout.write(`Scanning IPs...\n\x1b[32m`);
  await wait(1000);

  for (let k = 0; k < ip_count; k++) {
    const ip = generate_ip();
    process.stdout.write(`${ip.padEnd(15, " ")} ${randomProtocol()}\n`);

    //wait for a random amount of time
    await wait(Math.floor(Math.random() * 100));
  }
}

module.exports = scan_ips;
