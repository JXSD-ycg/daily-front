<script setup>
import {ElMessage} from "element-plus";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {addDailyAPI, getOneDailyAPI, updateDailyInfoAPI, uploadImageAPI} from "../../apis/edit.js";
import router from "../../router/index.js";
import {useUserStore} from "../../stores/userStore.js";

const imageUrl = ref('');

// files是一个数组  里面存着一个一个file 将file取出封装为formData
const handleUploadImage = async (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append('files', files[i])
    console.log(files[i])
    const res = await uploadImageAPI(formData,0);
    console.log(res.data)
    // todo 只需要存放一张图片, 这里只能实现存放最后一张图片 优化为存放第一张图片的url
    imageUrl.value = res.data
    // 后端返回图片url, 然后插入进去即可
    insertImage({
      url:
      res.data,
      desc: files[i]?.getName,
      // width: 'auto',
      // height: 'auto',
    });
  }
}

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
    // 页面展示只要存放一张图片
    "image": imageUrl.value,
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
    // 页面展示只要存放一张图片
    "image": imageUrl.value,
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
      <a href="#" class="text-sky-600 px-2">管理我的日记本</a>
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
          left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save | emoji"
          mode="editable"
          height="30rem"
          v-model="text"
          :disabled-menus="[]"
          @upload-image="handleUploadImage"
      >
      </v-md-editor>
    </div>

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