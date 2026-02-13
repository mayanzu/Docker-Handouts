<template>
  <div class="lecture-page">
    <div class="page-container" :style="{ transform: `translateX(-${(currentPage - 1) * 100}%)` }">
      
      <!-- 封面页 -->
      <div class="page cover-page">
        <div class="cover-content">
          <div class="course-badge">🐳 Docker & Kubernetes 实战课程</div>
          <h1 class="main-title">第13课时</h1>
          <h2 class="sub-title">Kubernetes核心概念</h2>
          <p class="tagline">容器编排平台入门</p>
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
                <h3>理解K8s架构</h3>
                <p>Master与Node组件</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">📦</div>
              <div class="goal-content">
                <h3>掌握核心资源</h3>
                <p>Pod/Service/Deployment</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔧</div>
              <div class="goal-content">
                <h3>掌握kubectl命令</h3>
                <p>资源管理操作</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🚀</div>
              <div class="goal-content">
                <h3>应用部署实战</h3>
                <p>部署应用到K8s</p>
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
              <div class="schedule-desc">K8s架构、核心概念</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">40分钟</div>
              <div class="schedule-type">实操演示</div>
              <div class="schedule-desc">kubectl命令、应用部署</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">15分钟</div>
              <div class="schedule-type">练习与总结</div>
              <div class="schedule-desc">独立完成部署</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 1 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 1</span>
          <h1 class="section-title">Kubernetes概述</h1>
          <p class="section-desc">容器编排平台介绍</p>
        </div>
      </div>

      <!-- 什么是K8s -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.1</span>
          <h1 class="page-title">什么是Kubernetes？</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">Kubernetes（K8s）</div>
            <div class="definition-content">
              Google开源的容器编排平台，用于自动化部署、扩展和管理容器化应用。名字来源于希腊语，意为"舵手"或"飞行员"。
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 为什么叫K8s？</div>
            <p>Kubernetes有14个字母，K和s之间有8个字母，因此简写为K8s。</p>
          </div>
        </div>
      </div>

      <!-- K8s功能 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.2</span>
          <h1 class="page-title">K8s核心功能</h1>
        </div>
        <div class="page-body">
          <div class="pain-points-grid">
            <div class="pain-point-card" style="border-color: #93c5fd;">
              <div class="pain-icon">🚀</div>
              <h3>自动化部署</h3>
              <p>声明式配置</p>
              <p>自动调度</p>
            </div>
            <div class="pain-point-card" style="border-color: #fcd34d;">
              <div class="pain-icon">📈</div>
              <h3>弹性伸缩</h3>
              <p>自动扩缩容</p>
              <p>HPA/VPA</p>
            </div>
            <div class="pain-point-card" style="border-color: #bbf7d0;">
              <div class="pain-icon">🔄</div>
              <h3>自愈能力</h3>
              <p>自动重启</p>
              <p>故障转移</p>
            </div>
            <div class="pain-point-card" style="border-color: #fca5a5;">
              <div class="pain-icon">⚖️</div>
              <h3>负载均衡</h3>
              <p>Service发现</p>
              <p>流量分发</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 2 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 2</span>
          <h1 class="section-title">K8s架构</h1>
          <p class="section-desc">Master与Node组件</p>
        </div>
      </div>

      <!-- K8s架构图 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.1</span>
          <h1 class="page-title">K8s架构概览</h1>
        </div>
        <div class="page-body">
          <div class="arch-diagram vertical">
            <div class="arch-box master-box">
              <div class="box-title">Master节点（控制平面）</div>
              <div class="box-content">
                <div class="box-item">API Server</div>
                <div class="box-item">Scheduler</div>
                <div class="box-item">Controller Manager</div>
                <div class="box-item">etcd</div>
              </div>
            </div>
            <div class="arch-flow">
              <span class="flow-arrow">↓</span>
            </div>
            <div class="arch-box node-box">
              <div class="box-title">Worker节点</div>
              <div class="box-content">
                <div class="box-item">kubelet</div>
                <div class="box-item">kube-proxy</div>
                <div class="box-item">Container Runtime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Master组件 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.2</span>
          <h1 class="page-title">Master节点组件</h1>
        </div>
        <div class="page-body">
          <div class="param-list">
            <div class="param-item">
              <span class="param-name">API Server</span>
              <span class="param-desc">集群统一入口，RESTful API</span>
            </div>
            <div class="param-item">
              <span class="param-name">Scheduler</span>
              <span class="param-desc">负责Pod调度到Node</span>
            </div>
            <div class="param-item">
              <span class="param-name">Controller Manager</span>
              <span class="param-desc">维护集群状态，控制器</span>
            </div>
            <div class="param-item">
              <span class="param-name">etcd</span>
              <span class="param-desc">键值存储，保存集群数据</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Node组件 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.3</span>
          <h1 class="page-title">Worker节点组件</h1>
        </div>
        <div class="page-body">
          <div class="param-list">
            <div class="param-item">
              <span class="param-name">kubelet</span>
              <span class="param-desc">与Master通信，管理容器生命周期</span>
            </div>
            <div class="param-item">
              <span class="param-name">kube-proxy</span>
              <span class="param-desc">网络代理，实现Service负载均衡</span>
            </div>
            <div class="param-item">
              <span class="param-name">Container Runtime</span>
              <span class="param-desc">容器运行时（Docker/containerd）</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 3 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 3</span>
          <h1 class="section-title">核心资源对象</h1>
          <p class="section-desc">Pod、Service、Deployment</p>
        </div>
      </div>

      <!-- Pod -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.1</span>
          <h1 class="page-title">Pod - 最小部署单元</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">Pod</div>
            <div class="definition-content">
              Kubernetes中最小的部署单元，包含一个或多个容器，共享网络和存储资源。
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 Pod特点</div>
            <p><strong>共享网络</strong>：Pod内所有容器共享IP地址和端口</p>
            <p><strong>共享存储</strong>：Pod内容器可共享Volume</p>
            <p><strong>生命周期</strong>：Pod是临时的，重启后IP会变化</p>
          </div>
        </div>
      </div>

      <!-- Deployment -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.2</span>
          <h1 class="page-title">Deployment - 部署控制器</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">Deployment</div>
            <div class="definition-content">
              管理Pod的副本数量和更新策略，支持滚动更新和回滚。
            </div>
          </div>
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>声明期望的Pod副本数</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>自动创建和管理ReplicaSet</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>支持滚动更新和回滚</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Service -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.3</span>
          <h1 class="page-title">Service - 服务发现</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">Service</div>
            <div class="definition-content">
              定义一组Pod的访问策略，提供稳定的访问入口和负载均衡。
            </div>
          </div>
          <table class="compare-table full-width">
            <thead>
              <tr>
                <th>类型</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ClusterIP</strong></td>
                <td>集群内部访问（默认）</td>
              </tr>
              <tr>
                <td><strong>NodePort</strong></td>
                <td>通过节点端口暴露</td>
              </tr>
              <tr>
                <td><strong>LoadBalancer</strong></td>
                <td>云厂商负载均衡器</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Part 4 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 4</span>
          <h1 class="section-title">kubectl命令</h1>
          <p class="section-desc">K8s命令行工具</p>
        </div>
      </div>

      <!-- 常用命令 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.1</span>
          <h1 class="page-title">kubectl常用命令</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">资源查看</span>
            </div>
            <pre><code># 查看节点
