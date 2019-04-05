'use strict'
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/moderator/:gameId',
      props: true,
      name: 'Moderator',
      component: () => import(/* webpackChunkName: "about" */ './views/Moderator.vue'),
    },
    {
      path: '/client/:gameId/:view',
      name: 'Client',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/Client.vue'),
    },
  ],
})
