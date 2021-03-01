<template>
  <div class="">
    <h1>Room</h1>

    <div class="">
      <video-window
        :self="true"
        :stream="myVideo.stream"
        :muted="myVideo.muted" 
      />
    </div>
    <div class=""
      :key="idx"
      v-for="(vid, idx) in videoList" 
    >
      <video-window 
        :stream="peerList[vid].video.stream"
        :muted="peerList[vid].video.muted"
        :id="peerList[vid].video.userId"
      />
    </div>
  </div>
</template>

<script>

import io from "socket.io-client";
import Peer from 'peerjs';
import Vue from 'vue'

import videoWindow from "@/components/VideoWindow.vue";

export default {
  name: 'Room',
  components: {
    videoWindow
  },
  data(){
    return{
      //socketServerURL: 'https://lms.kosmokode.com',
      socketServerURL: 'http://localhost:5000',
      socket: null,
      room: this.$route.params.id,

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
        }, 2500);
      }
    },
  },
  computed: {
    isReadyToJoin: function(){
      return (this.isReadyMyVideo && this.isReadyMyPeer)
    },
  },
  created(){
    //this.socket   = io.connect(this.socketServerURL);
    this.socket = io(
      this.socketServerURL,
      {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5
      }
    );
    this.listenSocket();
    this.checkRoom();
    
    this.serialization = this.checkSafari() ? 'json' : 'binary';
    
    this.myPeer   = new Peer(this.myPeerId, {
      host: '/', port: 3001,
      serialization: this.serialization,
      config: {
        'iceServers': [
          { 
            url: 'stun:stun.l.google.com:19302',
            //url: 'stun:stun1.l.google.com:19302',
            //url: 'stun:stun2.l.google.com:19302',
            //urls: "stun:stun.l.google.com:19302",
          },
          {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
          },
          /* {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
          },
          {
            url: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
          }, */
          {
            url: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
          },
          /* {
            url: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
          } */
        ]}
    });
      
    this.listenPeer();
    this.setupMyMedia();
  },
  mounted(){

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

    checkRoom() {
      this.socket.emit('check-room', this.room);
    },
    setupMyMedia(){
      navigator.mediaDevices.getUserMedia({
        video: this.allowVideo,
        audio: this.allowAudio
      }).then(stream => {
        this.myVideo = {stream: stream, muted: true};
        this.isReadyMyVideo = true;
      })
    },

    //LISTENERS
    listenPeer(){
      this.myPeer.on('open', id => {
        this.isReadyMyPeer = true;
        this.myPeerId = id;
      })
    },
    listenSocket(){
      this.socket.on("assign-room", (status, roomId) => {
        this.room = roomId ? roomId : this.room;
        if(!status){
          this.$router.push(`/room/${this.room}`)
        }
      })
      this.socket.on('user-disconnected', userId => { console.log('someone left')
        if (this.peerList[userId]){
          this.peerList[userId].call.close()
          delete this.peerList[userId];
          let index = this.videoList.findIndex(item => {return item == userId;})
          this.videoList.splice(index, 1);
        }
      })
      this.socket.on('user-connected', userId => { 
        this.connectToNewUser(userId, this.myVideo.stream)
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
          let video = {muted: false, stream: userVideoStream, userId: userId};
          this.peerList[userId].video = video;
          if(this.isUserIdUnique(userId)){
            this.videoList.push(userId);
          }
        })
      }
    },

    connectToNewUser(userId, stream) {
      const call                  = this.myPeer.call(userId, stream); 
      this.peerList[userId]       = {userId: userId, video: {}};
      this.peerList[userId].call  = call;

      if(call){ 
        call.on('stream', userVideoStream => { 
          let video = {muted: false, stream: userVideoStream, userId: userId}; 
          this.peerList[userId].video = video;  
          if(this.isUserIdUnique(userId)){
            this.videoList.push(userId);
          }
        })

        call.on('close', () => {
          if (this.peerList[userId]){
            this.peerList[userId].call.close()
            delete this.peerList[userId];
            let index = this.videoList.findIndex(item => {return item == userId;})
            this.videoList.splice(index, 1);
          }
        })
        
      }
    },

    isUserIdUnique(userId){
      let found = this.videoList.find(item=>{
        return item === userId;
      })
      return found ? false : true;
    },

    addVideoStream(video, stream){
      var ComponentClass = Vue.extend(videoWindow)
      var instance = new ComponentClass({
            propsData: { stream: stream, muted: false, userId: null }
        })
      instance.$mount() // pass nothing
      this.$refs.vidgrid.appendChild(instance.$el)
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
