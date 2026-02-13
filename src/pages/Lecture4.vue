<template>
  <div class="lecture-page">
    <div class="page-container" :style="{ transform: `translateX(-${(currentPage - 1) * 100}%)` }">
      
      <!-- 封面页 -->
      <div class="page cover-page">
        <div class="cover-content">
          <div class="course-badge">🐳 Docker & Kubernetes 实战课程</div>
          <h1 class="main-title">第4课时</h1>
          <h2 class="sub-title">Docker镜像进阶</h2>
          <p class="tagline">自定义镜像与Dockerfile</p>
          <div class="meta-info">
            <span>📚 90分钟</span>
            <span>🎯 理论+实操</span>
            <span>📊 进阶级</span>
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
              <div class="goal-icon">📚</div>
              <div class="goal-content">
                <h3>理解镜像分层原理</h3>
                <p>UnionFS联合文件系统</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔧</div>
              <div class="goal-content">
                <h3>掌握docker commit</h3>
                <p>手动制作镜像</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">📝</div>
              <div class="goal-content">
                <h3>掌握Dockerfile核心指令</h3>
                <p>FROM/RUN/COPY/EXPOSE/CMD</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">⚙️</div>
              <div class="goal-content">
                <h3>理解CMD与ENTRYPOINT</h3>
                <p>参数覆盖与传递</p>
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
              <div class="schedule-desc">镜像分层、Dockerfile指令</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">40分钟</div>
              <div class="schedule-type">实操演示</div>
              <div class="schedule-desc">commit、Dockerfile构建镜像</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">10分钟</div>
              <div class="schedule-type">随堂练习</div>
              <div class="schedule-desc">构建带ifconfig的Ubuntu镜像</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 1 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 1</span>
          <h1 class="section-title">镜像分层原理</h1>
          <p class="section-desc">理解Docker镜像的存储机制</p>
        </div>
      </div>

      <!-- UnionFS -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.1</span>
          <h1 class="page-title">UnionFS联合文件系统</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">UnionFS</div>
            <div class="definition-content">
              联合文件系统（Union File System）是一种分层、轻量级的高性能文件系统。它将多个目录挂载到同一个目录下，对外呈现一个统一的文件系统。
            </div>
          </div>
          <div class="arch-diagram">
            <div class="arch-layer app">应用层（可读写）</div>
            <div class="arch-layer docker">依赖库层（只读）</div>
            <div class="arch-layer os">基础系统层（只读）</div>
            <div class="arch-layer host">引导层（只读）</div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：分层存储</div>
            <p>镜像由多个只读层组成，每层代表Dockerfile中的一条指令。容器在镜像之上添加一个可写层，所有修改都在这一层进行。</p>
          </div>
        </div>
      </div>

      <!-- Copy-on-Write -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.2</span>
          <h1 class="page-title">Copy-on-Write机制</h1>
        </div>
        <div class="page-body">
          <div class="highlight-box info">
            <div class="highlight-title">💡 写时复制原理</div>
            <div class="highlight-content">
              <p><strong>读取</strong>：直接从镜像层读取文件</p>
              <p><strong>修改</strong>：先将文件复制到容器层，再修改</p>
              <p><strong>删除</strong>：在容器层标记文件已删除</p>
            </div>
          </div>
          <div class="example-box">
            <div class="example-title">示例：修改/etc/hosts</div>
            <p class="paragraph">容器启动时，/etc/hosts来自镜像层。当容器修改hosts文件时，Docker会将文件复制到容器的可写层，修改的是副本而非原文件。</p>
          </div>
        </div>
      </div>

      <!-- 镜像分层优势 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.3</span>
          <h1 class="page-title">镜像分层的优势</h1>
        </div>
        <div class="page-body">
          <div class="pain-points-grid">
            <div class="pain-point-card" style="border-color: #bbf7d0;">
              <div class="pain-icon">💾</div>
              <h3>节省存储空间</h3>
              <p>相同的基础层只存储一份</p>
            </div>
            <div class="pain-point-card" style="border-color: #bbf7d0;">
              <div class="pain-icon">🚀</div>
              <h3>加速构建</h3>
              <p>利用缓存，只重建变化的层</p>
            </div>
            <div class="pain-point-card" style="border-color: #bbf7d0;">
              <div class="pain-icon">📦</div>
              <h3>快速分发</h3>
              <p>只传输差异层</p>
            </div>
            <div class="pain-point-card" style="border-color: #bbf7d0;">
              <div class="pain-icon">🔒</div>
              <h3>安全性</h3>
              <p>基础层只读，不可篡改</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 2 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 2</span>
          <h1 class="section-title">docker commit制作镜像</h1>
          <p class="section-desc">手动方式创建自定义镜像</p>
        </div>
      </div>

      <!-- docker commit -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.1</span>
          <h1 class="page-title">docker commit命令</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">基本语法</span>
            </div>
            <pre><code>docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]

