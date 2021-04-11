const { PeerServer } = require('peer');
 
//If hosted either on local or as HTTPs

const port = 3001;
const peerServer = PeerServer({ port: port, path: '/' });

// If hosted as HTTPS
// const peerServer = PeerServer({ port: 3001, path: '/',
// 	ssl: {
//     		key: fs.readFileSync('/etc/testi/privkey.pem'),
//     		cert: fs.readFileSync('/etc/testi/fullchain.pem')
//   	}
// });

peerServer.on('connection', function(conn) {
    console.log("connected", conn.id)
});

console.log(`Listening on port ${port}...`);