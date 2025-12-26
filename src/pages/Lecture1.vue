<template>
  <div class="lecture-content">
    <header class="lecture-header">
      <h1>第1讲：软件部署的痛点与容器初体验</h1>
      <p class="intro">理解传统软件部署的痛点，认识容器技术如何解决这些问题，完成第一个容器应用。</p>
      
      <div class="pill-list">
        <span class="pill">部署痛点</span>
        <span class="pill">容器 vs 虚拟机</span>
        <span class="pill">Docker 安装</span>
        <span class="pill">Hello World</span>
      </div>
    </header>

    <LectureSidebar :sections="sections" />

    <section id="intro">
      <h2>👋 课程目标</h2>
      <ul class="goal-list">
        <li>理解"在我机器上能跑"的经典问题</li>
        <li>掌握容器与虚拟机的本质区别</li>
        <li>完成 Docker 环境安装</li>
        <li>运行第一个容器应用</li>
      </ul>
    </section>

    <section id="chapter-1">
      <h2>一、软件部署的经典痛点</h2>
      
      <h3>1.1 "在我机器上能跑" 问题</h3>
      <p>开发人员最常说的话："在我机器上是好的啊！" 这个问题的根源：</p>
      <ul>
        <li><strong>环境不一致</strong>：开发、测试、生产环境配置不同</li>
        <li><strong>依赖冲突</strong>：Python 版本、Node.js 版本不匹配</li>
        <li><strong>配置复杂</strong>：需要手动安装大量依赖包</li>
        <li><strong>迁移困难</strong>：换台服务器就要重新配置一遍</li>
      </ul>

      <div class="example-box">
        <h4>💡 真实场景</h4>
        <p>你写了一个 Flask 应用，在你的 Mac 上完美运行，但：</p>
        <pre><code># 你的机器
Python 3.11
Flask 3.0
PostgreSQL 15

# 测试服务器
Python 3.8  ← 版本不同
Flask 2.0   ← 版本不同
MySQL       ← 数据库都换了！</code></pre>
        <p>结果：应用无法启动，排查问题耗费大量时间。</p>
      </div>

      <h3>1.2 传统解决方案的局限</h3>
      
      <h4>方案一：手动配置文档</h4>
      <pre><code># 部署文档.md
1. 安装 Python 3.11
2. 安装 pip install flask==3.0
3. 配置数据库...
4. 设置环境变量...
...（50步后）</code></pre>
      <p>❌ 问题：文档总是过时的，人工操作容易出错</p>

      <h4>方案二：虚拟机镜像</h4>
      <p>把整个系统打包成虚拟机镜像（.ova / .vmdk）</p>
      <ul>
        <li>✅ 优点：环境完全一致</li>
        <li>❌ 缺点：镜像巨大（5GB+），启动慢（分钟级），资源消耗高</li>
      </ul>
    </section>

    <section id="chapter-2">
      <h2>二、容器技术横空出世</h2>
      
      <h3>2.1 容器是什么？</h3>
      <p><strong>容器（Container）</strong>是一种<strong>轻量级的应用隔离技术</strong>，可以把应用和它的所有依赖打包在一起：</p>
      <ul>
        <li>📦 <strong>应用的安装包</strong>：包含运行应用所需的一切（代码、依赖、配置）</li>
        <li>📸 <strong>文件系统快照</strong>：某个时间点的完整文件系统状态</li>
        <li>🔒 <strong>隔离运行环境</strong>：与主机和其他容器相互隔离</li>
        <li>⚡ <strong>秒级启动</strong>：共享主机内核，启动速度极快</li>
      </ul>

      <h3>2.2 容器的核心技术原理</h3>
      <p>容器技术基于 Linux 内核的三大技术：</p>
      
      <div class="concept-box">
        <h4>🔧 技术一：命名空间（Namespaces）</h4>
        <p>实现资源隔离，让容器拥有独立的视图：</p>
        <ul>
          <li><strong>PID Namespace</strong>：进程隔离，容器内进程 ID 独立</li>
          <li><strong>Network Namespace</strong>：网络隔离，独立的 IP、端口</li>
          <li><strong>Mount Namespace</strong>：文件系统隔离</li>
          <li><strong>UTS Namespace</strong>：主机名隔离</li>
          <li><strong>IPC Namespace</strong>：进程间通信隔离</li>
          <li><strong>User Namespace</strong>：用户权限隔离</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>🔧 技术二：控制组（CGroups）</h4>
        <p>限制容器可使用的资源：</p>
        <ul>
          <li><strong>CPU 限制</strong>：限制 CPU 使用率（如最多使用 50% CPU）</li>
          <li><strong>内存限制</strong>：限制内存使用量（如最多 512MB）</li>
          <li><strong>磁盘 I/O</strong>：限制磁盘读写速度</li>
          <li><strong>网络带宽</strong>：限制网络流量</li>
        </ul>
        <pre><code># 示例：限制容器资源
