<script setup>

import {ref} from "vue";
import {uploadImageAPI} from "../../apis/edit.js";

const text = ref('');

// files是一个数组  里面存着一个一个file 将file取出封装为formData
const handleUploadImage = async (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append('files',files[i])
    console.log(files[i])
    const res = await uploadImageAPI(formData);
    console.log(res.data)
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

const value = ref('')
const mood = ref('')
const weather = ref('')
const place = ref('')

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

</script>

<template>
  <div class="flex-col w-2/3 mb-3 space-y-4">
    <div class="total-text-color font-semibold text-3xl pb-3 border-b-2 border-blue-50 ">
      开始记录你的今天吧
    </div>

<div>
  <el-select v-model="value" class="w-1/4" placeholder="默认日记" size="default">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <span class="text-sky-600 px-2">管理我的日记本</span>
</div>


    <div class=" flex items-center w-1/6 space-x-1">
      <div class="w-12">心情:</div>
      <el-input v-model="mood" placeholder="喜,怒,哀,乐..." />
    </div>
    <div class=" flex items-center w-1/6 space-x-1">
      <div class="w-12">天气:</div>
      <el-input v-model="mood" placeholder="阴,晴,雨,风..." />
    </div>
    <div class=" flex items-center w-1/3 space-x-1">
      <div class="w-12">地点:</div>
      <el-input v-model="mood" placeholder="写日记的地点" />
    </div>

    <div class="font-light ">

        <svg class="w-6 h-6 inline" viewBox="0 0 1024 1024" ><path d="M510.976694 146.304134c-201.970968 0-365.695866 163.728992-365.695866 365.695866s163.728992 365.695866 365.695866 365.695866 365.695866-163.728992 365.695866-365.695866S712.947661 146.304134 510.976694 146.304134L510.976694 146.304134zM480.489332 329.151555c0-16.82827 13.631462-30.475082 30.475082-30.475082 16.844643 0 30.472012 13.646811 30.472012 30.475082l0 216.70146c0 16.82827-13.627369 30.475082-30.472012 30.475082-16.84362 0-30.475082-13.646811-30.475082-30.475082L480.489332 329.151555 480.489332 329.151555zM510.976694 694.847421c-23.663956 0-42.846854-19.178805-42.846854-42.842761s19.182898-42.846854 42.846854-42.846854c23.663956 0 42.846854 19.182898 42.846854 42.846854C553.823548 675.664523 534.64065 694.847421 510.976694 694.847421L510.976694 694.847421zM510.976694 694.847421" fill="#272636" ></path></svg>
        编辑器支持markdown格式, 也可以输入纯文本!</div>


    <div class="mx-auto w-full min-h-fit ">
      <v-md-editor
          mode="edit"
          height="30rem"
          v-model="text"
          :disabled-menus="[]"
          @upload-image="handleUploadImage"
      >
      </v-md-editor>
    </div>
  </div>



</template>

<style scoped>

</style>