<template>
  <header>
    <div class="title">电力缺陷检测系统</div>
    <div class="nav-links">
      <router-link v-for="item in navItems" :to="item.indexPath" active-class="nav-links-active">{{ item.name }}</router-link>
<!--      <a v-for="item in navItems" @click="toLink(item.indexPath)"><div>{{ item.name }}</div></a>-->
    </div>
    <div class="auth-links" v-if="userStore.username == '未登录'">
      <router-link to="/register" active-class="nav-links-active">用户注册</router-link>
      <router-link to="/login" active-class="nav-links-active">用户登录</router-link>
    </div>
    <div class="auth-links" v-if="userStore.username != '未登录'">
      <div>欢迎你, {{ userStore.username }}!</div>
      <a @click="logout">登出</a>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const showMessageBox = ref(false);
const newMessageCount = ref(0);

router.beforeEach((to, from, next) => {
  next();
});

const navItems = [{ name: "主页", indexPath: "/", iconName: "HomeFilled" },
  { name: "数据增广", indexPath: "/a", iconName: "Menu" },
  { name: "模型检测", indexPath: "/b", iconName: "UserFilled" },
  { name: "鲁棒性评估", indexPath: "/robustness", iconName: "PictureFilled" }];

const toLink = (path: any) => {
  router.push(path);
};

const logout = () => {
  ElMessage.success("登出成功");
  localStorage.removeItem("user");
  userStore.logout();
  router.push("/login");
};
</script>

<style scoped>
header {
  background-color: #2a9d8f; /* 设置头部背景颜色 */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  font-size: 1.2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* 添加头部阴影 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
}
header:hover {
  background-color: #249f88;  /* 鼠标悬停时略微加深背景色 */
}
.title {
  font-weight: bold;
  font-size: 1.8em; /* 增大标题字体 */
  letter-spacing: 2px; /* 增加字母间距 */
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 30px; /* 增加导航项之间的间距 */
}
.nav-links a {
  color: white;
  text-decoration: none; /* 去掉下划线 */
  font-size: 1.2em; /* 增大字体 */
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s ease; /* 平滑过渡效果 */
}
.nav-links a:hover {
  background-color: #21867d; /* 修改为和背景颜色更接近的深绿色 */
  color: white; /* 鼠标悬停时保持白色字体 */
  transform: scale(1.1); /* 添加缩放效果 */
}

.nav-links-active {
  background-color: #21867d;
  color: white;
}

/* 用户注册和登录链接样式 */
.auth-links {
  display: flex;
  gap: 15px; /* 增加注册和登录链接之间的间距 */
}
.auth-links div {
  font-size: 1.2em; /* 字体大小和导航链接一致 */
  color: white;
  text-decoration: none;
  padding: 10px 15px; /* 和导航链接相同的内边距 */
  border-radius: 5px;
}
.auth-links a {
  color: white;
  text-decoration: none;
  padding: 10px 15px; /* 和导航链接相同的内边距 */
  border-radius: 5px;
  font-size: 1.2em; /* 字体大小和导航链接一致 */
  transition: background-color 0.3s, transform 0.3s ease; /* 平滑过渡效果 */
  cursor: pointer;
}
.auth-links a:hover {
  background-color: #21867d; /* 同样使用与导航栏一致的悬停效果 */
  color: white; /* 鼠标悬停时保持白色字体 */
  transform: scale(1.1); /* 添加缩放效果 */
}
</style>
