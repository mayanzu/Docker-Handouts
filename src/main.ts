import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.scss'

// 导入页面组件
import Home from './pages/Home.vue'
import Lecture1 from './pages/Lecture1.vue'
import Lecture2 from './pages/Lecture2.vue'
import Lecture3 from './pages/Lecture3.vue'
import Lecture4 from './pages/Lecture4.vue'
import Lecture5 from './pages/Lecture5.vue'
import Lecture6 from './pages/Lecture6.vue'
import Lecture7 from './pages/Lecture7.vue'
import Lecture8 from './pages/Lecture8.vue'
import Lecture9 from './pages/Lecture9.vue'
import Lecture10 from './pages/Lecture10.vue'
import Lecture11 from './pages/Lecture11.vue'
import Lecture12 from './pages/Lecture12.vue'
import Lecture13 from './pages/Lecture13.vue'
import Lecture14 from './pages/Lecture14.vue'
import Lecture15 from './pages/Lecture15.vue'
import Lecture16 from './pages/Lecture16.vue'

// 路由配置
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/lecture-1', name: 'Lecture1', component: Lecture1, meta: { title: '第1讲：软件部署的痛点与容器初体验' } },
  { path: '/lecture-2', name: 'Lecture2', component: Lecture2, meta: { title: '第2讲：镜像与容器 — Docker的基本单位' } },
  { path: '/lecture-3', name: 'Lecture3', component: Lecture3, meta: { title: '第3讲：容器生命周期管理' } },
  { path: '/lecture-4', name: 'Lecture4', component: Lecture4, meta: { title: '第4讲：持久化数据 — 数据卷' } },
  { path: '/lecture-5', name: 'Lecture5', component: Lecture5, meta: { title: '第5讲：自定义镜像 — Dockerfile（上）' } },
  { path: '/lecture-6', name: 'Lecture6', component: Lecture6, meta: { title: '第6讲：Dockerfile实战与优化' } },
  { path: '/lecture-7', name: 'Lecture7', component: Lecture7, meta: { title: '第7讲：容器间通信 — Docker网络' } },
  { path: '/lecture-8', name: 'Lecture8', component: Lecture8, meta: { title: '第8讲：编排多服务 — Compose入门' } },
  { path: '/lecture-9', name: 'Lecture9', component: Lecture9, meta: { title: '第9讲：Compose进阶与项目实战' } },
  { path: '/lecture-10', name: 'Lecture10', component: Lecture10, meta: { title: '第10讲：从单机到集群 — 为什么需要K8s' } },
  { path: '/lecture-11', name: 'Lecture11', component: Lecture11, meta: { title: '第11讲：K8s第一课 — Pod与Deployment' } },
  { path: '/lecture-12', name: 'Lecture12', component: Lecture12, meta: { title: '第12讲：让应用可访问 — Service' } },
  { path: '/lecture-13', name: 'Lecture13', component: Lecture13, meta: { title: '第13讲：部署自己的应用到K8s' } },
  { path: '/lecture-14', name: 'Lecture14', component: Lecture14, meta: { title: '第14讲：配置与环境管理' } },
  { path: '/lecture-15', name: 'Lecture15', component: Lecture15, meta: { title: '第15讲：K8s调试与运维基础' } },
  { path: '/lecture-16', name: 'Lecture16', component: Lecture16, meta: { title: '第16讲：综合实战与未来之路' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 路由守卫，更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title 
    ? `${to.meta.title} - Docker K8s 课程平台`
    : 'Docker K8s 课程平台'
  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app')