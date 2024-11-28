<template>
  <div class="main-container flex-box">
    <el-form class="form-box" :model="form" label-width="120px" style="min-width: 500px">
      <!-- 数据增广方式选择 -->
      <el-form-item size="large" label="增广方式">
        <el-select size="large" v-model="form.augmentationMethod" placeholder="请选择增广方式">
          <el-option
            v-for="item in augmentationMethods"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 增广子方法选择 -->
      <el-form-item size="large" label="子方法选择" v-if="subMethods.length > 0">
        <el-select size="large" v-model="form.subMethod" placeholder="请选择增广子方法">
          <el-option
            v-for="item in subMethods"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- 文件上传 -->
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :on-change="handleFileChange"
        :on-remove="handleRemove"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>

      <!-- 展示上传的图片 -->
      <div v-if="uploadedImages.length > 0" class="uploaded-image-container">
        <p>已上传图片：</p>
        <div class="image-grid">
          <div
            v-for="(image, index) in uploadedImages"
            :key="index"
            class="image-item"
          >
            <img :src="image.base64" alt="Uploaded Image" class="uploaded-image" />
            <span
              class="delete-icon"
              @click="handleRemove(index)"
            >
              ×
            </span>
          </div>
        </div>
      </div>

      <!-- 按钮组 -->
      <div class="button-group">
        <el-button
          style="color: white; font-size: large"
          color="#4E9D89"
          size="large"
          @click="submitForm"
        >
          生成图像
        </el-button>
        <el-button
          style="color: white; font-size: large"
          color="#CE5309"
          size="large"
          @click="resetForm"
        >
          重置
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 表单模型
interface AugmentationForm {
  augmentationMethod: string;
  subMethod: string;
}

const form = ref<AugmentationForm>({
  augmentationMethod: '',
  subMethod: '',
});

const augmentationMethods = ref([
  { label: '传统数据增强', value: 'traditional' },
  { label: '风格迁移', value: 'style_transfer' },
  { label: '对抗攻击', value: 'adversarial' },
]);

const subMethods = computed(() => {
  const methods = {
    traditional: ['翻转', '旋转', '裁剪', '高斯模糊'],
    style_transfer: ['雾霾', '薄雾', '黄昏'],
    adversarial: [],
  };
  return methods[form.value.augmentationMethod] || [];
});

const fileList = ref([]);
const uploadedImages = ref<{ name: string; base64: string }[]>([]);

// 处理文件上传变化
const handleFileChange = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const result = event.target?.result as string;
    if (result) {
      uploadedImages.value.push({ name: file.name, base64: result });
    }
  };
  reader.readAsDataURL(file.raw);
};

// 删除指定索引的图片
const handleRemove = (index: number) => {
  uploadedImages.value.splice(index, 1);
};

// 提交表单
const submitForm = () => {
  if (!form.value.augmentationMethod) {
    alert('请选择增广方式');
    return;
  }
  if (subMethods.value.length > 0 && !form.value.subMethod) {
    alert('请选择增广子方法');
    return;
  }
  if (uploadedImages.value.length === 0) {
    alert('请上传至少一张图片');
    return;
  }
  console.log('Form submitted:', form.value);
};

// 重置表单
const resetForm = () => {
  form.value.augmentationMethod = '';
  form.value.subMethod = '';
  fileList.value.length = 0;
  uploadedImages.value = [];
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

.uploaded-image-container {
  margin-top: 20px;
  text-align: center;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}


.image-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.uploaded-image {
  max-width: 100%;
  max-height: 100%;
}

.delete-icon {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 14px;
  font-weight: bold;
  color: #f56c6c;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2px 5px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.2s;
}

.delete-icon:hover {
  background-color: #f56c6c;
  color: white;
  transform: scale(1.1);
}

</style>
 