docker run -d \
  --cpus="0.5" \        # 最多使用 0.5 个 CPU
  --memory="512m" \     # 最多使用 512MB 内存
  nginx</code></pre>
      </div>

      <div class="concept-box">
        <h4>🔧 技术三：联合文件系统（Union FS）</h4>
        <p>实现镜像分层存储：</p>
        <ul>
          <li><strong>分层存储</strong>：多个层叠加形成完整文件系统</li>
          <li><strong>写时复制（COW）</strong>：修改文件时才复制到新层</li>
          <li><strong>层共享</strong>：多个镜像共享相同的基础层，节省空间</li>
        </ul>
      </div>

      <h3>2.3 容器 vs 虚拟机：深度对比</h3>
      
      <div class="comparison-box">
        <div class="compare-item">
          <h4>🏢 虚拟机 (VM)</h4>
          <pre><code>┌─────────────────┐
│   应用 A        │
│   依赖库        │
├─────────────────┤
│   操作系统      │ ← 完整 OS（1-2GB）
│   (Ubuntu)      │
├─────────────────┤
│   虚拟机管理器  │ ← Hypervisor
│   (VirtualBox)  │
├─────────────────┤
│   宿主机 OS     │
└─────────────────┘</code></pre>
          <p>启动时间：<strong>30秒 - 数分钟</strong></p>
          <p>资源开销：<strong>高</strong>（每个 VM 需要完整 OS）</p>
        </div>

        <div class="compare-item">
          <h4>📦 容器 (Container)</h4>
          <pre><code>┌─────────────────┐
│   应用 A        │
│   依赖库        │
├─────────────────┤
│ 容器运行时      │ ← 共享宿主机内核
│ (Docker Engine) │
├─────────────────┤
│   宿主机 OS     │
└─────────────────┘</code></pre>
          <p>启动时间：<strong>1秒内</strong></p>
          <p>资源开销：<strong>低</strong>（共享内核）</p>
        </div>
      </div>

      <h3>2.4 容器 vs 虚拟机 对比表</h3>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>特性</th>
            <th>容器 (Docker)</th>
            <th>虚拟机 (VM)</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>启动速度</td>
            <td>秒级（1-3秒）</td>
            <td>分钟级（30-120秒）</td>
            <td>容器直接启动进程，VM 需要启动整个 OS</td>
          </tr>
          <tr>
            <td>硬盘占用</td>
            <td>MB级（10-200MB）</td>
            <td>GB级（5-20GB）</td>
            <td>容器只包含应用和依赖，VM 包含完整 OS</td>
          </tr>
          <tr>
            <td>性能</td>
            <td>接近原生（<5% 损耗）</td>
            <td>有损耗（10-20%）</td>
            <td>容器共享内核，VM 需要虚拟化硬件</td>
          </tr>
          <tr>
            <td>隔离性</td>
            <td>进程级（中等）</td>
            <td>系统级（强）</td>
            <td>VM 完全隔离硬件，安全性更高</td>
          </tr>
          <tr>
            <td>可运行数量</td>
            <td>数千个</td>
            <td>几十个</td>
            <td>容器轻量，一台服务器可运行上千容器</td>
          </tr>
          <tr>
            <td>系统兼容性</td>
            <td>依赖宿主机内核</td>
            <td>完全独立</td>
            <td>容器必须与宿主机同内核（Linux容器需Linux主机）</td>
          </tr>
          <tr>
            <td>资源利用率</td>
            <td>高（80-90%）</td>
            <td>中（50-70%）</td>
            <td>容器共享资源，利用率更高</td>
          </tr>
        </tbody>
      </table>

      <div class="key-point">
        <h4>🎯 核心理念</h4>
        <p>容器不是虚拟机！它是<strong>进程级隔离</strong>，共享宿主机内核，因此更轻量、更快速。</p>
        <p><strong>选择建议：</strong></p>
        <ul>
          <li>✅ 容器适合：微服务架构、快速部署、CI/CD、横向扩展</li>
          <li>✅ 虚拟机适合：需要完全隔离、运行不同操作系统、对安全性要求极高</li>
        </ul>
      </div>

      <h3>2.5 Docker 是什么？</h3>
      <p>Docker 是当前最流行的容器平台，提供了完整的容器生态系统：</p>
      <ul>
        <li><strong>Docker Engine</strong>：容器运行时，负责创建和管理容器</li>
        <li><strong>Docker Hub</strong>：公共镜像仓库，类似 GitHub（存代码）或 npm（存包）</li>
        <li><strong>Docker Desktop</strong>：图形化管理工具（Windows/Mac）</li>
        <li><strong>Docker Compose</strong>：多容器编排工具</li>
        <li><strong>Dockerfile</strong>：镜像构建脚本</li>
      </ul>

      <div class="example-box">
        <h4>💡 Docker 的三大核心概念</h4>
        <pre><code>镜像（Image）  ←  Dockerfile 构建
    ↓ docker run
