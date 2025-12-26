<template>
  <div class="reward-table">
    <div class="rewards-grid">
      <div 
        v-for="(reward, index) in rewards" 
        :key="index"
        class="reward-card"
        v-motion-slide-visible-bottom
        :delay="index * 150"
      >
        <div class="reward-header">
          <div class="reward-icon">{{ getRewardIcon(reward.benefit) }}</div>
          <h4 class="reward-title">{{ getRewardTitle(reward.benefit) }}</h4>
        </div>
        
        <div class="reward-content">
          <p class="reward-description">{{ reward.content }}</p>
        </div>
        
        <div class="reward-footer">
          <span class="reward-note">{{ reward.note }}</span>
        </div>

        <!-- 特殊效果 -->
        <div v-if="isSpecialReward(reward.benefit)" class="reward-shine"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Reward {
  benefit: string
  content: string
  note: string
}

defineProps<{
  rewards: Reward[]
}>()

const getRewardIcon = (benefit: string): string => {
  if (benefit.includes('🎓')) return '🎓'
  if (benefit.includes('💰')) return '💰'
  if (benefit.includes('🚌')) return '🚌'
  return '🎁'
}

const getRewardTitle = (benefit: string): string => {
  return benefit.replace(/🎓|💰|🚌|🎁/g, '').trim()
}

const isSpecialReward = (benefit: string): boolean => {
  return benefit.includes('期末成绩"复活甲"')
}
</script>

<style lang="scss" scoped>
.reward-table {
  margin: $spacing-xl 0;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-lg;

  @include respond-to(md) {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
}

.reward-card {
  @include card($spacing-lg);
  position: relative;
  transition: all $transition-slow;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: $shadow-lg, 0 0 30px rgba($color-primary, 0.2);
  }

  // 特殊奖励卡片（期末免考）
  &:first-child {
    border: 2px solid #ffd700;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 183, 0, 0.05));

    .reward-header {
      background: linear-gradient(135deg, #ffd700, #ffb700);
      color: white;
      margin: (-$spacing-lg) (-$spacing-lg) $spacing-lg;
      border-radius: $border-radius-lg $border-radius-lg 0 0;

      .reward-icon {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }

  .reward-header {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
    padding: $spacing-md;

    .reward-icon {
      width: 50px;
      height: 50px;
      background: $color-primary-light;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .reward-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
      line-height: 1.3;
    }
  }

  .reward-content {
    margin-bottom: $spacing-lg;

    .reward-description {
      color: $color-text-secondary;
      line-height: 1.6;
      margin: 0;
      font-size: 0.9375rem;
    }
  }

  .reward-footer {
    .reward-note {
      display: inline-block;
      background: $color-bg-muted;
      color: $color-text-secondary;
      font-size: 0.8125rem;
      padding: 0.25rem 0.75rem;
      border-radius: $border-radius;
      border: 1px solid $color-border;
      font-weight: 500;
    }
  }

  .reward-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: shine 3s infinite;
    pointer-events: none;
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

// 金钱奖励卡片特殊样式
.reward-card:nth-child(2) {
  border-color: #4ade80;
  
  .reward-header .reward-icon {
    background: rgba(74, 222, 128, 0.2);
    color: #16a34a;
  }
}

// 出行奖励卡片特殊样式  
.reward-card:nth-child(3) {
  border-color: #3b82f6;
  
  .reward-header .reward-icon {
    background: rgba(59, 130, 246, 0.2);
    color: #2563eb;
  }
}
</style>