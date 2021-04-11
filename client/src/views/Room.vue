<template>
  <div class="p-8">
    <div v-if="!isDisconnected">
      <div class="mb-8 flex flex-wrap items-center justify-items-center">
        
        <base-button @click="$router.push('/lobby')" color="gray" size="lg" class="w-auto mr-4" outline icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </base-button>
        <span class="text-base text-2xl font-bold capitalize mr-4">{{roomTitle}}</span>
        <span class="text-xs font-semibold py-1 px-2 capitalize rounded text-white bg-blue-600 uppercase last:mr-0 mr-1 mt-1">
          Public Room
        </span>
      </div>
    </div>
    <div v-if="isDisconnected" class="rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block text-white">You have been disconnected</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        
        <div class="inline-flex rounded-md shadow">  
          <button @click="$router.push('/lobby')" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700">
            Back to lobby
          </button>
        </div>
        <div class="ml-3 inline-flex rounded-md shadow">
          <button @click="reconnect()" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-blue-50">
            Reconnect
          </button>
        </div>
      </div>
    </div>
    
    <div v-show="!isDisconnected" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-8 bg-gray-100 rounded-xl">
      <div class="">
        <video-window
          v-show="!isDisconnected"
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
          :username="peerList[vid].video.username"
          :isStreamingAudio="peerList[vid].video.isStreamingAudio"
          :isStreamingVideo="peerList[vid].video.isStreamingVideo"
        />
      </div>
    </div>

    <!-- TOOLBAR -->
    <div v-if="!isDisconnected" class="fixed w-full left-0 bottom-0 bg-gray-100 dark:bg-gray-900">
      <div class="flex justify-center items-center dark:text-white lg:rounded-b-xl py-4 px-1 sm:px-3 md:px-1 xl:px-3 ">
        
        <div class="flex flex-wrap content-evenly justify-center items-center xs:w-full md:w-1/2 lg:w-1/3">
          <base-button @click="toggleAudio" :disabled="isDisconnected" color="gray" size="lg" class="w-auto" :outline="allowAudio" icon>
            <svg v-if="allowAudio" height="20" width="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"> 
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /> 
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            <svg v-else height="20" width="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
              <line x1="1" y1="1" x2="23" y2="23" />  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </base-button>

          <base-button @click="endCall" :disabled="isDisconnected" color="red" size="lg" class="flex-1 mx-4">
            End Call
          </base-button>

          <base-button @click="toggleVideo" :disabled="isDisconnected" color="gray" size="lg" class="" :outline="allowVideo" icon>
            <svg v-if="allowVideo" height="20" width="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <svg v-else height="20" width="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />  <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          </base-button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { Socket } from "@/services/socket.init.js";
import { PeerService } from "@/services/peer.init.js";
import { mapMutations } from 'vuex';

import BaseButton from "@/components/BaseButton";
import VideoWindow from "@/components/VideoWindow.vue";

const constraints = {
  audio: {
    channelCount: 1,
    sampleRate: 16000,
    sampleSize: 16,
    volume: 0,
    echoCancellation: true,
    noiseSuppression: true,
  }
}

