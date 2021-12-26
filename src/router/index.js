import Cookies from 'js-cookie';
import store from '../store'
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Session from '../views/Session.vue';
import Message from '../views/Message.vue';
import Me from '../views/Me.vue';
import AddressBook from '../views/AddressBook.vue';
const routerMap = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/message',
        name: 'Session',
        component: Session,
        meta: {
            title: '消息'
        }
    },
    {
      path: '/message/:name',
      name: 'Message',
      component: Message,
      meta: {
          title: '聊天界面'
      }
  },
    {
        path: '/me',
        name: 'Me',
        component: Me,
        meta: {
            title: '我的信息'
        }
    },
    {
        path: '/address_book',
        name: 'AddressBook',
        component: AddressBook,
        meta: {
            title: '通讯录'
        }
    },
];
const router = createRouter({
    //路由分为 history 模式 hash模式
    history: createWebHistory(),
    routes: routerMap //`routes: routes` 的缩写
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
 
    if (to.fullPath !== '/login' && !store.state.token) {
      next({
        name: 'Login'
      })
    } else {
      if(to.fullPath === '/login' && store.state.token){
        next({
          name: 'Session'
        })
      } else{
        next()
      }
  
    }
  })
  
export default router;