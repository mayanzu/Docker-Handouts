<template>
  <nav class="lecture-sidebar" :class="{ open: isOpen }">
    <button class="sidebar-toggle" @click="toggleSidebar">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <div class="sidebar-content">
      <h3 class="sidebar-title">课程导航</h3>
      <div class="sidebar-nav">
        <a 
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="sidebar-link"
          :class="{ 
            'sub-link': section.level === 2,
            'active': activeSection === section.id 
          }"
          @click="scrollToSection(section.id)"
        >
          {{ section.title }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Section {
  id: string
  title: string
  level?: number
}

defineProps<{
  sections: Section[]
}>()

const isOpen = ref(false)
const activeSection = ref('')

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  // 在移动端点击后关闭侧边栏
  if (window.innerWidth <= 768) {
    isOpen.value = false
  }
}

const handleScroll = () => {
  const sections = document.querySelectorAll('section[id], header[id]')
  let currentSection = ''

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= 100 && rect.bottom > 100) {
      currentSection = section.id
    }
  })

  activeSection.value = currentSection
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始化当前section
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.lecture-sidebar {
  position: fixed;
  top: 70px; // 导航栏高度
  left: 0;
  width: 280px;
  height: calc(100vh - 70px);
  background: $color-bg-subtle;
  border-right: 1px solid $color-border;
  z-index: 100;
  overflow-y: auto;
  transition: transform $transition-base;

  @include respond-to(lg) {
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
    }
  }

  @include respond-to(md) {
    width: 260px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: $color-border;
    border-radius: 3px;
  }
}

.sidebar-toggle {
  display: none;
  position: absolute;
  top: 1rem;
  right: -50px;
  width: 40px;
  height: 40px;
  background: $color-primary;
  border: none;
  border-radius: 0 $border-radius-lg $border-radius-lg 0;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  z-index: 101;

  @include respond-to(lg) {
    display: flex;
  }

  span {
    width: 20px;
    height: 2px;
    background: white;
    transition: all $transition-base;
    transform-origin: center;
  }

  &:hover {
    background: $color-primary-dark;
  }
}

.sidebar-content {
  padding: $spacing-lg 0;
}

.sidebar-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: $color-text-secondary;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: $spacing-md;
  padding: 0 $spacing-lg;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-link {
  display: block;
  padding: 0.5rem $spacing-lg;
  color: $color-text;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all $transition-fast;
  border-left: 3px solid transparent;

  &:hover {
    background: $color-bg-muted;
    color: $color-primary;
  }

  &.active {
    background: $color-primary-light;
    color: $color-primary;
    border-left-color: $color-primary;
    font-weight: 500;
  }

  &.sub-link {
    padding-left: $spacing-xl;
    font-size: 0.8125rem;
    color: $color-text-secondary;

    &:hover {
      color: $color-text;
    }

    &.active {
      color: $color-primary;
    }
  }
}

// 为主内容区域添加左边距（仅在桌面端）
:global(.lecture-content) {
  @include respond-to(lg) {
    margin-left: 280px;
  }
}
</style>