import { updateMouse } from '@/lib/players';
import { broadcast } from '../stream/route';

export async function POST(req: Request) {
  const { id, x, y } = await req.json();
  updateMouse(id, x, y);
  broadcast({ type: 'move', id, x, y });
  return new Response(JSON.stringify({ ok: true }));
}