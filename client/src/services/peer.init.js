
import Peer from 'peerjs';
import { STUN_SERVERS } from "../common/config";

export class PeerService {
    constructor (data) {
        return this.init(data)
    }

    init ({peerId, serialization, username}){
        this.peer = new Peer(peerId, {
            host: '/', port: 3001,
            serialization: serialization,
            metadata: { username: username },
            config: {
                STUN_SERVERS
            }
        });

        return this.peer
    }
}