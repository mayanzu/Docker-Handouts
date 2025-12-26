<template>
  <div class="lecture-content">
    <header class="lecture-header">
      <h1>第7讲：Docker Compose 多容器编排</h1>
      <p class="intro">使用Docker Compose管理多容器应用，掌握YAML配置、服务依赖和实战部署。</p>
      
      <div class="pill-list">
        <span class="pill">Compose</span>
        <span class="pill">YAML配置</span>
        <span class="pill">服务编排</span>
        <span class="pill">实战项目</span>
      </div>
    </header>

    <LectureSidebar :sections="sections" />

    <section id="intro">
      <h2>👋 课程目标</h2>
      <ul class="goal-list">
        <li>理解Docker Compose的作用</li>
        <li>掌握docker-compose.yml语法</li>
        <li>学会编排多容器应用</li>
        <li>完成实战项目部署</li>
      </ul>
    </section>

    <section id="chapter-1">
      <h2>一、Docker Compose 简介</h2>
      
      <h3>1.1 为什么需要 Compose？</h3>
      <div class="concept-box">
        <h4>💡 问题场景</h4>
        <p>部署一个完整的应用需要多个容器：</p>
        <pre><code># 启动数据库
docker run -d --name db --network mynet -e POSTGRES_PASSWORD=secret postgres

# 启动 Redis
docker run -d --name redis --network mynet redis

# 启动后端
docker run -d --name api --network mynet -e DB_HOST=db myapi

# 启动前端
docker run -d --name web --network mynet -p 80:80 myweb

# 问题：
# ❌ 命令太多，容易出错
# ❌ 启动顺序难控制
# ❌ 环境变量分散
# ❌ 难以版本管理</code></pre>

        <h4>✅ Compose 的解决方案</h4>
        <p>一个 <code>docker-compose.yml</code> 文件定义所有服务，一条命令启动全部！</p>
        <pre><code># 启动所有服务
docker compose up -d

# 停止所有服务
docker compose down</code></pre>
      </div>

      <h3>1.2 安装 Compose</h3>
      <pre><code># Docker Desktop 自带 Compose（Windows/macOS）
docker compose version
# Docker Compose version v2.24.0

# Linux 安装
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose</code></pre>
    </section>

    <section id="chapter-2">
      <h2>二、docker-compose.yml 语法</h2>
      
      <h3>2.1 基本结构</h3>
      <div class="experiment-box">
        <h4>🧪 实验 1：第一个 Compose 文件</h4>
        <pre><code># 创建项目目录
mkdir myapp && cd myapp

# 创建 docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
EOF

# 创建HTML文件
mkdir html
echo "<h1>Hello Compose!</h1>" > html/index.html

# 启动服务
docker compose up -d

# 查看服务
docker compose ps

# 访问 http://localhost:8080

# 查看日志
docker compose logs web

# 停止并删除
docker compose down</code></pre>
      </div>

      <h3>2.2 核心配置项</h3>
      <div class="concept-box">
        <h4>📊 常用配置详解</h4>
        <pre><code>version: '3.8'

services:
  app:
    # === 镜像相关 ===
    image: nginx:alpine              # 使用镜像
    build:                           # 或构建镜像
      context: .
      dockerfile: Dockerfile
    
    # === 容器名称 ===
    container_name: my-web           # 自定义容器名
    
    # === 端口映射 ===
    ports:
      - "8080:80"                    # 主机:容器
      - "443:443"
    
    # === 环境变量 ===
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    
    # === 数据卷 ===
    volumes:
      - ./data:/data                 # 绑定挂载
      - mydata:/var/lib/mysql        # 命名卷
    
    # === 网络 ===
    networks:
      - frontend
      - backend
    
    # === 依赖 ===
    depends_on:
      - db
      - redis
    
    # === 重启策略 ===
    restart: unless-stopped
    
    # === 健康检查 ===
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3

# === 命名卷 ===
volumes:
  mydata:

# === 网络 ===
networks:
  frontend:
  backend:</code></pre>
      </div>
    </section>

    <section id="chapter-3">
      <h2>三、实战案例</h2>
      
      <h3>3.1 WordPress 博客系统</h3>
      <div class="experiment-box">
        <h4>🧪 实验 2：WordPress + MySQL</h4>
        <pre><code># 创建项目
mkdir wordpress && cd wordpress

# docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  db:
    image: mysql:8.0
    volumes:
      - db_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppass
    networks:
      - backend
    restart: unless-stopped

  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppass
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp_data:/var/www/html
    networks:
      - backend
    depends_on:
      - db
    restart: unless-stopped

volumes:
  db_data:
  wp_data:

networks:
  backend:
EOF

# 启动
docker compose up -d

# 查看状态
docker compose ps
# NAME        SERVICE     STATUS    PORTS
# wordpress   wordpress   running   0.0.0.0:8080->80/tcp
# db          db          running   3306/tcp

# 访问 http://localhost:8080 安装 WordPress

# 查看日志
docker compose logs -f wordpress

# 停止（保留数据）
docker compose stop

# 重新启动
docker compose start

# 完全清理（删除容器和数据卷）
docker compose down -v</code></pre>
      </div>

      <h3>3.2 前后端分离项目</h3>
      <div class="experiment-box">
        <h4>🧪 实验 3：React + Node.js + MongoDB</h4>
        <pre><code># 项目结构
# myapp/
#   ├── docker-compose.yml
#   ├── frontend/
#   │   └── Dockerfile
#   ├── backend/
#   │   └── Dockerfile

cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # MongoDB数据库
  mongo:
    image: mongo:7
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secret
    volumes:
      - mongo_data:/data/db
    networks:
      - backend
    restart: unless-stopped

  # Node.js后端API
  backend:
    build: ./backend
    environment:
      PORT: 8000
      MONGO_URL: mongodb://admin:secret@mongo:27017
    ports:
      - "8000:8000"
    networks:
      - backend
    depends_on:
      - mongo
    restart: unless-stopped

  # React前端
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      REACT_APP_API_URL: http://localhost:8000
    networks:
      - backend
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  mongo_data:

networks:
  backend:
EOF

# 构建并启动
docker compose up -d --build

# 查看日志
docker compose logs -f backend

# 扩展服务（运行多个副本）
docker compose up -d --scale backend=3</code></pre>
      </div>

      <h3>3.3 LNMP 技术栈</h3>
      <div class="experiment-box">
        <h4>🧪 实验 4：Nginx + PHP + MySQL</h4>
        <pre><code>cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # Nginx Web服务器
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./www:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    networks:
      - lnmp
    depends_on:
      - php
    restart: unless-stopped

  # PHP-FPM
  php:
    image: php:8.2-fpm-alpine
    volumes:
      - ./www:/usr/share/nginx/html
    networks:
      - lnmp
    restart: unless-stopped

  # MySQL数据库
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: mydb
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - lnmp
    restart: unless-stopped

volumes:
  mysql_data:

networks:
  lnmp:
EOF

# 创建测试PHP文件
mkdir www
cat > www/index.php << 'PHPEOF'
&lt;?php
phpinfo();
?&gt;
PHPEOF

# 启动
docker compose up -d

# 访问 http://localhost</code></pre>
      </div>
    </section>

    <section id="chapter-4">
      <h2>四、Compose 高级特性</h2>
      
      <h3>4.1 环境变量文件</h3>
      <pre><code># .env 文件（与 docker-compose.yml 同目录）
DB_PASSWORD=mysecret
API_PORT=8000
APP_ENV=production

# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "${API_PORT}:8000"
    environment:
      DB_PASSWORD: ${DB_PASSWORD}
      APP_ENV: ${APP_ENV}

# 启动时自动读取 .env 文件
docker compose up -d</code></pre>

      <h3>4.2 多环境配置</h3>
      <pre><code># docker-compose.yml（基础配置）
version: '3.8'
services:
  app:
    image: myapp:latest
    networks:
      - mynet

# docker-compose.override.yml（开发环境，自动合并）
version: '3.8'
services:
  app:
    build: .                    # 覆盖：使用本地构建
    volumes:
      - .:/app                  # 添加：挂载代码
    command: npm run dev        # 覆盖：开发模式

# docker-compose.prod.yml（生产环境）
version: '3.8'
services:
  app:
    restart: always
    environment:
      NODE_ENV: production

# 使用生产配置
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d</code></pre>

      <h3>4.3 健康检查与依赖</h3>
      <pre><code>version: '3.8'

services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    image: myapp:latest
    depends_on:
      db:
        condition: service_healthy    # 等待 db 健康后再启动
    restart: on-failure</code></pre>
    </section>

    <section id="practice">
      <h2>五、综合练习</h2>
      
      <div class="practice-box">
        <h3>练习 1：微服务架构</h3>
        <pre><code># 部署以下服务：
# - Frontend (React): 端口 3000
# - Backend API (Node.js): 端口 8000
# - Auth Service (Node.js): 端口 8001
# - Redis: 端口 6379
# - PostgreSQL: 端口 5432
#
# 要求：
# 1. 使用 docker-compose.yml
# 2. 只有 Frontend 暴露端口
# 3. 配置健康检查
# 4. 使用环境变量</code></pre>
      </div>
    </section>

    <section id="summary">
      <h2>📝 课程小结</h2>
      
      <div class="summary-box">
        <h3>核心知识点</h3>
        <ul class="checklist">
          <li>✅ docker-compose.yml：YAML 格式配置</li>
          <li>✅ services：定义容器服务</li>
          <li>✅ volumes：数据持久化</li>
          <li>✅ networks：服务间通信</li>
          <li>✅ depends_on：服务依赖</li>
          <li>✅ environment：环境变量</li>
          <li>✅ .env 文件：环境配置</li>
        </ul>

        <h3>常用命令</h3>
        <pre><code># 启动服务
docker compose up -d

# 查看状态
docker compose ps

# 查看日志
docker compose logs -f [服务名]

# 停止服务
docker compose stop

# 停止并删除
docker compose down

# 删除包括数据卷
docker compose down -v

# 重新构建
docker compose up -d --build

# 扩展服务
docker compose up -d --scale web=3</code></pre>

        <h3>🎯 下节预告</h3>
        <p>第8讲将学习 <strong>Docker 实战进阶</strong>：</p>
        <ul>
          <li>CI/CD 集成</li>
          <li>容器监控</li>
          <li>日志管理</li>
          <li>性能优化</li>
        </ul>
      </div>
    </section>

    <div class="navigation-buttons">
      <router-link to="/lecture-6" class="nav-btn prev">← 上一讲</router-link>
      <router-link to="/lecture-8" class="nav-btn next">下一讲：实战进阶 →</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LectureSidebar from '@/components/LectureSidebar.vue'

const sections = ref([
  { id: 'intro', title: '👋 课程目标' },
  { id: 'chapter-1', title: '一、Docker Compose 简介', level: 1 },
  { id: 'chapter-2', title: '二、docker-compose.yml 语法', level: 1 },
  { id: 'chapter-3', title: '三、实战案例', level: 1 },
  { id: 'chapter-4', title: '四、Compose 高级特性', level: 1 },
  { id: 'practice', title: '五、综合练习', level: 1 },
  { id: 'summary', title: '📝 课程小结', level: 1 }
])
</script>
