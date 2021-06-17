//codigo webscokets

import WebSocket from 'ws';
import * as fs from "fs";

const wss = new WebSocket.Server({ port: 8081 });

const clients = []

wss.on('connection', function connection(ws) {
    clients.push(ws);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // if (['writting', 'not-writting'].includes(message)) {
        //     clients.filter(c => c !== ws)
        //            .forEach(c => c.send(message))
        // }
    });

    fs.watch("contador.json", (data) => {
        ws.send('update')
    })


    //   ws.send('something');

    // setInterval(() => {
    //     ws.send(new Date().valueOf())
    // }, 1000)
});