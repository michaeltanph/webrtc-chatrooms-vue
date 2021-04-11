const express       = require('express')
const router        = express.Router()

router.get("/", (req, res) => {
    res.send("Root!")
})

router.get("/rooms", (req, res) => {
    let rooms = listAllRooms();
    res.send(rooms)
})


const listAllRooms = function(){
    let data = socketIO.sockets.adapter.rooms;
    let roomNames =  Object.keys(data);
    let roomList = [];

    roomNames.forEach(roomName => {
        if(data[roomName].isOrganic && data[roomName].isPrivate === false){
            roomList.push({
                origData: data[roomName],
                name: roomName,
                title: data[roomName].title,
                url: `/room/${roomName}`,
                category: 'General',
            })
        }
    });

    return roomList;
}

module.exports = router