<template>
<div>
  <div class="lobby grid grid-cols-1 md:grid-cols-12 md:grid-start-3 xl:grid-cols-10 xl:grid-start-3">
    <div class="md:col-start-2 md:col-span-10 xl:col-start-3 xl:col-span-6">
    <section id="content-wrapper" class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
      <div class="px-4 sm:px-6 xl:px-8 pt-10">
        <h1 class="text-5xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">Hi, {{username}}</h1>
        <h1 class="text-5xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">Welcome to the lobby.</h1>
        <p class="text-2xl tracking-tight mb-4">Join among the chat rooms or create your own.</p>
      </div>
    </section>

    <section class="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <header class="flex items-center justify-between">
        <h2 class="text-lg leading-6 font-medium text-black">Chat Rooms</h2>
        <div class="flex items-end">
          <button @click="createRoom()" class="hover:bg-blue-200 hover:text-blue-800 group flex items-center rounded-md bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2">
            <svg class="group-hover:text-light-blue-600 text-light-blue-500 mr-2" width="12" height="20" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"/>
            </svg>
            Create
          </button>
          <button @click="getRooms()" class="hover:bg-blue-200 hover:text-blue-800 group flex items-center rounded-md bg-blue-100 text-blue-600 text-sm font-medium px-2 py-2 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </header>
    
      <form class="relative">
        <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <input class="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
          type="text" aria-label="Filter projects" placeholder="Filter rooms" />
      </form>

      <ul class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <li v-for="room in rooms" :key="room.name">
          <div @click="goToRoomUrl(room)" class="cursor-pointer hover:bg-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
            <dl class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
              <div>
                <dt class="sr-only">Title</dt>
                <dd class="group-hover:text-white leading-6 font-medium text-black">
                  {{room.title}}
                </dd>
              </div>
              <div>
                <dt class="sr-only">Category</dt>
                <dd class="group-hover:text-blue-200 text-sm text-gray-500 font-medium sm:mb-4 lg:mb-0 xl:mb-4">
                  {{room.category}}
                </dd>
              </div>
              <div class="col-start-2 row-start-1 row-end-3">
                <dt class="sr-only">Users</dt>
                <dd class="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
                  <img src="@/assets/thumb.png" width="48" height="48" class="w-7 h-7 rounded-full bg-gray-100 border-2 border-white" />
                </dd>
              </div>
            </dl>
          </div>
        </li>
        <li class="hover:shadow-lg flex rounded-lg">
          <button @click="createRoom()" class="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
            New Room
          </button>
        </li>
      </ul>
    </section>
    </div>
  </div>

  <!-- MODAL -->
  <div v-show="showModal" class="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
    <!-- modal -->
    <div class="bg-white rounded shadow-lg sm:w-1/3 xs:1/2">
      <!-- modal header -->
      <div class="border-b px-4 py-2 flex justify-between items-center">
        <h3 class="font-semibold text-lg">Create Room</h3>
        <button @click="toggleModal" class="text-black close-modal">
          <svg class=""  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>
      <!-- modal body -->
      <div class="p-3">
        <form class="relative flex flex-items items-center gap-4">
          <input
            required
            v-model="roomTitle" class="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-2"
            type="text"
            aria-label="Room name"
            placeholder="Name" />
          <!-- <input class="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-2"
            type="text" aria-label="Room category" placeholder="Category" /> -->
        </form>
      </div>
      <div class="flex justify-end items-center gap-2 w-100 border-t p-3">
        <button @click="toggleModal" class="hover:bg-gray-200 hover:text-gray-800 group flex items-center rounded-md bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2">
          Cancel
        </button>
        <button @click="addRoom" class="hover:bg-blue-200 hover:text-blue-800 group flex items-center rounded-md bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2">
          Confirm
        </button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import http from "@/services/api.service.js";

export default {
  name: 'Lobby',
  components: {
  },
  data(){
    return{
      loading: false,
      rooms: [],
      showModal: false,
      username: this.$store.state.user.username,
      roomTitle: ''
    }
  },
  mounted(){
    this.getRooms();
  },
  methods: {
    getRooms(){
      this.loading = true;
      http({
        url: 'rooms',
        method: 'GET',
        params: {},
      }).then(response => {
        this.rooms = this.mapResultsData(response);
      }).catch(error => {
        throw new Error(error);
      }).finally(()=>{
        this.loading = false;
      })
    },

    goToRoomUrl(room){
      this.$store.dispatch("joinRoom", { name: room.name, title: room.title, url: room.url })
    },

    addRoom(){
      if(!this.roomTitle)
        throw new Error;
      else if(this.roomTitle == '')
        throw new Error;
      else
        this.$store.dispatch('createRoom', this.roomTitle);
    },

    createRoom(){
      this.toggleModal();
    },

    toggleModal(){
      this.showModal = !this.showModal;
    },

    mapResultsData(response){
      let data = response.data;
      let roomNames =  Object.keys(data);
      let roomList = [];
     
      roomNames.forEach(roomName => {
        if(data[roomName].organic){
          roomList.push({
            name: roomName,
            title: data[roomName].title,
            url: `/room/${roomName}`,
            category: 'General',
          })
        }
      });

      return roomList;
    }
  }
}
</script>
