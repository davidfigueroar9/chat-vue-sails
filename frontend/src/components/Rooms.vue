<template lang="html">
  <div class="">
    <div class="panel panel-default">
    <!-- Default panel contents -->
      <div class="panel-heading"><h2>{{ username }}<button type="button" name="button" data-toggle="modal" data-target="#create-room" class="btn btn-default pull-right">Crear sala</button></h2> </div>

      <!-- List group -->
      <div class="list-group chat-rooms">
        <router-link  active-class="active" v-for="room in rooms" v-bind:to="'/' + room.id" key="room.id" class="list-group-item">
          <h4>{{ room.name }} </h4>
          <p class="muted">{{room.username}}</p>
        </router-link>
      </div>
    </div>
    <div class="modal fade" id="create-room" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="">Crear sala</h4>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="createRooms">
              <div class="form-group">
                <label for="">Nombre de la sala</label>
                <div class="input-group">
                  <input v-model="room_name" type="text" class="form-control input-md" placeholder="Sala 52" required="required">
                  <span class="input-group-btn">
                    <button class="btn btn-primary btn-md" type="submit">Crear</button>
                  </span>
                </div><!-- /input-group -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  beforeMount () {
    this.getRooms()
    this.roomsSockets()
  },
  computed: {
    ...mapGetters({
      rooms: 'getRooms',
      username: 'getUsername'
    })
  },
  data () {
    return {
      room_name: ''
    }
  },
  methods: {
    createRooms () {
      var room = {
        username: this.username,
        name: this.room_name
      }
      this.storeRoom(room).then(() => {
        window.$('#create-room').modal('hide')
        this.room_name = ''
      })
    },
    ...mapActions([
      'getRooms',
      'roomsSockets',
      'storeRoom'
    ])
  }
}
</script>

<style lang="scss">
  .center-chat {
    margin-top: 50px;
  }
  .chat-rooms {
    max-height: 80vh;
    overflow: auto;
  }
</style>
