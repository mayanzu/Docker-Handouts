# Docker/K8s 讲义模板使用说明

## 文件结构

```
模板/
├── 统一讲义样式模板.css    # 简约风格的统一样式
├── 讲义模板/
│   └── 讲义模板.html       # HTML 模板文件
└── js/
    └── lecture-utils.js    # 通用工具函数
```

## 设计理念

- **简约风格**：清晰的视觉层次，减少视觉干扰
- **Docker 主题色**：使用 Docker 蓝 (#0db7ed) 作为主色调
- **响应式设计**：支持桌面和移动端浏览
- **易于维护**：统一的 CSS 变量，方便全局调整

## 使用方法

### 1. 创建新讲义

复制 `讲义模板.html`，修改以下内容：

```html
<title>第N讲：课程标题</title>
<h1>第N讲：课程标题</h1>
<p class="intro">课程简介...</p>
```

### 2. 标题层级

| 标签 | 用途 | 示例 |
|------|------|------|
| `h1` | 课程主标题 | 第1讲：环境搭建 |
| `h2` | 大章节 | 一、Docker 简介 |
| `h3` | 二级小节 | 1.1 安装步骤 |
| `h4` | 三级标题 | 具体操作项 |

### 3. 提示框组件

```html
<!-- 提示/技巧 -->
<div class="tip-box">
    <span class="tip-title">💡 小技巧</span>
    <p>内容...</p>
</div>

<!-- 重要概念 -->
<div class="concept-box">
    <span class="tip-title">核心概念</span>
    <p>内容...</p>
</div>

<!-- 笔记/成功 -->
<div class="note-box">
    <span class="tip-title">✓ 要点</span>
    <p>内容...</p>
</div>

<!-- 警告/注意 -->
<div class="warning-box">
    <span class="tip-title">⚠️ 注意</span>
    <p>内容...</p>
</div>
```

### 4. 代码块

```html
<!-- Bash 命令 -->
<pre class="bash"><code>$ docker run -d nginx</code></pre>

<!-- YAML 配置 -->
<pre class="yaml"><code>version: '3'
services:
  web:
    image: nginx</code></pre>

<!-- Dockerfile -->
<pre class="dockerfile"><code>FROM nginx:alpine
COPY . /usr/share/nginx/html</code></pre>
```

### 5. 表格

```html
<table>
    <thead>
        <tr>
            <th>命令</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>docker ps</code></td>
            <td>查看运行中的容器</td>
        </tr>
    </tbody>
</table>
```

### 6. 实验卡片

```html
<div class="lab-card">
    <div class="lab-header">
        🔬 实验：标题
        <span class="status-badge beginner">入门</span>
    </div>
    <div class="lab-body">
        <p><strong>目标：</strong>描述</p>
        <ol class="lab-steps">
            <li>步骤一</li>
            <li>步骤二</li>
        </ol>
    </div>
</div>
```

### 7. 知识点标签

```html
<div class="pill-list">
    <span class="pill">Docker</span>
    <span class="pill">Kubernetes</span>
</div>
```

### 8. 清单列表

```html
<ul class="checklist">
    <li>要点一</li>
    <li>要点二</li>
</ul>
```

## CSS 变量

可在 `统一讲义样式模板.css` 中调整：

```css
:root {
    --color-primary: #0db7ed;        /* 主色调 */
    --color-primary-dark: #066da5;   /* 深色主调 */
    --color-text: #374151;           /* 正文颜色 */
    --color-heading: #111827;        /* 标题颜色 */
    --border-radius: 8px;            /* 圆角大小 */
}
```

## 侧边栏结构

```html
<nav class="sidebar">
    <div class="sidebar-nav">
        <h3>课程导航</h3>
        <a class="sidebar-link" href="#intro">📖 课程概览</a>
        
        <h3>Part 1: 章节名</h3>
        <a class="sidebar-link sub-link" href="#chapter-1">一、标题</a>
        <a class="sidebar-link sub-link" href="#section-1-1">1.1 小节</a>
        
        <h3>总结</h3>
        <a class="sidebar-link sub-link" href="#summary">📝 课程小结</a>
    </div>
</nav>
```

## 注意事项

1. 讲义文件放在 `Docker-Handouts/` 根目录
2. CSS 路径使用 `模板/统一讲义样式模板.css`
3. JS 路径使用 `模板/js/lecture-utils.js`
4. 添加 `defer` 属性延迟加载 JS
