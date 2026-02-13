<template>
  <div class="lecture-page">
    <div class="page-container" :style="{ transform: `translateX(-${(currentPage - 1) * 100}%)` }">
      
      <!-- 封面页 -->
      <div class="page cover-page">
        <div class="cover-content">
          <div class="course-badge">🐳 Docker & Kubernetes 实战课程</div>
          <h1 class="main-title">第8课时</h1>
          <h2 class="sub-title">Docker网络原理</h2>
          <p class="tagline">容器网络模型与通信机制</p>
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
                <h3>理解Docker网络模型</h3>
                <p>CNM网络模型</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔧</div>
              <div class="goal-content">
                <h3>掌握网络类型</h3>
                <p>Bridge/Host/None/Overlay</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔗</div>
              <div class="goal-content">
                <h3>理解容器通信</h3>
                <p>容器间通信原理</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🌐</div>
              <div class="goal-content">
                <h3>自定义网络</h3>
                <p>网络创建与配置</p>
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
              <div class="schedule-desc">网络模型、网络类型</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">35分钟</div>
              <div class="schedule-type">实操演示</div>
              <div class="schedule-desc">网络创建、容器通信</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">15分钟</div>
              <div class="schedule-type">练习与总结</div>
              <div class="schedule-desc">网络问题排查</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 1 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 1</span>
          <h1 class="section-title">Docker网络模型</h1>
          <p class="section-desc">理解容器网络架构</p>
        </div>
      </div>

      <!-- CNM网络模型 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.1</span>
          <h1 class="page-title">CNM网络模型</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">CNM（Container Network Model）</div>
            <div class="definition-content">
              Docker采用的容器网络模型，定义了容器网络的标准接口，由三个核心组件组成：沙盒、端点、网络。
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 核心组件</div>
            <p><strong>Sandbox（沙盒）</strong>：容器的网络栈，包括IP地址、路由表、DNS等</p>
            <p><strong>Endpoint（端点）</strong>：容器连接到网络的接口</p>
            <p><strong>Network（网络）</strong>：一组可相互通信的端点集合</p>
          </div>
        </div>
      </div>

      <!-- 网络架构图 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.2</span>
          <h1 class="page-title">网络架构示意</h1>
        </div>
        <div class="page-body">
          <div class="arch-diagram vertical">
            <div class="arch-box network-box">
              <div class="box-title">Docker Network</div>
              <div class="box-content">
                <div class="box-item">Bridge Network</div>
                <div class="box-item">Overlay Network</div>
              </div>
            </div>
            <div class="arch-flow">
              <span class="flow-arrow">↓</span>
            </div>
            <div class="arch-box container-box">
              <div class="box-title">Container</div>
              <div class="box-content">
                <div class="box-item">veth（虚拟网卡）</div>
                <div class="box-item">Network Namespace</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 2 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 2</span>
          <h1 class="section-title">Docker网络类型</h1>
          <p class="section-desc">四种网络模式详解</p>
        </div>
      </div>

      <!-- 查看网络 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.1</span>
          <h1 class="page-title">查看Docker网络</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看网络列表</span>
            </div>
            <pre><code>docker network ls

