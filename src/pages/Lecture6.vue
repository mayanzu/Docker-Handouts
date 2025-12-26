<template>
  <div class="lecture-content">
    <header class="lecture-header">
      <h1>第6讲：Docker 网络</h1>
      <p class="intro">深入理解Docker网络模式，掌握容器间通信、自定义网络和端口映射。</p>
      
      <div class="pill-list">
        <span class="pill">网络模式</span>
        <span class="pill">容器互联</span>
        <span class="pill">自定义网络</span>
        <span class="pill">端口映射</span>
      </div>
    </header>

    <LectureSidebar :sections="sections" />

    <section id="intro">
      <h2>👋 课程目标</h2>
      <ul class="goal-list">
        <li>理解Docker的四种网络模式</li>
        <li>掌握容器间通信的方法</li>
        <li>学会创建和使用自定义网络</li>
        <li>理解端口映射机制</li>
      </ul>
    </section>

    <section id="chapter-1">
      <h2>一、Docker 网络基础</h2>
      
      <h3>1.1 四种网络模式</h3>
      <div class="comparison-box">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>模式</th>
              <th>说明</th>
              <th>使用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>bridge</code></td>
              <td>桥接模式（默认）</td>
              <td>单机容器通信</td>
            </tr>
            <tr>
              <td><code>host</code></td>
              <td>使用主机网络</td>
              <td>性能要求高</td>
            </tr>
            <tr>
              <td><code>none</code></td>
              <td>无网络</td>
              <td>安全隔离</td>
            </tr>
            <tr>
              <td><code>container</code></td>
              <td>共享其他容器网络</td>
              <td>Pod 模式</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="experiment-box">
        <h4>🧪 实验 1：测试四种网络模式</h4>
        <pre><code># === Bridge 模式（默认）===
docker run -d --name web-bridge nginx
docker exec web-bridge ip addr
# 容器有自己的 IP（如 172.17.0.2）

# === Host 模式 ===
docker run -d --name web-host --network host nginx
# 容器直接使用主机的网络栈
# 访问 localhost:80 = 访问容器

# === None 模式 ===
docker run -it --name no-network --network none alpine sh
# 容器内只有 lo 接口，无法联网

# === Container 模式 ===
docker run -d --name web1 nginx
docker run -it --name web2 --network container:web1 alpine sh
# web2 共享 web1 的网络

# 清理
docker rm -f web-bridge web-host no-network web1 web2</code></pre>
      </div>
    </section>

    <section id="chapter-2">
      <h2>二、Bridge 网络详解</h2>
      
      <h3>2.1 默认 bridge 网络</h3>
      <div class="experiment-box">
        <h4>🧪 实验 2：默认 bridge 行为</h4>
        <pre><code># 查看网络列表
docker network ls
# NETWORK ID     NAME      DRIVER    SCOPE
# abc123         bridge    bridge    local
# def456         host      host      local
# ghi789         none      null      local

# 查看 bridge 网络详情
docker network inspect bridge

# 启动两个容器
docker run -d --name web1 nginx
docker run -d --name web2 nginx

# 查看 web1 的 IP
docker inspect web1 | grep IPAddress
# "IPAddress": "172.17.0.2"

# 进入 web2 测试连接
docker exec -it web2 sh

# 通过 IP 可以 ping 通
ping 172.17.0.2          # ✅ 成功

# 通过名称无法 ping 通
ping web1                # ❌ 失败（默认 bridge 不支持 DNS）

exit

# 清理
docker rm -f web1 web2</code></pre>

        <div class="key-point">
          <h4>⚠️ 默认 bridge 的限制</h4>
          <ul>
            <li>不支持容器名解析（DNS）</li>
            <li>只能通过 IP 通信</li>
            <li>需要用 <code>--link</code>（已废弃）</li>
          </ul>
        </div>
      </div>

      <h3>2.2 自定义 bridge 网络（推荐）</h3>
      <div class="experiment-box">
        <h4>🧪 实验 3：创建自定义网络</h4>
        <pre><code># 创建自定义网络
docker network create my-net

# 查看网络
docker network ls
# NETWORK ID     NAME      DRIVER
# jkl012         my-net    bridge    ← 新创建的

# 启动容器并连接到自定义网络
docker run -d --name web1 --network my-net nginx
docker run -d --name web2 --network my-net nginx

# 进入 web2 测试
docker exec -it web2 sh

# ✅ 自定义网络支持 DNS！
ping web1                # 成功！
curl http://web1         # 成功访问 Nginx

exit

# 查看网络中的容器
docker network inspect my-net
# "Containers": {
#     "web1": {...},
#     "web2": {...}
# }

# 清理
docker rm -f web1 web2
docker network rm my-net</code></pre>

        <div class="key-point">
          <h4>🎯 自定义网络的优势</h4>
          <ul>
            <li>✅ 自动 DNS 解析（容器名即主机名）</li>
            <li>✅ 更好的隔离性</li>
            <li>✅ 动态添加/移除容器</li>
            <li>✅ 可配置网络参数</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="chapter-3">
      <h2>三、容器互联实战</h2>
      
      <h3>3.1 Web + 数据库架构</h3>
      <div class="experiment-box">
        <h4>🧪 实验 4：WordPress + MySQL</h4>
        <pre><code># 1. 创建专用网络
docker network create wordpress-net

# 2. 启动 MySQL
docker run -d \
  --name mysql \
  --network wordpress-net \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser \
  -e MYSQL_PASSWORD=wppass \
  mysql:8.0

# 3. 启动 WordPress
docker run -d \
  --name wordpress \
  --network wordpress-net \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=mysql \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppass \
  -e WORDPRESS_DB_NAME=wordpress \
  wordpress:latest

# 4. 访问 http://localhost:8080

