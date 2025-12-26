<template>
  <div class="home-page">
    <section class="hero">
      <h1 class="hero-title">Docker & Kubernetes</h1>
      <p class="hero-subtitle">从零到云原生的完整学习路径</p>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number">16</div>
          <div class="stat-label">讲课程</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">48</div>
          <div class="stat-label">小时</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">100+</div>
          <div class="stat-label">实验</div>
        </div>
      </div>
    </section>

    <section class="courses-section">
      <div class="section-header">
        <h2>课程大纲</h2>
        <p>系统化学习容器与云原生技术</p>
      </div>

      <div class="course-grid">
        <router-link 
          v-for="course in courses" 
          :key="course.id"
          :to="course.path"
          class="course-card"
        >
          <div class="card-header">
            <span class="course-icon">{{ course.icon }}</span>
            <span class="course-number">{{ String(course.id).padStart(2, '0') }}</span>
          </div>
          <h3 class="course-title">{{ course.title }}</h3>
          <p class="course-desc">{{ course.desc }}</p>
          <div class="course-topics">
            <span v-for="topic in course.topics" :key="topic" class="topic-tag">
              {{ topic }}
            </span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const courses = ref([
  { 
    id: 1, 
    title: '软件部署的痛点与容器初体验',
    desc: '为什么需要容器？虚拟机 vs 容器；Docker 初体验',
    path: '/lecture-1',
    icon: '📦',
    topics: ['Docker基础', '命令行', 'Hello World']
  },
  { 
    id: 2, 
    title: '镜像与容器 — Docker的基本单位',
    desc: '镜像 = 安装包，容器 = 运行实例；Docker Hub',
    path: '/lecture-2',
    icon: '🐋',
    topics: ['镜像管理', '容器启动', 'Docker Hub']
  },
  { 
    id: 3, 
    title: '容器生命周期管理',
    desc: '启动、停止、删除、查看日志、进入容器',
    path: '/lecture-3',
    icon: '⚙️',
    topics: ['容器控制', '日志查看', '清理管理']
  },
  { 
    id: 4, 
    title: '持久化数据 — 数据卷',
    desc: 'Volume vs Bind Mount；数据持久化实践',
    path: '/lecture-4',
    icon: '💾',
    topics: ['数据卷', '挂载点', '持久化']
  },
  { 
    id: 5, 
    title: '自定义镜像 — Dockerfile（上）',
    desc: 'FROM, COPY, RUN, CMD；构建第一个镜像',
    path: '/lecture-5',
    icon: '📝',
    topics: ['Dockerfile', '镜像构建', 'Flask应用']
  },
  { 
    id: 6, 
    title: 'Dockerfile实战与优化',
    desc: '.dockerignore、层优化、CMD vs ENTRYPOINT',
    path: '/lecture-6',
    icon: '🔧',
    topics: ['镜像优化', '最佳实践', '体积压缩']
  },
  { 
    id: 7, 
    title: '容器间通信 — Docker网络',
    desc: 'bridge网络、自定义网络、容器名通信',
    path: '/lecture-7',
    icon: '🌐',
    topics: ['网络模式', '容器互联', 'DNS解析']
  },
  { 
    id: 8, 
    title: '编排多服务 — Compose入门',
    desc: 'YAML基础、docker-compose.yml编写',
    path: '/lecture-8',
    icon: '🎼',
    topics: ['Docker Compose', 'YAML语法', '多容器']
  },
  { 
    id: 9, 
    title: 'Compose进阶与项目实战',
    desc: '环境变量、卷管理、depends_on；Todo应用',
    path: '/lecture-9',
    icon: '🚀',
    topics: ['Compose进阶', '项目实战', '数据持久化']
  },
  { 
    id: 10, 
    title: '从单机到集群 — 为什么需要K8s',
    desc: 'Docker局限性；Kubernetes核心思想；Kind安装',
    path: '/lecture-10',
    icon: '☸️',
    topics: ['K8s入门', '集群概念', 'Kind']
  },
  { 
    id: 11, 
    title: 'K8s第一课 — Pod与Deployment',
    desc: 'Pod是最小单元；Deployment管理副本',
    path: '/lecture-11',
    icon: '🎯',
    topics: ['Pod', 'Deployment', '自愈机制']
  },
  { 
    id: 12, 
    title: '让应用可访问 — Service',
    desc: 'ClusterIP vs NodePort；服务发现',
    path: '/lecture-12',
    icon: '🔌',
    topics: ['Service', 'NodePort', '负载均衡']
  },
  { 
    id: 13, 
    title: '部署自己的应用到K8s',
    desc: '将Todo应用迁移到Kubernetes集群',
    path: '/lecture-13',
    icon: '📱',
    topics: ['应用部署', '镜像推送', 'K8s实战']
  },
  { 
    id: 14, 
    title: '配置与环境管理',
    desc: 'ConfigMap、Secret、环境变量注入',
    path: '/lecture-14',
    icon: '⚡',
    topics: ['ConfigMap', 'Secret', '配置管理']
  },
  { 
    id: 15, 
    title: 'K8s调试与运维基础',
    desc: '查看日志、进入容器、排查错误',
    path: '/lecture-15',
    icon: '🔍',
    topics: ['日志查看', '故障排查', 'kubectl debug']
  },
  { 
    id: 16, 
    title: '综合实战与未来之路',
    desc: 'Helm、Ingress、托管K8s；学习路径建议',
    path: '/lecture-16',
    icon: '🎓',
    topics: ['综合实战', 'Helm', '未来方向']
  }
])
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  padding: 80px 20px 40px;
}

.hero {
  text-align: center;
  margin-bottom: 80px;
  padding: 60px 0;
  
  .hero-title {
    font-size: 4rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #0070F3 0%, #32CD32 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 3rem;
  }
  
  .hero-stats {
    display: flex;
    gap: 4rem;
    justify-content: center;
    
    .stat-item {
      .stat-number {
        font-size: 3rem;
        font-weight: 700;
        color: #0070F3;
        margin-bottom: 0.5rem;
      }
      
      .stat-label {
        font-size: 0.875rem;
        color: #999;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
    }
  }
}

.courses-section {
  max-width: 1200px;
  margin: 0 auto;
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
    
    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #666;
      font-size: 1.125rem;
    }
  }
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.course-card {
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 0.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 112, 243, 0.05), rgba(50, 205, 50, 0.05));
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(0, 112, 243, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 112, 243, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    .card-arrow {
      transform: translateX(5px);
      opacity: 1;
    }
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    .course-icon {
      font-size: 2rem;
    }
    
    .course-number {
      font-size: 0.875rem;
      color: #0070F3;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      background: rgba(0, 112, 243, 0.1);
      border-radius: 999px;
    }
  }
  
  .course-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }
  
  .course-desc {
    font-size: 0.875rem;
    color: #999;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .course-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .topic-tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 0.5px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      color: #999;
    }
  }
  
  .card-arrow {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    font-size: 1.5rem;
    opacity: 0;
    transition: all 0.3s;
    color: #0070F3;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 0;
    
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-stats {
      gap: 2rem;
      
      .stat-item .stat-number {
        font-size: 2rem;
      }
    }
  }
  
  .course-grid {
    grid-template-columns: 1fr;
  }
}
</style>
