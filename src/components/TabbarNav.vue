<template>
  <van-tabbar v-model="MenuStatus">
    <van-tabbar-item  @click="selectMenu(0)" badge="3" size="40" icon="wechat">
      <!-- <span>消息</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template> -->
    </van-tabbar-item>
    <van-tabbar-item  @click="selectMenu(1)" icon="friends-o"
      >通讯录</van-tabbar-item
    >
    <van-tabbar-item @click="selectMenu(2)" icon="contact">我</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { reactive, ref, toRefs } from "vue";

export default {
  name: "TabbarNav",
  emits: ["switchMenu"],
  props: {
    MenuStatus: {
      type: Number,
      default: 1,
    },
    path:{
      type: String,
      default:"/message"
    }
  },
  setup(props, { emit }) {
    let data = reactive({
      active: 1,
      status: 1,
      icon: {
        active: "https://img01.yzcdn.cn/vant/user-active.png",
        inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    });
    function selectMenu(value) {
      data.status = value;
      emit("switchMenu", value);
    }
    return {
      ...toRefs(data),
      selectMenu,
    };
  },
};
</script>
<style lang="scss" scoped>
.van-tabbar-item--active{
  color:rgb(50, 235, 75)
}
</style>