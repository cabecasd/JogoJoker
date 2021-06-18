//codigo webscokets

import WebSocket from 'ws';
import { watch }  from "fs";
// as fs
const wss = new WebSocket.Server({ port: 8081 });

const clients = []

watch("contador.json", () => {
    clients.forEach(ws => ws.send('update'))
})

wss.on('connection', function connection(ws) {
    clients.push(ws);

});