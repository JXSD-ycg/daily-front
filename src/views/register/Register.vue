<script lang="js" setup>
import 'element-plus/es/components/message/style/css'
import {ElMessage} from "element-plus";
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import {getCodeByteAPI, loginAPI} from "../../apis/login.js";
import {registerAPI, sentCodeAPI} from "../../apis/register.js";
import LayoutHeader from "../layout/components/LayoutHeader.vue";

const form = ref({
  email: '3044254475@qq.com',
  username: 'ycg',
  password: '',
  checkPass: '',
  mailCode: ''
})


const checkPass = (rule, value, callback) => {
  console.log(value)
  // 自定义校验逻辑
  if (value !== form.value.password) {
    callback(new Error('两次输入的密码不对哦'))
  } else {
    callback()
  }
}
// 规则对象
const rules = {
  email: [
    {required: true, message: '邮箱不能为空哦', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确, 请输入正确的邮箱地址', trigger: ['blur', 'change']},
  ],
  username: [
    {required: true, message: '用户名不能为空', trigger: 'blur'},
    {min: 3, max: 14, message: '用户名长度太短啦,需要3-14个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 3, max: 14, message: '密码长度为6-14个字符', trigger: 'blur'}
  ],
  checkPass: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {
      validator: checkPass, trigger: 'blur'
    }
  ],
  mailCode: [
    {required: true, message: '验证码不能为空哦', trigger: 'change'},
    {min: 4, max: 4, message: '验证码由4个数字组成哦', trigger: 'change'},
  ]
}

const router = useRouter();
const formRef = ref(null);

// 注册
const doRegister = () => {
  // 结构赋值
  const {email, username, password, mailCode} = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单验证都通过才为true
    if (valid) {
      // 发送登录请求
      const res = await registerAPI({email, username, password, mailCode});
      if (res.code === 1) {
        ElMessage.success({
          message: "注册成功, 现在可以登录啦",
        })
        // 延迟跳转
        setTimeout(async () => {
          // 注册成功  跳转登录页
          await router.replace({path: '/login'})
        },2000)

      } else {
        ElMessage.error("登录失败")
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
          const res = await sentCodeAPI(form.value.email,0);
          if (res.code === 1) {
            ElMessage.success({
              message: "发送邮箱成功, 请前往邮箱查看验证码",
              duration: 5000,
            })
          } else if (res.code === 2) {
            ElMessage.warning(
            {
              message: "邮箱已注册, 请登录",
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
    <p class="italic antialiased">注册账号</p>
  </div>
  <div class=" w-1/4 py-20">
    <el-form class="flex-col items-center space-y-5" ref="formRef" :model="form" :rules="rules" label-position="right"
             label-width="60px"
             status-icon>

      <el-form-item prop="email" label-width="auto" label="注册邮箱">
        <el-input class="self-end  w-3/4" v-model="form.email"/>
      </el-form-item>

      <el-form-item prop="username" label-width="auto" label="用户名称">
        <el-input class="self-end w-3/4" v-model="form.username"/>
      </el-form-item>

      <el-form-item class="" prop="mailCode" label="邮箱验证码" label-width="auto">
        <div class="flex items-center w-full">
          <el-input class="pr-5" v-model="form.mailCode"/>
          <el-button color="#009eff" @click="sentMailCode" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>

      <el-form-item class="pt-8" prop="password" label-width="auto" label="登录密码">
        <el-input type="password" v-model="form.password"/>
      </el-form-item>

      <el-form-item prop="checkPass" label-width="auto" label="确认密码">
        <el-input type="password" v-model="form.checkPass"/>
      </el-form-item>

      <div class="flex items-center justify-center ">
        <el-button size="large" color="#009eff" @click="doRegister">注册</el-button>
      </div>


    </el-form>

  </div>

</template>


