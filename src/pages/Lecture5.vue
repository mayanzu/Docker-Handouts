<template>
  <div class="lecture-content">
    <header class="lecture-header">
      <h1>第5讲：Dockerfile 编写与镜像构建</h1>
      <p class="intro">掌握Dockerfile核心指令，学会构建自己的Docker镜像，理解多阶段构建的威力。</p>
      
      <div class="pill-list">
        <span class="pill">Dockerfile</span>
        <span class="pill">镜像构建</span>
        <span class="pill">多阶段构建</span>
        <span class="pill">实战案例</span>
      </div>
    </header>

    <LectureSidebar :sections="sections" />

    <section id="intro">
      <h2>👋 课程目标</h2>
      <ul class="goal-list">
        <li>理解Dockerfile的作用和构建流程</li>
        <li>掌握核心指令（FROM、RUN、COPY、CMD、ENTRYPOINT等）</li>
        <li>学会构建各种语言的应用镜像</li>
        <li>掌握多阶段构建技术</li>
      </ul>
    </section>

    <section id="chapter-1">
      <h2>一、Dockerfile 基础</h2>
      
      <h3>1.1 什么是 Dockerfile？</h3>
      <div class="concept-box">
        <h4>📊 Dockerfile 的本质</h4>
        <p><strong>Dockerfile</strong> 是一个文本文件，包含了构建 Docker 镜像的所有指令。</p>
        <ul>
          <li>🎯 <strong>自动化</strong>：代替手动 <code>docker commit</code></li>
          <li>📝 <strong>可复现</strong>：每次构建结果一致</li>
          <li>🔄 <strong>版本控制</strong>：可以用 Git 管理</li>
          <li>🚀 <strong>CI/CD 友好</strong>：自动构建部署</li>
        </ul>
      </div>

      <h3>1.2 第一个 Dockerfile</h3>
      <div class="experiment-box">
        <h4>🧪 实验 1：Hello World 镜像</h4>
        <pre><code># 创建项目目录
mkdir my-first-image
cd my-first-image

# 创建 Dockerfile
cat > Dockerfile << 'EOF'
# 从 Ubuntu 基础镜像开始
FROM ubuntu:22.04

# 执行命令安装软件
RUN apt-get update && apt-get install -y curl

# 设置工作目录
WORKDIR /app

# 复制文件到镜像
COPY hello.txt /app/

# 容器启动时执行的命令
CMD ["cat", "/app/hello.txt"]
EOF

# 创建测试文件
echo "Hello from Docker!" > hello.txt

# 构建镜像
docker build -t my-hello:1.0 .
# . 表示当前目录（构建上下文）

# 查看镜像
docker images | grep my-hello

# 运行容器
docker run --rm my-hello:1.0
# 输出：Hello from Docker!</code></pre>

        <div class="key-point">
          <h4>💡 关键概念</h4>
          <ul>
            <li><code>docker build -t 镜像名:标签 构建上下文路径</code></li>
            <li>Dockerfile 必须命名为 <code>Dockerfile</code>（首字母大写）</li>
            <li><code>.</code> 表示当前目录，Docker 会发送这个目录的所有文件到守护进程</li>
          </ul>
        </div>
      </div>

      <h3>1.3 构建过程解析</h3>
      <pre><code># 构建时的输出解析
$ docker build -t my-hello:1.0 .

[+] Building 5.3s (8/8) FINISHED
 => [internal] load build definition from Dockerfile          ← 读取 Dockerfile
 => => transferring dockerfile: 215B
 => [internal] load .dockerignore                             ← 读取忽略文件
 => => transferring context: 2B
 => [internal] load metadata for docker.io/library/ubuntu...  ← 拉取基础镜像
 => [1/3] FROM docker.io/library/ubuntu:22.04                 ← 第1步：FROM
 => [internal] load build context                             ← 加载构建上下文
 => => transferring context: 50B
 => [2/3] RUN apt-get update && apt-get install -y curl       ← 第2步：RUN
 => [3/3] COPY hello.txt /app/                                ← 第3步：COPY
 => exporting to image                                        ← 导出镜像
 => => exporting layers
 => => writing image sha256:abc123...
 => => naming to docker.io/library/my-hello:1.0               ← 打标签

