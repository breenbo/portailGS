import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import MainHeader from './views/MainHeader.vue'
import Header from './views/Header.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      // name: 'Home',
      components :  {
        main : Main,
        header : MainHeader
      }
    },
    { path: '/:id',
      // name: 'Home',
      components :  {
        // main : Home,
        header : Header
      }
    },
    { path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue') }
  ]
})
