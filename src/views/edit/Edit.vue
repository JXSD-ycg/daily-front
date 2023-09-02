<script setup>
import {ElMessage} from "element-plus";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {addDailyAPI, deleteImagerAPI, getOneDailyAPI, updateDailyInfoAPI, uploadImageAPI} from "../../apis/edit.js";
import router from "../../router/index.js";
import {useUserStore} from "../../stores/userStore.js";

const imageUrl = ref('');

// 这里要根据 用户 id 查询用户的日记本
const options = [
  {
    value: '默认日记本',
    label: '默认日记本',
  },
  {
    value: '日记本1',
    label: '日记本1',
  },
  {
    value: '日记本2',
    label: '日记本2',
  },
]
// 选择的日记本
const book = ref('默认日记本')
// markdown文本
const text = ref('');
// 心情
const mood = ref('')
// 天气
const weather = ref('')
// 城市
const place = ref('')
const isPublic = ref('0')
const views = ref(0)
const likes = ref(0)
const loginUserInfo = useUserStore().loginUserInfo;
// 发送日记
const addDaily = async () => {
  // 先校验参数
  if (text.value === '') {
    ElMessage.error('日记内容不为空')
    return;
  }
  const daily = {
    "userId": loginUserInfo.id,
    "username": loginUserInfo.username,
    "dailyTitle": "",
    "bookTitle": "无标题",
    "mood": mood.value,
    "weather": weather.value,
    "place": place.value,
    "content": text.value,
    "isPublic": isPublic.value,
    // 页面展示只要存放一张图片 todo 展示页面
    "image":JSON.stringify(imageList.value.map(item => item.id)),
    "views": views.value,
    "likes": likes.value,
  }
  const res = await addDailyAPI(daily);
  if (res.code === 1) {
    ElMessage.success("日记发布成功")
    await router.push("/")
  } else {
    ElMessage.error("日记发布失败")
  }
}

// 查询日记信息
const route = useRoute();
const dailyId = route.query.id
// 根据日记id查询日记  route传参 传日记的话url路径太大了
const getOneDaily = async () => {
  console.log("日记id:", dailyId)
  const res = await getOneDailyAPI(dailyId);
  if (res.code === 1) {
    text.value = res.data.content
    book.value = res.data.bookTitle
    isPublic.value = res.data.isPublic+ ""
    mood.value = res.data.mood
    weather.value = res.data.weather
    // 这里后端 返回 图片url 列表  包括图片id 图片name 和图片url 返回的是字符串 要解析一下
    imageList.value =  JSON.parse(res.data.image)
    uploadList.value =  JSON.parse(res.data.image)
    place.value = res.data.place
    views.value = res.data.views
    likes.value = res.data.likes
  }
}

// 修改日记信息
const updateDailyInfo = async () => {
  const data = {
    "id":dailyId,
    "userId": loginUserInfo.id,
    "username": loginUserInfo.username,
    "dailyTitle": "",
    "bookTitle": "默认日记本",
    "mood": mood.value,
    "weather": weather.value,
    "place": place.value,
    "content": text.value,
    "isPublic": isPublic.value,
    // 页面展示只要存放一张图片  image 存储的是 图片id
    "image": JSON.stringify(imageList.value.map(item => item.id)),
    "views":  views.value,
    "likes": likes.value,
  }
  const res = await updateDailyInfoAPI(data);
  if (res.code === 1) {
    ElMessage.success("修改日记成功!")
    await router.push("/userHome")
  }
}

onMounted(() => {
  if (dailyId) {
    getOneDaily()
  }
})

// 上传图片组件展示的列表
const uploadList = ref([])
// 存储图片 url 的列表
const imageList = ref([])
// 判断图片尺寸
const beforeUpload = (rawFile) => {
  if (imageList.value.length >= 3) {
    ElMessage.warning("一篇日记最多上传3张图片")
    console.log("一篇日记最多上传3张图片")
    return false
  }
  console.log("进入beforeAvatarUpload")
  if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像仅支持jpg、jpeg、png格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2M!')
    return false
  }
  return true
}

// 覆盖默认提交行为, 这里可以实现手动提交 item就是一个request请求, 里面携带了item 和请求参数
// 也可以在里面设置请求头之类的
//完成的头像图片的提交, 保存到了 后端 并能通过 url访问
const httpRequest = async (item) => {
  console.log("item.file的uid: " ,item.file.uid)
  console.log("进入httpRequest")
  const formData = new FormData();
  formData.append("files", item.file)
  // 上传日记图片
  const res = await uploadImageAPI(formData,0);
  console.log("后端返回的 图片URL: ", res.data.imageUrl)
  imageList.value.push({
    name: item.file.name,
    // 数据库存储id
    id:res.data.id,
    url:res.data.imageUrl})

}
const handleRemove = async (file, files) => {
  console.log(file.raw)
  // todo 完成删除图片功能
  const removeItem = imageList.value.filter(item => item.name === file.raw.name)[0]
  console.log("移除文件 文件的url ", removeItem)
  console.log("移除文件 id ", removeItem.id)
  console.log("移除文件 文件的url ", removeItem.url)
  const data = {
    id: removeItem.id,
    url :  removeItem.url,
    type: 0
  }
  // 发送请求  删除图片 参数 url type
  const res = await deleteImagerAPI(data);
  if (res.code === 1) {
    ElMessage.success("删除成功")
    // 删除 imageList中的 值
    imageList.value = imageList.value.filter(item => item.name !== file.raw.name)
  } else {
    ElMessage.success("服务错误")
  }
}

