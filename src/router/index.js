import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlayList from '../views/PlayList.vue'
import NowPlaying from '../views/NowPlaying.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    props: (route) => {
      return {
        routeParams: route.query
      }
    }
  },
  {
    path: '/PlayList',
    name: 'PlayList',
    component: PlayList,
    props: true
  },
  {
    path: '/Nowplaying',
    name: 'NowPlaying',
    component: NowPlaying,
    props: (route) => {
      return {
        routeParams: route.query
      }
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router