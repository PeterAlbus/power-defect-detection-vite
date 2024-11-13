<template>
  <div class="main-container flex-box">
    <el-form class="form-box" :model="form" label-width="120px" style="min-width: 500px">
      <el-form-item size="large" label="数据集选择">
        <el-select size="large" v-model="form.dataset" placeholder="请选择数据集">
          <el-option
              v-for="item in datasetList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item size="large" label="评估模型选择">
        <el-select size="large" v-model="form.model" placeholder="请选择评估模型">
          <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-upload
          class="upload-demo"
          drag
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
<!--      <el-form-item label="测评攻击算法">-->
<!--        <el-checkbox-group size="large" v-model="form.advAlgorithms">-->
<!--          <el-checkbox size="large" label="FGSM"></el-checkbox>-->
<!--          <el-checkbox size="large" label="BIM"></el-checkbox>-->
<!--          <el-checkbox size="large" label="PGD"></el-checkbox>-->
<!--          <el-checkbox size="large" label="BLB"></el-checkbox>-->
<!--          <el-checkbox size="large" label="NIM"></el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
      <div class="button-group">
        <el-button style="color: white; font-size: large" color="#4E9D89" size="large" @click="submitForm">开始测评</el-button>
        <el-button style="color: white; font-size: large" color="#CE5309" size="large" @click="">取消</el-button>
      </div>
    </el-form>
<!--    <el-table :data="tableData" style="width: 50%">-->
<!--      <el-table-column prop="metric" label="测评结果"></el-table-column>-->
<!--      <el-table-column prop="value" label="AlexNet"></el-table-column>-->
<!--    </el-table>-->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface RobustnessEvalForm {
  dataset: string;
  model: string;
  advAlgorithms: string[];
}

interface Option {
  label: string;
  value: string;
}

const form = ref<RobustnessEvalForm>({
  dataset: '电力设备缺陷数据集',
  model: 'ResNet',
  advAlgorithms: []
});

const datasetList = ref<Option[]>([
  { label: '电力设备缺陷数据集', value: '电力设备缺陷数据集' },
  { label: '数据集2', value: '数据集2' },
  { label: 'Cifar-100', value: 'Cifar-100' }
]);

const modelList = ref<Option[]>([
  { label: 'ResNet', value: 'ResNet' },
  { label: 'AlexNet', value: 'AlexNet' },
  { label: 'VGG', value: 'VGG' }
]);

const fileList = ref([]);

const tableData = ref([
  { metric: 'CA', value: 0.700 },
  { metric: 'ACC', value: 0.256 },
  { metric: 'ACAC', value: 0.819 },
  { metric: 'ACTC', value: 0.090 },
  { metric: 'NTE', value: 0.683 },
  { metric: 'ALDp', value: 0.828 }
]);

const handlePreview = (file) => {
  console.log('Preview:', file);
};

const handleRemove = (file, fileList) => {
  console.log('Remove:', file, fileList);
};

const submitForm = () => {
  console.log('Form submitted:', form.value);
};
</script>

<style scoped>
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}

.form-box {
  font-size: large;
}
</style>