容器（Container）→  运行的应用实例
    ↓ docker push
仓库（Registry）→  存储镜像（Docker Hub）</code></pre>
      </div>
    </section>

    <section id="chapter-3">
      <h2>三、Docker 环境安装</h2>
      
      <h3>3.1 Windows 安装 Docker Desktop</h3>
      <div class="step-box">
        <p><strong>步骤 1：</strong> 下载 Docker Desktop for Windows</p>
        <pre><code># 访问官网下载
https://www.docker.com/products/docker-desktop/

# 系统要求
- Windows 10/11 专业版/企业版/教育版
- 启用 Hyper-V 或 WSL 2</code></pre>

        <p><strong>步骤 2：</strong> 启用 WSL 2（推荐）</p>
        <pre><code># PowerShell 管理员模式运行
wsl --install
wsl --set-default-version 2

# 重启电脑后验证
wsl --list --verbose</code></pre>

        <p><strong>步骤 3：</strong> 安装 Docker Desktop</p>
        <p>双击安装包，勾选 "Use WSL 2 instead of Hyper-V"</p>

        <p><strong>步骤 4：</strong> 验证安装</p>
        <pre><code># 打开 PowerShell 或 CMD
docker --version
# 输出：Docker version 24.0.x

docker run hello-world
# 如果看到 "Hello from Docker!"，安装成功！</code></pre>
      </div>

      <h3>3.2 Mac 安装 Docker Desktop</h3>
      <pre><code># 方法一：官网下载
https://www.docker.com/products/docker-desktop/

# 方法二：使用 Homebrew
brew install --cask docker

# 验证安装
docker --version</code></pre>

      <h3>3.3 Linux 安装 Docker Engine</h3>
      <pre><code># Ubuntu / Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 将当前用户加入 docker 组（避免 sudo）
sudo usermod -aG docker $USER

# 重新登录后验证
docker --version
docker run hello-world</code></pre>
    </section>

    <section id="chapter-4">
      <h2>四、第一个容器：Hello World</h2>
      
      <h3>4.1 运行 hello-world 容器</h3>
      <div class="experiment-box">
        <h4>🧪 实验 1：运行第一个容器</h4>
        <pre><code># 执行命令
docker run hello-world

