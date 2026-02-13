<template>
  <div class="lecture-page">
    <div class="page-container" :style="{ transform: `translateX(-${(currentPage - 1) * 100}%)` }">
      
      <!-- 封面页 -->
      <div class="page cover-page">
        <div class="cover-content">
          <div class="course-badge">🐳 Docker & Kubernetes 实战课程</div>
          <h1 class="main-title">第11课时</h1>
          <h2 class="sub-title">Docker可视化与监控</h2>
          <p class="tagline">Portainer、Prometheus与Grafana</p>
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
              <div class="goal-icon">🖥️</div>
              <div class="goal-content">
                <h3>掌握Portainer</h3>
                <p>容器可视化管理</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">📊</div>
              <div class="goal-content">
                <h3>部署Prometheus</h3>
                <p>指标采集与存储</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">📈</div>
              <div class="goal-content">
                <h3>配置Grafana</h3>
                <p>数据可视化展示</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔔</div>
              <div class="goal-content">
                <h3>配置告警</h3>
                <p>Alertmanager告警</p>
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
              <div class="schedule-time">25分钟</div>
              <div class="schedule-type">理论讲解</div>
              <div class="schedule-desc">监控体系、工具介绍</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">50分钟</div>
              <div class="schedule-type">实操演示</div>
              <div class="schedule-desc">部署监控栈、配置面板</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">15分钟</div>
              <div class="schedule-type">练习与总结</div>
              <div class="schedule-desc">自定义监控面板</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 1 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 1</span>
          <h1 class="section-title">容器监控概述</h1>
          <p class="section-desc">监控体系与工具选型</p>
        </div>
      </div>

      <!-- 为什么需要监控 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.1</span>
          <h1 class="page-title">为什么需要监控？</h1>
        </div>
        <div class="page-body">
          <div class="pain-points-grid">
            <div class="pain-point-card" style="border-color: #fca5a5;">
              <div class="pain-icon">⚠️</div>
              <h3>问题发现</h3>
              <p>及时发现系统异常</p>
            </div>
            <div class="pain-point-card" style="border-color: #fcd34d;">
              <div class="pain-icon">📊</div>
              <h3>性能分析</h3>
              <p>定位性能瓶颈</p>
            </div>
            <div class="pain-point-card" style="border-color: #bbf7d0;">
              <div class="pain-icon">📈</div>
              <h3>容量规划</h3>
              <p>预测资源需求</p>
            </div>
            <div class="pain-point-card" style="border-color: #93c5fd;">
              <div class="pain-icon">🔔</div>
              <h3>告警通知</h3>
              <p>异常自动告警</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 监控工具对比 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.2</span>
          <h1 class="page-title">监控工具对比</h1>
        </div>
        <div class="page-body">
          <table class="compare-table full-width">
            <thead>
              <tr>
                <th>工具</th>
                <th>用途</th>
                <th>特点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Portainer</strong></td>
                <td>可视化管理</td>
                <td>Web UI管理容器</td>
              </tr>
              <tr>
                <td><strong>Prometheus</strong></td>
                <td>指标采集</td>
                <td>时序数据库、Pull模式</td>
              </tr>
              <tr>
                <td><strong>Grafana</strong></td>
                <td>可视化</td>
                <td>丰富的图表面板</td>
              </tr>
              <tr>
                <td><strong>cAdvisor</strong></td>
                <td>容器监控</td>
                <td>容器资源使用监控</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Part 2 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 2</span>
          <h1 class="section-title">Portainer可视化管理</h1>
          <p class="section-desc">Web UI管理容器</p>
        </div>
      </div>

      <!-- Portainer部署 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.1</span>
          <h1 class="page-title">部署Portainer</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">启动Portainer</span>
            </div>
            <pre><code>docker run -d --name portainer \
  -p 9000:9000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer-data:/data \
  portainer/portainer-ce:latest

