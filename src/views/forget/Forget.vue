<script setup>

import 'element-plus/es/components/message/style/css'
import {ElMessage} from "element-plus";
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import {updatePassAPI} from "../../apis/forget.js";
import {getCodeByteAPI, loginAPI} from "../../apis/login.js";
import {sentCodeAPI} from "../../apis/register.js";
import {useUserStore} from "../../stores/userStore.js";

const userStore = useUserStore();
const form = ref({
  email: '3044254475@qq.com',
  password: 'ycg',
  picCode: ''
})
// 规则对象
const rules = {
  email: [
    {required: true, message: '邮箱不能为空', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change']},
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur'}
  ],
  checkPass: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur'}
  ],
  mailCode: [
    {required: true, message: '验证码不能为空', trigger: 'blur'},
    {min: 4, max: 4, message: '验证码为5个字符', trigger: 'blur'}
  ]
}
const router = useRouter();
const formRef = ref(null);

const doUpdate = () => {
  // 结构赋值
  const {email, password, checkPass, mailCode} = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单验证都通过才为true
    if (valid) {
      // 发送修改密码请求 email password, mailCode
        const res = await updatePassAPI({email, password, mailCode})
      if (res.code === 1) {
        ElMessage.success({
          message: "修改密码成功",
          duration: 5000,
        })
        await router.push("/login")
      }

    }
  })
}

const sentMailCode = async () => {
  formRef.value.validateField("email", async (errorMessage) => {
        if (errorMessage) {
          console.log(form.value.email)
          console.log('邮箱校验成功, 发送验证码')
          // 发送验证码
          const res = await sentCodeAPI(form.value.email, 1);
          if (res.code === 1) {
            ElMessage.success({
              message: "发送邮箱成功, 请前往邮箱查看验证码",
              duration: 5000,
            })
          }
        }
      }
  )
}

</script>

<template>
  <div class="absolute top-20 left-56 font-semibold text-4xl w-2/3 pb-2 mb-2 total-text-color border-b-2">
    <p class="italic antialiased">修改密码</p>
  </div>

  <div class=" w-1/4 py-20">
    <el-form class="flex-col items-center " ref="formRef" :model="form" :rules="rules" label-position="right"
             label-width="60px"
             status-icon>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>

      <el-form-item class="" prop="mailCode" label="邮箱验证码" label-width="auto">
        <div class="flex items-center w-full">
          <el-input class="pr-5" v-model="form.mailCode"/>
          <el-button color="#009eff" @click="sentMailCode" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>

      <el-form-item class="pt-8" prop="password" label-width="auto" label="输入新密码">
        <el-input type="password" v-model="form.password"/>
      </el-form-item>

      <el-form-item prop="checkPass" label-width="auto" label="确认新密码">
        <el-input type="password" v-model="form.checkPass"/>
      </el-form-item>


      <div class="flex items-center justify-center">
        <el-button size="large" color="#009eff" @click="doUpdate">修改</el-button>
      </div>

    </el-form>
  </div>

</template>

<style scoped>

</style>