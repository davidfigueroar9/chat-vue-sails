import Vue from 'vue'
import Vuex from 'vuex'
import rooms from './modules/rooms'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    rooms
  },
  strict: debug
})
