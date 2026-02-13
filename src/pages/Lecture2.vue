<template>
  <div class="lecture-page">
    <div class="page-container" :style="{ transform: `translateX(-${(currentPage - 1) * 100}%)` }">
      
      <!-- 封面页 -->
      <div class="page cover-page">
        <div class="cover-content">
          <div class="course-badge">🐳 Docker & Kubernetes 实战课程</div>
          <h1 class="main-title">第2课时</h1>
          <h2 class="sub-title">Docker核心命令（上）</h2>
          <p class="tagline">镜像与容器基础操作</p>
          <div class="meta-info">
            <span>📚 90分钟</span>
            <span>🎯 理论+实操</span>
            <span>📊 入门级</span>
          </div>
        </div>
      </div>

      <!-- 课程目标 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">01</span>
          <h1 class="page-title">课程目标</h1>
        </div>
        <div class="page-body">
          <div class="goal-list">
            <div class="goal-item">
              <div class="goal-icon">🖼️</div>
              <div class="goal-content">
                <h3>掌握镜像管理命令</h3>
                <p>images/pull/push/rmi/save/load</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">📦</div>
              <div class="goal-content">
                <h3>理解容器生命周期</h3>
                <p>新建、启动、停止、删除</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔧</div>
              <div class="goal-content">
                <h3>掌握容器交互方式</h3>
                <p>exec/attach区别与使用</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">⚙️</div>
              <div class="goal-content">
                <h3>理解关键参数</h3>
                <p>-it/-d/--name/-p/-P</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程安排 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">02</span>
          <h1 class="page-title">课程安排</h1>
        </div>
        <div class="page-body">
          <div class="schedule-grid">
            <div class="schedule-item">
              <div class="schedule-time">40分钟</div>
              <div class="schedule-type">理论讲解</div>
              <div class="schedule-desc">镜像管理、容器生命周期、关键参数</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">40分钟</div>
              <div class="schedule-type">实操演示</div>
              <div class="schedule-desc">镜像操作、容器操作、端口映射</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">10分钟</div>
              <div class="schedule-type">随堂练习</div>
              <div class="schedule-desc">Redis容器部署与验证</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 1 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 1</span>
          <h1 class="section-title">镜像管理命令</h1>
          <p class="section-desc">掌握Docker镜像的基本操作</p>
        </div>
      </div>

      <!-- 镜像管理概览 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.1</span>
          <h1 class="page-title">镜像管理命令概览</h1>
        </div>
        <div class="page-body">
          <table class="command-table">
            <thead>
              <tr>
                <th>命令</th>
                <th>说明</th>
                <th>示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>docker images</code></td>
                <td>列出本地镜像</td>
                <td>docker images</td>
              </tr>
              <tr>
                <td><code>docker pull</code></td>
                <td>拉取镜像</td>
                <td>docker pull nginx:latest</td>
              </tr>
              <tr>
                <td><code>docker push</code></td>
                <td>推送镜像</td>
                <td>docker push myimage:v1</td>
              </tr>
              <tr>
                <td><code>docker rmi</code></td>
                <td>删除镜像</td>
                <td>docker rmi nginx:latest</td>
              </tr>
              <tr>
                <td><code>docker save</code></td>
                <td>导出镜像</td>
                <td>docker save -o nginx.tar nginx</td>
              </tr>
              <tr>
                <td><code>docker load</code></td>
                <td>导入镜像</td>
                <td>docker load -i nginx.tar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- docker images -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.2</span>
          <h1 class="page-title">docker images - 查看本地镜像</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看本地镜像</span>
            </div>
            <pre><code>docker images