# WordPress 容器内：
# - 通过 "mysql" 主机名连接数据库
# - Docker 自动 DNS 解析 mysql → 172.18.0.2

# 清理
docker rm -f wordpress mysql
docker network rm wordpress-net</code></pre>
      </div>

      <h3>3.2 前端 + 后端 + 数据库</h3>
      <div class="experiment-box">
        <h4>🧪 实验 5：三层架构</h4>
        <pre><code># 创建网络
docker network create app-net

# 1. 后端数据库
docker run -d \
  --name postgres \
  --network app-net \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=myapp \
  postgres:16

# 2. 后端 API
docker run -d \
  --name api \
  --network app-net \
  -e DATABASE_URL=postgresql://postgres:secret@postgres:5432/myapp \
  myapi:1.0

# 3. 前端 Web
docker run -d \
  --name web \
  --network app-net \
  -p 80:80 \
  -e API_URL=http://api:8000 \
  myweb:1.0

# 网络拓扑：
# 用户 → web:80 → api:8000 → postgres:5432
#        (外网)    (内网)        (内网)

# 优势：
# - 数据库不暴露端口，更安全
# - 容器间通过名称通信，无需 IP
# - 重启容器 IP 变化也不影响</code></pre>
      </div>
    </section>

    <section id="chapter-4">
      <h2>四、端口映射</h2>
      
      <h3>4.1 端口映射详解</h3>
      <div class="experiment-box">
        <h4>🧪 实验 6：端口映射的多种方式</h4>
        <pre><code># === 映射到随机端口 ===
docker run -d -P nginx
# -P: 映射 EXPOSE 的所有端口到随机主机端口
docker ps
# 0.0.0.0:32768->80/tcp    ← 随机端口

# === 映射到指定端口 ===
docker run -d -p 8080:80 nginx
# 主机8080 → 容器80

# === 映射到多个端口 ===
docker run -d \
  -p 8080:80 \
  -p 8443:443 \
  nginx

# === 指定 IP 和端口 ===
docker run -d -p 127.0.0.1:8080:80 nginx
# 只能从本机访问

# === UDP 端口 ===
docker run -d -p 53:53/udp dns-server

# === 查看端口映射 ===
docker port <容器名>
# 80/tcp -> 0.0.0.0:8080</code></pre>
      </div>

      <h3>4.2 端口冲突处理</h3>
      <pre><code># 问题：多个容器想用同一端口
docker run -d -p 80:80 --name web1 nginx    # ✅ 成功
docker run -d -p 80:80 --name web2 nginx    # ❌ 失败：端口已占用

# 解决方案1：使用不同主机端口
docker run -d -p 8001:80 --name web1 nginx
docker run -d -p 8002:80 --name web2 nginx
docker run -d -p 8003:80 --name web3 nginx

# 解决方案2：使用负载均衡器
# 前端：Nginx/Traefik 监听 80 端口
# 后端：多个容器用内网端口</code></pre>
    </section>

    <section id="practice">
      <h2>五、综合练习</h2>
      
      <div class="practice-box">
        <h3>练习 1：微服务网络</h3>
        <pre><code># 搭建以下架构：
# - Frontend (React): 端口 3000
# - Backend API: 端口 8000  
# - Redis: 端口 6379
# - PostgreSQL: 端口 5432
# 
# 要求：
# 1. 创建自定义网络
# 2. 只有 Frontend 暴露到主机
# 3. 其他服务只在内网通信</code></pre>
      </div>
    </section>

    <section id="summary">
      <h2>📝 课程小结</h2>
      
      <div class="summary-box">
        <h3>核心知识点</h3>
        <ul class="checklist">
          <li>✅ Bridge 网络：单机容器通信（默认）</li>
          <li>✅ Host 网络：直接使用主机网络</li>
          <li>✅ 自定义网络：支持 DNS 解析</li>
          <li>✅ 端口映射：<code>-p 主机端口:容器端口</code></li>
          <li>✅ 容器互联：通过容器名通信</li>
        </ul>

        <h3>最佳实践</h3>
        <ul>
          <li>✅ 使用<strong>自定义网络</strong>（支持 DNS）</li>
          <li>✅ 数据库不暴露端口（安全）</li>
          <li>✅ 通过容器名通信（不用 IP）</li>
          <li>✅ 一个网络一个应用（隔离）</li>
        </ul>

        <h3>关键命令</h3>
        <pre><code># 网络管理
docker network create/ls/inspect/rm

# 连接网络
docker run --network my-net
docker network connect my-net container

# 端口映射
docker run -p 8080:80
docker port container</code></pre>

        <h3>🎯 下节预告</h3>
        <p>第7讲将学习 <strong>Docker Compose</strong>：</p>
        <ul>
          <li>docker-compose.yml 语法</li>
          <li>多容器编排</li>
          <li>服务依赖管理</li>
          <li>实战项目部署</li>
        </ul>
      </div>
    </section>

    <div class="navigation-buttons">
      <router-link to="/lecture-5" class="nav-btn prev">← 上一讲</router-link>
      <router-link to="/lecture-7" class="nav-btn next">下一讲：Docker Compose →</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LectureSidebar from '@/components/LectureSidebar.vue'

const sections = ref([
  { id: 'intro', title: '👋 课程目标' },
  { id: 'chapter-1', title: '一、Docker 网络基础', level: 1 },
  { id: 'chapter-2', title: '二、Bridge 网络详解', level: 1 },
  { id: 'chapter-3', title: '三、容器互联实战', level: 1 },
  { id: 'chapter-4', title: '四、端口映射', level: 1 },
  { id: 'practice', title: '五、综合练习', level: 1 },
  { id: 'summary', title: '📝 课程小结', level: 1 }
])
</script>
