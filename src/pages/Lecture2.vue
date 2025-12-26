<template>
  <div class="lecture-content">
    <header class="lecture-header">
      <h1>第2讲：镜像与容器 — Docker的基本单位</h1>
      <p class="intro">深入理解镜像和容器的关系，掌握 Docker Hub 的使用，学习镜像的拉取、运行和管理。</p>
      
      <div class="pill-list">
        <span class="pill">镜像概念</span>
        <span class="pill">Docker Hub</span>
        <span class="pill">镜像管理</span>
        <span class="pill">容器启动</span>
      </div>
    </header>

    <LectureSidebar :sections="sections" />

    <section id="intro">
      <h2>👋 课程目标</h2>
      <ul class="goal-list">
        <li>理解镜像（Image）与容器（Container）的本质区别</li>
        <li>掌握从 Docker Hub 搜索和下载镜像</li>
        <li>学会管理本地镜像：查看、删除、打标签</li>
        <li>理解镜像的分层结构和共享机制</li>
      </ul>
    </section>

    <section id="chapter-1">
      <h2>一、镜像与容器：类与实例的关系</h2>
      
      <h3>1.1 镜像是什么？</h3>
      <p><strong>镜像（Image）</strong>可以理解为：</p>
      <ul>
        <li>📦 <strong>应用的安装包</strong>：包含运行应用所需的一切（代码、依赖、配置）</li>
        <li>📸 <strong>文件系统快照</strong>：某个时间点的完整文件系统状态</li>
        <li>📄 <strong>只读模板</strong>：不可修改，用于创建容器</li>
      </ul>

      <h3>1.2 容器是什么？</h3>
      <p><strong>容器（Container）</strong>是镜像的运行实例：</p>
      <ul>
        <li>🏃 <strong>运行中的进程</strong>：基于镜像启动的隔离进程</li>
        <li>📝 <strong>可写层</strong>：在镜像只读层之上添加可写层</li>
        <li>💀 <strong>临时性</strong>：删除容器后，未持久化的数据会丢失</li>
      </ul>

      <div class="comparison-box">
        <h4>类比理解</h4>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>概念</th>
              <th>镜像（Image）</th>
              <th>容器（Container）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>程序世界</td>
              <td>类（Class）</td>
              <td>实例（Object）</td>
            </tr>
            <tr>
              <td>操作系统</td>
              <td>安装程序（.exe / .dmg）</td>
              <td>运行的进程</td>
            </tr>
            <tr>
              <td>游戏世界</td>
              <td>游戏光盘</td>
              <td>游戏存档</td>
            </tr>
            <tr>
              <td>状态</td>
              <td>静态、只读</td>
              <td>动态、可写</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="example-box">
        <h4>💡 形象比喻</h4>
        <pre><code>镜像 = 菜谱（配方）
容器 = 根据菜谱做出的菜

- 一份菜谱可以做出无数份菜
- 每份菜可以加不同的调料（配置）
- 吃完菜（删除容器），菜谱还在（镜像保留）</code></pre>
      </div>
    </section>

    <section id="chapter-2">
      <h2>二、Docker Hub —— 镜像的应用商店</h2>
      
      <h3>2.1 什么是 Docker Hub？</h3>
      <p><strong>Docker Hub</strong> 是 Docker 官方的公共镜像仓库，类似于：</p>
      <ul>
        <li>📱 App Store / Google Play（应用商店）</li>
        <li>📦 npm（JavaScript 包管理器）</li>
        <li>🐍 PyPI（Python 包索引）</li>
      </ul>
      <p>网址：<code>https://hub.docker.com</code></p>

      <h3>2.2 搜索镜像</h3>
      <div class="experiment-box">
        <h4>🧪 实验 1：搜索 Redis 镜像</h4>
        <pre><code># 命令行搜索
docker search redis

# 输出示例
NAME                DESCRIPTION                     STARS     OFFICIAL
redis               Official Redis image            12000+    [OK]
redis/redis-stack   Redis Stack Server              150+
bitnami/redis       Bitnami Redis Docker Image      800+</code></pre>
        <p><strong>关键字段：</strong></p>
        <ul>
          <li><code>OFFICIAL</code>：官方维护的镜像，更可靠</li>
          <li><code>STARS</code>：用户评分，类似 GitHub stars</li>
        </ul>
      </div>

      <h3>2.3 镜像命名规范</h3>
      <pre><code># 完整格式
[仓库地址/]用户名/镜像名:标签