# 每一步都会生成一个中间层（layer）
# 这些层会被缓存，加速后续构建</code></pre>
    </section>

    <section id="chapter-2">
      <h2>二、核心指令详解</h2>
      
      <h3>2.1 FROM - 指定基础镜像</h3>
      <div class="concept-box">
        <h4>📊 FROM 指令</h4>
        <p><code>FROM</code> 是 Dockerfile 的第一条指令，指定基础镜像。</p>
        <pre><code># 语法
FROM &lt;image&gt;[:&lt;tag&gt;][@&lt;digest&gt;]

# 示例
FROM ubuntu:22.04           # Ubuntu 22.04
FROM python:3.11-slim       # Python 3.11（精简版）
FROM node:18-alpine         # Node.js 18（Alpine Linux）
FROM nginx:latest           # Nginx 最新版
FROM scratch                # 空镜像（用于构建最小镜像）

# 多阶段构建（后面讲）
FROM golang:1.21 AS builder
FROM alpine:3.18</code></pre>

        <div class="key-point">
          <h4>🎯 如何选择基础镜像？</h4>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>场景</th>
                <th>推荐镜像</th>
                <th>原因</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Python应用</td>
                <td><code>python:3.11-slim</code></td>
                <td>体积小，包含必要工具</td>
              </tr>
              <tr>
                <td>Node.js应用</td>
                <td><code>node:18-alpine</code></td>
                <td>Alpine最小化</td>
              </tr>
              <tr>
                <td>Java应用</td>
                <td><code>openjdk:17-slim</code></td>
                <td>JRE足够，无需JDK</td>
              </tr>
              <tr>
                <td>静态二进制</td>
                <td><code>scratch</code></td>
                <td>极致精简（几MB）</td>
              </tr>
              <tr>
                <td>通用环境</td>
                <td><code>ubuntu:22.04</code></td>
                <td>兼容性好，调试方便</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3>2.2 RUN - 执行命令</h3>
      <div class="experiment-box">
        <h4>🧪 实验 2：RUN 指令的两种形式</h4>
        <pre><code># === Shell 形式（常用）===
FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install -y nginx
RUN echo "Hello" > /tmp/hello.txt

# === Exec 形式（推荐）===
FROM ubuntu:22.04

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "nginx"]

# === 合并命令（最佳实践）===
FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y \
        nginx \
        curl \
        vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 为什么要合并？
# ✅ 减少镜像层数
# ✅ 减小镜像体积（删除缓存生效）
# ✅ 加快构建速度（利用缓存）</code></pre>
      </div>

      <h3>2.3 COPY vs ADD - 复制文件</h3>
      <div class="comparison-box">
        <div class="compare-item">
          <h4>COPY（推荐）</h4>
          <pre><code># 复制本地文件到镜像
COPY &lt;src&gt; &lt;dest&gt;

# 示例
COPY app.py /app/
COPY requirements.txt /app/
COPY . /app/

# 复制并改权限
COPY --chown=1000:1000 app.py /app/</code></pre>
          <ul>
            <li>✅ 简单、透明</li>
            <li>✅ 只复制文件</li>
            <li>✅ <strong>推荐使用</strong></li>
          </ul>
        </div>

        <div class="compare-item">
          <h4>ADD（少用）</h4>
          <pre><code># 复制文件（功能更多）
ADD &lt;src&gt; &lt;dest&gt;

# 自动解压 tar
ADD archive.tar.gz /app/

