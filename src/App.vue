<template>
  <div>
    <TabbarNav
      v-if="path != '/login' && path!='/message/:name'"
      @switchMenu="switchMenuRouter"
      :MenuStatus="MenuStatus"
      :path="path"
    ></TabbarNav>
  </div>
  <router-view></router-view>
</template>
<script>
import { reactive, ref, toRefs, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import TabbarNav from "./components/TabbarNav.vue";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "App",
  components: {
    TabbarNav,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let data = reactive({
      MenuStatus: 0,
      path: router.currentRoute.value.path,
    });

    watch(
      () => router.currentRoute.value.path,
      (path, oldPath) => {
        router.getRoutes().map((item, index) => {
          if (path === item.path) {
            data.path = item.path;
            console.log('路有监听',data.path)
            UpdateMenuStatus(path,item)
          }
        });
      },
      {
        deep: false, // 是否采用深度监听
        immediate: false, // 首次加载是否执行
      }
    );

    function UpdateMenuStatus(path,item){
        if (path === item.path) {
            data.path = item.path;
            if (data.path == "/address_book") {
              data.MenuStatus = 1;
            } else if (data.path == "/me") {
              data.MenuStatus = 2;
            } else {
              data.MenuStatus = 0;
            }
          }
    }


    function switchMenuRouter(value) {
      data.MenuStatus = value;
      switch (value) {
        case 0:
          router.push({
            path: "/message",
          });
          break;
        case 1:
          router.push({
            path: "/address_book",
          });
          break;
        case 2:
          router.push({
            path: "/me",
          });
          break;
        default:
          break;
      }
    }
    onMounted(() => {
      if ( data.path != "/login") {
        console.log(data.path);
      
      }
    });
    return {
      ...toRefs(data),
      switchMenuRouter,
      UpdateMenuStatus
    };
  },
};
</script>

