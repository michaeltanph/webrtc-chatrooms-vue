
import Peer from 'peerjs';

/* const peer = new Peer(this.myPeerId, {
    host: '/', port: 3001,
    serialization: this.serialization,
    config: {
        'iceServers': [
            { 
                url: 'stun:stun.l.google.com:19302',
            },
            {
                url: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            },
            {
                url: 'turn:turn.bistri.com:80',
                credential: 'homeo',
                username: 'homeo'
            },
        ]}
    }
); */


export class PeerService {
    constructor () {
        return this.init()
    }

    init (){
        this.peer = new Peer(this.myPeerId, {
            host: '/', port: 3001,
            serialization: this.serialization,
            config: {
                'iceServers': [
                    { 
                        url: 'stun:stun.l.google.com:19302',
                    },
                    {
                        url: 'turn:numb.viagenie.ca',
                        credential: 'muazkh',
                        username: 'webrtc@live.com'
                    },
                    {
                        url: 'turn:turn.bistri.com:80',
                        credential: 'homeo',
                        username: 'homeo'
                    },
                ]}
            }
        );

        return this.peer
    }

    /* static listenPeer (  ) {
        return peer.on('open', id => {
            peerId = id;
        })
    }
    
    static listenOnCall ( ) {
        return peer.on('call', call => {

        })
    } */

    

    
}