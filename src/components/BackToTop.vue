<template>
  <Transition name="back-to-top">
    <button 
      v-if="isVisible"
      @click="scrollToTop"
      class="back-to-top-btn"
      aria-label="返回顶部"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.back-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  color: #000000;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    color: #0070F3;
    border-color: rgba(0, 112, 243, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 112, 243, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-to-top-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(1rem);
}

.back-to-top-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(1rem);
}

@media (max-width: 768px) {
  .back-to-top-btn {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 44px;
    height: 44px;
    cursor: auto;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>