// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function handleMessage(data) {
  let parsedData = JSON.parse(data);
  parsedData["id"]=uuidV1();
  switch(parsedData.type) {
    case "postMessage":
      parsedData["type"]="incomingMessage"
      parsedData["username"] = (parsedData["username"] || 'Anon Penguin');
      for(let client of wss.clients) {
        client.send(JSON.stringify(parsedData));
      }
      break;
    case "postNotification":
      parsedData["type"]="incomingNotification"
      for(let client of wss.clients) {
        client.send(JSON.stringify(parsedData));
      }
      break;
    default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + parsedData.type);
  }
}

function updateConnectionNumber() {
  parsedData = {type: "updateConnections",
                content: wss.clients.size};
  for(let client of wss.clients) {
    client.send(JSON.stringify(parsedData));
  }
}



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  updateConnectionNumber()
  ws.on('message', handleMessage)
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Client disconnected')
    updateConnectionNumber()
});
});