# 示例
docker.io/library/nginx:1.25-alpine
│         │       │     │
│         │       │     └─ 标签（版本号）
│         │       └─────── 镜像名
│         └───────────── 命名空间（官方镜像用 library）
└─────────────────────── 仓库地址（默认 docker.io）

# 简写形式
nginx           # 等同于 docker.io/library/nginx:latest
nginx:1.25      # 指定版本
mysql:8.0       # MySQL 8.0 版本</code></pre>

      <h3>2.4 常见标签（Tag）含义</h3>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>标签</th>
            <th>含义</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>latest</code></td>
            <td>最新版本（默认标签）</td>
            <td><code>nginx:latest</code></td>
          </tr>
          <tr>
            <td><code>版本号</code></td>
            <td>具体版本</td>
            <td><code>python:3.11</code></td>
          </tr>
          <tr>
            <td><code>alpine</code></td>
            <td>基于 Alpine Linux（体积小）</td>
            <td><code>node:18-alpine</code></td>
          </tr>
          <tr>
            <td><code>slim</code></td>
            <td>精简版（去除非必需文件）</td>
            <td><code>python:3.11-slim</code></td>
          </tr>
          <tr>
            <td><code>buster/bullseye</code></td>
            <td>基于 Debian 发行版</td>
            <td><code>node:18-bullseye</code></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="chapter-3">
      <h2>三、镜像管理实战</h2>
      
      <h3>3.1 拉取镜像</h3>
      <div class="experiment-box">
        <h4>🧪 实验 2：下载不同版本的镜像</h4>
        <pre><code># 下载最新版 Nginx
docker pull nginx
# 完整写法：docker pull docker.io/library/nginx:latest

# 下载指定版本
docker pull nginx:1.25-alpine

# 下载 Python 3.11
docker pull python:3.11

# 下载轻量级 Node.js
docker pull node:18-alpine

# 查看下载进度
docker pull mysql:8.0
# 输出：
# 8.0: Pulling from library/mysql
# abc123def456: Pull complete  ← 分层下载
# 789ghi012jkl: Pull complete
# ...
# Status: Downloaded newer image for mysql:8.0</code></pre>
      </div>

      <h3>3.2 查看本地镜像</h3>
      <div class="experiment-box">
        <h4>🧪 实验 3：管理本地镜像</h4>
        <pre><code># 列出所有镜像
docker images

# 输出示例
REPOSITORY   TAG          IMAGE ID       CREATED        SIZE
nginx        latest       a1b2c3d4e5f6   2 days ago     187MB
nginx        1.25-alpine  b2c3d4e5f6a7   3 days ago     42MB
python       3.11         c3d4e5f6a7b8   1 week ago     1.02GB
node         18-alpine    d4e5f6a7b8c9   2 weeks ago    177MB

# 只显示镜像 ID
docker images -q

# 过滤显示
docker images nginx          # 只显示 nginx 镜像
docker images python:3.11    # 精确匹配</code></pre>
      </div>

      <h3>3.3 镜像详细信息</h3>
      <pre><code># 查看镜像详细信息（JSON 格式）
docker inspect nginx:latest

# 查看镜像历史（构建层）
docker history nginx:latest

# 输出示例
IMAGE          CREATED       CREATED BY                                      SIZE
a1b2c3d4e5f6   2 days ago    CMD ["nginx" "-g" "daemon off;"]                0B
&lt;missing&gt;      2 days ago    EXPOSE map[80/tcp:{}]                          0B
&lt;missing&gt;      2 days ago    COPY file:abc123... /etc/nginx/nginx.conf      1.5kB
...</code></pre>

      <h3>3.4 删除镜像</h3>
      <div class="experiment-box">
        <h4>🧪 实验 4：清理无用镜像</h4>
        <pre><code># 删除指定镜像
docker rmi nginx:1.25-alpine

# 删除多个镜像
docker rmi nginx python:3.11

# 通过 IMAGE ID 删除
docker rmi a1b2c3d4e5f6

# 强制删除（即使有容器在使用）
docker rmi -f nginx

# 删除所有未使用的镜像
docker image prune

# 删除所有镜像（危险操作！）
docker rmi $(docker images -q)</code></pre>
      </div>

      <div class="key-point">
        <h4>⚠️ 注意事项</h4>
        <ul>
          <li>正在被容器使用的镜像无法删除（除非使用 <code>-f</code>）</li>
          <li>删除镜像不会影响已运行的容器</li>
          <li><code>docker image prune</code> 只删除 dangling 镜像（无标签的）</li>
        </ul>
      </div>
    </section>

    <section id="chapter-4">
      <h2>四、镜像的分层结构</h2>
      
      <h3>4.1 Union FS（联合文件系统）</h3>
      <p>Docker 镜像采用<strong>分层存储</strong>，每一层都是只读的：</p>
      <pre><code>┌─────────────────────┐