# 输出示例
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         latest    605c77e624dd   2 weeks ago    141MB
centos        7         eeb6ee3f44bd   3 months ago   204MB</code></pre>
          </div>
          <div class="param-list">
            <div class="param-item">
              <span class="param-name">REPOSITORY</span>
              <span class="param-desc">镜像名称（来源仓库）</span>
            </div>
            <div class="param-item">
              <span class="param-name">TAG</span>
              <span class="param-desc">镜像标签（版本号）</span>
            </div>
            <div class="param-item">
              <span class="param-name">IMAGE ID</span>
              <span class="param-desc">镜像唯一ID</span>
            </div>
            <div class="param-item">
              <span class="param-name">SIZE</span>
              <span class="param-desc">镜像大小</span>
            </div>
          </div>
        </div>
      </div>

      <!-- docker pull -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.3</span>
          <h1 class="page-title">docker pull - 拉取镜像</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">拉取镜像</span>
            </div>
            <pre><code># 拉取最新版本
docker pull nginx

# 拉取指定版本
docker pull nginx:1.21

# 拉取指定仓库的镜像
docker pull registry.cn-hangzhou.aliyuncs.com/myimage:v1</code></pre>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：镜像标签</div>
            <p><strong>Tag</strong>是镜像的版本标识。如nginx:1.21表示nginx镜像的1.21版本。不指定tag时默认使用latest（最新版）。</p>
          </div>
        </div>
      </div>

      <!-- docker rmi -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.4</span>
          <h1 class="page-title">docker rmi - 删除镜像</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">删除镜像</span>
            </div>
            <pre><code># 删除指定镜像
docker rmi nginx:latest

# 通过IMAGE ID删除
docker rmi 605c77e624dd

# 强制删除（即使有容器在使用）
docker rmi -f nginx:latest

# 删除所有未使用的镜像
docker image prune</code></pre>
          </div>
          <div class="warning-box">
            <div class="warning-title">⚠️ 注意</div>
            <p>删除镜像前，确保没有容器在使用该镜像，否则需要使用-f强制删除。</p>
          </div>
        </div>
      </div>

      <!-- docker save/load -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.5</span>
          <h1 class="page-title">docker save/load - 导出导入镜像</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">导出镜像为tar文件</span>
            </div>
            <pre><code>docker save -o nginx.tar nginx:latest</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">从tar文件导入镜像</span>
            </div>
            <pre><code>docker load -i nginx.tar</code></pre>
          </div>
          <div class="tip-box">
            <div class="tip-title">💡 使用场景</div>
            <p>在内网环境中，无法访问Docker Hub时，可以通过tar文件离线传输镜像。</p>
          </div>
        </div>
      </div>

      <!-- Part 2 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 2</span>
          <h1 class="section-title">容器生命周期管理</h1>
          <p class="section-desc">掌握容器的创建、启动、停止、删除</p>
        </div>
      </div>

      <!-- 容器生命周期概览 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.1</span>
          <h1 class="page-title">容器生命周期概览</h1>
        </div>
        <div class="page-body">
          <div class="flow-diagram">
            <div class="flow-node">镜像</div>
            <div class="flow-arrow">docker run →</div>
            <div class="flow-node highlight">运行中</div>
            <div class="flow-arrow">stop →</div>
            <div class="flow-node">已停止</div>
            <div class="flow-arrow">rm →</div>
            <div class="flow-node">删除</div>
          </div>
          <table class="command-table">
            <thead>
              <tr>
                <th>命令</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>docker run</code></td>
                <td>创建并启动容器</td>
              </tr>
              <tr>
                <td><code>docker start</code></td>
                <td>启动已停止的容器</td>
              </tr>
              <tr>
                <td><code>docker stop</code></td>
                <td>停止运行中的容器</td>
              </tr>
              <tr>
                <td><code>docker rm</code></td>
                <td>删除容器</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- docker run -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.2</span>
          <h1 class="page-title">docker run - 创建并启动容器</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">基本语法</span>
            </div>
            <pre><code>docker run [OPTIONS] IMAGE [COMMAND]</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">常用示例</span>
            </div>
            <pre><code># 交互式启动
docker run -it centos:7 /bin/bash

# 后台启动
docker run -d nginx

# 指定容器名称
docker run --name mynginx -d nginx

