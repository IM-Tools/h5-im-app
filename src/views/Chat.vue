<template>
  <router-link to="/chat/session">点击到消息页</router-link>
  <TabbarNav @switchMenu="switchMenuFunc" :MenuStatus="MenuStatus"></TabbarNav>
  <router-view></router-view>
</template>
<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import TabbarNav from "../components/TabbarNav.vue";
export default {
  name: "Chat",
  components:{
      TabbarNav
  },
  setup() {
    let data = reactive({
        MenuStatus:1,
    });
     const router = useRouter()
    function switchMenuFunc(value) {
      console.log('菜单点击',value)
      data.MenuStatus= value
      switch (value) {
        case 1:
          router.push({
            path:"/chat/session",
          })
          break;
      
        default:
          break;
      }
    }
    return {
      ...toRefs(data),
      switchMenuFunc

    };
  },
};
</script>

