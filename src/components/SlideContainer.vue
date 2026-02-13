<template>
  <div class="slide-container" :class="{ 'fullscreen': isFullscreen }">
    <div class="slide-wrapper">
      <Transition
        :name="transitionName"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @after-enter="onAfterEnter"
      >
        <div
          :key="currentSlide"
          class="slide"
          :class="[`slide-${currentSlide}`, slideType]"
        >
          <slot :name="`slide-${currentSlide}`" :slideIndex="currentSlide">
            <div class="slide-placeholder">
              <p>幻灯片 {{ currentSlide + 1 }} / {{ totalSlides }}</p>
            </div>
          </slot>
        </div>
      </Transition>
    </div>

    <SlideProgress
      :current="currentSlide + 1"
      :total="totalSlides"
      :sections="sections"
    />

    <SlideNavigation
      :current="currentSlide"
      :total="totalSlides"
      :isFullscreen="isFullscreen"
      @prev="prevSlide"
      @next="nextSlide"
      @toggle-fullscreen="toggleFullscreen"
      @go-to="goToSlide"
    />

    <div class="slide-hint" v-if="showHint">
      <span class="hint-key">←</span>
      <span class="hint-key">→</span>
      <span class="hint-text">切换幻灯片</span>
      <span class="hint-key">F</span>
      <span class="hint-text">全屏</span>
      <span class="hint-key">ESC</span>
      <span class="hint-text">退出</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import SlideProgress from './SlideProgress.vue'
import SlideNavigation from './SlideNavigation.vue'

interface Section {
  title: string
  slideStart: number
  slideEnd: number
}

interface Props {
  totalSlides: number
  sections?: Section[]
  showHint?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sections: () => [],
  showHint: true
})

const currentSlide = ref(0)
const isFullscreen = ref(false)
const transitionName = ref('slide-left')
const slideType = ref('')

const emit = defineEmits<{
  (e: 'slide-change', index: number): void
  (e: 'fullscreen-change', isFullscreen: boolean): void
}>()

const nextSlide = () => {
  if (currentSlide.value < props.totalSlides - 1) {
    transitionName.value = 'slide-left'
    currentSlide.value++
    emit('slide-change', currentSlide.value)
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    transitionName.value = 'slide-right'
    currentSlide.value--
    emit('slide-change', currentSlide.value)
  }
}

const goToSlide = (index: number) => {
  if (index >= 0 && index < props.totalSlides) {
    transitionName.value = index > currentSlide.value ? 'slide-left' : 'slide-right'
    currentSlide.value = index
    emit('slide-change', currentSlide.value)
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
  emit('fullscreen-change', isFullscreen.value)
}

const onBeforeEnter = () => {
  slideType.value = 'entering'
}

const onAfterEnter = () => {
  slideType.value = ''
}

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':
    case 'PageDown':
      e.preventDefault()
      nextSlide()
      break
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      e.preventDefault()
      prevSlide()
      break
    case 'Home':
      e.preventDefault()
      goToSlide(0)
      break
    case 'End':
      e.preventDefault()
      goToSlide(props.totalSlides - 1)
      break
    case 'f':
    case 'F':
      e.preventDefault()
      toggleFullscreen()
      break
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
  emit('fullscreen-change', isFullscreen.value)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

provide('slideContext', {
  currentSlide,
  totalSlides: computed(() => props.totalSlides),
  nextSlide,
  prevSlide,
  goToSlide
})
</script>

<style lang="scss" scoped>
.slide-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  overflow: hidden;
  z-index: 1000;
}

.slide-wrapper {
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.slide {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  &.entering {
    animation: slideEnter 0.3s ease-out;
  }
}

.slide-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 2rem;
  color: #94a3b8;
}

.slide-hint {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50px;
  color: #fff;
  font-size: 0.875rem;
  opacity: 0.7;
  transition: opacity 0.3s;
  z-index: 100;
  
  &:hover {
    opacity: 1;
  }
  
  .hint-key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    padding: 0 8px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.75rem;
  }
  
  .hint-text {
    color: #94a3b8;
    margin-right: 1rem;
  }
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.98);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-50px) scale(0.98);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px) scale(0.98);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.98);
}

@keyframes slideEnter {
  from {
    opacity: 0;
    transform: scale(0.99);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .slide-wrapper {
    padding: 0.5rem;
  }
  
  .slide {
    border-radius: 6px;
  }
  
  .slide-hint {
    display: none;
  }
}
</style>
