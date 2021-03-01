<template>
  <div class="form">
    <h1>Login</h1>
    <input type="text"/>
    <button @click="login()">Go</button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  components: {
    
  },
  data(){
    return{

    }
  },
  methods: {
    login(){
      /* this.$store
        .dispatch('login')
        .then(() => this.$router.push({ name: "lobby" })); */

        this.$router.push({ name: "Lobby" })
    }
  }


}
</script>

