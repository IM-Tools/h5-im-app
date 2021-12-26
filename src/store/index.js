import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import session from './modules/session'
import Cookies from 'js-cookie';
const debug =
    import.meta.env.NODE_ENV !== 'production'

export default createStore({
    state() {
        return {
            auth: Cookies.get('auth') ? true : false,
            users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : false,
            token: Cookies.get('token') || undefined,
            socket: localStorage.getItem('socket') ? localStorage.getItem('socket') : false,
        }
    },
    mutations: {
        SET_SOCKET(sate,data){
            localStorage.setItem('socket',data);
            sate.socket = data
        },
        SET_AUTH(state, data) {
            state.auth = true;
            Cookies.set('auth', true, { expires: data.time });
        },
        SET_USERS(state, data) {
            localStorage.setItem('users', JSON.stringify(data));
            Cookies.set('token', data.token, { expires: data.time });
            state.users = data;
            state.token = data.token;
        },
        CLEAR_USERS(state){
            state.users =[];
            state.token = undefined;
            state.auth=false
            localStorage.removeItem('users')
            Cookies.remove('token')
            Cookies.remove('auth')
        }
    },
    modules: {
        user,
        session
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})