# 访问Web UI
# http://localhost:9000</code></pre>
          </div>
          <div class="param-list">
            <div class="param-item">
              <span class="param-name">docker.sock</span>
              <span class="param-desc">连接Docker守护进程</span>
            </div>
            <div class="param-item">
              <span class="param-name">portainer-data</span>
              <span class="param-desc">持久化配置数据</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Portainer功能 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.2</span>
          <h1 class="page-title">Portainer主要功能</h1>
        </div>
        <div class="page-body">
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>容器管理：创建、启动、停止、删除容器</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>镜像管理：拉取、删除、构建镜像</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>网络管理：创建和管理Docker网络</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>卷管理：管理数据卷</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>日志查看：实时查看容器日志</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 3 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 3</span>
          <h1 class="section-title">Prometheus监控</h1>
          <p class="section-desc">指标采集与存储</p>
        </div>
      </div>

      <!-- Prometheus架构 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.1</span>
          <h1 class="page-title">Prometheus架构</h1>
        </div>
        <div class="page-body">
          <div class="arch-diagram vertical">
            <div class="arch-box exporter-box">
              <div class="box-title">Exporters</div>
              <div class="box-content">
                <div class="box-item">Node Exporter</div>
                <div class="box-item">cAdvisor</div>
              </div>
            </div>
            <div class="arch-flow">
              <span class="flow-arrow">↓ Pull</span>
            </div>
            <div class="arch-box prometheus-box">
              <div class="box-title">Prometheus</div>
              <div class="box-content">
                <div class="box-item">采集 + 存储</div>
                <div class="box-item">告警规则</div>
              </div>
            </div>
            <div class="arch-flow">
              <span class="flow-arrow">↓</span>
            </div>
            <div class="arch-box grafana-box">
              <div class="box-title">Grafana</div>
              <div class="box-content">
                <div class="box-item">可视化展示</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 部署Prometheus -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.2</span>
          <h1 class="page-title">部署Prometheus</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">prometheus.yml配置</span>
            </div>
            <pre><code>global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">启动Prometheus</span>
            </div>
            <pre><code>docker run -d --name prometheus \
  -p 9090:9090 \
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus:latest</code></pre>
          </div>
        </div>
      </div>

      <!-- cAdvisor -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.3</span>
          <h1 class="page-title">部署cAdvisor</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">cAdvisor</div>
            <div class="definition-content">
              Google开源的容器资源监控工具，自动采集容器的CPU、内存、网络、磁盘等指标。
            </div>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">启动cAdvisor</span>
            </div>
            <pre><code>docker run -d --name cadvisor \
  -p 8080:8080 \
  -v /:/rootfs:ro \
  -v /var/run:/var/run:ro \
  -v /sys:/sys:ro \
  -v /var/lib/docker:/var/lib/docker:ro \
  google/cadvisor:latest</code></pre>
          </div>
        </div>
      </div>

      <!-- Part 4 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 4</span>
          <h1 class="section-title">Grafana可视化</h1>
          <p class="section-desc">数据可视化展示</p>
        </div>
      </div>

      <!-- 部署Grafana -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.1</span>
          <h1 class="page-title">部署Grafana</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">启动Grafana</span>
            </div>
            <pre><code>docker run -d --name grafana \
  -p 3000:3000 \
  -v grafana-data:/var/lib/grafana \
  grafana/grafana:latest

# 访问Web UI
# http://localhost:3000
# 默认账号：admin/admin</code></pre>
          </div>
        </div>
      </div>

      <!-- 配置数据源 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.2</span>
          <h1 class="page-title">配置Prometheus数据源</h1>
        </div>
        <div class="page-body">
          <div class="install-step">
            <div class="step-number">Step 1</div>
            <div class="step-content">
              <h4>添加数据源</h4>
              <p class="paragraph">Configuration → Data Sources → Add data source</p>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 2</div>
            <div class="step-content">
              <h4>选择Prometheus</h4>
              <p class="paragraph">URL填写：http://prometheus:9090</p>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 3</div>
            <div class="step-content">
              <h4>导入Dashboard</h4>
              <p class="paragraph">导入ID：893（Docker监控面板）</p>
            </div>
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
          <h1 class="page-title">练习任务（15分钟）</h1>
        </div>
        <div class="page-body">
          <div class="exercise-tasks">
            <div class="exercise-task">
              <div class="task-number">1</div>
              <div class="task-content">
                <h3>部署Portainer</h3>
                <p>使用Docker启动Portainer</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">2</div>
              <div class="task-content">
                <h3>部署监控栈</h3>
                <p>Prometheus + cAdvisor + Grafana</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">3</div>
              <div class="task-content">
                <h3>配置Dashboard</h3>
                <p>导入Docker监控面板</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">4</div>
              <div class="task-content">
                <h3>提交截图</h3>
                <p>Grafana监控面板截图</p>
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
              <div class="summary-text">Portainer：Web UI可视化管理容器</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">Prometheus：指标采集与存储</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">cAdvisor：容器资源监控</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">Grafana：数据可视化展示</div>
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
            <h3>📚 第12课时：企业实战与面试题</h3>
            <ul>
              <li>企业级镜像构建</li>
              <li>CI/CD流水线</li>
              <li>常见面试题解析</li>
              <li>实战案例分享</li>
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
const totalPages = 20

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
