<template lang="html">
  <div class="panel panel-default m-t-lg">
    <div class="panel-body">
      <form class='' v-on:submit.prevent="saveUsername">
        <div class="form-group">
          <label for="">Ingrese su username para entrar al chat.</label>
          <div class="input-group">
            <input type="text" v-model="username" class="form-control input-md" placeholder="Username" required="required">
            <span class="input-group-btn">
              <button class="btn btn-default btn-md" type="submit">Entrar</button>
            </span>
          </div><!-- /input-group -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    saveUsername () {
      this.setUsername(this.username)
    },
    ...mapActions([
      'setUsername'
    ])
  }
}
</script>

<style lang="css">
</style>
