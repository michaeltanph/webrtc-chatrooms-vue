<template>
    <button
        class="flex items-center justify-center text-center cursor-pointer border-2 shadow-sm hover:shadow-md focus:outline-none focus:shadow-outline rounded"
        :class="buttonClass"
        v-bind="$attrs"
    >
        <slot></slot>
    </button>
</template>
<script>
export default {
    inheritAttrs: false,
    props: {
        color: {
            type: String,
            default: "gray"
        },
        size: {
            type: String,
            default: "md"
        },
        outline: Boolean,
        icon: Boolean,
        round: Boolean,
        class: {
            type: String,
            default: ""
        },
    },

    computed:{
        buttonClass: function(){
            const _blank = " ";
            let classes = "";
            switch(this.size) {
                case 'xl': {
                    classes += _blank + `h-14 text-xl py-8 ${this.icon ? 'px-6': 'px-12'}`
                    break;
                }
                case 'lg':{
                    classes += _blank + `h-12 text-lg py-6 ${this.icon ? 'px-4': 'px-8'}`
                    break;
                }
                case 'md':{
                    classes += _blank + `h-10 py-4 ${this.icon ? 'px-3': 'px-6'} `
                    break;
                }
                case 'sm':{
                    classes += _blank + `h-8 text-sm py-2 ${this.icon ? 'px-2': 'px-4'}`
                    break;
                }
                case 'xs':{
                    classes += _blank + `h-8 text-xs py-1 ${this.icon ? 'px-1': 'px-2'}`
                    break;
                }
                default:{
                    classes += _blank + `h-10 py-4 ${this.icon ? 'px-3': 'px-6'}`
                }
            }

            if(this.outline){
                classes += _blank + `border-${this.color}-400 bg-white text-${this.color}-600 hover:bg-${this.color}-600 hover:border-${this.color}-600 hover:text-white`;
            }
            else if(this.color && !this.outline){
                classes += _blank + `bg-${this.color}-600 text-white border-${this.color}-600 hover:bg-${this.color}-700 hover:border-${this.color}-700 hover:text-white`;
            }

            classes += _blank + this.class
            return classes
        }
        
    }
};
</script>