# 输出内容（简化版）
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete 
Digest: sha256:4bd78111b6914a99dbc560e6a20eab57ff6655aea4a80c50b0c5491968cbc2e6
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. Docker 客户端联系 Docker 守护进程
 2. 守护进程从 Docker Hub 下载 "hello-world" 镜像
 3. 守护进程根据镜像创建新容器
 4. 容器执行程序，产生你看到的输出
 5. Docker 守护进程将输出传回客户端</code></pre>
        
        <p><strong>🔍 发生了什么？</strong></p>
        <ul>
          <li>Docker 先在本地查找 <code>hello-world</code> 镜像</li>
          <li>本地没有，自动从 Docker Hub 下载</li>
          <li>创建容器并运行</li>
          <li>输出信息后容器自动停止</li>
        </ul>
      </div>

      <h3>4.2 理解 Docker 运行流程</h3>
      <div class="concept-box">
        <h4>📊 Docker 架构图</h4>
        <pre><code>┌──────────────────────────────────────────────┐
│           Docker 客户端 (docker CLI)          │
│                                               │
│  $ docker run nginx                          │
│  $ docker ps                                 │
│  $ docker stop xxx                           │
└───────────────┬──────────────────────────────┘
                │ REST API
┌───────────────▼──────────────────────────────┐
│       Docker 守护进程 (Docker Daemon)         │
│                                               │
│  ┌─────────────────────────────────────┐    │
│  │         镜像管理                     │    │
│  │  • 拉取镜像                          │    │
│  │  • 构建镜像                          │    │
│  │  • 删除镜像                          │    │
│  └─────────────────────────────────────┘    │
│                                               │
│  ┌─────────────────────────────────────┐    │
│  │         容器管理                     │    │
│  │  • 创建容器                          │    │
│  │  • 启动/停止容器                     │    │
│  │  • 删除容器                          │    │
│  └─────────────────────────────────────┘    │
│                                               │
│  ┌─────────────────────────────────────┐    │
│  │         网络管理                     │    │
│  └─────────────────────────────────────┘    │
│                                               │
│  ┌─────────────────────────────────────┐    │
│  │         数据卷管理                   │    │
│  └─────────────────────────────────────┘    │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│           Docker Hub (镜像仓库)               │
│                                               │
│  • nginx          • python       • mysql     │
│  • node           • redis        • postgres  │
│  • ubuntu         • alpine       • ...       │
└───────────────────────────────────────────────┘</code></pre>
      </div>

      <h3>4.3 运行交互式容器</h3>
      <div class="experiment-box">
        <h4>🧪 实验 2：进入 Ubuntu 容器</h4>
        <pre><code># 运行一个 Ubuntu 容器并进入 bash
docker run -it ubuntu bash

# 现在你在容器内部了！提示符变成：
root@c7f1a2b3c4d5:/# 

# 试试几个命令
cat /etc/os-release   # 查看系统信息
# 输出：
# NAME="Ubuntu"
# VERSION="22.04.3 LTS (Jammy Jellyfish)"

ls /                  # 查看根目录
# bin  boot  dev  etc  home  lib  ...

whoami                # 你是 root 用户
# root

pwd                   # 当前目录
# /

# 安装软件试试
apt update
apt install curl -y

# 测试 curl
curl https://www.baidu.com

# 退出容器（容器会停止）
exit</code></pre>
        
        <p><strong>参数详解：</strong></p>
        <ul>
          <li><code>-i</code> (--interactive): 保持标准输入打开，允许输入命令</li>
          <li><code>-t</code> (--tty): 分配一个伪终端（pseudo-TTY），显示命令提示符</li>
          <li><code>-it</code> 组合：可交互式使用容器，像 SSH 登录服务器</li>
          <li><code>bash</code>: 容器启动后执行的命令</li>
        </ul>
        
        <div class="key-point">
          <h4>💡 重要概念</h4>
          <p>容器是<strong>临时的</strong>！退出后，容器内的修改会保留在已停止的容器中，但再次运行 <code>docker run ubuntu bash</code> 会创建全新容器。</p>
        </div>
      </div>

      <h3>4.4 运行 Web 服务器</h3>
      <div class="experiment-box">
        <h4>🧪 实验 3：一行命令启动 Nginx</h4>
        <pre><code># 运行 Nginx 服务器
