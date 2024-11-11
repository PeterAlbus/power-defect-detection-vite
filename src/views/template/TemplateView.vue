<template>
  <Banner title="界面名称"></Banner>
  <div class="main-container flex-box">
    <h1>这是一个标题</h1>
    <div>这是一个界面内容，布局使用了flex布局，通过css实现，可以搜索了解。</div>
    <div style="margin-top: 20px">随下方输入框内容改变的变量：{{variable}}</div>
    <el-input style="width: 300px" v-model="variable" placeholder="请输入内容"></el-input>
    <a href="https://element-plus.org/zh-CN/">(链接)element-ui文档</a>
    <div style="margin-top: 20px">一些element-ui组件示例：</div>
    <el-button type="danger">按钮</el-button>
    <el-button type="primary">
      <el-icon style="vertical-align: middle">
        <Search />
      </el-icon>
      <span style="vertical-align: middle">带图标按钮</span>
    </el-button>
    <div>
      <el-checkbox v-model="checked1" label="多选框1" size="large" />
      <el-checkbox v-model="checked2" label="多选框2" size="large" />
    </div>
    <div>
      <el-select v-model="value" placeholder="Select" style="width: 240px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        />
      </el-select>
    </div>
    <div>
      你也可以使用html原生标签，并使用css修饰：
      <button>
        原生按钮
      </button>
    </div>
  </div>
</template>

<script setup>
import Banner from "@/components/Banner.vue";
import { ref } from "vue";

const variable = ref('变量内容')

const checked1 = ref(true)
const checked2 = ref(false)

const value = ref('Option1')
const options = [
  {
    value: 'Option1',
    label: '选择器演示',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped>

</style>
