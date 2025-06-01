const clients: any[] = [];

export function addClient(client: any) {
  clients.push(client);
}

export function removeClient(client: any) {
  const index = clients.indexOf(client);
  if (index !== -1) clients.splice(index, 1);
}

export function broadcast(data: any) {
  for (const client of clients) {
    client.send(data);
  }
}

export function getClients() {
  return clients;
}
