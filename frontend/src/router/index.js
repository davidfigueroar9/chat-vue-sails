import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import RoomMessages from '@/components/RoomMessages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: ':id',
          component: RoomMessages
        }
      ]
    }
  ]
})