│   容器可写层        │ ← 容器运行时创建，可写
├─────────────────────┤
│   应用层           │ ← COPY app.py
├─────────────────────┤
│   依赖层           │ ← RUN pip install flask
├─────────────────────┤
│   Python 运行时    │ ← FROM python:3.11
├─────────────────────┤
│   基础镜像层       │ ← Ubuntu/Alpine
└─────────────────────┘</code></pre>

      <h3>4.2 分层的优势</h3>
      <div class="example-box">
        <h4>💡 示例：多个 Python 应用</h4>
        <pre><code># 应用 A
FROM python:3.11      ← 共享层（1GB）
RUN pip install flask
COPY app_a.py /app

# 应用 B
FROM python:3.11      ← 复用相同层，无需重复下载！
RUN pip install django
COPY app_b.py /app

# 实际磁盘占用
# 方案一（不分层）：1GB + 1GB = 2GB
# 方案二（分层）：1GB（共享） + 50MB + 50MB = 1.1GB</code></pre>
        <p><strong>好处：</strong></p>
        <ul>
          <li>✅ 节省磁盘空间</li>
          <li>✅ 加速镜像下载（复用已有层）</li>
          <li>✅ 加速镜像构建（缓存机制）</li>
        </ul>
      </div>
    </section>

    <section id="chapter-5">
      <h2>五、从镜像到容器</h2>
      
      <h3>5.1 基础运行方式</h3>
      <div class="experiment-box">
        <h4>🧪 实验 5：多种方式启动容器</h4>
        <pre><code># 1. 最简单：前台运行
docker run nginx
# 问题：占用终端，Ctrl+C 会停止容器

# 2. 后台运行
docker run -d nginx
# 输出：a1b2c3d4e5f6...（容器 ID）

# 3. 命名容器
docker run -d --name my-nginx nginx
# 之后可以用名称操作：docker stop my-nginx

# 4. 端口映射
docker run -d -p 8080:80 nginx
# 访问 http://localhost:8080

# 5. 环境变量
docker run -d -e MYSQL_ROOT_PASSWORD=secret mysql:8.0

# 6. 组合参数
docker run -d \
  --name my-web \
  -p 8080:80 \
  -e ENV=production \
  nginx</code></pre>
      </div>

      <h3>5.2 容器与镜像的关系验证</h3>
      <div class="experiment-box">
        <h4>🧪 实验 6：一个镜像创建多个容器</h4>
        <pre><code># 1. 拉取镜像
docker pull nginx

# 2. 从同一镜像创建 3 个容器
docker run -d -p 8081:80 --name web1 nginx
docker run -d -p 8082:80 --name web2 nginx
docker run -d -p 8083:80 --name web3 nginx

# 3. 查看容器状态
docker ps

# 4. 验证：访问三个不同端口
# http://localhost:8081
# http://localhost:8082
# http://localhost:8083

# 5. 删除所有容器
docker rm -f web1 web2 web3

# 6. 镜像依然存在
docker images nginx</code></pre>
        <p><strong>结论：</strong>镜像是模板，可以创建无数个容器实例！</p>
      </div>
    </section>

    <section id="practice">
      <h2>六、综合练习</h2>
      
      <div class="practice-box">
        <h3>练习 1：镜像版本对比</h3>
        <p><strong>任务：</strong>下载并对比不同 Node.js 版本的镜像大小</p>
        <pre><code># 下载三个版本
docker pull node:18
docker pull node:18-alpine
docker pull node:18-slim

# 对比大小
docker images node

# 思考问题
1. 为什么 alpine 版本最小？
2. 在什么场景下选择 alpine？
3. 什么时候不应该用 alpine？</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 2：搭建 Redis 缓存服务</h3>
        <pre><code># 1. 搜索 Redis 镜像
docker search redis

# 2. 拉取官方镜像
docker pull redis:7-alpine

# 3. 启动 Redis 容器
docker run -d \
  --name my-redis \
  -p 6379:6379 \
  redis:7-alpine

# 4. 验证 Redis 是否运行
docker ps | grep redis

# 5. 连接 Redis（需要 redis-cli 或使用容器内命令）
docker exec -it my-redis redis-cli
# 在 Redis CLI 中执行
SET greeting "Hello from Redis!"
GET greeting
EXIT

# 6. 清理
docker stop my-redis
docker rm my-redis</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 3：镜像标签管理</h3>
        <pre><code># 1. 拉取镜像
docker pull nginx:1.25-alpine