# 下载 URL
ADD https://example.com/file.txt /app/</code></pre>
          <ul>
            <li>⚠️ 自动解压 tar</li>
            <li>⚠️ 支持 URL 下载</li>
            <li>⚠️ 行为不透明，<strong>慎用</strong></li>
          </ul>
        </div>
      </div>

      <div class="experiment-box">
        <h4>🧪 实验 3：COPY 最佳实践</h4>
        <pre><code># ❌ 错误做法：一次复制所有
FROM python:3.11-slim
COPY . /app/
RUN pip install -r /app/requirements.txt

# 问题：修改任何文件都会导致重新安装依赖！

# ✅ 正确做法：先复制依赖文件
FROM python:3.11-slim
WORKDIR /app

# 先复制依赖文件
COPY requirements.txt .
RUN pip install -r requirements.txt

# 再复制应用代码
COPY . .

# 好处：
# - 依赖没变，Docker 使用缓存，秒建！
# - 只有代码变化时才重新复制</code></pre>
      </div>

      <h3>2.4 WORKDIR - 设置工作目录</h3>
      <pre><code># 设置后续指令的工作目录
WORKDIR /app

# 相当于 cd /app
# 后续的 RUN、CMD、COPY 都在此目录执行

# 示例
FROM python:3.11-slim
WORKDIR /app                    # 进入 /app
COPY requirements.txt .         # 复制到 /app/requirements.txt
RUN pip install -r requirements.txt
COPY . .                        # 复制到 /app/
CMD ["python", "app.py"]        # 在 /app 运行

# ✅ 推荐：使用绝对路径
# ❌ 避免：RUN cd /app（不生效，下一层就回到根目录）</code></pre>

      <h3>2.5 ENV - 设置环境变量</h3>
      <div class="experiment-box">
        <h4>🧪 实验 4：环境变量应用</h4>
        <pre><code># Dockerfile
FROM python:3.11-slim

# 设置环境变量
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    APP_ENV=production \
    APP_PORT=8000

WORKDIR /app
COPY . .

# 环境变量可在 RUN、CMD 中使用
RUN echo "Environment: $APP_ENV"
CMD ["python", "app.py"]

# 构建镜像
docker build -t myapp:1.0 .

# 运行时可覆盖环境变量
docker run -e APP_ENV=development -e APP_PORT=3000 myapp:1.0</code></pre>

        <div class="key-point">
          <h4>💡 常用环境变量</h4>
          <ul>
            <li><code>PATH</code>：添加可执行文件路径</li>
            <li><code>PYTHONUNBUFFERED=1</code>：Python 实时输出日志</li>
            <li><code>NODE_ENV=production</code>：Node.js 生产模式</li>
            <li><code>JAVA_OPTS</code>：Java 虚拟机参数</li>
          </ul>
        </div>
      </div>

      <h3>2.6 EXPOSE - 声明端口</h3>
      <pre><code># 声明容器运行时监听的端口
EXPOSE 80
EXPOSE 443
EXPOSE 8080/tcp
EXPOSE 3000/udp

# 注意：EXPOSE 只是声明，不会自动映射端口
# 实际映射需要 docker run -p

# 示例
FROM nginx:alpine
EXPOSE 80
# 运行：docker run -p 8080:80 nginx

# 作用：
# ✅ 文档化：告诉用户容器监听哪些端口
# ✅ docker run -P 自动映射时使用</code></pre>

      <h3>2.7 CMD vs ENTRYPOINT - 容器启动命令</h3>
      <div class="comparison-box">
        <div class="compare-item">
          <h4>CMD（默认命令）</h4>
          <pre><code># 三种形式
CMD ["executable","param1","param2"]  # Exec形式（推荐）
CMD command param1 param2             # Shell形式
CMD ["param1","param2"]               # 作为ENTRYPOINT参数

# 示例
FROM python:3.11-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]

# 特点：
# - 可被 docker run 命令覆盖
# - 只有最后一个 CMD 生效</code></pre>
        </div>

        <div class="compare-item">
          <h4>ENTRYPOINT（入口点）</h4>
          <pre><code># 两种形式