# 常用选项
-a, --author    # 作者信息
-m, --message   # 提交说明</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">示例</span>
            </div>
            <pre><code># 基于容器创建镜像
docker commit -a "zhangsan" -m "add vim" mycentos mycentos:vim</code></pre>
          </div>
        </div>
      </div>

      <!-- commit实操 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.2</span>
          <h1 class="page-title">实操：制作带vim的CentOS镜像</h1>
        </div>
        <div class="page-body">
          <div class="install-step">
            <div class="step-number">Step 1</div>
            <div class="step-content">
              <h4>启动容器并安装vim</h4>
              <div class="code-block">
                <pre><code>docker run -it --name mycentos centos:7 /bin/bash
yum install -y vim
exit</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 2</div>
            <div class="step-content">
              <h4>提交为新镜像</h4>
              <div class="code-block">
                <pre><code>docker commit -m "add vim" -a "student" mycentos centos-vim:v1</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 3</div>
            <div class="step-content">
              <h4>验证新镜像</h4>
              <div class="code-block">
                <pre><code>docker run -it centos-vim:v1 vim --version</code></pre>
              </div>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">预期输出结果</span>
                </div>
                <pre><code>VIM - Vi IMproved 8.0 (2016 Sep 12, compiled ...)
Included patches: 1-... 
Compiled by ...
Huge version without GUI.
...
</code></pre>
              </div>
              <div class="highlight-box success">
                <div class="highlight-title">✅ 验证要点</div>
                <div class="highlight-content">
                  <ul>
                    <li>显示 VIM 版本信息表示 vim 安装成功</li>
                    <li>版本号应为 8.0 或更高</li>
                    <li>无 "command not found" 错误</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 3 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 3</span>
          <h1 class="section-title">Dockerfile核心指令</h1>
          <p class="section-desc">自动化构建镜像</p>
        </div>
      </div>

      <!-- Dockerfile概览 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.1</span>
          <h1 class="page-title">Dockerfile是什么？</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">Dockerfile</div>
            <div class="definition-content">
              Dockerfile是一个文本文件，包含了一系列指令，用于自动化构建Docker镜像。每条指令都会创建一个新的镜像层。
            </div>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">基本结构示例</span>
            </div>
            <pre><code>FROM centos:7
RUN yum install -y vim
COPY app.py /app/
WORKDIR /app
EXPOSE 8080
CMD ["python", "app.py"]</code></pre>
          </div>
        </div>
      </div>

      <!-- FROM指令 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.2</span>
          <h1 class="page-title">FROM - 指定基础镜像</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">FROM指令</span>
            </div>
            <pre><code># 指定基础镜像
FROM centos:7

# 使用最新版
FROM ubuntu

# 使用多阶段构建
FROM node:18 AS builder
FROM nginx:alpine</code></pre>
          </div>
          <div class="tip-box">
            <div class="tip-title">💡 最佳实践</div>
            <p>始终使用明确的版本标签，避免使用latest，确保构建的可重复性。</p>
          </div>
        </div>
      </div>

      <!-- RUN指令 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.3</span>
          <h1 class="page-title">RUN - 执行命令</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">RUN指令两种形式</span>
            </div>
            <pre><code># shell形式
RUN yum install -y vim

# exec形式（推荐）
RUN ["yum", "install", "-y", "vim"]

# 合并多条命令减少层数
RUN yum update && yum install -y \
    vim \
    net-tools \
    && yum clean all</code></pre>
          </div>
          <div class="warning-box">
            <div class="warning-title">⚠️ 注意</div>
            <p>每个RUN指令都会创建一个新层，应尽量合并相关命令以减少镜像层数。</p>
          </div>
        </div>
      </div>

      <!-- COPY/ADD指令 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.4</span>
          <h1 class="page-title">COPY与ADD - 复制文件</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">复制文件</span>
            </div>
            <pre><code># COPY：复制文件或目录
COPY app.py /app/
COPY src/ /app/src/

