<template>
  <div class="lobby">
    <h1>Lobby</h1>

    <button>Create Room</button>

    <ul>
      <li v-for="room in rooms" :key="room.name">
        {{room}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Lobby',
  components: {
    
  },
  data(){
    return{
      rooms: [],
    }
  },
  methods: {
    getRooms(){
      this.rooms = [ {name: 'a' }, {name: 'b' }]
    }
  }
}
</script>
