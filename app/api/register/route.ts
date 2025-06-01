import { registerPlayer } from '@/lib/players';
import { broadcast } from '../stream/route';

export async function POST(req: Request) {
  const { id, name, color } = await req.json();
  registerPlayer(id, name, color);
  broadcast({ type: 'register', id, name, color });
  return new Response(JSON.stringify({ ok: true }));
}