# ADD：支持URL和自动解压tar
ADD https://example.com/file.tar.gz /tmp/
ADD jdk-8u301-linux-x64.tar.gz /usr/local/</code></pre>
          </div>
          <div class="example-box">
            <div class="example-title">💡 COPY vs ADD</div>
            <table class="compare-table">
              <thead>
                <tr>
                  <th>特性</th>
                  <th>COPY</th>
                  <th>ADD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>复制本地文件</td>
                  <td class="success">✓</td>
                  <td class="success">✓</td>
                </tr>
                <tr>
                  <td>支持URL</td>
                  <td>✗</td>
                  <td class="success">✓</td>
                </tr>
                <tr>
                  <td>自动解压tar</td>
                  <td>✗</td>
                  <td class="success">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- WORKDIR/ENV/EXPOSE -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.5</span>
          <h1 class="page-title">其他常用指令</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">WORKDIR/ENV/EXPOSE</span>
            </div>
            <pre><code># 设置工作目录
WORKDIR /app

# 设置环境变量
ENV JAVA_HOME=/usr/local/jdk8
ENV PATH=$PATH:$JAVA_HOME/bin

# 声明暴露端口
EXPOSE 8080
EXPOSE 443</code></pre>
          </div>
          <div class="param-list">
            <div class="param-item">
              <span class="param-name">WORKDIR</span>
              <span class="param-desc">设置工作目录，类似cd命令</span>
            </div>
            <div class="param-item">
              <span class="param-name">ENV</span>
              <span class="param-desc">设置环境变量，后续指令可用</span>
            </div>
            <div class="param-item">
              <span class="param-name">EXPOSE</span>
              <span class="param-desc">声明端口，不会实际发布端口</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 4 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 4</span>
          <h1 class="section-title">CMD与ENTRYPOINT</h1>
          <p class="section-desc">理解容器启动命令的区别</p>
        </div>
      </div>

      <!-- CMD指令 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.1</span>
          <h1 class="page-title">CMD指令</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">CMD三种形式</span>
            </div>
            <pre><code># exec形式（推荐）
CMD ["nginx", "-g", "daemon off;"]

# shell形式
CMD nginx -g "daemon off;"

# 作为ENTRYPOINT的默认参数
CMD ["--port", "8080"]</code></pre>
          </div>
          <div class="highlight-box warning">
            <div class="highlight-title">⚠️ CMD特点</div>
            <div class="highlight-content">
              <p>• Dockerfile中只能有一条CMD指令</p>
              <p>• docker run时指定的命令会覆盖CMD</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ENTRYPOINT指令 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.2</span>
          <h1 class="page-title">ENTRYPOINT指令</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">ENTRYPOINT</span>
            </div>
            <pre><code># exec形式
ENTRYPOINT ["java", "-jar", "app.jar"]

# docker run时追加参数
docker run myimage --server.port=8080
# 实际执行：java -jar app.jar --server.port=8080</code></pre>
          </div>
          <div class="highlight-box info">
            <div class="highlight-title">💡 ENTRYPOINT特点</div>
            <div class="highlight-content">
              <p>• docker run的参数会追加到ENTRYPOINT后</p>
              <p>• 适合作为容器的主命令</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CMD vs ENTRYPOINT -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.3</span>
          <h1 class="page-title">CMD vs ENTRYPOINT对比</h1>
        </div>
        <div class="page-body">
          <table class="compare-table full-width">
            <thead>
              <tr>
                <th>特性</th>
                <th>CMD</th>
                <th>ENTRYPOINT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>docker run参数</td>
                <td>覆盖整个CMD</td>
                <td class="success">追加到后面</td>
              </tr>
              <tr>
                <td>用途</td>
                <td>默认命令</td>
                <td class="success">固定主命令</td>
              </tr>
              <tr>
                <td>数量</td>
                <td>只能一个</td>
                <td class="success">只能一个</td>
              </tr>
              <tr>
                <td>组合使用</td>
                <td colspan="2" class="success">CMD作为ENTRYPOINT的默认参数</td>
              </tr>
            </tbody>
          </table>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">组合使用示例</span>
            </div>
            <pre><code>ENTRYPOINT ["java", "-jar", "app.jar"]
CMD ["--server.port=8080"]

# docker run myimage --server.port=9090
# 实际执行：java -jar app.jar --server.port=9090</code></pre>
          </div>
        </div>
      </div>

      <!-- Part 5 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 5</span>
          <h1 class="section-title">实操环节</h1>
          <p class="section-desc">动手构建自定义镜像</p>
        </div>
      </div>

      <!-- 实操1 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 5.1</span>
          <h1 class="page-title">实操：构建自定义Nginx镜像</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">创建Dockerfile</span>
            </div>
            <pre><code># Dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">构建并运行</span>
            </div>
            <pre><code># 构建镜像
docker build -t mynginx:v1 .