docker run -d -p 8080:80 --name my-nginx nginx

# 输出容器 ID（表示成功启动）
a1b2c3d4e5f67890...

# 参数详解
# -d (--detach): 后台运行，不占用终端
# -p 8080:80: 端口映射
#   ├─ 8080: 宿主机端口（你访问的端口）
#   └─ 80: 容器内端口（Nginx 默认监听 80）
# --name my-nginx: 给容器命名（方便后续操作）
# nginx: 使用的镜像名称

# 验证容器运行
docker ps
# CONTAINER ID   IMAGE   COMMAND                  STATUS        PORTS                  NAMES
# a1b2c3d4e5f6   nginx   "nginx -g 'daemon of…"   Up 10 seconds 0.0.0.0:8080->80/tcp   my-nginx

# 浏览器访问 http://localhost:8080
# 你应该看到 Nginx 欢迎页面！

# 查看容器日志
docker logs my-nginx
# 输出访问日志：
# 192.168.1.1 - - [26/Dec/2025:10:30:45 +0000] "GET / HTTP/1.1" 200 615 ...

# 实时查看日志（Ctrl+C 退出）
docker logs -f my-nginx

# 停止容器
docker stop my-nginx

# 再次启动同一个容器
docker start my-nginx

# 删除容器（需要先停止）
docker stop my-nginx
docker rm my-nginx</code></pre>
        
        <p><strong>🔍 端口映射原理：</strong></p>
        <pre><code>你的浏览器 → localhost:8080 → Docker → 容器:80 → Nginx

格式：-p 宿主机端口:容器端口
示例：
  -p 8080:80     # 8080 映射到 80
  -p 3000:3000   # 3000 映射到 3000
  -p 5432:5432   # PostgreSQL 端口映射</code></pre>
      </div>

      <h3>4.5 容器的生命周期</h3>
      <div class="concept-box">
        <h4>📊 容器状态转换</h4>
        <pre><code>              docker run
            ┌───────────────┐
            │               │
            ▼               │
        ┌─────────┐    docker start
        │ Created │         │
        └────┬────┘         │
             │              │
      docker start          │
             │              │
             ▼              │
        ┌─────────┐    ◄────┘
        │ Running │
        └────┬────┘
             │
      ┌──────┴──────┐
      │             │
 docker stop   docker pause
      │             │
      ▼             ▼
 ┌─────────┐  ┌─────────┐
 │ Stopped │  │ Paused  │
 └────┬────┘  └────┬────┘
      │            │
      │      docker unpause
      │            │
      │            ▼
      │       ┌─────────┐
      │       │ Running │
      │       └─────────┘
      │
 docker rm
      │
      ▼
 ┌─────────┐
 │ Removed │
 └─────────┘</code></pre>
      </div>
    </section>

    <section id="chapter-5">
      <h2>五、基础命令速览</h2>
      
      <div class="command-reference">
        <h3>5.1 镜像相关命令</h3>
        <pre><code># 搜索镜像
docker search nginx
docker search python

# 下载镜像
docker pull nginx                    # 下载最新版
docker pull python:3.11              # 下载指定版本
docker pull nginx:1.25-alpine        # 下载 alpine 版本

# 列出本地镜像
docker images                        # 列出所有镜像
docker images nginx                  # 只列出 nginx 镜像
docker images -q                     # 只显示镜像 ID

# 查看镜像详细信息
docker inspect nginx                 # JSON 格式详情
docker history nginx                 # 查看镜像构建历史

# 删除镜像
docker rmi nginx                     # 删除镜像
docker rmi nginx:1.25-alpine         # 删除指定版本
docker rmi $(docker images -q)       # 删除所有镜像（危险）

# 清理无用镜像
docker image prune                   # 删除悬空镜像
docker image prune -a                # 删除所有未使用镜像</code></pre>

        <h3>5.2 容器相关命令</h3>
        <pre><code># 运行容器
docker run nginx                              # 前台运行
docker run -d nginx                           # 后台运行
docker run -d -p 8080:80 nginx               # 后台 + 端口映射
docker run -d --name my-web nginx            # 后台 + 命名
docker run -it ubuntu bash                    # 交互式运行