# 端口映射
docker run -d -p 8080:80 nginx</code></pre>
          </div>
        </div>
      </div>

      <!-- 关键参数 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.3</span>
          <h1 class="page-title">docker run 关键参数</h1>
        </div>
        <div class="page-body">
          <div class="param-list">
            <div class="param-item">
              <span class="param-name">-i</span>
              <span class="param-desc">保持STDIN打开，即使没有附加</span>
            </div>
            <div class="param-item">
              <span class="param-name">-t</span>
              <span class="param-desc">分配一个伪终端</span>
            </div>
            <div class="param-item">
              <span class="param-name">-d</span>
              <span class="param-desc">后台运行容器</span>
            </div>
            <div class="param-item">
              <span class="param-name">--name</span>
              <span class="param-desc">指定容器名称</span>
            </div>
            <div class="param-item">
              <span class="param-name">-p</span>
              <span class="param-desc">端口映射：主机端口:容器端口</span>
            </div>
            <div class="param-item">
              <span class="param-name">-P</span>
              <span class="param-desc">随机端口映射</span>
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">💡 -it 组合</div>
            <p><strong>-it</strong>是-i和-t的组合，通常一起使用来进入容器的交互式终端。就像远程登录到容器内部一样。</p>
          </div>
        </div>
      </div>

      <!-- 端口映射详解 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.4</span>
          <h1 class="page-title">端口映射详解</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">端口映射示例</span>
            </div>
            <pre><code># 将主机8080端口映射到容器80端口
docker run -d -p 8080:80 nginx

# 映射多个端口
docker run -d -p 8080:80 -p 443:443 nginx

# 指定IP地址
docker run -d -p 127.0.0.1:8080:80 nginx

# 随机端口映射
docker run -d -P nginx</code></pre>
          </div>
          <div class="highlight-box info">
            <div class="highlight-title">💡 端口映射原理</div>
            <div class="highlight-content">
              <p>容器内部运行的服务（如Nginx监听80端口）默认只能在容器内部访问。</p>
              <p>通过端口映射，将主机的端口与容器端口绑定，外部才能访问容器内的服务。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- docker start/stop -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.5</span>
          <h1 class="page-title">docker start/stop - 启动与停止</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">启动容器</span>
            </div>
            <pre><code># 启动已停止的容器
docker start mynginx

# 启动并附加
docker start -i mynginx</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">停止容器</span>
            </div>
            <pre><code># 优雅停止
docker stop mynginx

# 强制停止
docker kill mynginx</code></pre>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：优雅停止</div>
            <p><strong>优雅停止</strong>会先发送SIGTERM信号，给容器时间清理资源，等待10秒后强制停止。<strong>强制停止</strong>直接发送SIGKILL信号立即终止。</p>
          </div>
        </div>
      </div>

      <!-- docker rm -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.6</span>
          <h1 class="page-title">docker rm - 删除容器</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">删除容器</span>
            </div>
            <pre><code># 删除已停止的容器
docker rm mynginx

# 强制删除运行中的容器
docker rm -f mynginx

# 删除所有已停止的容器
docker container prune

# 删除所有容器
docker rm -f $(docker ps -aq)</code></pre>
          </div>
          <div class="warning-box">
            <div class="warning-title">⚠️ 注意</div>
            <p>删除容器后，容器内的数据也会丢失。需要持久化的数据请使用数据卷。</p>
          </div>
        </div>
      </div>

      <!-- Part 3 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 3</span>
          <h1 class="section-title">容器交互</h1>
          <p class="section-desc">进入容器与查看容器状态</p>
        </div>
      </div>

      <!-- docker ps -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.1</span>
          <h1 class="page-title">docker ps - 查看容器列表</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看容器</span>
            </div>
            <pre><code># 查看运行中的容器
docker ps

# 查看所有容器（包括已停止）
docker ps -a

