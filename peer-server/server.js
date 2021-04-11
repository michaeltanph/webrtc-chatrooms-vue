const { PeerServer } = require('peer');

const port = 3001;
const peerServer = PeerServer({ port: port, path: '/' });

peerServer.on('connection', function(conn) {
    console.log("connected", conn.id)
});

console.log(`Listening on port ${port}...`);