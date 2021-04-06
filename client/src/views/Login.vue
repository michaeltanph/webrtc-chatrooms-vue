<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      
      <!-- <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> -->

      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-3xl pb-4 font-bold">KingCarabao WebChat</h1>
          <div class="divide-y divide-gray-200">
            <div class="pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <p>This is a vue side project utilizing the power of WebRTC with Socket.io and PeerJs</p>
              <p>Type in your nickname below to continue.</p>
            </div>
            <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">

              <form @submit.prevent="login" class="mt-6">
                <div class="sm:flex">
                  <input v-model="username" type="text" required="" placeholder="JuanDu" class="block sm:max-w-xs w-full px-4 py-3 text-base appearance-none border border-gray-300 shadow-none bg-white rounded-md placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
                  <button class="mt-4 relative sm:mt-0 sm:h-auto sm:ml-4 block w-full sm:w-auto border border-transparent px-6 py-3 text-base font-semibold leading-snug bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition ease-in-out duration-150 hover:bg-gray-600" :class="{ 'opacity-50 pointer-events-none': isSubmitting, 'hover:bg-gray-600': !isSubmitting }" :disabled="isSubmitting">
                    <span>Continue</span>
                    <span style="" x-show="true" class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0" :class="{ 'opacity-0': !isSubmitting }">
                      <svg class="h-8 w-8 spin" viewBox="0 0 24 24">
                        <path class="text-gray-600" fill="currentColor" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14z"></path>
                        <path class="text-gray-400" fill="currentColor" d="M12 3a9 9 0 010 18v-2a7 7 0 000-14V3z"></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <p v-show="isError" style="display: none;" class="lg:absolute mt-4 text-white max-w-xl font-medium">{{errorMessage}}</p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  components: {
    
  },
  data(){
    return{
      isError: false,
      errorMessage: '',
      isSubmitting: false,
      nicknameList: ['Bangus', 'Banana', 'Orange', 'Apple', 'Mango', 'Chocolate', 'Leaf', 'Tropico', 'Marci', 'Discord', 'Hoodwink', 'BottleBarn', 'Cheech', 'Carabao', 'Valheim', 'Tawas'],
      username: '',
    }
  },
  mounted(){
    this.randomUsername();
  },
  methods: {
    login(){
      this.$store
        .dispatch('logIn', this.username)
        .then(() => this.$router.push({ path: "/lobby" }));
    },
    randomUsername(){
      let max = this.nicknameList.length;
      this.username = this.nicknameList[Math.floor(Math.random() * max)]
    }
  }


}
</script>

