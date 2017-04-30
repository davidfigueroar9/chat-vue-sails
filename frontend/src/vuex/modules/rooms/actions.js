import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

var io = sailsIOClient(socketIOClient)

io.sails.url = 'http://localhost:1337'

import {
  GET,
  ADD,
  STOREUSERNAME,
  ADDMESSAGE
} from './mutation-types'

import axios from '../../../services/axios'

export function getRooms ({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get('/rooms')
    .then(response => {
      console.log(response.data)
      commit(GET, response.data)
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}

export function storeRoom ({ commit }, room) {
  return new Promise((resolve, reject) => {
    axios.post('/rooms', room)
    .then(response => {
      console.log(response.data)
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}

export function storeMessage ({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post('/rooms/' + data.id + '/messages', data.message)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}

export function setUsername ({ commit }, username) {
  commit(STOREUSERNAME, username)
}

export function roomsSockets ({ commit }) {
  // Send a GET request to `http://localhost:1337/hello`:
  io.socket.get('/rooms', function serverResponded (body, JWR) {
    console.log('Sails responded with 2: ', body)
    console.log('with headers: ', JWR.headers)
  })
  io.socket.on('rooms', message => {
    switch (message.verb) {
      case 'created':
        commit(ADD, message.data)
        break
      case 'addedTo':
        if (message.attribute === 'messages') {
          io.socket.get('/rooms/' + message.id + '/messages/' + message.addedId, function serverResponded (body, JWR) {
            commit(ADDMESSAGE, {id: message.id, message: body[0]})
          })
        }
        break
    }
    console.log(message)
  })
}
