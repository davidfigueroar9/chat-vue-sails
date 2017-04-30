import * as getters from './getters'
import * as actions from './actions'

import {
  GET,
  SHOW,
  DELETE,
  ADD,
  STOREUSERNAME,
  ADDMESSAGE
} from './mutation-types'

const initialState = {
  username: '',
  rooms: [],
  room: {}
}

// mutations
const mutations = {
  [GET] (state, rooms) {
    state.rooms = rooms
  },
  [SHOW] (state, room) {
    state.room = room
  },
  [ADD] (state, room) {
    room.messages = []
    state.rooms.push(room)
  },
  [DELETE] (state, room) {
    state.room = room
  },
  [STOREUSERNAME] (state, username) {
    state.username = username
  },
  [ADDMESSAGE] (state, message) {
    state.rooms.filter(e => {
      if (e.id === message.id) {
        return e.messages.push(message.message)
      }
    })
  }
}

export default {
  state: {...initialState},
  getters,
  actions,
  mutations
}
