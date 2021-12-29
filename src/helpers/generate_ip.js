const gen7bitInt = () => Math.floor(Math.random() * 127);
function generate_ip() {
  return `${gen7bitInt()}.${gen7bitInt()}.${gen7bitInt()}.${gen7bitInt()}`;
}
module.exports = generate_ip;
