<template>
  <div class="timeline">
    <div class="timeline-container">
      <div 
        v-for="(event, index) in events" 
        :key="index"
        class="timeline-item"
        :class="{ current: event.status === 'current', completed: event.status === 'completed' }"
        v-motion-slide-visible-bottom
        :delay="index * 200"
      >
        <div class="timeline-marker">
          <div class="timeline-dot">
            <span v-if="event.status === 'completed'">✓</span>
            <span v-else-if="event.status === 'current'">⏰</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div v-if="index < events.length - 1" class="timeline-line"></div>
        </div>
        
        <div class="timeline-content">
          <div class="timeline-period">{{ event.period }}</div>
          <h4 class="timeline-title">{{ event.title }}</h4>
          <p class="timeline-description">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimelineEvent {
  period: string
  title: string
  description: string
  status: 'completed' | 'current' | 'upcoming'
}

defineProps<{
  events: TimelineEvent[]
}>()
</script>

<style lang="scss" scoped>
.timeline {
  margin: $spacing-xl 0;
}

.timeline-container {
  max-width: 800px;
  margin: 0 auto;
}

.timeline-item {
  display: flex;
  margin-bottom: $spacing-xl;
  position: relative;

  &:last-child {
    margin-bottom: 0;

    .timeline-line {
      display: none;
    }
  }

  &.current {
    .timeline-dot {
      background: linear-gradient(135deg, #ffd700, #ffb700);
      color: white;
      @include pulse;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    }

    .timeline-content {
      .timeline-title {
        color: #ffb700;
      }
    }
  }

  &.completed {
    .timeline-dot {
      background: $color-success;
      color: white;
    }

    .timeline-content {
      opacity: 0.8;
      
      .timeline-title {
        color: $color-success;
      }
    }
  }
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: $spacing-lg;
  min-width: 60px;
}

.timeline-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: $color-primary;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: $shadow-md;
  position: relative;
  z-index: 2;
  transition: all $transition-slow;

  &:hover {
    transform: scale(1.1);
  }
}

.timeline-line {
  width: 3px;
  flex: 1;
  background: linear-gradient(to bottom, $color-primary, $color-primary-light);
  margin-top: $spacing-sm;
  border-radius: 2px;
  min-height: 40px;
}

.timeline-content {
  flex: 1;
  padding: $spacing-sm 0;
  transition: all $transition-base;

  .timeline-period {
    font-size: 0.875rem;
    font-weight: 600;
    color: $color-primary;
    margin-bottom: $spacing-xs;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .timeline-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: $color-heading;
    margin-bottom: $spacing-sm;
    line-height: 1.3;
  }

  .timeline-description {
    color: $color-text-secondary;
    line-height: 1.6;
    margin: 0;
  }
}

// 响应式设计
@include respond-to(md) {
  .timeline-item {
    flex-direction: column;
    margin-bottom: $spacing-lg;
  }

  .timeline-marker {
    flex-direction: row;
    margin-right: 0;
    margin-bottom: $spacing-md;
    min-width: auto;
  }

  .timeline-line {
    width: 100px;
    height: 3px;
    margin-top: 0;
    margin-left: $spacing-sm;
    background: linear-gradient(to right, $color-primary, $color-primary-light);
  }

  .timeline-dot {
    width: 40px;
    height: 40px;
    font-size: 0.75rem;
  }
}
</style>