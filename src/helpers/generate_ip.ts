const gen7bitInt = () => Math.floor(Math.random() * 127);
export function generate_ip():string {
  return `${gen7bitInt()}.${gen7bitInt()}.${gen7bitInt()}.${gen7bitInt()}`;
}
