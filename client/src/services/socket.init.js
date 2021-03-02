import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../common/config";

export class Socket {

    constructor () {
        return this.init()
    }

    init (){
        this.socket = io( SOCKET_SERVER_URL,
            {
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                randomizationFactor: 0.5
            }
        )
        return this.socket
    }

}

