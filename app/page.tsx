'use client';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for(let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Home() {
  const id = useRef<string>('');
  const color = useRef<string>('');
  const [name, setName] = useState('');
  const [players, setPlayers] = useState<Record<string, any>>({});
  const [started, setStarted] = useState(false); // se o jogador foi registrado

  // Função que registra o player no servidor
  const registerPlayer = async (name: string, id: string, color: string) => {
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ id, name, color }),
    });
  };

  // Envia a posição do mouse para o servidor
  const sendMouse = async (x: number, y: number) => {
    if (!started) return; // só envia se estiver registrado
    await fetch('/api/mouse', {
      method: 'POST',
      body: JSON.stringify({ id: id.current, x, y }),
    });
  };

  // SSE para ouvir atualizações dos outros players
  useEffect(() => {
    if (!started) return;

    const es = new EventSource(`/api/stream?id=${id.current}`);

    es.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setPlayers(prev => {
        const updated = { ...prev };
        if (msg.type === 'register') {
          updated[msg.id] = { ...(updated[msg.id] || {}), name: msg.name, color: msg.color };
        } else if (msg.type === 'move') {
          updated[msg.id] = { ...(updated[msg.id] || {}), x: msg.x, y: msg.y };
        } else if (msg.type === 'init') {
          msg.players.forEach((p: any) => {
            updated[p.id] = p;
          });
        } else if (msg.type === 'leave') {
          delete updated[msg.id];
          return updated;
        }
        return updated;
      });
    };

    return () => es.close();
  }, [started]);

  // Listener do mouse só se o jogador já estiver iniciado
  useEffect(() => {
    if (!started) return;

    const move = (e: MouseEvent) => {
      sendMouse(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [started]);

  return (
    <div>
      <div className="fixed top-4 left-4 z-10">
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          className="my-button"
          onClick={async () => {
            if (!started && name.trim()) {
              id.current = uuid();
              color.current = getRandomColor();
              await registerPlayer(name, id.current, color.current);
              setStarted(true);
            } else if (started && name.trim()) {
              await registerPlayer(name, id.current, color.current); // altera nome
            }
          }}
        >
          {started ? 'Alterar nome' : 'Entrar na sala'}
        </button>
      </div>

      {Object.entries(players).map(([pid, player]) => {
        const text = player.name || '?';
        const size = text.length * 10; 

        return (
          <div
            key={pid}
            style={{
              position: 'fixed',
              left: player.x ?? 0,
              top: player.y ?? 0,
              backgroundColor: player.color,
              transform: 'translate(-50%, -50%)',
              width: size,
              height: size,
              borderRadius: size / 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 14,
              boxShadow: '0 0 4px rgba(0,0,0,0.3)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {text}
          </div>
        );
      })}

    </div>
  );
}