# 2. 为镜像创建自定义标签
docker tag nginx:1.25-alpine my-nginx:prod
docker tag nginx:1.25-alpine my-nginx:v1.0

# 3. 查看标签
docker images my-nginx

# 4. 删除标签（不删除镜像数据）
docker rmi my-nginx:v1.0

# 5. 验证：原始镜像仍在
docker images nginx:1.25-alpine</code></pre>
      </div>
    </section>

    <section id="summary">
      <h2>📝 课程小结</h2>
      
      <div class="summary-box">
        <h3>核心知识点</h3>
        <ul class="checklist">
          <li>✅ 镜像 vs 容器：镜像是只读模板（类），容器是运行实例（对象）</li>
          <li>✅ Docker Hub：官方镜像仓库，类似应用商店</li>
          <li>✅ 镜像命名：<code>[仓库地址/]用户名/镜像名:标签</code></li>
          <li>✅ 常用标签：<code>latest</code>、<code>alpine</code>、<code>slim</code>、版本号</li>
          <li>✅ 分层存储：Union FS 实现层共享，节省空间</li>
        </ul>

        <h3>关键命令回顾</h3>
        <pre><code># 镜像操作
docker search &lt;镜像名&gt;        # 搜索镜像
docker pull &lt;镜像名:标签&gt;     # 下载镜像
docker images                 # 列出镜像
docker rmi &lt;镜像名&gt;           # 删除镜像
docker inspect &lt;镜像名&gt;       # 查看详情
docker history &lt;镜像名&gt;       # 查看历史层

# 从镜像到容器
docker run -d --name &lt;名称&gt; -p &lt;主机端口&gt;:&lt;容器端口&gt; &lt;镜像名&gt;</code></pre>

        <h3>🎯 下节预告</h3>
        <p>第3讲将学习 <strong>容器生命周期管理</strong>：</p>
        <ul>
          <li>容器的启动、停止、重启</li>
          <li>查看容器日志和状态</li>
          <li>进入运行中的容器</li>
          <li>容器资源限制</li>
        </ul>
      </div>
    </section>

    <div class="navigation-buttons">
      <router-link to="/lecture-1" class="nav-btn prev">← 上一讲</router-link>
      <router-link to="/lecture-3" class="nav-btn next">下一讲：容器生命周期 →</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LectureSidebar from '@/components/LectureSidebar.vue'

const sections = ref([
  { id: 'intro', title: '👋 课程目标' },
  { id: 'chapter-1', title: '一、镜像与容器：类与实例的关系', level: 1 },
  { id: 'chapter-2', title: '二、Docker Hub', level: 1 },
  { id: 'chapter-3', title: '三、镜像管理实战', level: 1 },
  { id: 'chapter-4', title: '四、镜像的分层结构', level: 1 },
  { id: 'chapter-5', title: '五、从镜像到容器', level: 1 },
  { id: 'practice', title: '六、综合练习', level: 1 },
  { id: 'summary', title: '📝 课程小结', level: 1 }
])
</script>

<style lang="scss" scoped>
.coming-soon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: $spacing-xl;
}

.coming-soon-card {
  @include card($spacing-xxl);
  text-align: center;
  max-width: 600px;
  background: linear-gradient(135deg, $color-bg-subtle, rgba($color-primary, 0.05));

  .coming-soon-icon {
    font-size: 4rem;
    margin-bottom: $spacing-lg;
    @include float-animation;
  }

  h2 {
    color: $color-heading;
    margin-bottom: $spacing-md;
    font-size: 1.75rem;
  }

  p {
    color: $color-text-secondary;
    margin-bottom: $spacing-xl;
    font-size: 1.125rem;
  }

  .preview-topics {
    text-align: left;
    margin-bottom: $spacing-xl;

    h3 {
      color: $color-primary;
      margin-bottom: $spacing-md;
      font-size: 1.125rem;
    }

    .checklist {
      margin-left: 0;
      
      li {
        margin-bottom: $spacing-sm;
        padding: $spacing-sm;
        background: rgba($color-primary, 0.05);
        border-left: 3px solid $color-primary;
        border-radius: 0 $border-radius $border-radius 0;
      }
    }
  }

  .navigation {
    display: flex;
    gap: $spacing-md;
    justify-content: center;

    .nav-button {
      @include button-secondary;
      text-decoration: none;
      padding: $spacing-md $spacing-lg;
    }
  }
}

.lecture-header {
  text-align: center;
  margin-bottom: $spacing-xxl;
  
  .pill-list {
    justify-content: center;
    margin-top: $spacing-lg;
  }
}
</style>