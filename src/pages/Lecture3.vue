<template>
  <div class="lecture-page">
    <div class="page-container" :style="{ transform: `translateX(-${(currentPage - 1) * 100}%)` }">
      
      <!-- 封面页 -->
      <div class="page cover-page">
        <div class="cover-content">
          <div class="course-badge">🐳 Docker & Kubernetes 实战课程</div>
          <h1 class="main-title">第3课时</h1>
          <h2 class="sub-title">Docker核心命令（下）</h2>
          <p class="tagline">数据持久化与容器卷</p>
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
              <div class="goal-icon">💾</div>
              <div class="goal-content">
                <h3>理解容器数据丢失问题</h3>
                <p>容器删除后数据默认不保留</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">📁</div>
              <div class="goal-content">
                <h3>掌握数据卷三种挂载方式</h3>
                <p>宿主机目录、匿名卷、命名卷</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔒</div>
              <div class="goal-content">
                <h3>理解读写权限控制</h3>
                <p>rw/ro模式区别</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔄</div>
              <div class="goal-content">
                <h3>掌握数据卷共享</h3>
                <p>多个容器共享同一数据卷</p>
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
              <div class="schedule-time">35分钟</div>
              <div class="schedule-type">理论讲解</div>
              <div class="schedule-desc">数据卷概念、挂载方式、权限控制</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">45分钟</div>
              <div class="schedule-type">实操演示</div>
              <div class="schedule-desc">MySQL持久化、数据卷共享</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">10分钟</div>
              <div class="schedule-type">随堂练习</div>
              <div class="schedule-desc">Redis持久化配置</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 1 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 1</span>
          <h1 class="section-title">容器数据丢失问题</h1>
          <p class="section-desc">为什么需要数据持久化？</p>
        </div>
      </div>

      <!-- 问题演示 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.1</span>
          <h1 class="page-title">问题演示：容器数据丢失</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">创建文件后删除容器</span>
            </div>
            <pre><code># 1. 启动容器并创建文件
docker run -it --name test centos:7 /bin/bash
echo "hello" > /tmp/test.txt
exit

# 2. 重新启动容器查看文件
docker start -i test
cat /tmp/test.txt  # 文件存在

# 3. 删除容器后重新创建
docker rm -f test
docker run -it --name test2 centos:7 /bin/bash
cat /tmp/test.txt  # 文件不存在！</code></pre>
          </div>
          <div class="warning-box">
            <div class="warning-title">⚠️ 核心问题</div>
            <p>容器删除后，容器内的所有数据都会丢失！这对于数据库等需要持久化数据的应用是致命的。</p>
          </div>
        </div>
      </div>

      <!-- 解决方案 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.2</span>
          <h1 class="page-title">解决方案：数据卷</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">数据卷 Volume</div>
            <div class="definition-content">
              数据卷是一个可供容器使用的特殊目录，它绕过容器的文件系统，直接存在于宿主机上。即使容器被删除，数据卷中的数据也不会丢失。
            </div>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">✅ 数据卷的优势</div>
            <div class="highlight-content">
              <p>• 数据持久化：容器删除后数据不丢失</p>
              <p>• 数据共享：多个容器可以共享同一数据卷</p>
              <p>• 数据备份：可以直接在宿主机上备份数据</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 2 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 2</span>
          <h1 class="section-title">数据卷三种挂载方式</h1>
          <p class="section-desc">掌握不同的数据挂载场景</p>
        </div>
      </div>

      <!-- 三种方式概览 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.1</span>
          <h1 class="page-title">三种挂载方式概览</h1>
        </div>
        <div class="page-body">
          <div class="three-column">
            <div class="concept-preview">
              <div class="concept-num">01</div>
              <div class="concept-icon">📂</div>
              <h3>宿主机目录挂载</h3>
              <p>-v /host:/container</p>
            </div>
            <div class="concept-preview">
              <div class="concept-num">02</div>
              <div class="concept-icon">📦</div>
              <h3>匿名卷</h3>
              <p>-v /container</p>
            </div>
            <div class="concept-preview">
              <div class="concept-num">03</div>
              <div class="concept-icon">🏷️</div>
              <h3>命名卷</h3>
              <p>-v name:/container</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 宿主机目录挂载 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.2</span>
          <h1 class="page-title">方式一：宿主机目录挂载</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">挂载宿主机目录</span>
            </div>
            <pre><code># 将宿主机/opt/data挂载到容器/app/data
