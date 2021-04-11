const { v4: uuidV4 }    = require('uuid');

module.exports = function (server){
    io = require('socket.io')(server, {transports: ['polling']})

    io.on('connection', socket => {
        const sessionID = socket.id;
        
        socket.on('check-room', roomName => {
            let validRoom; console.log(sessionID, 'checkd room')
            
            if(!roomName){ 
                validRoom = false;
                io.to(sessionID).emit('assign-room', validRoom,`${uuidV4()}`);
            }
            else{
                validRoom = true;
                io.to(sessionID).emit('assign-room', validRoom);
            }
        })

        socket.on('join-room', ({name: roomName, title: roomTitle}, {id: userId, username}) => {
            socket.join(roomName);

            socket.username = username;
            socket.userId = userId;
            
            setupRoom(roomName, {title: roomTitle, isPrivate: isPrivate = false},
                () => { socket.emit("room-list-updated"); },
                (title)=>{ socket.emit("set-room-title", title) } // For Rooms without Titles
            )

            socket.to(roomName).broadcast.emit('user-connected', userId, username)

            socket.on('set-self-audio', (bool, userId) => {
                socket.to(roomName).emit('somebody-toggle-microphone', {isUsingMicrophone: bool, userId})
            })
            socket.on('set-self-video', (bool, userId) => {
                socket.to(roomName).emit('somebody-toggle-camera', {isUsingCamera: bool, userId})
            })
            socket.on('disconnect', () => {
                console.log(`----- user: ${username} ${userId} is disconnected`);
                socket.to(roomName).broadcast.emit('user-disconnected', userId, username)
            })

            console.log(`+++++ user: ${username} has joined ${roomTitle}`);
        })
        
    })

    io.of("/").adapter.on("create-room", (room) => {
        io.sockets.adapter.rooms[room] = {
            id: room,
            name: '',
        }
    });


    const setupRoom = function(room, {title, isPrivate = false}, notifyListUpdate, getDynamicTitle){
        let rooms = io.sockets.adapter.rooms;

        if(title === "" || title === undefined || title === null){
            let pattern = /@"^.{6}|.{8}/;
            title = `Room-${room.match(pattern)}`;
            getDynamicTitle(title);
        }

        if(rooms[room].title != undefined
            || rooms[room].title != null
            || rooms[room].title != ''
            && rooms[room].isOrganic == undefined)
        {
            rooms[room].title = title;
            notifyListUpdate();
        }
        
        rooms[room].isOrganic = true;
        rooms[room].isPrivate = isPrivate;
    }

    return io
}



