<template>
  <div class="header-top">
    <span class="online"></span>app在线
  </div>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
    <div
      @click="onChat(item)"
      v-for="item in sessionList"
      :key="item"
      :class="{ top: item.top_status }"
      class="van-cell"
    >
      <div class="van-cell__title cell-user">
        <img class="avatar" :src="item.avatar" />
        {{ item.name }}
      </div>
    </div>
  </van-list>
</template>
<script>
import { reactive, ref, toRefs } from "vue";
import { computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Session",

  setup() {
    const store = useStore();
    const router = useRouter();

    let data = reactive({
      sessionList: {},
      loading: false,
      finished: false,
      Socket: null,
      isMaskSocket: false,
      socketInitNum: 0,
    });
    const sessionList = computed(() => store.state.session.sessionUserList);
    data.sessionList = sessionList;

    function onChat(item) {
      router.push({ path: "/message/" + item.name });
    }

    function socketInit() {
      if (typeof WebSocket === "undefined") {
        console.log("您的浏览器不支持socket~");
        return;
      } else {
        // 开始连接websocket
        data.Socket = new WebSocket(
          import.meta.env.VITE_APP_WS + "?token=" + store.state.token
        );
        data.Socket.opopen = socketStart;
        data.Socket.operror = socketOnError;
        data.Socket.onmessage = socketOnMsg;
        data.Socket.onclose = socketClose;
        store.commit("SET_SOCKET",data.Socket)
        
      }
    }

    function socketStart() {
      data.Socket.send("HeartBeat");
      data.isMaskSocket = false;
      console.log("Socket opopen");
    }
    function socketOnError() {
      console.log("Socket error");
    }
    function socketOnMsg(e) {
       let params = JSON.parse(e.data);
      console.log("监听消息", params);
    }
    function socketClose() {
      // 意外关闭重新连接
      if (data.socketInitNum < 3) {
        setTimeout(() => {
          socketInit();
          data.socketInitNum++;
        }, 1000);
      } else {
        data.isMaskSocket = true;
      }
    }

    function refClick() {
      data.socketInitNum = 0;
      scoketClose();
    }
    function sendMsg(data) {
      console.log("Socket send ", data);
    }

    function onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          data.list.push(data.list.length + 1);
        }
        // 加载状态结束
        data.loading = false;

        // 数据全部加载完成
        if (data.list.length >= 40) {
          data.finished = true;
        }
      }, 1000);
    }

    onMounted(() => {
      if (data.Socket == null) {
        socketInit();
      }
    });

    return {
      ...toRefs(data),
      onLoad,
      socketInit,
      refClick,
      sendMsg,
      onChat,
    };
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  height: 50px;
  width: 50px;
  margin-right: 20px;
  border-radius: 3px;
}
.top {
  background-color: #e5e5e5;
}
.cell-user {
  display: flex;
  line-height: 50px;
  height: 50px;
  font-size: 18px;
}
</style>