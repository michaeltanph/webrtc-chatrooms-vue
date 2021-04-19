<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-3xl pb-4 font-bold">Palpak! WebChat</h1>
          <div class="divide-y divide-gray-200">
            <div class="pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <p>This project is built using VueJs, Tailwind CSS, WebRTC, Socket.io and PeerJs</p>
              <p>Type in your nickname below to proceed.</p>
            </div>
            <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">

              <form @submit.prevent="login" class="mt-6">
                <div class="flex">
                  <input v-model="username" type="text" required="" placeholder="JuanDu" class="block sm:max-w-xs w-full px-4 py-3 text-base appearance-none border border-gray-300 shadow-none bg-white rounded-md placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
                  <base-button color="blue" size="md" class="xs:max-w-xs ml-4 py-6"
                    :disabled="isSubmitting">
                    Continue
                    <span style="" x-show="true" class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0" :class="{ 'opacity-0': !isSubmitting }">
                      <svg class="h-8 w-8 spin" viewBox="0 0 24 24">
                        <path class="text-gray-600" fill="currentColor" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14z"></path>
                        <path class="text-gray-400" fill="currentColor" d="M12 3a9 9 0 010 18v-2a7 7 0 000-14V3z"></path>
                      </svg>
                    </span>
                  </base-button>
                  
                </div>
                <p v-show="isError" style="display: none;" class="lg:absolute mt-4 text-red max-w-xl font-medium">{{errorMessage}}</p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";

export default {
  name: 'Login',
  components: {
    BaseButton,
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
      if(this.username != '' && this.username != null && this.username != undefined){
        this.$store
          .dispatch('logIn', this.username)
          .then(() => this.$router.push({ path: "/lobby" }));
      }
      else{
        this.isError = true;
        this.errorMessage = 'nickname required';
      }
    },
    randomUsername(){
      let max = this.nicknameList.length;
      this.username = this.nicknameList[Math.floor(Math.random() * max)]
    }
  }


}
</script>