# 查看容器
docker ps                                     # 查看运行中的容器
docker ps -a                                  # 查看所有容器（包括停止的）
docker ps -q                                  # 只显示容器 ID
docker ps --filter "status=running"          # 按状态过滤

# 容器生命周期管理
docker start &lt;容器ID或名称&gt;                   # 启动已停止的容器
docker stop &lt;容器ID或名称&gt;                    # 停止运行中的容器
docker restart &lt;容器ID或名称&gt;                 # 重启容器
docker pause &lt;容器ID或名称&gt;                   # 暂停容器
docker unpause &lt;容器ID或名称&gt;                 # 恢复容器

# 删除容器
docker rm &lt;容器ID或名称&gt;                      # 删除已停止的容器
docker rm -f &lt;容器ID或名称&gt;                   # 强制删除运行中的容器
docker rm $(docker ps -aq)                    # 删除所有容器（危险）

# 清理停止的容器
docker container prune                        # 删除所有停止的容器</code></pre>

        <h3>5.3 容器交互命令</h3>
        <pre><code># 查看容器日志
docker logs &lt;容器ID&gt;                          # 查看所有日志
docker logs -f &lt;容器ID&gt;                       # 实时跟踪日志（类似 tail -f）
docker logs --tail 100 &lt;容器ID&gt;              # 查看最后 100 行
docker logs --since 10m &lt;容器ID&gt;             # 查看最近 10 分钟日志

# 进入运行中的容器
docker exec -it &lt;容器ID&gt; bash                # 进入容器 bash
docker exec -it &lt;容器ID&gt; sh                  # 进入容器 sh（alpine 等）
docker exec &lt;容器ID&gt; ls /app                 # 在容器内执行命令

# 查看容器详情
docker inspect &lt;容器ID&gt;                       # JSON 格式详情
docker top &lt;容器ID&gt;                           # 查看容器内进程
docker stats &lt;容器ID&gt;                         # 实时查看资源使用情况

# 从容器复制文件
docker cp &lt;容器ID&gt;:/path/to/file ./local    # 从容器复制到本地
docker cp ./local/file &lt;容器ID&gt;:/path/to     # 从本地复制到容器</code></pre>

        <h3>5.4 系统信息命令</h3>
        <pre><code># Docker 版本信息
docker --version                              # 简洁版本号
docker version                                # 详细版本信息

# Docker 系统信息
docker info                                   # 系统信息
docker system df                              # 磁盘使用情况

# 系统清理
docker system prune                           # 清理未使用资源
docker system prune -a                        # 清理所有未使用资源（包括镜像）
docker system prune -a --volumes              # 清理所有（包括数据卷）</code></pre>

        <h3>5.5 实用技巧</h3>
        <pre><code># 使用容器 ID 简写
docker stop a1b2c3d4e5f6      # 完整 ID
docker stop a1b2              # 前几位即可（唯一识别）

# 批量操作
docker stop $(docker ps -q)                   # 停止所有运行中的容器
docker rm $(docker ps -aq)                    # 删除所有容器
docker rmi $(docker images -q)                # 删除所有镜像

# 使用容器名称
docker run -d --name web nginx                # 创建时命名
docker stop web                               # 使用名称操作
docker logs web
docker exec -it web bash

# 查看命令帮助
docker --help                                 # Docker 总帮助
docker run --help                             # 特定命令帮助
docker ps --help</code></pre>
      </div>

      <div class="key-point">
        <h4>💡 命令记忆技巧</h4>
        <ul>
          <li><strong>镜像操作</strong>：<code>docker image</code> 或直接 <code>docker pull/push/rmi</code></li>
          <li><strong>容器操作</strong>：<code>docker container</code> 或直接 <code>docker run/ps/stop/rm</code></li>
          <li><strong>查看类</strong>：<code>ps</code>、<code>logs</code>、<code>inspect</code>、<code>top</code>、<code>stats</code></li>
          <li><strong>执行类</strong>：<code>run</code>、<code>exec</code>、<code>start</code>、<code>stop</code></li>
          <li><strong>清理类</strong>：<code>rm</code>、<code>rmi</code>、<code>prune</code></li>
        </ul>
      </div>
    </section>

    <section id="practice">
      <h2>六、动手练习</h2>
      
      <div class="practice-box">
        <h3>练习 1：运行 Python 容器</h3>
        <p><strong>任务：</strong>运行一个 Python 3.11 容器，执行简单 Python 代码</p>
        <pre><code># 步骤
