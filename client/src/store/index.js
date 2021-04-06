import Vuex from 'vuex'

import modules from './modules'

const Store = new Vuex.Store({
    modules,
    strict: process.env.DEV
})


export default Store