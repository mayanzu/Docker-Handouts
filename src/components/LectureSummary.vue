<template>
  <section class="lecture-summary" v-motion-slide-visible-bottom>
    <h2>课程小结</h2>
    
    <div class="summary-content">
      <!-- 知识点回顾 -->
      <div class="summary-section" v-motion-slide-visible-left :delay="200">
        <h3>知识点回顾</h3>
        <ul class="checklist">
          <li v-for="point in keyPoints" :key="point" v-html="point"></li>
        </ul>
      </div>

      <!-- 重点记忆 -->
      <div class="summary-section" v-motion-slide-visible-right :delay="300">
        <h3>重点记忆</h3>
        <div class="memory-table">
          <div 
            v-for="(item, index) in memoryPoints" 
            :key="index"
            class="memory-item"
            v-motion-slide-visible-bottom
            :delay="400 + index * 100"
          >
            <div class="memory-module">{{ item.module }}</div>
            <div class="memory-score">{{ item.score }}</div>
            <div class="memory-skill" v-html="item.skill"></div>
          </div>
        </div>
      </div>

      <!-- 下一课预告 -->
      <div class="next-lecture" v-motion-slide-visible-bottom :delay="600">
        <div class="next-content">
          <h3>{{ nextLecture.title }}</h3>
          <p>{{ nextLecture.description }}</p>
          <router-link :to="nextLecture.link" class="next-button">
            {{ nextLecture.buttonText }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface MemoryPoint {
  module: string
  score: string
  skill: string
}

interface NextLecture {
  title: string
  description: string
  link: string
  buttonText: string
}

defineProps<{
  keyPoints: string[]
  memoryPoints: MemoryPoint[]
  nextLecture: NextLecture
}>()
</script>

<style lang="scss" scoped>
.lecture-summary {
  margin-top: $spacing-xxl;
  padding: $spacing-xl;
  background: linear-gradient(135deg, $color-bg-subtle, rgba($color-primary, 0.05));
  border-radius: $border-radius-lg;
  border: 1px solid $color-border;

  h2 {
    text-align: center;
    color: $color-heading;
    margin-bottom: $spacing-xl;
    font-size: 2rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, $color-primary, $color-primary-light);
      border-radius: 2px;
    }
  }
}

.summary-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xl;
  margin-bottom: $spacing-xl;

  @include respond-to(lg) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
}

.summary-section {
  @include card($spacing-lg);

  h3 {
    color: $color-primary;
    margin-bottom: $spacing-md;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    &::before {
      content: '📋';
      font-size: 1.5rem;
    }

    &:nth-child(1)::before {
      content: '📋';
    }
  }

  .checklist {
    margin-left: 0;
    
    li {
      margin-bottom: $spacing-sm;
      padding: $spacing-sm;
      background: rgba($color-primary, 0.05);
      border-left: 3px solid $color-primary;
      border-radius: 0 $border-radius $border-radius 0;
      transition: all $transition-fast;

      &:hover {
        background: rgba($color-primary, 0.1);
        transform: translateX(5px);
      }

      &::before {
        color: $color-primary;
        font-weight: 600;
        margin-right: $spacing-sm;
      }
    }
  }
}

.memory-table {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.memory-item {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: $spacing-md;
  padding: $spacing-sm $spacing-md;
  background: rgba($color-primary, 0.05);
  border-radius: $border-radius;
  align-items: center;
  transition: all $transition-fast;

  &:hover {
    background: rgba($color-primary, 0.1);
    transform: scale(1.02);
  }

  .memory-module {
    font-weight: 500;
    color: $color-text;
  }

  .memory-score {
    font-weight: 600;
    color: $color-primary;
    text-align: center;
    background: $color-primary-light;
    padding: 0.25rem 0.5rem;
    border-radius: $border-radius;
    font-size: 0.875rem;
  }

  .memory-skill {
    font-size: 0.875rem;
    color: $color-text-secondary;
    text-align: right;

    code {
      background: rgba($color-primary, 0.1);
      color: $color-primary;
      font-weight: 500;
    }
  }
}

.next-lecture {
  grid-column: 1 / -1;
  text-align: center;
  
  .next-content {
    @include card($spacing-xl);
    background: linear-gradient(135deg, $color-primary, $color-primary-dark);
    color: white;
    border: none;

    h3 {
      color: white;
      margin-bottom: $spacing-md;
      font-size: 1.5rem;

      &::before {
        content: '🚀';
        margin-right: $spacing-sm;
      }
    }

    p {
      margin-bottom: $spacing-lg;
      opacity: 0.9;
      line-height: 1.6;
    }

    .next-button {
      @include button-primary;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: $spacing-md $spacing-xl;
      font-size: 1.125rem;
      font-weight: 600;
      border-radius: $border-radius-lg;
      text-decoration: none;

      &:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
        box-shadow: $shadow-lg;
      }
    }
  }
}

// 响应式调整
@include respond-to(md) {
  .memory-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: $spacing-xs;

    .memory-skill {
      text-align: center;
    }
  }

  .lecture-summary {
    padding: $spacing-lg;
  }
}
</style>