1. docker run -it python:3.11 bash
2. 在容器内执行：python --version
3. 运行 Python 代码：python -c "print('Hello from Container!')"
4. 退出容器</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 2：运行 Node.js 应用</h3>
        <p><strong>任务：</strong>运行一个简单的 Node.js HTTP 服务器</p>
        <pre><code># 运行 Node.js 容器
docker run -d -p 3000:3000 node:18 \
  node -e "require('http').createServer((req,res) => \
  res.end('Hello from Node.js Container!')).listen(3000)"

# 测试：浏览器访问 http://localhost:3000</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 3：容器管理综合操作</h3>
        <pre><code># 1. 启动 3 个 Nginx 容器，映射到不同端口
docker run -d -p 8081:80 --name web1 nginx
docker run -d -p 8082:80 --name web2 nginx
docker run -d -p 8083:80 --name web3 nginx

# 2. 查看所有容器
docker ps

# 3. 停止 web2
docker stop web2

# 4. 再次查看容器状态
docker ps -a

# 5. 删除所有容器
docker stop web1 web3
docker rm web1 web2 web3</code></pre>
      </div>
    </section>

    <section id="summary">
      <h2>📝 课程小结</h2>
      
      <div class="summary-box">
        <h3>核心知识点</h3>
        <ul class="checklist">
          <li>✅ 理解软件部署的痛点：环境不一致、依赖冲突、配置复杂</li>
          <li>✅ 容器 vs 虚拟机：轻量级、秒级启动、进程级隔离</li>
          <li>✅ Docker 安装：Windows (WSL 2)、Mac、Linux 三平台</li>
          <li>✅ 基础命令：<code>docker run</code>、<code>docker ps</code>、<code>docker stop</code></li>
          <li>✅ 常用参数：<code>-d</code> 后台运行、<code>-p</code> 端口映射、<code>-it</code> 交互式</li>
        </ul>

        <h3>关键命令回顾</h3>
        <pre><code># 核心三件套
docker run hello-world        # 运行容器
docker ps                      # 查看容器
docker stop &lt;容器ID&gt;          # 停止容器

# 进阶操作
docker run -d -p 8080:80 nginx    # 后台运行 + 端口映射
docker run -it ubuntu bash        # 交互式进入容器
docker exec -it &lt;容器ID&gt; bash    # 进入运行中的容器</code></pre>

        <h3>🎯 下节预告</h3>
        <p>第2讲将深入学习 <strong>镜像与容器</strong> 的概念：</p>
        <ul>
          <li>镜像是什么？从哪里来？</li>
          <li>Docker Hub 镜像仓库使用</li>
          <li>容器的生命周期管理</li>
          <li>容器与镜像的关系</li>
        </ul>
      </div>
    </section>

    <div class="navigation-buttons">
      <router-link to="/" class="nav-btn prev">← 返回首页</router-link>
      <router-link to="/lecture-2" class="nav-btn next">下一讲：镜像与容器 →</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LectureSidebar from '@/components/LectureSidebar.vue'

const sections = ref([
  { id: 'intro', title: '👋 课程目标' },
  { id: 'chapter-1', title: '一、软件部署的经典痛点', level: 1 },
  { id: 'chapter-2', title: '二、容器技术横空出世', level: 1 },
  { id: 'chapter-3', title: '三、Docker 环境安装', level: 1 },
  { id: 'chapter-4', title: '四、第一个容器：Hello World', level: 1 },
  { id: 'chapter-5', title: '五、基础命令速览', level: 1 },
  { id: 'practice', title: '六、动手练习', level: 1 },
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

  .back-button {
    @include button-secondary;
    text-decoration: none;
    padding: $spacing-md $spacing-lg;
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