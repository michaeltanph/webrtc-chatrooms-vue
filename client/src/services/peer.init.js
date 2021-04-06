
import Peer from 'peerjs';
import { STUN_SERVERS } from "../common/config";

export class PeerService {
    constructor (data) {
        return this.init(data)
    }

    init ({ peerId, serialization, metadata }){
        this.peer = new Peer(peerId, {
            host: '/', port: 3001,
            serialization: serialization,
            metadata: { username: metadata.username },
            config: {
                STUN_SERVERS
            }
        });

        return this.peer
    }
}