NETWORK ID     NAME      DRIVER    SCOPE
abc123456789   bridge    bridge    local
def123456789   host      host      local
ghi123456789   none      null      local</code></pre>
          </div>
          <div class="param-list">
            <div class="param-item">
              <span class="param-name">bridge</span>
              <span class="param-desc">默认网络，容器通过网桥通信</span>
            </div>
            <div class="param-item">
              <span class="param-name">host</span>
              <span class="param-desc">使用宿主机网络</span>
            </div>
            <div class="param-item">
              <span class="param-name">none</span>
              <span class="param-desc">无网络，完全隔离</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bridge网络 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.2</span>
          <h1 class="page-title">Bridge网络模式</h1>
        </div>
        <div class="page-body">
          <div class="highlight-box info">
            <div class="highlight-title">🌉 Bridge模式</div>
            <div class="highlight-content">
              <p>默认网络模式，每个容器分配独立IP，通过docker0网桥通信。</p>
            </div>
          </div>
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>每个容器有独立IP（172.17.0.0/16网段）</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>容器间可通过IP相互访问</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>需要端口映射才能从外部访问</span>
            </div>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">使用Bridge模式</span>
            </div>
            <pre><code>docker run -d --name web1 -p 8080:80 nginx</code></pre>
          </div>
        </div>
      </div>

      <!-- Host网络 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.3</span>
          <h1 class="page-title">Host网络模式</h1>
        </div>
        <div class="page-body">
          <div class="highlight-box info">
            <div class="highlight-title">🏠 Host模式</div>
            <div class="highlight-content">
              <p>容器与宿主机共享网络命名空间，无网络隔离。</p>
            </div>
          </div>
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>性能最好，无网络转发开销</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>无需端口映射</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">⚠️</span>
              <span>端口冲突风险</span>
            </div>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">使用Host模式</span>
            </div>
            <pre><code>docker run -d --name web2 --net=host nginx</code></pre>
          </div>
        </div>
      </div>

      <!-- None网络 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.4</span>
          <h1 class="page-title">None网络模式</h1>
        </div>
        <div class="page-body">
          <div class="highlight-box info">
            <div class="highlight-title">🚫 None模式</div>
            <div class="highlight-content">
              <p>容器无网络接口，完全隔离。适合安全要求高的场景。</p>
            </div>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">使用None模式</span>
            </div>
            <pre><code>docker run -d --name web3 --net=none nginx

# 验证无网络
docker exec web3 ip addr
# 只有lo回环接口</code></pre>
          </div>
          <div class="tip-box">
            <div class="tip-title">💡 适用场景</div>
            <p>安全敏感的应用、离线数据处理、需要手动配置网络的场景。</p>
          </div>
        </div>
      </div>

      <!-- Overlay网络 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.5</span>
          <h1 class="page-title">Overlay网络模式</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">Overlay网络</div>
            <div class="definition-content">
              跨主机的虚拟网络，用于Docker Swarm集群中不同主机上的容器通信。
            </div>
          </div>
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>跨主机容器通信</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>基于VXLAN封装</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>需要Swarm集群或etcd</span>
            </div>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">创建Overlay网络</span>
            </div>
            <pre><code># 需要先初始化Swarm
docker swarm init

# 创建Overlay网络
docker network create -d overlay my-overlay</code></pre>
          </div>
        </div>
      </div>

      <!-- Part 3 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 3</span>
          <h1 class="section-title">自定义网络</h1>
          <p class="section-desc">创建与管理网络</p>
        </div>
      </div>

      <!-- 创建自定义网络 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.1</span>
          <h1 class="page-title">创建自定义网络</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">创建Bridge网络</span>
            </div>
            <pre><code># 创建自定义网络
docker network create mynet

# 指定子网
docker network create \
  --subnet=192.168.100.0/24 \
  --gateway=192.168.100.1 \
  mynet2

# 查看网络详情
docker network inspect mynet</code></pre>
          </div>
        </div>
      </div>

      <!-- 容器连接网络 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.2</span>
          <h1 class="page-title">容器连接网络</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">连接容器到网络</span>
            </div>
            <pre><code># 启动时指定网络
docker run -d --name web1 --net mynet nginx

# 运行中的容器连接网络
docker network connect mynet web1

# 断开网络连接
docker network disconnect mynet web1</code></pre>
          </div>
          <div class="tip-box">
            <div class="tip-title">💡 自定义网络的优势</div>
            <p>支持容器名解析，容器可以通过名称相互访问，无需知道IP地址。</p>
          </div>
        </div>
      </div>

      <!-- DNS解析 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.3</span>
          <h1 class="page-title">容器DNS解析</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">自定义网络DNS解析</span>
            </div>
            <pre><code># 启动两个容器
docker run -d --name app1 --net mynet nginx
docker run -d --name app2 --net mynet nginx

