<template>
  <div class="wrapper relative md:block">
    <video ref="video"
        class="rounded-xl"
        :style="{width: width, height: height}"
        :muted="isMuted"
        :srcObject="stream">
    </video>
    
    <div class="flex" v-if="!self">
      <h5 v-if="id" class="text-xs username flex-none flex items-center justify-center h-9 rounded px-3 text-gray-200 border bg-gray-700 border-gray-700">
        <!-- {{id}} {{isMuted}} -->
        {{username}}
      </h5>

      <button
        @click="toggleListenVoice"
        class="btn-control flex-none flex items-center justify-center w-9 h-9 rounded text-gray-200 border bg-gray-800 border-gray-800"
        v-if="!self">
        <svg v-if="listenVoice" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
        <svg v-else width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
           <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />  <line x1="23" y1="9" x2="17" y2="15" />  <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      </button>

      <h5
        class="btn-video flex-none flex items-center justify-center w-9 h-9 rounded-r text-gray-200 border bg-transparent border-transparent"
        v-if="isStreamingVideo">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      </h5>
      <h5
        class="btn-video flex-none flex items-center justify-center w-9 h-9 rounded-r text-gray-200 border bg-transparent border-transparent"
        v-else>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
          <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />  <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      </h5>

      <h5
        class="btn-microphone flex-none flex items-center justify-center w-9 h-9 rounded-r text-gray-200 border bg-transparent border-transparent"
        v-if="isStreamingAudio">
        <svg width="20" height="20" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </h5>
      <h5
        class="btn-microphone flex-none flex items-center justify-center w-9 h-9 rounded-r text-gray-200 border bg-transparent border-transparent"
        v-else>
        <svg width="20" height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
          <line x1="1" y1="1" x2="23" y2="23" />  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </h5>
        
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoWindowComponent',
  components: {
    
  },
  props: {
    self: {
      default: false,
      type: Boolean,
    },
    stream: {
      default: null,
    },
    id: {
      default: '',
      type: String,
    },
    username: {
      default: '',
      type: String,
    },
    isStreamingVideo: {
      default: true,
      type: Boolean,
    },
    isStreamingAudio: {
      default: true,
      type: Boolean,
    },

  },
  computed: {
    width: function(){
      if(!this.self)
        return '100%';
      else
        //return '240px';
        return '100%';
    },
    height: function(){
      if(!this.self)
        return '300px';
      else
        //return '200px';
        return '300px';
    },
    isMuted: function(){
      return !this.isStreamingAudio || !this.listenVoice;
      //return !this.isStreamingAudio;
      //return true
    }
  },
  data (){
    return {
      show: false,
      listenVoice: true,
    }
  },
  watch:{
    stream: function(data){
      if(data){
        this.addVideoStream(this.stream);
        this.allowVideo = true;
      }
      else{
        this.allowVideo = false;
      }
    },
  },
  created(){
    
  },
  mounted(){
    setTimeout(() => {
      this.addVideoStream(this.stream);
    }, 2000);
  },
  unmounted(){

  },
  methods:{
    addVideoStream(stream) {
      this.$refs.video.srcObject = stream;
      this.$refs.video.addEventListener('loadedmetadata', () => {
        this.$refs.video.play()
      });
    },
    toggleListenVoice(){
      this.listenVoice = !this.listenVoice;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  video {
    display: block;
    object-fit: cover;
    background: black;
    transform: scaleX(-1);
  }
  .wrapper{
    position: relative;
  }
  .btn-control{
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
  .btn-video{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .btn-microphone{
    position: absolute;
    top: 10px;
    right: 40px;
  }
  .username{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .btn-play{
    position: absolute;
    bottom: 10px;
    left: 45px;
  }
</style>
