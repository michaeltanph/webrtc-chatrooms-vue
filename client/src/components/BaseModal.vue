<template>
  <transition name="fade">
    <div v-show="visible" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div ref="overlay" @click="onClickOverlay($event)" class="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-gray-50 px-4 pt-5 pb-4 sm:p-6 sm:pt-4 sm:pb-4">
            <h3 class="font-semibold text-lg">{{ title }}</h3>
          </div>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <slot></slot> 
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse">
            <slot name="actions"></slot>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    showCloseButton: {      
      type: Boolean,
      default: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return{
      
    }
  },
  methods: {
    close() {
      this.$emit('update', false)
    },
    onClickOverlay($event) {
      if ($event && $event.target === this.$refs.overlay) {
        this.close()
      }
    },
    
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform .5s;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateY(-50%) translateX(100vw);
  }

</style>