# 在app1中通过名称访问app2
docker exec app1 ping app2
# 可以ping通，说明DNS解析正常</code></pre>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">✅ DNS解析</div>
            <div class="highlight-content">
              <p>自定义网络中，容器可以通过容器名相互访问，Docker内置DNS服务器自动解析。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 4 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 4</span>
          <h1 class="section-title">容器通信原理</h1>
          <p class="section-desc">深入理解网络通信</p>
        </div>
      </div>

      <!-- veth pair -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.1</span>
          <h1 class="page-title">veth pair虚拟网卡</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">veth pair</div>
            <div class="definition-content">
              虚拟以太网设备对，成对出现，一端在容器内（eth0），一端在宿主机（vethxxx），像管道一样连接两个网络命名空间。
            </div>
          </div>
          <div class="arch-diagram">
            <div class="arch-layer container">容器 eth0</div>
            <div class="arch-arrow">↕ veth pair</div>
            <div class="arch-layer host">宿主机 vethxxx → docker0网桥</div>
          </div>
        </div>
      </div>

      <!-- 网桥原理 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.2</span>
          <h1 class="page-title">docker0网桥原理</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看网桥</span>
            </div>
            <pre><code># 在宿主机查看网桥
brctl show

bridge name     bridge id           interfaces
docker0         8000.0242a1b2c3d4   veth1234
                                    veth5678</code></pre>
          </div>
          <div class="term-box">
            <div class="term-title">📚 网桥工作原理</div>
            <p>docker0网桥类似交换机，所有容器的veth一端连接到网桥。容器间通信通过网桥转发，外部访问通过NAT端口映射。</p>
          </div>
        </div>
      </div>

      <!-- 端口映射 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.3</span>
          <h1 class="page-title">端口映射原理</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">端口映射方式</span>
            </div>
            <pre><code># 随机端口映射
docker run -d -P nginx

# 指定端口映射
docker run -d -p 8080:80 nginx

# 指定IP映射
docker run -d -p 192.168.1.100:8080:80 nginx

# 映射UDP端口
docker run -d -p 53:53/udp dns-server</code></pre>
          </div>
          <div class="highlight-box info">
            <div class="highlight-title">💡 NAT原理</div>
            <div class="highlight-content">
              <p>通过iptables的DNAT规则，将宿主机端口的流量转发到容器内部。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 5 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 5</span>
          <h1 class="section-title">实操环节</h1>
          <p class="section-desc">动手配置网络</p>
        </div>
      </div>

      <!-- 实操1 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 5.1</span>
          <h1 class="page-title">实操：创建自定义网络</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">完整操作</span>
            </div>
            <pre><code># 创建网络
docker network create app-net

# 启动容器并连接网络
docker run -d --name web --net app-net nginx
docker run -d --name db --net app-net mysql:8.0

# 验证通信
docker exec web ping db

# 查看网络信息
docker network inspect app-net</code></pre>
          </div>
        </div>
      </div>

      <!-- 实操2 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 5.2</span>
          <h1 class="page-title">实操：网络问题排查</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">常用排查命令</span>
            </div>
            <pre><code># 查看容器IP
docker inspect web | grep IPAddress

# 进入容器查看网络
docker exec web ip addr
docker exec web ip route
docker exec web cat /etc/resolv.conf

# 查看iptables规则
iptables -t nat -L -n

# 抓包分析
tcpdump -i docker0 -n</code></pre>
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
          <h1 class="page-title">练习任务（15分钟）</h1>
        </div>
        <div class="page-body">
          <div class="exercise-tasks">
            <div class="exercise-task">
              <div class="task-number">1</div>
              <div class="task-content">
                <h3>创建自定义网络</h3>
                <p>指定子网192.168.200.0/24</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">2</div>
              <div class="task-content">
                <h3>启动容器</h3>
                <p>两个容器连接到同一网络</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">3</div>
              <div class="task-content">
                <h3>验证通信</h3>
                <p>通过容器名相互ping通</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">4</div>
              <div class="task-content">
                <h3>提交截图</h3>
                <p>网络inspect结果</p>
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
              <div class="summary-text">CNM网络模型：沙盒、端点、网络</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">四种网络类型：Bridge/Host/None/Overlay</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">自定义网络：创建、连接、DNS解析</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">通信原理：veth pair、网桥、NAT</div>
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
            <h3>📚 第9课时：Docker Compose入门</h3>
            <ul>
              <li>Compose安装与配置</li>
              <li>docker-compose.yml语法</li>
              <li>多容器应用编排</li>
              <li>常用命令实战</li>
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
