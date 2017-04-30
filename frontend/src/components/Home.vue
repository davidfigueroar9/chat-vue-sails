<template>
  <div class="">
    <div v-if="username !== ''" class="container center-chat">
      <div class="row">
        <div class="col-md-4">
          <rooms></rooms>
        </div>
        <div class="col-md-8">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <Login></Login>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rooms from '@/components/Rooms'
import Login from '@/components/Login'
import RoomMessages from '@/components/RoomMessages'
import { mapGetters } from 'vuex'

export default {
  components: {
    Rooms,
    Login,
    RoomMessages
  },
  computed: {
    ...mapGetters({
      username: 'getUsername'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
