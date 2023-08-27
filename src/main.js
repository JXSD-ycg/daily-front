import './sytle.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';


// 导入表情包组件
VueMarkdownEditor.use(createEmojiPlugin());

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)

// 引入markdown编辑器
app.use(VueMarkdownEditor);
app.use(createPinia())
app.use(router)

app.mount('#app')
