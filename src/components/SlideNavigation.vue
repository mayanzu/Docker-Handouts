<template>
  <div class="slide-navigation">
    <div class="nav-left">
      <button
        class="nav-btn prev"
        :disabled="current === 0"
        @click="$emit('prev')"
        title="上一页 (←)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>

    <div class="nav-center">
      <div class="slide-counter">
        <span class="current">{{ String(current + 1).padStart(2, '0') }}</span>
        <span class="separator">/</span>
        <span class="total">{{ String(total).padStart(2, '0') }}</span>
      </div>
    </div>

    <div class="nav-right">
      <button
        class="nav-btn fullscreen"
        @click="$emit('toggle-fullscreen')"
        :title="isFullscreen ? '退出全屏 (ESC)' : '全屏 (F)'"
      >
        <svg v-if="!isFullscreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
        </svg>
      </button>

      <button
        class="nav-btn next"
        :disabled="current === total - 1"
        @click="$emit('next')"
        title="下一页 (→)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>

    <div class="slide-thumbnails" v-if="showThumbnails">
      <div class="thumbnails-header">
        <span>幻灯片导航</span>
        <button class="close-btn" @click="showThumbnails = false">×</button>
      </div>
      <div class="thumbnails-grid">
        <button
          v-for="i in total"
          :key="i"
          class="thumbnail"
          :class="{ active: current === i - 1 }"
          @click="$emit('go-to', i - 1); showThumbnails = false"
        >
          <span class="thumbnail-number">{{ i }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  current: number
  total: number
  isFullscreen: boolean
}

defineProps<Props>()

defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'toggle-fullscreen'): void
  (e: 'go-to', index: number): void
}>()

const showThumbnails = ref(false)
</script>

<style lang="scss" scoped>
.slide-navigation {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-center {
  display: flex;
  align-items: center;
}

.slide-counter {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  
  .current {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0070F3;
  }
  
  .separator {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0 0.25rem;
  }
  
  .total {
    font-size: 1rem;
    color: #64748b;
  }
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    width: 22px;
    height: 22px;
  }
  
  &:hover:not(:disabled) {
    background: rgba(0, 112, 243, 0.1);
    color: #0070F3;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &.prev,
  &.next {
    background: rgba(0, 0, 0, 0.03);
    
    &:hover:not(:disabled) {
      background: #0070F3;
      color: #fff;
    }
  }
  
  &.fullscreen {
    svg {
      width: 20px;
      height: 20px;
    }
  }
}

.slide-thumbnails {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  padding: 1.25rem;
  z-index: 200;
  
  .thumbnails-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #334155;
    
    .close-btn {
      width: 28px;
      height: 28px;
      border: none;
      background: transparent;
      font-size: 1.5rem;
      color: #94a3b8;
      cursor: pointer;
      border-radius: 6px;
      
      &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #334155;
      }
    }
  }
  
  .thumbnails-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    gap: 0.5rem;
  }
  
  .thumbnail {
    aspect-ratio: 16/9;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      border-color: #0070F3;
      transform: scale(1.05);
    }
    
    &.active {
      border-color: #0070F3;
      background: rgba(0, 112, 243, 0.1);
    }
    
    .thumbnail-number {
      font-size: 0.875rem;
      font-weight: 600;
      color: #64748b;
    }
  }
}

@media (max-width: 768px) {
  .slide-navigation {
    padding: 0 1rem;
    height: 50px;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  .slide-counter {
    .current {
      font-size: 1rem;
    }
    
    .separator,
    .total {
      font-size: 0.875rem;
    }
  }
}
</style>