# 运行容器
docker run -d -p 8080:80 mynginx:v1</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">预期输出结果 - 构建过程</span>
            </div>
            <pre><code>[+] Building 3.2s (7/7) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 142B
 => [internal] load .dockerignore
 => => transferring context: 2B
 => [internal] load metadata for docker.io/library/nginx:alpine
 => [1/2] FROM docker.io/library/nginx:alpine
 => [2/2] COPY index.html /usr/share/nginx/html/
 => exporting to image
 => => exporting layers
 => => writing image sha256:abc123...
 => => naming to docker.io/library/mynginx:v1</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">预期输出结果 - 运行验证</span>
            </div>
            <pre><code># 查看运行中的容器
$ docker ps

CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS                  NAMES
a1b2c3d4e5f6   mynginx:v1   "/docker-entrypoint.…"   5 seconds ago   Up 4 seconds   0.0.0.0:8080->80/tcp   nostalgic_einstein</code></pre>
          </div>
          <div class="highlight-box info">
            <div class="highlight-title">🔍 验证要点</div>
            <div class="highlight-content">
              <ul>
                <li>构建过程显示 <code>FINISHED</code> 表示成功</li>
                <li><code>docker ps</code> 显示容器 STATUS 为 "Up"</li>
                <li>PORTS 列显示 <code>0.0.0.0:8080->80/tcp</code> 映射正确</li>
                <li>浏览器访问 <code>http://localhost:8080</code> 显示自定义页面</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 实操2 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 5.2</span>
          <h1 class="page-title">实操：构建带JDK8的镜像</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">Dockerfile</span>
            </div>
            <pre><code>FROM centos:7
WORKDIR /usr/local
ADD jdk-8u301-linux-x64.tar.gz /usr/local/
ENV JAVA_HOME=/usr/local/jdk1.8.0_301
ENV PATH=$PATH:$JAVA_HOME/bin
CMD ["java", "-version"]</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">构建并验证</span>
            </div>
            <pre><code>docker build -t myjdk8:v1 .
docker run myjdk8:v1</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">预期输出结果</span>
            </div>
            <pre><code># 构建过程
[+] Building 15.2s (8/8) FINISHED
 => [1/4] FROM docker.io/library/centos:7
 => [2/4] WORKDIR /usr/local
 => [3/4] ADD jdk-8u301-linux-x64.tar.gz /usr/local/
 => [4/4] ENV JAVA_HOME=/usr/local/jdk1.8.0_301
 => exporting to image
 => => naming to docker.io/library/myjdk8:v1

# 运行验证 - Java版本输出
$ docker run myjdk8:v1

java version "1.8.0_301"
Java(TM) SE Runtime Environment (build 1.8.0_301-b09)
Java HotSpot(TM) 64-Bit Server VM (build 25.301-b09, mixed mode)</code></pre>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">✅ 验证要点</div>
            <div class="highlight-content">
              <ul>
                <li>构建完成显示 <code>FINISHED</code> 且无明显错误</li>
                <li>Java 版本输出显示 "1.8.0_xxx"</li>
                <li>包含 Runtime Environment 和 VM 信息</li>
                <li>无 "java: command not found" 错误</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 6 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 6</span>
          <h1 class="section-title">随堂练习</h1>
          <p class="section-desc">巩固所学知识</p>
        </div>
      </div>

      <!-- 练习任务 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 6</span>
          <h1 class="page-title">练习任务（10分钟）</h1>
        </div>
        <div class="page-body">
          <div class="exercise-tasks">
            <div class="exercise-task">
              <div class="task-number">1</div>
              <div class="task-content">
                <h3>编写Dockerfile</h3>
                <p>构建一个带ifconfig命令的Ubuntu镜像</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">2</div>
              <div class="task-content">
                <h3>构建镜像</h3>
                <p>命令：<code>docker build -t myubuntu:v1 .</code></p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">3</div>
              <div class="task-content">
                <h3>验证镜像</h3>
                <p>运行容器并执行ifconfig命令</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">4</div>
              <div class="task-content">
                <h3>提交截图</h3>
                <p>Dockerfile内容和ifconfig输出</p>
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
              <div class="summary-text">镜像分层原理：UnionFS、Copy-on-Write</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">docker commit手动制作镜像</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">Dockerfile核心指令：FROM/RUN/COPY/EXPOSE</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">CMD与ENTRYPOINT区别与组合使用</div>
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
            <h3>📚 第5课时：Docker镜像仓库</h3>
            <ul>
              <li>镜像仓库分类</li>
              <li>私有仓库搭建</li>
              <li>阿里云镜像服务</li>
              <li>镜像安全最佳实践</li>
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
const totalPages = 26

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
