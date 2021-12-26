import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import {Button,Form,Field,Tabbar, TabbarItem,List,Cell,Icon,NavBar} from 'vant'
import 'vant/lib/index.css'
import store from './store'
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import DiscordPicker from 'vue3-discordpicker'
const app = createApp(App)
app.use(router)
app.use(store)
// app.use(Antd);
app.config.productionTip = false;
app.use(List)
app.use(NavBar)
app.use(Icon)
app.use(Cell)
app.use(DiscordPicker)
app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Form)
app.use(Field)
app.mount('#app')
