<template>
  <div>
    <h3 class="login-header">
      <svg
        t="1640426704986"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1893"
        width="27"
        height="27"
      >
        <path
          d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
          fill="#A7F9DE"
          p-id="1894"
        ></path>
        <path
          d="M512 197.818182c-192.698182 0-349.090909 135.447273-349.090909 302.545454 0 113.338182 72.145455 212.014545 178.501818 263.912728a126.370909 126.370909 0 0 1-69.818182 56.785454s91.927273 23.272727 158.021818-26.763636a400.058182 400.058182 0 0 0 82.385455 8.610909c192.698182 0 349.090909-135.447273 349.090909-302.545455s-156.392727-302.545455-349.090909-302.545454z"
          fill="#1CD38D"
          p-id="1895"
        ></path>
      </svg>
      ImAPP登录
    </h3>
  </div>
  <van-form @submit="onSubmitLogin">
    <van-field
      v-model="form.name"
      name="name"
      label="账号"
      placeholder="请输入账号"
    />
    <van-field
      v-model="form.password"
      type="password"
      name="password"
      label="密码"
      placeholder="请输入密码"
    />
    <div style="margin: 16px">
      <van-button round block color="#1cdba6" native-type="submit"
        >登录</van-button
      >
    </div>
    <div style="margin: 16px">
      <van-button round block plain native-type="submit1">注册账号</van-button>
    </div>
  </van-form>
</template>
<script>
import { reactive, ref, toRefs } from "vue";
import { Toast, Notify } from "vant";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { login } from "../api/auth.js";
export default {
  name: "Login",
  setup() {
    let data = reactive({
      form: {
        name: "admin",
        password: "123456",
        client_type: 1,
      },
    });
    // 获取 store
    const store = useStore();
    // 获取 routers
    const router = useRouter();
    // 登录方法
    function onSubmitLogin() {
      if (data.form.name == "") {
        Toast.fail("账号不能为空");
        return;
      }
      if (data.form.password == "") {
        Toast.fail("账号不能为空");
        return;
      }
      if (data.form.name.length < 2) {
        Toast.fail("账号长度不能小于2位");
        return;
      }
      if (data.form.password.length < 6) {
        Toast.fail("密码长度不能小于6位");
        return;
      }
      login(data.form).then((response) => {
        const { code, data, message } = response;
        if (code == 200) {
          store.commit("SET_AUTH", data);
          store.commit("SET_USERS", data);
          Notify({
            type: "success",
            message: "登录成功",
            duration: 5000,
          });
          startApp();
          setTimeout(() => {
            router.push({ path: "/message?start=firstlogin" });
          }, 5000);
          //useRouter
        } else {
          Notify({ type: "warning", message: message });
        }
      });
    }
    function startApp() {
      store.dispatch("session/onGetSessionList");
    }

    return {
      ...toRefs(data),
      onSubmitLogin,
      startApp,
    };
  },
};
</script>
<style lang="scss" scoped>
.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 27px;
}
</style>