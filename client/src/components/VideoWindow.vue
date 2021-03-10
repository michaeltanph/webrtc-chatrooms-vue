<template>
  <div class="wrapper relative md:block">
    <video ref="video"
        class="rounded-xl"
        :style="{width: width, height: height}"
        :muted="isStreamingAudio"
        :srcObject="stream">
    </video>
    
    <div class="flex" v-if="!self">
      <h5 v-if="id" class="text-xs username flex-none flex items-center justify-center h-9 rounded px-3 text-gray-200 border bg-gray-500 border-gray-500">
        {{id}}
      </h5>

      <!-- <button
        @click="allowAudio = !allowAudio"
        class="btn-control flex-none flex items-center justify-center w-9 h-9 rounded text-gray-200 border bg-gray-500 border-gray-500"
        v-if="self">
        <svg v-if="allowAudio" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path v-if="!allowAudio" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
        <svg v-else width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      </button> -->

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
    userName: {
      default: 'username-0101',
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
      if(!this.self || this.positive)
        return '100%';
      else
        return '240px';
    },
    height: function(){
      if(!this.self || this.positive)
        return '300px';
      else
        return '200px';
    },
    muted: function(){
      return !this.allowAudio
    }
  },
  data (){
    return {
      show: false,
      stream2: null,
      //allowAudio: false,
      //allowVideo: true,
      positive: true,
    }
  },
  watch:{
    stream: function(data){
      //console.log(data, 'stream update')
      if(data){
        this.addVideoStream(this.stream);
        this.allowVideo = true;
      }
      else{
        this.allowVideo = false;
      }
    },
    /* isStreaming: function(data){
      if(data){
        this.allowVideo = true;
      }
      else{
        this.allowVideo = false;
      }
    } */
  },
  created(){
    
  },
  mounted(){
    //this.allowAudio = !this.self ? true : false;
    setTimeout(() => {
      this.addVideoStream(this.stream);
    }, 2000);
  },
  unmounted(){

  },
  methods:{
    addVideoStream(stream) {
        //console.log({stream})
        this.$refs.video.srcObject = stream;
        this.$refs.video.addEventListener('loadedmetadata', () => {
            this.$refs.video.play()
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  video {
    display: block;
    /* width: 400px;
    height: 320px; */
    /* margin: 15px; */
    object-fit: cover;
    background: black;
    /* border: 10px solid white; */
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
