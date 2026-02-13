<template>
  <div class="slide-progress">
    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>
    
    <div class="section-markers" v-if="sections.length > 0">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="section-marker"
        :class="{ active: isSectionActive(section) }"
        :style="{ left: getSectionPosition(section) + '%' }"
        :title="section.title"
      >
        <span class="marker-dot"></span>
        <span class="marker-label">{{ section.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Section {
  title: string
  slideStart: number
  slideEnd: number
}

interface Props {
  current: number
  total: number
  sections?: Section[]
}

const props = withDefaults(defineProps<Props>(), {
  sections: () => []
})

const progressPercent = computed(() => {
  if (props.total <= 1) return 0
  return ((props.current - 1) / (props.total - 1)) * 100
})

const isSectionActive = (section: Section) => {
  return props.current >= section.slideStart && props.current <= section.slideEnd
}

const getSectionPosition = (section: Section) => {
  if (props.total <= 1) return 0
  return (section.slideStart / (props.total - 1)) * 100
}
</script>

<style lang="scss" scoped>
.slide-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: 100;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #0070F3 0%, #00D4FF 100%);
    transition: width 0.3s ease;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 112, 243, 0.5);
    }
  }
}

.section-markers {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
}

.section-marker {
  position: absolute;
  top: -2px;
  transform: translateX(-50%);
  
  .marker-dot {
    display: block;
    width: 8px;
    height: 8px;
    background: #fff;
    border: 2px solid #cbd5e1;
    border-radius: 50%;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.3);
      border-color: #0070F3;
    }
  }
  
  .marker-label {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.625rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }
  
  &:hover .marker-label,
  &.active .marker-label {
    opacity: 1;
  }
  
  &.active .marker-dot {
    background: #0070F3;
    border-color: #0070F3;
    box-shadow: 0 0 10px rgba(0, 112, 243, 0.5);
  }
}
</style>
