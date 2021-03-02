<template>
  <div class="p-8">
    <h1 class="text-base font-semibold tracking-wide uppercase mb-8">{{roomName}}</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-1">
      <div class="">
        <video-window
          :self="true"
          :stream="myVideo.stream"
          :muted="myVideo.muted" 
        />
      </div>
    
      <div
        class=""
        :key="idx"
        v-for="(vid, idx) in videoList" >
        <video-window 
          :stream="peerList[vid].video.stream"
          :muted="peerList[vid].video.muted"
          :id="peerList[vid].video.userId"
        />
      </div>
    </div>

    <div class="absolute w-full left-0 bottom-0">
      <div class=" flex justify-center items-center bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-white lg:rounded-b-xl py-4 px-1 sm:px-3 lg:px-1 xl:px-3 ">
        
        <button type="button" class="mx-4 py-4 px-4 bg-transparent text-dark font-semibold rounded-lg border-2 border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mx-auto">
          <svg height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </button>
        
        <button type="button" class="mx-4 py-4 px-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 mx-auto">
          End Call
        </button>
        
        <button type="button" class="mx-4 py-4 px-4 bg-transparentt-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mx-auto">
          <svg height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        
      </div>
    </div>
  </div>
</template>

<script>
import { Socket } from "@/services/socket.init.js";
import { PeerService } from "@/services/peer.service.js";

import videoWindow from "@/components/VideoWindow.vue";

const constraints = {
  audio: {
    channelCount: 1,
    sampleRate: 16000,
    sampleSize: 16,
    volume: 1,
    echoCancellation: true,
    noiseSuppression: true,
  }
}

export default {
  name: 'Room',
  components: {
    videoWindow 
  },
  data(){
    return{
      socket: new Socket,
      room: this.$route.params.id,
      roomName: 'Kapayas Party',
      myPeer: null,
      myVideo: {stream: null},
      myPeerId: undefined,
      myCall: null,
      isReadyMyVideo: false,
      isReadyMyPeer: false,
      allowVideo: true,
      allowAudio: true,
      peerList: {},
      videoList: [],
      serialization: 'binary',
    }
  },
  watch: {
    isReadyMyVideo: function(bool){
      if(bool){
        this.listenOnCall();
      }
    },
    
    isReadyToJoin: function(bool){
      if(bool){
        setTimeout(() => {
          this.socket.emit('join-room', this.room, this.myPeerId)
        }, 1000);
      }
    },
  },
  computed: {
    isReadyToJoin: function(){
      return (this.isReadyMyVideo && this.isReadyMyPeer)
    },
  },
  created(){
    this.listenSocket();
    this.checkRoom();
    this.assignSerialization();
    this.initPeer();
    this.listenOnEstablishedPeer();
    this.setupMyMedia();
  },
  unmounted(){
    this.socket.disconnect();
  },
  methods:{
    checkSafari() {
      let seemsChrome = navigator.userAgent.indexOf("Chrome") > -1;
      let seemsSafari = navigator.userAgent.indexOf("Safari") > -1;
      return seemsSafari && !seemsChrome;
    },

    initPeer(){
      this.myPeer = new PeerService({peerId: this.myPeerId});
    },

    setupMyMedia(){
      navigator.mediaDevices.getUserMedia({
        video: this.allowVideo,
        audio: this.allowAudio
      }).then(stream => {
        const audioTracks = stream.getAudioTracks();
        const audioTrack = audioTracks[0];
        audioTrack.applyConstraints (constraints)
        .then(()=> {
          this.myVideo = {stream: stream, muted: true};
          this.isReadyMyVideo = true;
        })
      })
    },
    
    listenSocket(){
      this.socket.on("assign-room", (status, roomId) => {
        this.room = roomId ? roomId : this.room;
        if(!status){
          this.$router.push(`/room/${this.room}`)
        }
      })
      this.socket.on('user-disconnected', userId => {
        if (this.peerList[userId]){
          this.removePeer( userId );
          this.removeVideo( userId );      
        }
      })
      this.socket.on('user-connected', userId => { 
        this.connectToNewUser(userId, this.myVideo.stream)
      }) 
    },

    listenOnEstablishedPeer(){
      this.myPeer.on('open', id => {
        this.isReadyMyPeer = true;
        this.myPeerId = id;
      })
    },

    listenOnCall(){
      let userId;
      this.myPeer.on('call', call => {
        userId                = call.peer;
        this.peerList[userId] = {userId: userId, video: {}, call: call};
        this.answerCall(userId);
      })
    },

    answerCall(userId){
      if(this.peerList[userId].call){
        this.peerList[userId].call.answer(this.myVideo.stream);
        this.peerList[userId].call.on('stream', userVideoStream => {
          this.streamVideo( {userId, userVideoStream} )
        })
      }
    },

    connectToNewUser(userId, stream) {
      const call                  = this.myPeer.call(userId, stream); 
      this.peerList[userId]       = {userId: userId, video: {}};
      this.peerList[userId].call  = call;

      if(call){ 
        call.on('stream', userVideoStream => { 
            this.streamVideo( {userId, userVideoStream} )
        })

        call.on('close', () => {
          if (this.peerList[userId]){
            this.removePeer( userId );
            this.removeVideo( userId );     
          }
        })
      }
    },

    assignSerialization(){
      this.serialization = this.checkSafari() ? 'json' : 'binary';
    },

    checkRoom(){
      this.socket.emit('check-room', this.room);
    },
    
    streamVideo( {userId, userVideoStream} ){
      let video = {muted: false, stream: userVideoStream, userId: userId};
      this.peerList[userId].video = video;  
      if(this.isUserIdUnique(userId)){
        this.appendVideoListItem( userId );
      }
    },

    appendVideoListItem( userId ){
      this.videoList.push(userId);
    },

    removePeer( userId ){
      this.peerList[userId].call.close()
      delete this.peerList[userId];
    },

    removeVideo( userId ){
      let index = this.videoList.findIndex(item => {return item == userId;})
      this.videoList.splice(index, 1);
    },

    isUserIdUnique(userId){
      let found = this.videoList.find(item=>{
        return item === userId;
      })
      return found ? false : true;
    },

    toggleVideo(){
      this.myVideo.stream.getVideoTracks()[0].enabled = !this.allowVideo;
      this.allowVideo = !this.allowVideo;
    },

    toggleAudio(){
      this.myVideo.stream.getAudioTracks()[0].enabled = !this.allowAudio;
      this.allowAudio = !this.allowAudio;
    },

  }
}
</script>

<style scoped>

</style>