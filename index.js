import { connect } from 'cloudflare:sockets';

const userID = 'd342d11e-d424-4583-b36e-524ab1f0afa4'; 
const proxyIP = '104.16.123.45'; // Можно будет сменить на найденный Clean IP

export default {
  async fetch(request, env, ctx) {
    try {
      const upgradeHeader = request.headers.get('Upgrade');
      if (!upgradeHeader || upgradeHeader !== 'websocket') {
        return new Response('Worker is Online', { status: 200 });
      }
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);
      server.accept();
      
      // Здесь механика проксирования трафика
      handleVless(server);

      return new Response(null, { status: 101, webSocket: client });
    } catch (err) {
      return new Response(err.toString());
    }
  }
};

async function handleVless(ws) {
  // Код обработки протокола...
}