docker run -it -v /opt/data:/app/data centos:7 /bin/bash

# 在容器内创建文件
echo "test" > /app/data/test.txt

# 在宿主机查看
cat /opt/data/test.txt  # 文件存在！</code></pre>
          </div>
          <div class="term-box">
            <div class="term-title">📚 语法说明</div>
            <p><strong>-v 宿主机路径:容器路径</strong>：将宿主机的指定目录挂载到容器内的指定路径。两边目录会实时同步。</p>
          </div>
        </div>
      </div>

      <!-- 匿名卷 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.3</span>
          <h1 class="page-title">方式二：匿名卷</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">创建匿名卷</span>
            </div>
            <pre><code># 创建匿名卷
docker run -it -v /app/data centos:7 /bin/bash

# 查看卷信息
docker inspect 容器ID | grep -A 10 Mounts</code></pre>
          </div>
          <div class="highlight-box info">
            <div class="highlight-title">💡 匿名卷特点</div>
            <div class="highlight-content">
              <p>• Docker自动在/var/lib/docker/volumes下创建目录</p>
              <p>• 没有明确的名称，只有一串随机ID</p>
              <p>• 适合临时数据存储</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 命名卷 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.4</span>
          <h1 class="page-title">方式三：命名卷</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">创建和使用命名卷</span>
            </div>
            <pre><code># 创建命名卷
docker volume create mydata

# 使用命名卷
docker run -it -v mydata:/app/data centos:7 /bin/bash

# 查看所有卷
docker volume ls

# 查看卷详情
docker volume inspect mydata</code></pre>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">✅ 命名卷优势</div>
            <div class="highlight-content">
              <p>• 有明确的名称，便于管理</p>
              <p>• 可以在多个容器间共享</p>
              <p>• 易于备份和迁移</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 三种方式对比 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.5</span>
          <h1 class="page-title">三种挂载方式对比</h1>
        </div>
        <div class="page-body">
          <table class="compare-table full-width">
            <thead>
              <tr>
                <th>方式</th>
                <th>语法</th>
                <th>特点</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>宿主机目录</td>
                <td>-v /host:/container</td>
                <td class="success">灵活可控</td>
                <td>开发环境、配置文件</td>
              </tr>
              <tr>
                <td>匿名卷</td>
                <td>-v /container</td>
                <td>自动管理</td>
                <td>临时数据</td>
              </tr>
              <tr>
                <td>命名卷</td>
                <td>-v name:/container</td>
                <td class="success">易于管理</td>
                <td>生产环境、数据共享</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Part 3 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 3</span>
          <h1 class="section-title">读写权限控制</h1>
          <p class="section-desc">rw/ro模式区别</p>
        </div>
      </div>

      <!-- 权限控制 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.1</span>
          <h1 class="page-title">读写权限控制</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">权限设置</span>
            </div>
            <pre><code># 默认读写模式(rw)
docker run -v /opt/data:/app centos:7

# 只读模式(ro)
docker run -v /opt/data:/app:ro centos:7