kubectl get nodes

# 查看Pod
kubectl get pods

# 查看Deployment
kubectl get deployments

# 查看Service
kubectl get services

# 查看所有资源
kubectl get all</code></pre>
          </div>
        </div>
      </div>

      <!-- 部署命令 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4.2</span>
          <h1 class="page-title">部署与管理命令</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">部署操作</span>
            </div>
            <pre><code># 创建Deployment
kubectl create deployment nginx --image=nginx

# 扩容
kubectl scale deployment nginx --replicas=3

# 暴露服务
kubectl expose deployment nginx --port=80 --type=NodePort

# 应用YAML配置
kubectl apply -f deployment.yaml

# 删除资源
kubectl delete -f deployment.yaml</code></pre>
          </div>
        </div>
      </div>

      <!-- Part 5 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 5</span>
          <h1 class="section-title">应用部署实战</h1>
          <p class="section-desc">部署应用到K8s</p>
        </div>
      </div>

      <!-- YAML示例 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 5.1</span>
          <h1 class="page-title">Deployment YAML示例</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">nginx-deployment.yaml</span>
            </div>
            <pre><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80</code></pre>
          </div>
        </div>
      </div>

      <!-- 部署应用 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 5.2</span>
          <h1 class="page-title">部署应用</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">部署命令</span>
            </div>
            <pre><code># 应用配置
kubectl apply -f nginx-deployment.yaml

# 查看状态
kubectl get pods
kubectl get deployments

# 查看详情
kubectl describe pod nginx-xxx

# 查看日志
kubectl logs nginx-xxx</code></pre>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">✅ 部署成功</div>
            <div class="highlight-content">
              <p>3个Nginx Pod正在运行，Deployment控制器会自动维护副本数量</p>
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
          <h1 class="page-title">练习任务（15分钟）</h1>
        </div>
        <div class="page-body">
          <div class="exercise-tasks">
            <div class="exercise-task">
              <div class="task-number">1</div>
              <div class="task-content">
                <h3>创建Deployment</h3>
                <p>部署一个Nginx应用</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">2</div>
              <div class="task-content">
                <h3>扩容应用</h3>
                <p>将副本数扩展到3个</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">3</div>
              <div class="task-content">
                <h3>暴露服务</h3>
                <p>创建Service暴露应用</p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">4</div>
              <div class="task-content">
                <h3>提交截图</h3>
                <p>kubectl get pods输出结果</p>
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
              <div class="summary-text">K8s架构：Master节点和Worker节点组件</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">核心资源：Pod、Deployment、Service</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">kubectl命令：get、apply、delete、describe</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">应用部署：YAML配置文件编写与部署</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 下节预告 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">预告</span>
          <h1 class="page-title">课程总结</h1>
        </div>
        <div class="page-body">
          <div class="next-lecture">
            <h3>📚 后续课程预告</h3>
            <ul>
              <li>第14课时：K8s配置管理</li>
              <li>第15课时：K8s存储与网络</li>
              <li>第16课时：K8s生产实践</li>
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
