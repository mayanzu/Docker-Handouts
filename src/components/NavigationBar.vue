<template>
  <nav class="navigation-bar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <div class="logo-icon">🐳</div>
        <span class="logo-text">Docker K8s</span>
      </router-link>

      <div class="nav-menu desktop-menu">
        <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">首页</span>
        </router-link>

        <div 
          class="nav-dropdown"
          @mouseenter="openDropdown('docker-basics')"
          @mouseleave="closeDropdown('docker-basics')"
        >
          <div class="nav-link dropdown-trigger">
            <span class="nav-icon">🐋</span>
            <span class="nav-text">Docker基础</span>
            <span class="dropdown-arrow">▼</span>
          </div>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'docker-basics'" class="dropdown-menu">
              <router-link 
                v-for="item in dockerBasics" 
                :key="item.path"
                :to="item.path" 
                class="dropdown-item"
              >
                <span class="item-icon">{{ item.icon }}</span>
                <div class="item-content">
                  <span class="item-title">{{ item.title }}</span>
                  <span class="item-desc">{{ item.desc }}</span>
                </div>
              </router-link>
            </div>
          </Transition>
        </div>

        <div 
          class="nav-dropdown"
          @mouseenter="openDropdown('docker-advanced')"
          @mouseleave="closeDropdown('docker-advanced')"
        >
          <div class="nav-link dropdown-trigger">
            <span class="nav-icon">🔧</span>
            <span class="nav-text">Docker进阶</span>
            <span class="dropdown-arrow">▼</span>
          </div>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'docker-advanced'" class="dropdown-menu">
              <router-link 
                v-for="item in dockerAdvanced" 
                :key="item.path"
                :to="item.path" 
                class="dropdown-item"
              >
                <span class="item-icon">{{ item.icon }}</span>
                <div class="item-content">
                  <span class="item-title">{{ item.title }}</span>
                  <span class="item-desc">{{ item.desc }}</span>
                </div>
              </router-link>
            </div>
          </Transition>
        </div>

        <div 
          class="nav-dropdown"
          @mouseenter="openDropdown('kubernetes')"
          @mouseleave="closeDropdown('kubernetes')"
        >
          <div class="nav-link dropdown-trigger">
            <span class="nav-icon">☸️</span>
            <span class="nav-text">Kubernetes</span>
            <span class="dropdown-arrow">▼</span>
          </div>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'kubernetes'" class="dropdown-menu">
              <router-link 
                v-for="item in kubernetes" 
                :key="item.path"
                :to="item.path" 
                class="dropdown-item"
              >
                <span class="item-icon">{{ item.icon }}</span>
                <div class="item-content">
                  <span class="item-title">{{ item.title }}</span>
                  <span class="item-desc">{{ item.desc }}</span>
                </div>
              </router-link>
            </div>
          </Transition>
        </div>
      </div>

      <button 
        class="mobile-menu-toggle" 
        :class="{ 'active': isMobileMenuOpen }"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="mobile-section">
          <div class="section-title">Docker基础</div>
          <router-link 
            v-for="item in dockerBasics" 
            :key="item.path"
            :to="item.path" 
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.title }}</span>
          </router-link>
        </div>

        <div class="mobile-section">
          <div class="section-title">Docker进阶</div>
          <router-link 
            v-for="item in dockerAdvanced" 
            :key="item.path"
            :to="item.path" 
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.title }}</span>
          </router-link>
        </div>

        <div class="mobile-section">
          <div class="section-title">Kubernetes</div>
          <router-link 
            v-for="item in kubernetes" 
            :key="item.path"
            :to="item.path" 
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.title }}</span>
          </router-link>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)

const dockerBasics = [
  { title: '第1讲', path: '/lecture-1', icon: '📦', desc: '软件部署的痛点' },
  { title: '第2讲', path: '/lecture-2', icon: '🐋', desc: '镜像与容器' },
  { title: '第3讲', path: '/lecture-3', icon: '⚙️', desc: '容器生命周期' },
  { title: '第4讲', path: '/lecture-4', icon: '💾', desc: '数据持久化' }
]

