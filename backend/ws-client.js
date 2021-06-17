import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('contador', function incoming(data) {
  console.log(data, new Date(Number(data)));
});