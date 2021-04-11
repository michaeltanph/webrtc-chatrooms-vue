<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

</style>
