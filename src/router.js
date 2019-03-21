import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Topics from './components/Topics.vue'
import Topic from './components/Topic.vue'
import User from './components/User.vue'
import Create from './components/Create.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: Topics
        }
      ]
    },
    {
      path: '/topic/:id',
      component: Topic
    },
    {
      path: '/user/:loginname',
      component: User
    },
    {
      path: '/topics/create',
      component: Create
    },
    {
      path: '/search',
      component: Topics
    }
  ],
  mode: 'history'
})
export default router
