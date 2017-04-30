import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'
import { mapActions } from 'vuex'

var methods = {
  ...mapActions([
    'addRoom'
  ])
}
// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient)

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337'
// ...

// Send a GET request to `http://localhost:1337/hello`:
io.socket.get('/rooms', function serverResponded (body, JWR) {
  // body === JWR.body
  console.log('Sails responded with: ', body)
  console.log('with headers: ', JWR.headers)
  console.log(methods)

  // ...
  // more stuff
  // ...

  // When you are finished with `io.socket`, or any other sockets you connect manually,
  // you should make sure and disconnect them, e.g.:
  // (note that there is no callback argument to the `.disconnect` method)
})

io.socket.on('rooms', message => {
  switch (message.verb) {
    case 'created':
      methods.addroom(message.data)
      break
  }
  console.log(message)
})
