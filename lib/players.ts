export type Player = {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
};

const players = new Map<string, Player>();

export function registerPlayer(id: string, name: string, color: string) {
  players.set(id, { id, name, color, x: 0, y: 0 });
}

export function updateMouse(id: string, x: number, y: number) {
  const player = players.get(id);
  if (player) {
    player.x = x;
    player.y = y;
  }
}

export function getAllPlayers() {
  return Array.from(players.values());
}

export function removePlayer(id: string) {
  players.delete(id);
}