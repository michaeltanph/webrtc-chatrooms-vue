
import Peer from 'peerjs';
import { STUN_SERVERS } from "../common/config";

export class PeerService {
    constructor (data) {
        return this.init(data)
    }

    init ({peerId, serialization}){
        this.peer = new Peer(peerId, {
            host: '/', port: 3001,
            serialization: serialization,
            config: {
                STUN_SERVERS
            }
        });

        return this.peer
    }
}