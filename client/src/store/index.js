import Vuex from 'vuex'

import modules from './modules'

// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules,
//     strict: process.env.DEV
//   })

//   return Store
// }


const Store = new Vuex.Store({
    modules,
    strict: process.env.DEV
})


export default Store