const dockerAdvanced = [
  { title: '第5讲', path: '/lecture-5', icon: '📝', desc: 'Dockerfile入门' },
  { title: '第6讲', path: '/lecture-6', icon: '🔧', desc: 'Dockerfile优化' },
  { title: '第7讲', path: '/lecture-7', icon: '🌐', desc: '容器网络' },
  { title: '第8讲', path: '/lecture-8', icon: '🎼', desc: 'Compose入门' },
  { title: '第9讲', path: '/lecture-9', icon: '🚀', desc: 'Compose实战' }
]

const kubernetes = [
  { title: '第10讲', path: '/lecture-10', icon: '☸️', desc: 'K8s入门' },
  { title: '第11讲', path: '/lecture-11', icon: '🎯', desc: 'Pod与Deployment' },
  { title: '第12讲', path: '/lecture-12', icon: '🔌', desc: 'Service服务' },
  { title: '第13讲', path: '/lecture-13', icon: '📱', desc: '应用部署' },
  { title: '第14讲', path: '/lecture-14', icon: '⚡', desc: '配置管理' },
  { title: '第15讲', path: '/lecture-15', icon: '🔍', desc: '调试运维' },
  { title: '第16讲', path: '/lecture-16', icon: '🎓', desc: '综合实战' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const openDropdown = (name: string) => {
  activeDropdown.value = name
}

const closeDropdown = (name: string) => {
  if (activeDropdown.value === name) {
    activeDropdown.value = null
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  }
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: none;
  
  &::after {
    display: none;
  }
  
  &:hover {
    transform: translateX(2px);
    
    .logo-text {
      color: #0070F3;
    }
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .logo-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.125rem;
    font-weight: 900;
    color: #000000;
    letter-spacing: -0.02em;
    transition: color 0.2s ease;
  }
}

.desktop-menu {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  color: #666666;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 400;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: none;
  position: relative;
  white-space: nowrap;
  
  &::after {
    display: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: border-color 0.2s ease;
  }
  
  &:hover {
    color: #0070F3;
    background: rgba(0, 112, 243, 0.04);
    
    &::before {
      border-color: rgba(0, 112, 243, 0.2);
    }
  }
  
  &.active {
    color: #0070F3;
    background: rgba(0, 112, 243, 0.08);
    font-weight: 500;
    
    &::before {
      border-color: rgba(0, 112, 243, 0.3);
    }
  }
  
  .nav-icon {
    font-size: 1rem;
  }
  
  .nav-text {
    letter-spacing: -0.01em;
  }
}

.nav-dropdown {
  position: relative;
  
  .dropdown-trigger {
    cursor: none;
    
    .dropdown-arrow {
      font-size: 0.625rem;
      transition: transform 0.2s ease;
      margin-left: 0.25rem;
    }
  }
  
  &:hover .dropdown-trigger .dropdown-arrow {
    transform: rotate(180deg);
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 280px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px) saturate(180%);
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: none;
  
  &::after {
    display: none;
  }
  
  &:hover {
    background: rgba(0, 112, 243, 0.04);
    
    .item-title {
      color: #0070F3;
    }
  }
  
  .item-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .item-content {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    flex: 1;
    
    .item-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #000;
      transition: color 0.2s ease;
    }
    
    .item-desc {
      font-size: 0.75rem;
      color: #999;
      line-height: 1.4;
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 0.375rem;
  background: none;
  border: none;
  cursor: none;
  padding: 0.5rem;
  z-index: 101;
  
  span {
    width: 1.5rem;
    height: 1.5px;
    background: #000000;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(0.5rem, 0.5rem);
      background: #0070F3;
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:nth-child(3) {
      transform: rotate(-45deg) translate(0.5rem, -0.5rem);
      background: #0070F3;
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.5rem 1rem;
    margin-bottom: 0.25rem;
  }
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: #666666;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: transparent;
  cursor: none;
  
  &::after {
    display: none;
  }
  
  &:hover {
    color: #0070F3;
    background: rgba(0, 112, 243, 0.04);
  }
  
  .nav-icon {
    font-size: 1.125rem;
  }
  
  .nav-text {
    font-weight: 400;
    font-size: 0.875rem;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

@media (max-width: 1024px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
    cursor: auto;
  }
  
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-link,
  .mobile-nav-link {
    cursor: auto;
  }
}
</style>
