<template>
  <div class="p-8">
    <h1 class="text-base font-semibold tracking-wide uppercase mb-8">{{roomName}}</h1>
    
    <div v-if="isDisconnected" class="rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block text-white">You have been disconnected</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700">
            Back to lobby
          </a>
        </div>
        <div class="ml-3 inline-flex rounded-md shadow">
          <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-blue-50">
            Reconnect
          </a>
        </div>
      </div>
    </div>  

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-1">
      <div class="">
        <video-window
          v-if="!isDisconnected"
          :self="true"
          :stream="myVideo.stream"
          :isStreamingAudio="myVideo.isStreamingAudio" 
          :isStreamingVideo="myVideo.isStreamingVideo"
        />
      </div>
    
      <div
        class=""
        :key="idx"
        v-for="(vid, idx) in videoList" >
        <video-window 
          :id="peerList[vid].video.userId"
          :stream="peerList[vid].video.stream"
          :isStreamingAudio="peerList[vid].video.isStreamingAudio"
          :isStreamingVideo="peerList[vid].video.isStreamingVideo"
        />
      </div>
    </div>

    <!-- TOOLBAR -->
    <div v-if="!isDisconnected" class="fixed w-full left-0 bottom-0 bg-gray-100 text-gray-700 dark:bg-gray-900">
      <div class="grid grid-cols-4 md:grid-cols-12 items-center dark:text-white lg:rounded-b-xl py-4 px-1 sm:px-3 lg:px-1 xl:px-3 ">
        
        <button @click="toggleAudio" :disabled="isDisconnected" type="button" class="md:col-start-5 grid-start-2 mx-auto py-4 px-4 bg-transparent text-dark font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
          <svg v-if="allowAudio" height="20" width="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"> 
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /> 
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <svg v-else height="20" width="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
            <line x1="1" y1="1" x2="23" y2="23" />  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
        
        <button :disabled="isDisconnected" @click="endCall()" type="button" class="col-span-2 w-full mx-auto py-4 px-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
          End Call
        </button>
        
        <button @click="toggleVideo" :disabled="isDisconnected" type="button" class="mx-auto py-4 px-4 bg-transparentt-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
          <svg v-if="allowVideo" height="20" width="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <svg v-else height="20" width="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />  <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        </button>
        
      </div>
    </div>
  </div>
</template>

<script>
import { Socket } from "@/services/socket.init.js";
import { PeerService } from "@/services/peer.init.js";

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
      myVideo: {stream: null},
      myPeer: null,
      myPeerId: undefined,
      myCall: null,
      isReadyMyVideo: false,
      isReadyMyPeer: false,
      allowVideo: true,
      allowAudio: true,
      peerList: {},
      videoList: [],
      serialization: 'binary',
      isDisconnected: false,
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
    this.setupUserMedia();
  },
  unmounted(){
    this.disconnect();
  },
  methods:{
    checkSafari() {
      let seemsChrome = navigator.userAgent.indexOf("Chrome") > -1;
      let seemsSafari = navigator.userAgent.indexOf("Safari") > -1;
      return seemsSafari && !seemsChrome;
    },

    initPeer(){
      this.myPeer = new PeerService({peerId: this.myPeerId, serialization: this.serialization});
    },

    setupUserMedia(){
      navigator.mediaDevices.getUserMedia({
        video: this.allowVideo,
        audio: this.allowAudio
      }).then(stream => {
        const audioTracks = stream.getAudioTracks();
        const audioTrack = audioTracks[0] ? audioTracks[0] : null;
        if(audioTrack){
          audioTrack.applyConstraints (constraints)
          .then(()=> {
            this.myVideo = {stream: stream, isStreamingAudio: true, isStreamingVideo: true};
            this.isReadyMyVideo = true;
          })
        }
      })
    },
    
    listenSocket(){
      this.listenRoomAssignment();
      this.listenDisconnectedUser();
      this.listenConnectedUser();
      this.listenToggleCamera();
      this.listenToggleMicrophone();
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
      let video = {isStreamingAudio: true, isStreamingVideo: true, stream: userVideoStream, userId: userId};
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
      this.socket.emit("set-self-video", !this.allowVideo, this.myPeerId)
      this.allowVideo = !this.allowVideo;
    },

    toggleAudio(){
      this.myVideo.stream.getAudioTracks()[0].enabled = !this.allowAudio;
      this.socket.emit("set-self-audio", !this.allowAudio, this.myPeerId)
      this.allowAudio = !this.allowAudio;
    },

    listenRoomAssignment(){
      this.socket.on("assign-room", (status, roomId) => {
        this.room = roomId ? roomId : this.room;
        if(!status){
          this.$router.push(`/room/${this.room}`)
        }
      })
    },
    listenDisconnectedUser(){
      this.socket.on('user-disconnected', userId => {
        if (this.peerList[userId]){
          this.removePeer( userId );
          this.removeVideo( userId );      
        }
      })
    },
    listenConnectedUser(){
      this.socket.on('user-connected', userId => { 
        this.connectToNewUser(userId, this.myVideo.stream)
      })
    },
    listenToggleCamera(){
      this.socket.on("somebody-toggle-camera", ( {isUsingCamera, userId} ) => {
        if (this.peerList[userId]){
          this.peerList[userId].video.isStreamingVideo = isUsingCamera;
        }
        if (this.myPeerId == userId){ console.log(true)
          this.allowVideo = isUsingCamera;
          this.myVideo.isStreamingVideo = isUsingCamera;
        }
      })
    },
    listenToggleMicrophone(){
      this.socket.on("somebody-toggle-microphone", ( {isUsingMicrophone, userId} ) => {
        if (this.peerList[userId]){
          this.peerList[userId].video.isStreamingAudio = isUsingMicrophone;
        }
        if (this.myPeerId == userId){ console.log(true)
          this.allowAudio = isUsingMicrophone;
          this.myVideo.isStreamingAudio = isUsingMicrophone;
        }
      })
    },

    disconnect(){
      if(this.socket)
        this.socket.disconnect();
    },

    endCall(){
      this.disconnect();
      this.socket = null;
      this.myPeer = null;
      this.myVideo = { stream: null };
      this.isDisconnected = true;
      this.isReadyMyVideo = false;
      this.isReadyMyPeer = false;
      this.peerList = {};
      this.videoList = [];
    },

    stopStreamedVideo(videoElem) {
      const stream = videoElem.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
      videoElem.srcObject = null;
    }

  }
}
</script>

<style scoped>

</style>