export default {
  name: 'Room',
  components: {
    VideoWindow,
    BaseButton,
  },
  data(){
    return{
      socket: new Socket,
      room: this.$route.params.id,
      roomTitle: this.$store.state.room.roomTitle,
      myVideo: {stream: null},
      myPeer: null,
      myPeerId: undefined, //Initial must be undefined
      myCall: null,
      isReadyMyVideo: false,
      isReadyMyPeer: false,
      allowVideo: true,
      allowAudio: true,
      peerList: {},
      videoList: [],
      serialization: 'json',
      isDisconnected: false,
      myUsername: this.$store.state.user.username,
    }
  },
  props: {
    roomName: {
      default: '',
      type: String,
    },
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
          let roomPayload = {name: this.room, title: this.roomTitle};
          let userPayload = {id: this.myPeerId, username: this.$store.state.user.username}
          this.socket.emit('join-room', roomPayload, userPayload)
        }, 1000);
      }
    },
  },
  computed: {
    isReadyToJoin: function(){
      return (this.isReadyMyVideo && this.isReadyMyPeer)
    },
    chatRoomName: function(){
      if(this.room){
        return this.room
      }
      else{
        return this.room
      }
    },
    chatRoomTitle: function(){
      if(this.roomTitle){
        return this.roomTitle
      }
      else{
        return this.roomTitle
      }
    },
  },
  created(){
    this.initialize();
  },
  unmounted(){
    this.endCall();
  },
  deactivated(){
    this.endCall();
  },
  methods:{
    ...mapMutations({
      setRoomTitle: 'SET_ROOM_TITLE'
    }),
    
    initialize(){
      this.isDisconnected = false;
      //this.checkRoomTitleFromStore();
      this.listenSocket();
      this.checkRoom();
      this.assignSerialization();
      this.initPeer();
      this.listenOnEstablishedPeer();
      this.establishUserMedia();
    },

    initPeer(){
      this.myPeer = new PeerService({ 
        peerId: this.myPeerId,
        serialization: this.serialization,
        metadata: { username: this.myUsername }
      });
    },

    establishUserMedia(){
      navigator.mediaDevices.getUserMedia({
        video: this.allowVideo,
        audio: this.allowAudio
      }).then( stream => {
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
        this.myPeerId = id;
        this.isReadyMyPeer = true;
      })
    },

    listenOnCall(){
      let userId;
      let username;
      this.myPeer.on('call', call => {
        userId                = call.peer;
        username              = call.metadata.username;
        this.peerList[userId] = { userId: userId, video: {username: username}, call: call };
        this.answerCall({userId, username});
      })
    },

    listenRoomAssignment(){
      this.socket.on("assign-room", (status, roomName) => {
        this.room = roomName ? roomName : this.room;
        if(!status){
          this.$router.push(`/room/${this.room}`)
          this.socket.on("set-room-title", (title)=>{
            this.setRoomTitle(title);
            this.roomTitle = this.$store.state.room.roomTitle;
          })
        }
      })
    },
    listenDisconnectedUser(){
      this.socket.on('user-disconnected', (userId, username) => {
        console.log('disconnected:',userId, username)
        if (this.peerList[userId]){
          this.removePeer( userId );
          //this.removeVideoListItem( userId );      
        }
      })
    },
    listenConnectedUser(){
      this.socket.on('user-connected', (userId, username) => {
        this.connectToNewUser({userId, username}, this.myVideo.stream)
      })
    },
    listenToggleCamera(){
      this.socket.on("somebody-toggle-camera", ( {isUsingCamera, userId} ) => {
        this.updatePeerMediaPermission(userId, "camera", isUsingCamera);
      })
    },
    listenToggleMicrophone(){
      this.socket.on("somebody-toggle-microphone", ( {isUsingMicrophone, userId} ) => {
        this.updatePeerMediaPermission(userId, "microphone", isUsingMicrophone);
      })
    },

    answerCall({userId, username}){
      if(this.peerList[userId].call){
        this.peerList[userId].call.answer(this.myVideo.stream);
        this.peerList[userId].call.on('stream', userVideoStream => {
          this.streamVideo( { userId, username, userVideoStream } )
        })
      }
    },

    connectToNewUser({userId, username}, stream) {
      const call                  = this.myPeer.call(userId, stream, { metadata: { username: this.myUsername } }); 
      this.peerList[userId]       = { userId: userId, video: {username: username} };
      this.peerList[userId].call  = call;

      if(call){ 
        call.on('stream', userVideoStream => {
            this.streamVideo( { userId, username, userVideoStream } )
        })

        call.on('close', () => {
          if (this.peerList[userId]){
            this.removePeer( userId );
            //this.removeVideoListItem( userId );     
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
    
    streamVideo( {userId, username, userVideoStream} ){
      let video = { isStreamingAudio: true, isStreamingVideo: true, stream: userVideoStream, userId: userId, username: username };
      this.peerList[userId].video          = video;

      if(this.isUserIdUnique(userId)){
        this.appendVideoListItem( userId );
      }
    },    

    removePeer( userId ){
      this.removeVideoListItem( userId );
      this.peerList[userId].call.close()
      delete this.peerList[userId];
    },

    appendVideoListItem( userId ){
      this.videoList.push(userId);
    },

    removeVideoListItem( userId ){
      let index = this.videoList.findIndex(id => {return id == userId;})
      if(index > -1){
        this.videoList.splice(index, 1);
      }
    },

    isUserIdUnique(userId){
      let found = this.videoList.find(item=>{
        return item === userId;
      })
      return found ? false : true;
    },

    updatePeerMediaPermission(userId, device, value){
      let streamMedia = "";

      if (device == "microphone")
        streamMedia = "isStreamingAudio";
      else if ( device == "camera")
        streamMedia = "isStreamingVideo";

      if (this.peerList[userId]){
        this.peerList[userId].video[streamMedia] = value;
      }
      if (this.myPeerId == userId){
        this.allowAudio = value;
        this.myVideo[streamMedia] = value;
      }
    },

    disconnect(){
      if(this.socket)
        this.socket.disconnect();
    },

    endCall(){
      if(this.isDisconnected === false){
        this.isDisconnected = true;
        this.disconnect();
        this.stopVideoTracks();
        this.socket         = null;
        this.myPeer         = null;
        this.myPeerId       = undefined;
        this.myCall         = null;
        this.myVideo        = { stream: null };
        this.isReadyMyVideo = false;
        this.isReadyMyPeer  = false;
        this.peerList     = {};
        this.videoList    = [];
      }
    },

    checkRoomTitleFromStore(){
      if(this.$store.state.room.roomTitle){
        this.roomTitle = this.$store.state.room.roomTitle;
      }
      else if(this.$store.state.room.roomTitle == ''){
        this.$router.push('/lobby')
      }
      else{
        this.$router.push('/lobby')
      }
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

    async reconnect(){
      this.socket = await new Socket;
      this.socket.connect();
      this.initialize();
    },

    stopVideoTracks() {
      this.myVideo.stream.getTracks().forEach(function(track) {
          if (track.readyState == 'live') {
              track.stop();
          }
      });
    },

    checkSafari() {
      let userAgent   = navigator.userAgent;
      let seemsChrome = userAgent.indexOf("Chrome") > -1;
      let seemsSafari = userAgent.indexOf("Safari") > -1;
      return seemsSafari && !seemsChrome;
    },

  }
}
</script>

<style scoped>

</style>