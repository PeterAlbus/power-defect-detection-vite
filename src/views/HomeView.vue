<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <main>
    <div class="container">
      <div>
        Hello Vite!
      </div>
      <br>
      <div>
        <el-button @click="router.push('/template')">跳转到模板页面</el-button>
      </div>
    </div>
  </main>
</template>

<style lang="less" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-weight: bold;
    overflow: hidden;
  }
}
</style>
