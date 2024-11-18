<template>
  <div class="main-container flex-box">
    <el-form class="form-box" :model="form" label-width="120px" style="min-width: 500px">
      <el-form-item label="数据集选择">
        <el-select v-model="form.dataset" placeholder="请选择数据集">
          <el-option
              v-for="item in datasetList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="评估模型选择">
        <el-select v-model="form.model" placeholder="请选择评估模型">
          <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模型权重">
        <div style="width: 100%;flex-direction: row;justify-content: space-between" class="flex-box">
          <el-select v-model="form.weight" placeholder="请选择权重">
            <el-option
                v-for="item in weightList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-button type="primary">管理权重</el-button>
        </div>
      </el-form-item>
      <el-form-item label="测评攻击算法">
<!--        <el-checkbox-group size="large" v-model="form.advAlgorithms">-->
<!--          <el-checkbox size="large" label="FGSM"></el-checkbox>-->
<!--          <el-checkbox size="large" label="BIM"></el-checkbox>-->
<!--          <el-checkbox size="large" label="PGD"></el-checkbox>-->
<!--          <el-checkbox size="large" label="BLB"></el-checkbox>-->
<!--          <el-checkbox size="large" label="NIM"></el-checkbox>-->
<!--        </el-checkbox-group>-->
        <el-transfer
            v-model="form.advAlgorithms"
            style="text-align: left; display: inline-block"
            :props="{
              key: 'value',
              label: 'label',
            }"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="输入方法名称搜索"
            :data="attackMethod"
            :button-texts="['删除', '添加']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            :titles="['方法列表', '已选择']"
        />
      </el-form-item>
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
import type { UploadInstance } from 'element-plus'

interface RobustnessEvalForm {
  dataset: string;
  model: string;
  weight: string;
  advAlgorithms: string[];
}

interface Option {
  label: string;
  value: string;
}

const form = ref<RobustnessEvalForm>({
  dataset: '电力设备缺陷数据集',
  model: 'ResNet',
  weight: '权重1',
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

const weightList = ref<Option[]>([
  { label: '权重1', value: '权重1' },
  { label: '权重2', value: '权重2' },
  { label: '权重3', value: '权重3' }
]);

const attackMethod = ref<object>([
  { label: 'FGSM', value: 'FGSM' },
  { label: 'RFGSM', value: 'RFGSM' },
  { label: 'BIM', value: 'BIM' },
  { label: 'PGD', value: 'PGD' },
  { label: 'PRGF', value: 'PRGF' },
  { label: 'EAD', value: 'EAD' },
  { label: 'AutoPGD', value: 'AutoPGD' },
  { label: 'BLB', value: 'BLB' },
  { label: 'CORRUPT', value: 'CORRUPT' },
  { label: 'DEEPFOOL', value: 'DEEPFOOL' },
  { label: 'DIM', value: 'DIM' },
  { label: 'LLC', value: 'LLC' },
  { label: 'NIM', value: 'NIM' },
  { label: 'ILLC', value: 'ILLC' },
  { label: 'RLLC', value: 'RLLC' },
  { label: 'SignHunter', value: 'SignHunter' },
  { label: 'SIGNOPT', value: 'SIGNOPT' },
  { label: 'SIMBA', value: 'SIMBA' }
])

const uploadRef = ref<UploadInstance>()

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

const filterMethod = (query, item) => {
  const search_by_label = item.label.toLowerCase().includes(query.toLowerCase())
  const search_by_value = item.value.toLowerCase().includes(query.toLowerCase())
  return search_by_label || search_by_value
}
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
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.form-box {
  font-size: large;
}

.upload-box {
  text-align: left;
}
</style>
