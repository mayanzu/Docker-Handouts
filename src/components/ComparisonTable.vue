<template>
  <div class="comparison-table">
    <div class="table-container">
      <div 
        v-for="(track, index) in tracks" 
        :key="track.theme"
        class="track-card"
        :class="{ recommended: track.recommended.includes('推荐') }"
        v-motion-slide-visible-bottom
        :delay="index * 150"
      >
        <div class="track-header">
          <h4 class="track-title">{{ track.theme }}</h4>
          <div class="track-badge" :class="getDifficultyClass(track.difficulty)">
            {{ track.difficulty }}
          </div>
        </div>
        
        <div class="track-content">
          <p class="track-description">{{ track.content }}</p>
        </div>
        
        <div class="track-footer">
          <div class="recommendation" :class="getRecommendationClass(track.recommended)">
            {{ track.recommended }}
          </div>
        </div>

        <!-- 推荐徽章 -->
        <div v-if="track.recommended.includes('推荐')" class="recommended-badge">
          ⭐ 最佳选择
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Track {
  theme: string
  content: string
  difficulty: string
  recommended: string
}

defineProps<{
  tracks: Track[]
}>()

const getDifficultyClass = (difficulty: string) => {
  if (difficulty.includes('高')) return 'high'
  if (difficulty.includes('中')) return 'medium'
  if (difficulty.includes('低')) return 'low'
  return ''
}

const getRecommendationClass = (recommendation: string) => {
  if (recommendation.includes('强烈推荐')) return 'highly-recommended'
  if (recommendation.includes('推荐')) return 'recommended'
  if (recommendation.includes('不推荐')) return 'not-recommended'
  return ''
}
</script>

<style lang="scss" scoped>
.comparison-table {
  margin: $spacing-xl 0;
}

.table-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-lg;

  @include respond-to(md) {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
}

.track-card {
  @include card($spacing-lg);
  position: relative;
  transition: all $transition-slow;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: $shadow-lg;
  }

  &.recommended {
    border: 2px solid $color-primary;
    background: linear-gradient(135deg, rgba($color-primary, 0.05), rgba($color-primary, 0.02));

    .track-header {
      background: linear-gradient(135deg, $color-primary, $color-primary-dark);
      color: white;
      margin: (-$spacing-lg) (-$spacing-lg) $spacing-lg;
      border-radius: $border-radius-lg $border-radius-lg 0 0;
    }
  }

  .track-header {
    padding: $spacing-md;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;

    .track-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
    }

    .track-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      border-radius: $border-radius;
      
      &.high {
        background: $color-danger-light;
        color: $color-danger;
      }
      
      &.medium {
        background: $color-warning-light;
        color: $color-warning;
      }
      
      &.low {
        background: $color-success-light;
        color: $color-success;
      }
    }
  }

  .track-content {
    margin-bottom: $spacing-lg;

    .track-description {
      color: $color-text-secondary;
      line-height: 1.6;
      margin: 0;
    }
  }

  .track-footer {
    .recommendation {
      font-weight: 600;
      padding: $spacing-sm $spacing-md;
      border-radius: $border-radius-lg;
      text-align: center;
      font-size: 0.875rem;

      &.highly-recommended {
        background: $color-success-light;
        color: $color-success;
        border: 1px solid $color-success;
      }

      &.recommended {
        background: $color-info-light;
        color: $color-info;
        border: 1px solid $color-info;
      }

      &.not-recommended {
        background: $color-danger-light;
        color: $color-danger;
        border: 1px solid $color-danger;
      }
    }
  }

  .recommended-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: linear-gradient(135deg, #ffd700, #ffb700);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: $border-radius;
    box-shadow: $shadow-md;
    @include pulse;
  }
}

// 特殊样式 - 推荐卡片的动画
.track-card.recommended {
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: $shadow-sm, 0 0 5px rgba($color-primary, 0.3);
  }
  to {
    box-shadow: $shadow-md, 0 0 20px rgba($color-primary, 0.4);
  }
}
</style>