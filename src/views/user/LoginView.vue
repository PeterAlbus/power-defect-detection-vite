<template>
  <Banner title="登录"></Banner>
  <div class="main-container flex-box">
    <div class="form-box">
      <el-row style="height: 100%" justify="space-between">
        <el-col :sm="12" :xs="0">
          <el-image style="width: 100%;height: 100%;border-radius: 5px 0 0 5px;"
                    :src="loginImage" fit="cover" />
        </el-col>
        <el-col :sm="12" :xs="24" class="flex-box" style="padding: 20px">
          <div style="margin: 0 30px 30px 30px">
            <h2>用户登录</h2>
          </div>
          <el-form ref="ruleFormRef" :model="loginForm" :rules="rules" label-width="80px" status-icon>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin(ruleFormRef)">登录</el-button>
              <el-button type="success" @click="router.push('/register')">前往注册</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import loginImage from '@/assets/login.jpg';
import Banner from "@/components/Banner.vue";
import { login } from "@/services/user-api.ts";
import { useUserStore  } from "@/stores/user.ts";
import { useRouter } from "vue-router";
import {ElMessage, FormInstance, FormRules} from "element-plus";

const router = useRouter();
const userStore = useUserStore();

interface LoginForm {
  username: string;
  password: string;
}

const ruleFormRef = ref<FormInstance>()

const loginForm = ref<LoginForm>({
  username: '',
  password: ''
});

const rules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
});

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      login(loginForm.value.username, loginForm.value.password).then((res) => {
        console.log(res);
        if (res.code === 200) {
          userStore.updateUser(res.data)
          ElMessage.success('登录成功');
          router.push('/');
        } else {
          ElMessage.error(res.msg);
        }
      });
    } else {
      console.log('error submit!', fields)
    }
  })
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
