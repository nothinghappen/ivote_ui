import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
  	{
  		path: '/home',
  		name: 'home',
  		component: require('../components/home'),
		children:[
			{
				path: '/login',
				name: 'login',
				component: require('../components/login')
			},
			{
				path: '/register',
				name: 'register',
				component: require('../components/register')
			},
			{
				path: '/mainhome',
				name: 'mainhome',
				component: require('../components/mainhome')
			}
		]
  	},
	{
  		path: '/answer/:id',
  		name: 'answer',
  		component: require('../components/answer')
  	},
	{
  		path: '/userhome',
  		name: 'userhome',
  		component: require('../components/userhome'),
		children:[
			{
				path: '/tapsbar',
				name: 'tapsbar',
				component: require('../components/TapsBar')
			},
			{
				path: '/newquestionnaire',
				name: 'newquestionnaire',
				component: require('../components/NewQuestionnaire')
			},
			{
				path: '/statistics/:id',
				name: 'statistics',
				component: require('../components/statistics')
			}
		]
  	}
  ]
 })