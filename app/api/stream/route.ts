import { getAllPlayers, removePlayer } from '@/lib/players';

let clients: any[] = [];

export async function GET(req: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(":\n\n"));
      }, 1000);

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id')!; // id do jogador      

      const client = {
        id,
        send: (data: any) => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        },
        close: () => clearInterval(keepAlive),
      };

      clients.push(client);

      // Envia todos os jogadores atuais
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'init', players: getAllPlayers() })}\n\n`));

      req.signal.addEventListener('abort', () => {
        client.close();
        clients = clients.filter(c => c !== client);
        removePlayer(client.id); 
        broadcast({ type: 'leave', id: client.id }); 

      });


    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

export function broadcast(data: any) {
  for (const client of clients) {
    client.send(data);
  }
}