ENTRYPOINT ["executable","param"]  # Exec形式（推荐）
ENTRYPOINT command param           # Shell形式

# 示例
FROM python:3.11-slim
WORKDIR /app
COPY app.py .
ENTRYPOINT ["python", "app.py"]

# 特点：
# - 不会被 docker run 命令覆盖
# - docker run 的参数会追加到 ENTRYPOINT</code></pre>
        </div>
      </div>

      <div class="experiment-box">
        <h4>🧪 实验 5：CMD vs ENTRYPOINT 对比</h4>
        <pre><code># === 示例1：只用 CMD ===
FROM ubuntu:22.04
CMD ["echo", "Hello"]

docker build -t test-cmd .
docker run test-cmd              # 输出：Hello
docker run test-cmd echo Bye     # 输出：Bye（覆盖了CMD）

# === 示例2：只用 ENTRYPOINT ===
FROM ubuntu:22.04
ENTRYPOINT ["echo", "Hello"]

docker build -t test-entry .
docker run test-entry            # 输出：Hello
docker run test-entry World      # 输出：Hello World（追加参数）

# === 示例3：组合使用（最佳实践）===
FROM ubuntu:22.04
ENTRYPOINT ["echo"]
CMD ["Hello"]

docker build -t test-both .
docker run test-both             # 输出：Hello（使用默认CMD）
docker run test-both World       # 输出：World（CMD被覆盖）

# 实战示例：MySQL 镜像
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]
# docker run mysql                    → 启动 mysqld
# docker run mysql bash               → 启动 bash</code></pre>
      </div>
    </section>

    <section id="chapter-3">
      <h2>三、实战：构建应用镜像</h2>
      
      <h3>3.1 Python Flask 应用</h3>
      <div class="experiment-box">
        <h4>🧪 实验 6：Flask Web 应用镜像</h4>
        <pre><code># 1. 创建项目目录
mkdir flask-app && cd flask-app

# 2. 创建 Flask 应用
cat > app.py << 'EOF'
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello from Docker Flask!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
EOF

# 3. 创建依赖文件
cat > requirements.txt << 'EOF'
Flask==3.0.0
EOF

# 4. 创建 Dockerfile
cat > Dockerfile << 'EOF'
# 使用官方 Python 基础镜像
FROM python:3.11-slim

# 设置工作目录
WORKDIR /app

# 先复制依赖文件（利用缓存）
COPY requirements.txt .

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY app.py .

# 暴露端口
EXPOSE 5000

# 启动命令
CMD ["python", "app.py"]
EOF

# 5. 构建镜像
docker build -t flask-app:1.0 .

# 6. 运行容器
docker run -d -p 5000:5000 --name my-flask flask-app:1.0

# 7. 测试
curl http://localhost:5000
# 输出：Hello from Docker Flask!

# 8. 查看日志
docker logs my-flask

# 9. 清理
docker rm -f my-flask</code></pre>
      </div>

      <h3>3.2 Node.js Express 应用</h3>
      <div class="experiment-box">
        <h4>🧪 实验 7：Node.js API 镜像</h4>
        <pre><code># 1. 创建项目
mkdir node-app && cd node-app

# 2. 创建应用
cat > app.js << 'EOF'
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker Node.js!' });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
EOF

