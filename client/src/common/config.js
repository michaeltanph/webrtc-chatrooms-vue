export const SOCKET_SERVER_URL = "http://localhost:5000";

export const API_URL = "http://localhost:5000/";

export const STUN_SERVERS = {
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
    ]
}