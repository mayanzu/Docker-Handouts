# Docker K8s 课程平台

## 🚀 项目概述

这是一个基于 Vite + TypeScript + Vue 3 构建的现代化 Docker 和 Kubernetes 学习平台。项目从原来的静态 HTML 讲义重构为具有交互动画和响应式设计的单页面应用。

### ✨ 主要特性

- 🎨 **现代化设计**: 采用简约的设计风格，支持深浅色主题
- 📱 **响应式布局**: 完美适配桌面端、平板和手机设备
- 🎭 **流畅动画**: 丰富的页面过渡和元素动画效果
- 🏗️ **模块化架构**: 基于 Vue 3 Composition API 的组件化设计
- 🎯 **TypeScript**: 完整的类型支持，提升开发体验
- ⚡ **快速加载**: Vite 构建工具，支持热模块替换
- 🧭 **智能导航**: 自动生成的侧边栏目录和页面间导航

## 📁 项目结构

```
docker-k8s-course/
├── public/                     # 静态资源
├── src/
│   ├── components/             # 可复用组件
│   │   ├── NavigationBar.vue   # 主导航栏
│   │   ├── LectureSidebar.vue  # 讲义侧边栏
│   │   ├── AnimatedTable.vue   # 动画表格
│   │   ├── ComparisonTable.vue # 对比表格
│   │   ├── Timeline.vue        # 时间线组件
│   │   ├── RewardTable.vue     # 奖励表格
│   │   ├── LectureSummary.vue  # 课程总结
│   │   └── BackToTop.vue       # 返回顶部
│   ├── pages/                  # 页面组件
│   │   ├── Home.vue            # 首页
│   │   ├── Lecture0.vue        # 第0讲 (完整内容)
│   │   ├── Lecture1.vue        # 第1讲 (制作中)
│   │   ├── Lecture2.vue        # 第2讲 (制作中)
│   │   ├── Lecture3.vue        # 第3讲 (制作中)
│   │   ├── Lecture4.vue        # 第4讲 (制作中)
│   │   └── Lecture5.vue        # 第5讲 (制作中)
│   ├── styles/                 # 样式文件
│   │   ├── variables.scss      # SCSS变量
│   │   ├── mixins.scss         # 混入函数
│   │   ├── base.scss           # 基础样式
│   │   ├── lecture.scss        # 讲义样式
│   │   └── main.scss           # 主样式文件
│   ├── utils/                  # 工具函数
│   ├── types/                  # TypeScript类型定义
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 应用入口
├── index.html                  # HTML模板
├── vite.config.ts             # Vite配置
├── tsconfig.json              # TypeScript配置
├── package.json               # 项目依赖
└── README.md                  # 项目说明
```

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式方案**: SCSS + CSS3
- **路由管理**: Vue Router 4
- **动画库**: CSS3 Transitions + Vue Transition
- **代码规范**: ESLint + Prettier

## 🎨 设计特色

### 色彩方案
- **主色调**: Docker蓝 (#0969da) - 体现容器化技术主题
- **辅助色**: GitHub风格的浅色调色板
- **文字色**: 层次分明的灰度色阶
- **强调色**: 渐变和半透明效果

### 动画效果
- **页面过渡**: 平滑的页面切换动画
- **元素入场**: 渐入、滑入等多种入场效果
- **交互反馈**: 悬停、点击的即时视觉反馈
- **滚动动画**: 基于滚动位置的动画触发

### 响应式设计
- **桌面端**: 1200px+ 完整功能展示
- **平板端**: 768px-1200px 自适应布局
- **手机端**: <768px 移动优化界面

## 📚 课程内容

### 第0讲：2026赛季抢跑计划 ✅
- 赛事规程深度分析
- 四大赛道对比选择
- 时间轴规划安排
- 学校奖励政策解读

### 第1讲：容器技术基础 🚧
- 容器化核心概念
- Docker发展历史
- 环境配置安装
- 第一个容器应用

### 第2讲：Docker核心概念 🚧
- Docker架构原理
- 镜像构建管理
- 容器生命周期
- 数据卷网络配置

### 第3讲：容器编排与管理 🚧
- Docker Compose
- 多容器应用编排
- 容器网络模式
- 服务发现负载均衡

### 第4讲：Kubernetes入门 🚧
- K8s集群架构
- 核心资源对象
- Pod Service管理
- Deployment部署

### 第5讲：实战项目部署 🚧
- 微服务架构设计
- CI/CD流水线
- 生产环境部署
- 监控运维实践

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发模式
```bash
npm run dev
# 或
yarn dev
```
启动后访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 🎯 开发指南

### 添加新课程内容
1. 修改对应的 `LectureX.vue` 文件
2. 替换 `coming-soon` 部分为实际内容
3. 更新 `sections` 数组以匹配新的章节结构
4. 添加必要的动画和交互效果

### 自定义样式
- 修改 `src/styles/variables.scss` 调整主题颜色
- 在 `src/styles/mixins.scss` 中添加新的样式混入
- 使用现有的设计系统组件保持一致性

### 添加新组件
- 在 `src/components/` 目录下创建新组件
- 遵循 Vue 3 Composition API 最佳实践
- 添加适当的 TypeScript 类型定义
- 包含必要的动画和响应式处理

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 👥 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

**三联学院赛前集训营** | Docker K8s 课程平台 v1.0.0