# 只显示容器ID
docker ps -q</code></pre>
          </div>
          <table class="command-table">
            <thead>
              <tr>
                <th>字段</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CONTAINER ID</td>
                <td>容器ID</td>
              </tr>
              <tr>
                <td>IMAGE</td>
                <td>使用的镜像</td>
              </tr>
              <tr>
                <td>COMMAND</td>
                <td>启动命令</td>
              </tr>
              <tr>
                <td>STATUS</td>
                <td>状态（Up/Exited）</td>
              </tr>
              <tr>
                <td>PORTS</td>
                <td>端口映射</td>
              </tr>
              <tr>
                <td>NAMES</td>
                <td>容器名称</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- docker exec -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.2</span>
          <h1 class="page-title">docker exec - 在容器中执行命令</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">进入容器终端</span>
            </div>
            <pre><code># 进入容器的bash终端
docker exec -it mynginx /bin/bash

# 在容器中执行单条命令
docker exec mynginx ls /etc/nginx</code></pre>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">✅ 推荐使用</div>
            <div class="highlight-content">
              <strong>docker exec</strong>是最常用的进入容器的方式，不会影响容器的主进程，可以同时开启多个终端。
            </div>
          </div>
        </div>
      </div>

      <!-- docker attach -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.3</span>
          <h1 class="page-title">docker attach - 附加到容器</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">附加到容器</span>
            </div>
            <pre><code>docker attach mynginx</code></pre>
          </div>
          <div class="warning-box">
            <div class="warning-title">⚠️ 注意</div>
            <p>attach直接连接到容器的主进程，退出时（Ctrl+C）会导致容器停止！</p>
          </div>
          <div class="example-box">
            <div class="example-title">💡 exec vs attach 区别</div>
            <table class="compare-table">
              <thead>
                <tr>
                  <th>特性</th>
                  <th>exec</th>
                  <th>attach</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>创建新进程</td>
                  <td class="success">是</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>退出影响容器</td>
                  <td class="success">不影响</td>
                  <td>可能停止</td>
                </tr>
                <tr>
                  <td>多终端</td>
                  <td class="success">支持</td>
                  <td>共享同一终端</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- docker logs -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.4</span>
          <h1 class="page-title">docker logs - 查看容器日志</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看日志</span>
            </div>
            <pre><code># 查看所有日志
docker logs mynginx

# 实时跟踪日志
docker logs -f mynginx

# 查看最后100行
docker logs --tail 100 mynginx

# 查看指定时间后的日志
docker logs --since 2024-01-01 mynginx</code></pre>
          </div>
          <div class="tip-box">
            <div class="tip-title">💡 调试技巧</div>
            <p>容器启动失败时，使用docker logs查看错误信息是最有效的排查方法。</p>
          </div>
        </div>
      </div>

      <!-- docker inspect/top -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.5</span>
          <h1 class="page-title">docker inspect/top - 容器详情</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看容器详情</span>
            </div>
            <pre><code># 查看容器详细信息（JSON格式）
docker inspect mynginx

# 查看容器IP地址
docker inspect --format='{{.NetworkSettings.IPAddress}}' mynginx</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看容器进程</span>
            </div>
            <pre><code># 查看容器内运行的进程
docker top mynginx</code></pre>
          </div>
        </div>
      </div>

      <!-- Part 4 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 4</span>
          <h1 class="section-title">实操环节</h1>
          <p class="section-desc">动手实践镜像与容器操作</p>
        </div>
      </div>

      <!-- 实操1 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.1</span>
          <h1 class="page-title">实操：镜像操作</h1>
        </div>
        <div class="page-body">
          <div class="install-step">
            <div class="step-number">Step 1</div>
            <div class="step-content">
              <h4>拉取nginx和tomcat镜像</h4>
              <div class="code-block">
                <pre><code>docker pull nginx
docker pull tomcat:9</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 2</div>
            <div class="step-content">
              <h4>查看镜像分层</h4>
              <div class="code-block">
                <pre><code>docker history nginx</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 3</div>
            <div class="step-content">
              <h4>导出/导入镜像</h4>
              <div class="code-block">
                <pre><code>docker save -o nginx.tar nginx
