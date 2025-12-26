<template>
  <div class="animated-table">
    <div class="table-container" v-motion-slide-visible-bottom>
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" 
                :key="header"
                v-motion-slide-visible-top
                :delay="index * 50">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" 
              :key="rowIndex"
              v-motion-slide-visible-left
              :delay="rowIndex * 100">
            <td v-for="(cell, cellIndex) in Object.values(row)" 
                :key="cellIndex"
                v-motion-slide-visible-right
                :delay="rowIndex * 100 + cellIndex * 25">
              <span v-if="cellIndex === 0" class="module-name">{{ cell }}</span>
              <span v-else v-html="cell"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TableRow {
  [key: string]: string
}

const props = defineProps<{
  data: TableRow[]
}>()

const headers = computed(() => {
  if (props.data.length > 0) {
    return Object.keys(props.data[0]).map(key => {
      // 将key转换为更友好的显示名称
      const keyMap: { [key: string]: string } = {
        'module': '模块',
        'content': '内容',
        'score': '分值',
        'type': '题型',
        'theme': '主题',
        'difficulty': '难度',
        'recommended': '推荐度'
      }
      return keyMap[key] || key
    })
  }
  return []
})
</script>

<style lang="scss" scoped>
.animated-table {
  margin: $spacing-lg 0;
  overflow-x: auto;
}

.table-container {
  min-width: 600px;
  
  @include respond-to(md) {
    min-width: auto;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  background: $color-bg;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
  border: 1px solid $color-border;

  th {
    background: linear-gradient(135deg, $color-primary, $color-primary-dark);
    color: white;
    padding: $spacing-md $spacing-lg;
    text-align: left;
    font-weight: 600;
    font-size: 0.875rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    }
  }

  td {
    padding: $spacing-md $spacing-lg;
    border-bottom: 1px solid $color-border-muted;
    transition: background $transition-fast;

    .module-name {
      font-weight: 600;
      color: $color-primary;
      background: $color-primary-light;
      padding: 0.25rem 0.5rem;
      border-radius: $border-radius;
      font-size: 0.875rem;
    }
  }

  tr {
    transition: all $transition-fast;

    &:hover {
      background: $color-bg-subtle;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    &:last-child td {
      border-bottom: none;
    }
  }
}

// 响应式表格
@include respond-to(md) {
  .animated-table {
    font-size: 0.875rem;
  }

  table {
    th, td {
      padding: 0.5rem 0.75rem;
    }
  }
}
</style>