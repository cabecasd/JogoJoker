//codigo webscokets

import WebSocket from 'ws';
import * as fs from "fs";

const wss = new WebSocket.Server({ port: 8081 });

const clients = []

fs.watch("contador.json", (data) => {
    clients.forEach(ws => ws.send('update'))
})

wss.on('connection', function connection(ws) {
    clients.push(ws);

});