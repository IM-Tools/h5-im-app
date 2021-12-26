<template>
  <van-nav-bar
    :title="name"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <discord-picker
    class="chat-msg"
    :showUpload="showUpload"
    :sources="path"
    input
    :value="value"
    @keyup.enter="sendMsg"
    @update:value="value = $event"
    @emoji="setEmoji"
    :placeholder="placeholder"
  />

  <!-- <van-field
    class="chat-msg"
    v-model="message"
    rows="1"
    autosize
    label="留言"
    type="textarea"
    placeholder="请输入留言"
  /> -->
</template>
<script>
import DiscordPicker from "vue3-discordpicker";
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "Message",
  components: { DiscordPicker },
  setup() {
    const router = useRouter();
    const store = useStore();
    let data = reactive({
      MenuStatus: 1,
      name: router.currentRoute.value.params.name,
      value: "",
      placeholder: "开始聊天吧～～～",
      path: "/",
      showUpload: true,
      socket: null,
    });
    const socket = computed(() => store.state.socket);
    data.socket = socket;

    function onClickLeft() {
      window.history.back(-1);
    }
    function onClickRight() {
      Toast("返回1");
    }
    function sendMsg() {
      console.log("socket", data.socket);
       data.socket.send("HeartBeat");
      console.log("msg", data.value);
    }
    return {
      ...toRefs(data),
      onClickLeft,
      onClickRight,
      sendMsg,
    };
  },
};
</script>
<style lang="scss" scoped>
.chat-msg {
  position: absolute;
  bottom: 50px;
}
</style>

