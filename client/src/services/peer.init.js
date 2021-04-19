import Peer from 'peerjs';
import { ICE_SERVERS } from "../common/config";

export class PeerService {

    constructor (data) {
        return this.init(data)
    }

    init ({ peerId, serialization, metadata }){
        this.peer = new Peer(peerId, {
            host: '/',
            port: 3001,
            serialization: serialization,
            metadata: metadata,
            debug: 3,
            config: ICE_SERVERS,
        });

        return this.peer
    }
}