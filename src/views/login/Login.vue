<script lang="js" setup>
import 'element-plus/es/components/message/style/css'
import {ElMessage} from "element-plus";
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import {getCodeByteAPI, loginAPI} from "../../apis/login.js";
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
    //{min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur'}
  ],
  picCode: [
    {required: true, message: '验证码不能为空', trigger: 'blur'},
    {min: 5, max: 5, message: '验证码为5个字符', trigger: 'blur'}
  ]
}
const router = useRouter();
const formRef = ref(null);
// 验证码唯一id
let codeId = ref(0);
const doLogin = () => {
  // 结构赋值
  const {email, password, picCode} = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单验证都通过才为true
    if (valid) {
      // 发送登录请求
      if (await userStore.login({email, password, picCode, codeId})) {
        ElMessage.success("登录成功")
        // 跳转页面
        await router.push("/")
      }
    }
  })
}

const codeData = ref(null);
const getCode = async () => {
  const res = await getCodeByteAPI();
  // 将获取的base64数据绑定到图像元素的 src 属性上
  codeData.value = res.data.codeData
  codeId = res.data.id
}

onMounted(() => getCode())

</script>

<template>

    <div class="absolute top-20 left-56 font-semibold text-4xl w-2/3 pb-2 mb-2 total-text-color border-b-2">
      <p class="italic antialiased">登录本站</p>
    </div>

    <div class=" w-1/4 py-20">
      <el-form class="flex-col items-center " ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
               status-icon>

        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"/>
        </el-form-item>

        <el-form-item prop="password"  label="密码">
          <el-input type="password" v-model="form.password"/>
        </el-form-item>

        <el-form-item class="pl-2 " prop="picCode" label="验证码" label-width="auto">

          <div class="flex items-center justify-center ">
            <el-input class="pr-3 w-2/3" v-model="form.picCode"/>
            <img class="px-2 h-10 w-1/3 " :src="codeData">
            <a href="#" @click="getCode" class="px-2 h-10 w-full flex items-center text-blue-500 underline ">
              <span >看不清?</span>
            </a>
          </div>
        </el-form-item>

        <div class="flex items-center justify-around pb-2 px-10 ">
          <router-link to="/forget">
            <a href="#" class="underline text-blue-500">忘记密码?</a>
          </router-link>
          <router-link to="/register">
            <a href="#" class="underline text-blue-500">还没有账号?</a>
          </router-link>
        </div>
        <div class="flex items-center justify-center">
          <el-button size="large" color="#009eff" @click="doLogin">登录</el-button>
        </div>

      </el-form>


  </div>


</template>

<style >
 html{
   scroll-behavior: smooth;
 }
</style>


