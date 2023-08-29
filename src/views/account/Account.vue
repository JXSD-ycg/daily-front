<script setup>

import 'element-plus/es/components/message/style/css'
import {ElMessage} from "element-plus";
import {onMounted, ref} from 'vue'
import {uploadImageAPI} from "../../apis/edit.js";
import router from "../../router/index.js";


const loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"))
const form = ref({
  username: loginUserInfo.username,
  introduce: loginUserInfo.introduce,
  image: loginUserInfo.image,
  sex: loginUserInfo.sex
})
// 规则对象
const rules = {
  username: [
    {required: true, message: '用户名不能为空', trigger: 'blur'},
    {min: 1, max: 10, message: '用户名长度位1 ~ 10 个字符', trigger: 'blur'}
  ],
  introduce: [
    {required: false, message: '密码不能为空', trigger: 'blur'},
    {min: 0, max: 200, message: '请输入小于200字的自我介绍', trigger: 'blur'}
  ],
  sex: [
    {required: true, message: '请输入性别, 男或女', trigger: 'blur'},
    {min: 1, max: 1, message: '请输入性别, 男或女', trigger: 'blur'}
  ],
}

const formRef = ref(null);
const doLogin = () => {
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单验证都通过才为true
    if (valid) {
      // 发送修改用户信息请求
      if (true) {
        ElMessage.success("用户信息修改成功")
        // 跳转页面
        await router.push("/userHome")
      }
    }
  })
}

// 上传头像

const beforeAvatarUpload = (rawFile) => {
  console.log("进入beforeAvatarUpload")
  if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像仅支持jpg、jpeg、png格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error('图片大小不能超过1M!')
    return false
  }
  return true
}

const imageUrl = ref(loginUserInfo.image)
// 覆盖默认提交行为, 这里可以实现手动提交 item就是一个request请求, 里面携带了item 和请求参数
// 也可以在里面设置请求头之类的
// todo 完成的头像图片的提交, 保存到了 后端 并能通过 url访问
// todo 图片重复问题, 要完成删除图片接口
const httpRequest = async (item) => {
  console.log("item: ", item)
  console.log(item.file)
  console.log("进入httpRequest")
  const formData = new FormData();
  formData.append("files", item.file)
  const res = await uploadImageAPI(formData);
  console.log(res.data)
  form.image = res.data
  imageUrl.value = res.data
}
</script>

<template>

  <div class="w-2/3">
    <div class="total-text-color font-semibold text-3xl pb-3 border-b-2 border-blue-50 ">
      <div>账号设置</div>
    </div>
    <div class="flex items-center justify-between py-10 min-h-max">
      <el-form class="flex-col items-center w-3/4 " ref="formRef" :model="form" :rules="rules" label-position="right"
               label-width="60px"
               status-icon>
        <el-form-item class="w-1/2" prop="username" label="用户名:" label-width="auto">
          <el-input v-model="form.username"/>
        </el-form-item>

        <el-form-item prop="introduce"
                      class="w-5/6"
                      label="自我介绍:"
                      label-width="auto">
          <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 40 }"
              v-model="form.introduce"/>
        </el-form-item>
        <el-form-item class="pl-2 w-3/5" prop="sex" label="性别:" label-width="auto">
          <div class="flex items-center justify-center  w-2/3">
            <el-input class="pl-2" v-model="form.sex"/>
          </div>
        </el-form-item>

        <div class="flex items-center justify-center">
          <el-button size="large" color="#009eff" @click="doLogin">确认修改</el-button>
        </div>
      </el-form>

      <div class="w-2/5 -mt-10 flex-col items-center justify-center ">
        <img v-if="form.image" :src="imageUrl" class="w-56 h-56" />
        <div v-else  class="w-full h-full" >
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" ><path d="M512 0C229.236338 0 0 229.236338 0 512s229.236338 512 512 512 512-229.224912 512-512S794.775088 0 512 0z m-6.443844 190.801776c94.681097 0 171.710173 75.886551 171.710173 169.185192s-77.029076 169.208042-171.710173 169.208042-171.698748-75.909401-171.698749-169.185191S410.886484 190.801776 505.556156 190.801776zM793.141276 771.638944c0 61.536429-100.473702 61.536429-216.817084 61.536429H447.664383c-121.107714 0-216.794234 0-216.794234-61.536429v-12.670609c0-117.680137 97.240354-213.48091 216.794234-213.480909h128.659809c119.553879 0 216.817084 95.777922 216.817084 213.480909z" fill="#e5e5e5" p-id="4724"></path><path d="M576.324192 545.487426H447.664383c-119.553879 0-216.794234 95.755071-216.794234 213.480909v12.670609c0 61.536429 95.68652 61.536429 216.794234 61.536429h128.659809c116.343383 0 216.817084 0 216.817084-61.536429v-12.670609c0-117.702988-97.263205-213.48091-216.817084-213.480909zM505.556156 529.19501c94.681097 0 171.710173-75.875126 171.710173-169.185191S600.237253 190.801776 505.556156 190.801776s-171.698748 75.932252-171.698749 169.208043 77.029076 169.185192 171.698749 169.185191z" fill="#ffffff" p-id="4725"></path></svg>
        </div>

        <el-upload
            action=""
            class="flex items-center justify-center w-2/3 h-2/3 pt-3"
            :show-file-list="false"
            :http-request="httpRequest"
            :before-upload="beforeAvatarUpload"
            accept="image/jpg, image/jpeg, image/png">
          <el-button color="#0891b2">上传头像</el-button>
        </el-upload>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>