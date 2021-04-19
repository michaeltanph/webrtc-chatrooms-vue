
export const SOCKET_SERVER_URL = "http://localhost:5000";


export const API_URL = "http://localhost:5000/";

//** STUN Server list source */ 
//** https://gist.github.com/yetithefoot/7592580 */ 
//** some of these are dead */
export const ICE_SERVERS = {
    'iceServers': [
        { url:'stun:stun.l.google.com:19302' },
        { url:'stun:stun1.l.google.com:19302' },
        { url:'stun:stun2.l.google.com:19302' },
        
        
       
        {
            url: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
        },
        {
            url: 'turn:numb.viagenie.ca:3478',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            url: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            url: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
        },
    ],  
    //'sdpSemantics': 'unified-plan',
}