docker rmi nginx
docker load -i nginx.tar</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实操2 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.2</span>
          <h1 class="page-title">实操：容器基础操作</h1>
        </div>
        <div class="page-body">
          <div class="install-step">
            <div class="step-number">Step 1</div>
            <div class="step-content">
              <h4>交互式启动CentOS并安装vim</h4>
              <div class="code-block">
                <pre><code>docker run -it --name mycentos centos:7 /bin/bash
# 进入容器后执行
yum install -y vim
exit</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 2</div>
            <div class="step-content">
              <h4>后台启动Nginx</h4>
              <div class="code-block">
                <pre><code>docker run -d --name mynginx -p 8080:80 nginx</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 3</div>
            <div class="step-content">
              <h4>浏览器验证</h4>
              <p class="paragraph">访问 http://localhost:8080 查看Nginx欢迎页面</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 实操3 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.3</span>
          <h1 class="page-title">实操：容器管理操作</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看容器日志和进程</span>
            </div>
            <pre><code># 查看日志
docker logs mynginx

# 查看进程
docker top mynginx

# 查看详情
docker inspect mynginx</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">端口映射练习</span>
            </div>
            <pre><code># 将容器80端口映射到主机8080
docker run -d --name nginx2 -p 8080:80 nginx

# 查看端口映射
docker port nginx2</code></pre>
          </div>
        </div>
      </div>

      <!-- Part 5 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 5</span>
          <h1 class="section-title">随堂练习</h1>
          <p class="section-desc">巩固所学知识</p>
        </div>
      </div>

      <!-- 练习任务 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 5</span>
          <h1 class="page-title">练习任务（10分钟）</h1>
        </div>
        <div class="page-body">
          <div class="exercise-tasks">
            <div class="exercise-task">
              <div class="task-number">1</div>
              <div class="task-content">
                <h3>拉取Redis镜像</h3>
                <p>命令：<code>docker pull redis</code></p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">2</div>
              <div class="task-content">
                <h3>后台启动Redis容器</h3>
                <p>命令：<code>docker run -d --name myredis -p 6379:6379 redis</code></p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">3</div>
              <div class="task-content">
                <h3>进入Redis执行命令</h3>
                <p>命令：<code>docker exec -it myredis redis-cli</code></p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">4</div>
              <div class="task-content">
                <h3>设置key-value</h3>
                <p>执行：<code>SET name docker</code> 和 <code>GET name</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程总结 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">总结</span>
          <h1 class="page-title">本课时小结</h1>
        </div>
        <div class="page-body">
          <div class="summary-grid">
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">镜像管理：images/pull/push/rmi/save/load</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">容器生命周期：run/start/stop/rm</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">容器交互：exec进入容器，logs查看日志</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">关键参数：-it交互/-d后台/-p端口映射</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 下节预告 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">预告</span>
          <h1 class="page-title">下节预告</h1>
        </div>
        <div class="page-body">
          <div class="next-lecture">
            <h3>📚 第3课时：Docker核心命令（下）</h3>
            <ul>
              <li>容器数据丢失问题</li>
              <li>数据卷三种挂载方式</li>
              <li>MySQL容器数据持久化</li>
              <li>数据卷共享</li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <!-- 页面导航 -->
    <div class="page-navigation">
      <button class="nav-btn prev" @click="prevPage" :disabled="currentPage === 1">
        ← 上一页
      </button>
      <div class="page-indicator">
        <span class="current">{{ currentPage }}</span>
        <span class="separator">/</span>
        <span class="total">{{ totalPages }}</span>
      </div>
      <button class="nav-btn next" @click="nextPage" :disabled="currentPage === totalPages">
        下一页 →
      </button>
    </div>

    <!-- 页面缩略图导航 -->
    <div class="page-thumbnails">
      <div 
        v-for="i in totalPages" 
        :key="i" 
        class="thumbnail" 
        :class="{ active: currentPage === i }"
        @click="goToPage(i)"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentPage = ref(1)
const totalPages = 28

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
    nextPage()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    prevPage()
  } else if (e.key === 'Home') {
    currentPage.value = 1
  } else if (e.key === 'End') {
    currentPage.value = totalPages
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
@import './styles/lecture-common.scss';
</style>
