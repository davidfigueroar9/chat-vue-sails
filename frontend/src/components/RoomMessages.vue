<template lang="html">
  <div class="panel panel-default">
    <div class="panel-heading"><h2 v-if="room">{{ room.name }}</h2></div>
    <ul class="list-group messages scrollbar" v-if="room" id="messages">
      <li class="list-group-item animated fadeIn" v-for="message in room.messages">
        <h4>{{ message.message }}</h4>
        <p class="text-muted m-b-0">{{ message.username }}<span class="pull-right">{{message.status}}</span> </p>
      </li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item">
        <form class='' v-on:submit.prevent="sendMessage">
          <div class="form-group  m-b-0">
            <div class="input-group">
              <input type="text" v-model="message" class="form-control input-md" placeholder="Username" required="required">
              <span class="input-group-btn">
                <button class="btn btn-default btn-md" type="submit">Enviar</button>
              </span>
            </div><!-- /input-group -->
          </div>
        </form>
      </li>
    </ul>
    <div class="hidden">
      {{ scrollDown }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  beforeMount () {
  },
  computed: {
    ...mapGetters({
      rooms: 'getRooms',
      username: 'getUsername'
    }),
    scrollDown () {
      if (this.room.messages.length !== this.count) {
        setTimeout(() => {
          var el = document.getElementById('messages')
          if (el !== null) {
            el.scrollTop = el.scrollHeight
            return el
          }
        }, 50)
        this.count = this.room.messages.length
      }
      return this.count
    },
    room () {
      var room = this.rooms.filter(e => {
        if (e.id === parseInt(this.$route.params.id)) {
          return e
        }
      })
      return room[0]
    }
  },
  data () {
    return {
      message: '',
      count: 0
    }
  },
  methods: {
    sendMessage () {
      this.storeMessage({
        message: {
          message: this.message,
          username: this.username,
          status: 'send'
        },
        id: this.$route.params.id
      }).then(() => {
        this.message = ''
      })
      console.log(this.room)
    },
    ...mapActions([
      'storeMessage'
    ])
  }
}
</script>

<style lang="css">
  .messages {
    height: 70vh;
    overflow: auto;
  }

  .scrollbar::-webkit-scrollbar-track
  {
  	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  	border-radius: 10px;
  	background-color: #F5F5F5;
  }

  .scrollbar::-webkit-scrollbar
  {
  	width: 8px;
  	background-color: #F5F5F5;
  }

  .scrollbar::-webkit-scrollbar-thumb
  {
  	border-radius: 10px;
  	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  	background-color: #555;
  }

</style>
