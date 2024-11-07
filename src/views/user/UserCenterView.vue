<template>
  <Banner title="登录"></Banner>
  <div class="main-container flex-box">
    <div>
      用户名：{{ userStore.username }}
    </div>
    <div>
      邮箱：{{ userStore.email }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import { useRouter } from "vue-router";
import {useUserStore} from "@/stores/user.ts";

const router = useRouter();
const userStore = useUserStore();
</script>

<style scoped>
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form-box {
  background-color: white;
  width: 75vw;
  height: 600px;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  border-radius: 5px;
}

.form-box:hover {
  box-shadow: 0 5px 12px 8px rgba(7, 17, 27, 0.1);
}
</style>