// 图片预览
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

</script>

<template>

  <div class="flex-col w-2/3 mb-3 space-y-6">
    <div class="total-text-color font-semibold text-3xl pb-3 border-b-2 border-blue-50 ">
      <div v-if="dailyId">修改日记</div>
      <div v-else>开始记录你的今天吧</div>
    </div>

    <div class="z-0">
      <el-select v-model="book" class="w-1/4" placeholder="默认日记" size="default">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <a href="#" class="text-sky-600 px-2">管理我的日记本(未开发)</a>
    </div>


    <div class=" flex items-center w-1/6 space-x-1">
      <div class="w-12">心情:</div>
      <el-input v-model="mood" placeholder="喜,怒,哀,乐..."/>
    </div>
    <div class=" flex items-center w-1/6 space-x-1">
      <div class="w-12">天气:</div>
      <el-input v-model="weather" placeholder="阴,晴,雨,风..."/>
    </div>
    <div class=" flex items-center w-1/3 space-x-1">
      <div class="w-12">地点:</div>
      <el-input v-model="place" placeholder="写日记的地点/城市"/>
    </div>

    <div class="font-light ">

      <svg class="w-6 h-6 inline" viewBox="0 0 1024 1024">
        <path
            d="M510.976694 146.304134c-201.970968 0-365.695866 163.728992-365.695866 365.695866s163.728992 365.695866 365.695866 365.695866 365.695866-163.728992 365.695866-365.695866S712.947661 146.304134 510.976694 146.304134L510.976694 146.304134zM480.489332 329.151555c0-16.82827 13.631462-30.475082 30.475082-30.475082 16.844643 0 30.472012 13.646811 30.472012 30.475082l0 216.70146c0 16.82827-13.627369 30.475082-30.472012 30.475082-16.84362 0-30.475082-13.646811-30.475082-30.475082L480.489332 329.151555 480.489332 329.151555zM510.976694 694.847421c-23.663956 0-42.846854-19.178805-42.846854-42.842761s19.182898-42.846854 42.846854-42.846854c23.663956 0 42.846854 19.182898 42.846854 42.846854C553.823548 675.664523 534.64065 694.847421 510.976694 694.847421L510.976694 694.847421zM510.976694 694.847421"
            fill="#272636"></path>
      </svg>
      编辑器支持markdown格式, 也可以输入纯文本!
    </div>

    <div class="mx-auto w-full min-h-fit ">
      <v-md-editor
          left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link  code | save | emoji"
          mode="editable"
          height="30rem"
          v-model="text"
      >
      </v-md-editor>
    </div>

    <div>
      <el-upload
          v-model:file-list="uploadList"
          class="upload-demo"
          action=""
          :on-remove="handleRemove"
          :http-request="httpRequest"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          accept="image/jpg, image/jpeg, image/png"
          list-type="picture-card"
      >
        <el-button type="primary">上传图片</el-button>
        <template #tip>
          <div class="el-upload__tip">
            可接收 jpg/png/jpeg格式, 大小不超过2M
          </div>
        </template>
      </el-upload>
    </div>
    <el-dialog v-model="dialogVisible">
      <img class="w-2/3 h-2/3 mx-auto my-auto" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <div>
      <span class="flex items-center">
         <div class="w-28">陌生人能看吗?</div>
          <el-radio-group v-model="isPublic" class="ml-4">
            <el-radio label="1" size="large">能</el-radio>
            <el-radio label="0" size="large">不能</el-radio>
          </el-radio-group>
        <span class="pl-10">您还能输入{{ 10000 - text.length }}字</span>
      </span>
    </div>

    <div class="flex items-center justify-center">
      <el-button v-if="dailyId" type="primary" @click="updateDailyInfo" color="#4798b2" size="large">
        <span class="text-white w-12 h-8 flex items-center justify-center">确认修改</span>
      </el-button>
      <el-button v-else type="primary" @click="addDaily" color="#4798b2" size="large">
        <span class="text-white w-12 h-8 flex items-center justify-center">完成</span>
      </el-button>
    </div>


  </div>


</template>

<style scoped>

</style>