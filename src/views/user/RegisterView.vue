<template>
  <Banner title="登录"></Banner>
  <div class="main-container flex-box">
    <div class="form-box">
      <el-row style="height: 100%" justify="space-between">
        <el-col :sm="12" :xs="0" class="flex-box" style="padding: 20px">
          <div style="margin: 0 30px 30px 30px">
            <h2>用户注册</h2>
          </div>
          <el-form ref="ruleFormRef" :model="registerForm" :rules="rules" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" v-model="registerForm.confirmPassword" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
              <el-button type="success" @click="router.push('/login')">前往登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-image style="width: 100%;height: 100%;border-radius: 5px 0 0 5px;"
                    :src="registerImage" fit="cover" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Banner from "@/components/Banner.vue";
import registerImage from "@/assets/login.jpg";
import { register } from "@/services/user-api.ts";
import { useRouter } from "vue-router";
import {ElMessage, FormInstance, FormRules} from "element-plus";

const router = useRouter();

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const ruleFormRef = ref<FormInstance>()

const registerForm = reactive<RegisterForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const confirmPasswordValidator = (rule, value, callback) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<RegisterForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: confirmPasswordValidator, trigger: 'blur' }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      register(registerForm).then((res) => {
        console.log(res)
        if (res.code === 200) {
          ElMessage.success('注册成功')
          router.push('/login')
        }
        else {
          ElMessage.error(res.message)
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
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
