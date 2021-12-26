<template>
  <van-row>
    <div class="van-cell">
      <div class="van-cell__title cell-user">
        <img class="avatar" :src="user.avatar" />
        {{ user.name }}
      </div>
    </div>
  </van-row>

  <div class="project">
    <van-cell is-link>
      <van-row>
        <van-col class="van-cell-a" offset="12" span="12">
          <van-icon name="setting-o" color="#3c3030" />
        </van-col>
        <van-col style="margin-left: 10px" offset="12" span="12">设置</van-col>
      </van-row>
    </van-cell>
    <van-cell is-link @click="accountLogout">
      <van-row>
        <van-col class="van-cell-a" offset="12" span="12">
        <van-icon name="guide-o" color="#d71c1c" />
        </van-col>
        <van-col style="margin-left: 10px" offset="12" span="12"
          >退出登录</van-col
        >
      </van-row>
    </van-cell>
  </div>
</template>
<script>
import { Col, Row } from "vant";
import { reactive, ref, toRefs } from "vue";
import { Dialog, Notify } from "vant";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Me",
  setup() {
    let data = reactive({
      MenuStatus: 1,
      user: {},
    });
    const store = useStore();
    const router = useRouter();

    const users = computed(() => store.state.users);
    data.user = users;
    function accountLogout() {
      Dialog.confirm({
        title: "提示",
        message: "是否退出登录",
      })
        .then(() => {
          store.commit("CLEAR_USERS");
          router.push({ path: "/login" });
        })
        .catch(() => {
          // on cancel
        });
    }
    return {
      ...toRefs(data),
      accountLogout,
    };
  },
};
</script>
<style lang="scss" scoped>
.project {
  margin-top: 10px;
}
.avatar {
  height: 40px;
  width: 40px;
  margin-right: 20px;
  border-radius: 3px;
}
.top {
  background-color: #e5e5e5;
}
.cell-user {
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  line-height: 50px;
  height: 50px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 4px;
}
.van-cell__right-icon {
}
.van-cell {
  display: flex;
  align-items: center;
}
</style>