# 3. 创建 package.json
cat > package.json << 'EOF'
{
  "name": "node-app",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# 4. 创建 Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

# 先复制 package.json（利用缓存）
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制应用代码
COPY app.js .

EXPOSE 3000

# 使用 node 用户运行（安全）
USER node

CMD ["node", "app.js"]
EOF

# 5. 构建运行
docker build -t node-app:1.0 .
docker run -d -p 3000:3000 --name my-node node-app:1.0

# 6. 测试
curl http://localhost:3000
# {"message":"Hello from Docker Node.js!"}

# 清理
docker rm -f my-node</code></pre>
      </div>

      <h3>3.3 静态网站（Nginx）</h3>
      <div class="experiment-box">
        <h4>🧪 实验 8：静态网站镜像</h4>
        <pre><code># 1. 创建项目
mkdir static-site && cd static-site

# 2. 创建 HTML
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>My Docker Site</title>
    <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        h1 { color: #0070F3; }
    </style>
</head>
<body>
    <h1>🐳 Welcome to My Docker Site</h1>
    <p>This site is running in a Docker container!</p>
</body>
</html>
EOF

# 3. 创建 Dockerfile
cat > Dockerfile << 'EOF'
FROM nginx:alpine

# 删除默认的 Nginx 页面
RUN rm -rf /usr/share/nginx/html/*

# 复制自定义页面
COPY index.html /usr/share/nginx/html/

EXPOSE 80

# Nginx 镜像已经配置了 CMD，无需再写
EOF

# 4. 构建运行
docker build -t static-site:1.0 .
docker run -d -p 8080:80 --name my-site static-site:1.0

# 5. 访问浏览器：http://localhost:8080

# 清理
docker rm -f my-site</code></pre>
      </div>
    </section>

    <section id="chapter-4">
      <h2>四、多阶段构建</h2>
      
      <h3>4.1 为什么需要多阶段构建？</h3>
      <div class="concept-box">
        <h4>💡 问题场景</h4>
        <p>编译型语言（如 Go、Java、C++）的镜像通常很大：</p>
        <ul>
          <li>❌ 包含编译工具链（gcc、maven、go等）</li>
          <li>❌ 包含源代码和依赖</li>
          <li>❌ 最终镜像可能几百MB甚至几GB</li>
        </ul>

        <p><strong>解决方案：多阶段构建</strong></p>
        <ul>
          <li>✅ 第一阶段：编译应用（大镜像）</li>
          <li>✅ 第二阶段：只复制二进制文件（小镜像）</li>
          <li>✅ 最终镜像可减小到几MB</li>
        </ul>
      </div>

      <h3>4.2 Go 语言示例</h3>
      <div class="experiment-box">
        <h4>🧪 实验 9：Go 应用多阶段构建</h4>
        <pre><code># 1. 创建 Go 应用
mkdir go-app && cd go-app

cat > main.go << 'EOF'
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello from Docker Go!")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
EOF

# 2. 单阶段构建（对比）
cat > Dockerfile.single << 'EOF'
FROM golang:1.21
WORKDIR /app
COPY main.go .
RUN go build -o app main.go
CMD ["./app"]
EOF

docker build -f Dockerfile.single -t go-app:single .
docker images | grep go-app
# go-app  single  1.2GB  ← 非常大！

# 3. 多阶段构建（优化）
cat > Dockerfile << 'EOF'
# ===== 阶段1：编译 =====
FROM golang:1.21 AS builder

WORKDIR /app
COPY main.go .

# 编译成静态二进制
RUN CGO_ENABLED=0 GOOS=linux go build -o app main.go

# ===== 阶段2：运行 =====
FROM alpine:3.18

WORKDIR /app

# 从第一阶段复制二进制文件
COPY --from=builder /app/app .

EXPOSE 8080
CMD ["./app"]
EOF

docker build -t go-app:multi .
docker images | grep go-app
# go-app  multi  10MB   ← 缩小了 100 倍！

# 4. 运行测试
docker run -d -p 8080:8080 --name my-go go-app:multi
curl http://localhost:8080

# 清理
docker rm -f my-go</code></pre>

        <div class="key-point">
          <h4>🎯 多阶段构建关键点</h4>
          <ul>
            <li><code>FROM ... AS builder</code>：命名阶段</li>
            <li><code>COPY --from=builder</code>：从前面阶段复制文件</li>
            <li>最终镜像只包含最后一个 <code>FROM</code> 的内容</li>
            <li>前面阶段的大文件不会进入最终镜像</li>
          </ul>
        </div>
      </div>

      <h3>4.3 React 前端应用</h3>
      <div class="experiment-box">
        <h4>🧪 实验 10：React 多阶段构建</h4>
        <pre><code># Dockerfile
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# 生成 build/ 目录（静态文件）

# ===== 阶段2：Nginx 运行 =====
FROM nginx:alpine

# 删除默认页面
RUN rm -rf /usr/share/nginx/html/*

# 复制构建产物
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 构建
docker build -t react-app:1.0 .

# 镜像大小：约 50MB（vs 1GB+ 开发镜像）</code></pre>
      </div>
    </section>

    <section id="chapter-5">
      <h2>五、构建优化技巧</h2>
      
      <h3>5.1 .dockerignore 文件</h3>
      <div class="experiment-box">
        <h4>🧪 实验 11：减少构建上下文</h4>
        <pre><code># 创建 .dockerignore
cat > .dockerignore << 'EOF'
# Git
.git
.gitignore

# 依赖
node_modules
venv
__pycache__

# IDE
.vscode
.idea
*.swp

# 日志和临时文件
*.log
*.tmp
.DS_Store

# 测试和文档
tests
docs
README.md

# 构建产物
dist
build
EOF

# 作用：
# ✅ 减小构建上下文（发送更少文件到 Docker 守护进程）
# ✅ 加快构建速度
# ✅ 避免敏感文件进入镜像</code></pre>
      </div>

      <h3>5.2 利用构建缓存</h3>
      <pre><code># ❌ 错误做法
FROM python:3.11-slim
COPY . /app
RUN pip install -r /app/requirements.txt
# 任何文件改动都会重装依赖！

# ✅ 正确做法
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .      # 先复制依赖文件
RUN pip install -r requirements.txt  # 依赖不变则用缓存
COPY . .                     # 最后复制代码

# 缓存规则：
# 1. 指令未变 + 文件未变 = 使用缓存
# 2. 某层缓存失效 → 后续所有层都失效
# 3. 把变化少的层放前面</code></pre>

      <h3>5.3 减小镜像体积</h3>
      <div class="example-box">
        <h4>💡 体积优化技巧</h4>
        <pre><code># 1. 合并 RUN 命令
RUN apt-get update && \
    apt-get install -y package1 package2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 2. 使用 Alpine 镜像
FROM python:3.11-alpine  # vs python:3.11 (节省 500MB+)

# 3. 多阶段构建
FROM ... AS builder
FROM alpine
COPY --from=builder ...

# 4. 删除不必要文件
RUN pip install --no-cache-dir -r requirements.txt  # 不缓存
RUN npm install --production  # 只装生产依赖

# 5. 使用 .dockerignore
# 避免复制 node_modules、.git 等大目录</code></pre>
      </div>
    </section>

    <section id="practice">
      <h2>六、综合练习</h2>
      
      <div class="practice-box">
        <h3>练习 1：Django 应用容器化</h3>
        <pre><code># 任务：为 Django 应用编写 Dockerfile
# 要求：
# 1. 使用 python:3.11-slim 基础镜像
# 2. 安装 requirements.txt 依赖
# 3. 复制项目代码
# 4. 暴露 8000 端口
# 5. 使用 gunicorn 启动（生产环境）

# 提示：
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myproject.wsgi:application"]</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 2：Java Spring Boot 多阶段构建</h3>
        <pre><code># 任务：为 Spring Boot 应用编写多阶段 Dockerfile
# 要求：
# 1. 第一阶段：使用 maven:3.8-openjdk-17 编译
# 2. 第二阶段：使用 openjdk:17-slim 运行
# 3. 只复制 JAR 文件到最终镜像
# 4. 暴露 8080 端口

# 提示：
# RUN mvn clean package -DskipTests
# COPY --from=builder /app/target/*.jar app.jar
# CMD ["java", "-jar", "app.jar"]</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 3：优化现有 Dockerfile</h3>
        <pre><code># 给定一个低效的 Dockerfile，请优化：
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
COPY . /app
RUN pip3 install flask
CMD cd /app && python3 app.py

# 优化方向：
# 1. 使用更小的基础镜像（python:3.11-alpine）
# 2. 合并 RUN 命令
# 3. 使用 WORKDIR 替代 cd
# 4. 先复制 requirements.txt
# 5. 清理 apt 缓存</code></pre>
      </div>
    </section>

    <section id="summary">
      <h2>📝 课程小结</h2>
      
      <div class="summary-box">
        <h3>核心知识点</h3>
        <ul class="checklist">
          <li>✅ <strong>FROM</strong>：指定基础镜像（首条指令）</li>
          <li>✅ <strong>RUN</strong>：执行命令（合并减少层数）</li>
          <li>✅ <strong>COPY</strong>：复制文件（推荐）vs ADD（少用）</li>
          <li>✅ <strong>WORKDIR</strong>：设置工作目录</li>
          <li>✅ <strong>ENV</strong>：设置环境变量</li>
          <li>✅ <strong>EXPOSE</strong>：声明端口（文档作用）</li>
          <li>✅ <strong>CMD</strong>：默认命令（可覆盖）</li>
          <li>✅ <strong>ENTRYPOINT</strong>：入口点（不可覆盖）</li>
          <li>✅ <strong>多阶段构建</strong>：减小镜像体积（FROM ... AS）</li>
          <li>✅ <strong>.dockerignore</strong>：排除不需要的文件</li>
        </ul>

        <h3>最佳实践</h3>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>原则</th>
              <th>做法</th>
              <th>原因</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>基础镜像</td>
              <td>选择 slim/alpine 版本</td>
              <td>减小体积</td>
            </tr>
            <tr>
              <td>RUN 命令</td>
              <td>合并多条命令</td>
              <td>减少层数</td>
            </tr>
            <tr>
              <td>文件复制</td>
              <td>先复制依赖，后复制代码</td>
              <td>利用缓存</td>
            </tr>
            <tr>
              <td>清理</td>
              <td>删除缓存和临时文件</td>
              <td>减小体积</td>
            </tr>
            <tr>
              <td>编译应用</td>
              <td>使用多阶段构建</td>
              <td>排除编译工具</td>
            </tr>
          </tbody>
        </table>

        <h3>关键命令</h3>
        <pre><code># 构建镜像
docker build -t 镜像名:标签 .
docker build -f Dockerfile.dev -t 镜像名 .

# 查看构建历史
docker history 镜像名

# 查看镜像详情
docker inspect 镜像名

# 导出/导入镜像
docker save -o myimage.tar myimage:1.0
docker load -i myimage.tar</code></pre>

        <h3>🎯 下节预告</h3>
        <p>第6讲将学习 <strong>镜像优化与最佳实践</strong>：</p>
        <ul>
          <li>镜像分层原理深入</li>
          <li>体积优化技巧</li>
          <li>安全最佳实践</li>
          <li>镜像扫描与漏洞检测</li>
        </ul>
      </div>
    </section>

    <div class="navigation-buttons">
      <router-link to="/lecture-4" class="nav-btn prev">← 上一讲</router-link>
      <router-link to="/lecture-6" class="nav-btn next">下一讲：镜像优化 →</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LectureSidebar from '@/components/LectureSidebar.vue'

const sections = ref([
  { id: 'intro', title: '👋 课程目标' },
  { id: 'chapter-1', title: '一、Dockerfile 基础', level: 1 },
  { id: 'chapter-2', title: '二、核心指令详解', level: 1 },
  { id: 'chapter-3', title: '三、实战：构建应用镜像', level: 1 },
  { id: 'chapter-4', title: '四、多阶段构建', level: 1 },
  { id: 'chapter-5', title: '五、构建优化技巧', level: 1 },
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