# 容器内无法写入只读挂载的目录
echo "test" > /app/test.txt  # 报错！</code></pre>
          </div>
          <div class="param-list">
            <div class="param-item">
              <span class="param-name">rw</span>
              <span class="param-desc">读写模式（默认），容器可以读写挂载目录</span>
            </div>
            <div class="param-item">
              <span class="param-name">ro</span>
              <span class="param-desc">只读模式，容器只能读取，不能写入</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 4 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 4</span>
          <h1 class="section-title">实操环节</h1>
          <p class="section-desc">MySQL数据持久化与数据卷共享</p>
        </div>
      </div>

      <!-- MySQL持久化 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.1</span>
          <h1 class="page-title">实操：MySQL数据持久化</h1>
        </div>
        <div class="page-body">
          <div class="install-step">
            <div class="step-number">Step 1</div>
            <div class="step-content">
              <h4>启动MySQL并挂载数据卷</h4>
              <div class="code-block">
                <pre><code>docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v /opt/mysql/data:/var/lib/mysql \
  -v /opt/mysql/conf:/etc/mysql/conf.d \
  mysql:5.7</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 2</div>
            <div class="step-content">
              <h4>创建测试数据</h4>
              <div class="code-block">
                <pre><code># 进入MySQL容器
docker exec -it mysql mysql -uroot -p123456

# 创建数据库和表
CREATE DATABASE testdb;
USE testdb;
CREATE TABLE users (id INT, name VARCHAR(50));
INSERT INTO users VALUES (1, 'docker');
SELECT * FROM users;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 验证持久化 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.2</span>
          <h1 class="page-title">验证数据持久化</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">删除容器后验证数据</span>
            </div>
            <pre><code># 删除容器
docker rm -f mysql

# 重新启动MySQL
docker run -d \
  --name mysql2 \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v /opt/mysql/data:/var/lib/mysql \
  mysql:5.7

# 验证数据
docker exec -it mysql2 mysql -uroot -p123456
USE testdb;
SELECT * FROM users;  # 数据还在！</code></pre>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">✅ 验证成功</div>
            <div class="highlight-content">
              即使删除容器，数据仍然保存在宿主机的挂载目录中，重新启动容器后数据自动恢复。
            </div>
          </div>
        </div>
      </div>

      <!-- 数据卷共享 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.3</span>
          <h1 class="page-title">实操：数据卷共享</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">两个容器共享同一数据卷</span>
            </div>
            <pre><code># 创建共享数据卷
docker volume create shared-data

# 启动容器1
docker run -it --name c1 -v shared-data:/data centos:7

# 在容器1中创建文件
echo "from c1" > /data/share.txt

# 启动容器2
docker run -it --name c2 -v shared-data:/data centos:7

# 在容器2中查看文件
cat /data/share.txt  # 输出：from c1</code></pre>
          </div>
          <div class="tip-box">
            <div class="tip-title">💡 使用场景</div>
            <p>多个容器需要访问同一份数据，如Web服务器集群共享静态文件。</p>
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
                <h3>创建Redis配置文件</h3>
                <p>开启持久化、设置密码</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">2</div>
              <div class="task-content">
                <h3>启动Redis并挂载配置</h3>
                <p>命令：<code>docker run -d -v /opt/redis/redis.conf:/etc/redis/redis.conf redis</code></p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">3</div>
              <div class="task-content">
                <h3>验证配置生效</h3>
                <p>使用redis-cli验证密码和持久化</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">4</div>
              <div class="task-content">
                <h3>验证数据持久化</h3>
                <p>删除容器后重启，验证数据不丢失</p>
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
              <div class="summary-text">理解容器数据丢失问题：容器删除数据丢失</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">掌握三种挂载方式：宿主机目录、匿名卷、命名卷</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">理解权限控制：rw读写/ro只读</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">完成MySQL数据持久化实战</div>
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
            <h3>📚 第4课时：Docker镜像进阶</h3>
            <ul>
              <li>镜像分层原理</li>
              <li>docker commit制作镜像</li>
              <li>Dockerfile核心指令</li>
              <li>CMD与ENTRYPOINT区别</li>
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
const totalPages = 22

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
