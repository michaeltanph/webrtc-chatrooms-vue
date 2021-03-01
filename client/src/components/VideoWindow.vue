<template>
  <div class="wrapper relative md:block">
    <video ref="video"
        class="rounded-xl"
        :style="{width: width, height: height}"
        :muted="!allowAudio">
    </video>
    
    <div class="flex">
        <h5 v-if="id" class="text-xs username flex-none flex items-center justify-center h-9 rounded px-3 text-gray-200 border bg-gray-500 border-gray-500">
          {{id}}
        </h5>
        <button
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
        </button>
        <h5
          class="btn-video flex-none flex items-center justify-center w-9 h-9 rounded-r text-gray-200 border bg-transparent border-transparent"
          v-if="isStreaming">
          <svg v-if="false" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
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
    muted: {
      default: false,
      type: Boolean,
    },
    id: {
      default: '',
      type: String,
    },
    userName: {
      default: 'username-0101',
      type: String,
    }
  },
  computed: {
    micIcon: function(){
      if(!this.allowAudio)
        return 'volume_off'
      else
        return 'volume_up'
    },
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
    }
  },
  data (){
    return {
      show: false,
      stream2: null,
      allowAudio: false,
      isStreaming: true,
      positive: true,
    }
  },
  watch:{
    stream: function(data){
      if(data){
        this.addVideoStream(this.stream);
        this.isStreaming = true;
      }
      else{
        this.isStreaming = false;
      }
    }
  },
  created(){
    
  },
  mounted(){
    this.allowAudio = !this.self ? true : false;
    setTimeout(() => {
      this.addVideoStream(this.stream);
    }, 2000);
  },
  unmounted(){

  },
  methods:{
    addVideoStream(stream) {
        console.log({stream})
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
