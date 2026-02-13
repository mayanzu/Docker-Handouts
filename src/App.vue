<template>
  <div id="app" :class="{ 'slide-mode': isSlideMode }">
    <div id="progress-bar" :style="{ width: scrollProgress + '%' }" v-if="!isSlideMode"></div>
    
    <canvas ref="bgCanvas" id="bgCanvas" v-if="!isSlideMode"></canvas>
    
    <NavigationBar v-if="!isSlideMode" />
    
    <main class="main-content" :class="{ 'slide-content': isSlideMode }">
      <router-view />
    </main>

    <BackToTop v-if="!isSlideMode" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import BackToTop from './components/BackToTop.vue'

const route = useRoute()

const isSlideMode = computed(() => {
  return route.path.startsWith('/lecture-')
})

// Canvas动画相关
const bgCanvas = ref<HTMLCanvasElement | null>(null)
const scrollProgress = ref(0)
let particles: Particle[] = []
let ripples: Ripple[] = []
let scrollSpeed = 0
let lastScrollY = 0
let isLongPress = false
let longPressTimer: number | null = null
let mouseX = 0
let mouseY = 0
let animationId: number | null = null
let rippleGenerationTimer = 0

// 波纹类
class Ripple {
  x: number
  y: number
  radius: number
  alpha: number
  active: boolean

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.radius = 0
    this.alpha = 0.8
    this.active = true
  }

  update() {
    this.radius += 5 // 波纹扩散速度
    this.alpha -= 0.015
    if (this.alpha <= 0) this.active = false
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(52, 152, 219, ${this.alpha})`
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  }
}

// 粒子类
class Particle {
  x: number
  y: number
  size: number
  baseSize: number
  type: string
  vy: number
  angle: number
  spin: number
  activation: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.size = Math.random() * 10 + 5
    this.baseSize = this.size
    this.type = ['circle', 'square', 'triangle', 'cross'][Math.floor(Math.random() * 4)]
    this.vy = -1 * (Math.random() * 0.3 + 0.1)
    this.angle = Math.random() * Math.PI * 2
    this.spin = (Math.random() - 0.5) * 0.02
    this.activation = 0
  }

  update(canvasWidth: number, canvasHeight: number, speed: number) {
    // 1. 基础滚动运动
    this.y += this.vy - speed
    this.angle += this.spin

    // 2. 检测与波纹的碰撞
    ripples.forEach(ripple => {
      const dx = this.x - ripple.x
      const dy = this.y - ripple.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (ripple.active && Math.abs(dist - ripple.radius) < 15) {
        this.activation = 1
      }
    })

    // 3. 激活状态衰减
    if (this.activation > 0) {
      this.activation -= 0.02
      if (this.activation < 0) this.activation = 0
    }

    // 4. 边界循环
    if (this.y < -50) this.y = canvasHeight + 50
    if (this.y > canvasHeight + 50) this.y = -50
    if (this.x < -50) this.x = canvasWidth + 50
    if (this.x > canvasWidth + 50) this.x = -50
  }

  draw(ctx: CanvasRenderingContext2D) {
    let currentColor = '#e0e0e0'
    let currentSize = this.baseSize

    // 颜色混合逻辑
    if (this.activation > 0) {
      currentColor = '#3498db'
      currentSize = this.baseSize * (1 + this.activation * 0.8)
    } else if (Math.abs(scrollSpeed) > 2) {
      currentColor = '#b0c4de'
    }

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle + (this.activation * Math.PI))
    
    ctx.globalAlpha = 0.6 + (this.activation * 0.4)
    ctx.fillStyle = currentColor
    ctx.strokeStyle = currentColor
    ctx.lineWidth = 2

    switch (this.type) {
      case 'circle':
        ctx.beginPath()
        ctx.arc(0, 0, currentSize / 2, 0, Math.PI * 2)
        ctx.fill()
        break
      case 'square':
        ctx.strokeRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize)
        break
      case 'triangle':
        ctx.beginPath()
        ctx.moveTo(0, -currentSize / 2)
        ctx.lineTo(currentSize / 2, currentSize / 2)
        ctx.lineTo(-currentSize / 2, currentSize / 2)
        ctx.closePath()
        ctx.fill()
        break
      case 'cross':
        ctx.beginPath()
        ctx.moveTo(0, -currentSize / 2)
        ctx.lineTo(0, currentSize / 2)
        ctx.moveTo(-currentSize / 2, 0)
        ctx.lineTo(currentSize / 2, 0)
        ctx.stroke()
        break
    }

    ctx.restore()
  }
}

// 初始化Canvas
const initCanvas = () => {
  if (!bgCanvas.value) return

  const canvas = bgCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置canvas尺寸
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // 创建粒子
  particles = []
  for (let i = 0; i < 45; i++) {
    particles.push(new Particle(canvas.width, canvas.height))
  }

  // 动画循环
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    scrollSpeed *= 0.95
    if (Math.abs(scrollSpeed) < 0.01) scrollSpeed = 0

    // 1. 生成新波纹
    if (isLongPress) {
      rippleGenerationTimer++
      if (rippleGenerationTimer > 15) {
        ripples.push(new Ripple(mouseX, mouseY))
        rippleGenerationTimer = 0
      }
    }

    // 2. 更新并绘制波纹
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i]
      r.update()
      r.draw(ctx)
      if (!r.active) {
        ripples.splice(i, 1)
      }
    }

    // 3. 更新并绘制粒子
    particles.forEach(particle => {
      particle.update(canvas.width, canvas.height, scrollSpeed)
      particle.draw(ctx)
    })

    animationId = requestAnimationFrame(animate)
  }
  animate()
}

// 处理滚动
const handleScroll = () => {
  const currentScrollY = window.scrollY
  const delta = currentScrollY - lastScrollY
  scrollSpeed += delta * 0.15
  lastScrollY = currentScrollY

  // 更新进度条
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0
}

// 处理鼠标按下（长按开始）
const handleMouseDown = (e: MouseEvent | TouchEvent) => {
  if ('touches' in e) {
    mouseX = e.touches[0].clientX
    mouseY = e.touches[0].clientY
  } else {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  longPressTimer = window.setTimeout(() => {
    isLongPress = true
    // 清除文本选择
    if (window.getSelection) {
      window.getSelection()?.removeAllRanges()
    }
    document.body.classList.add('mode-interaction')
    // 立即产生第一个波纹
    ripples.push(new Ripple(mouseX, mouseY))
  }, 500)
}

// 处理鼠标抬起（长按结束）
const handleMouseUp = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  isLongPress = false
  document.body.classList.remove('mode-interaction')
}

// 处理鼠标移动（更新聚光灯位置）
const handleCanvasMouseMove = (e: MouseEvent | TouchEvent) => {
  if ('touches' in e) {
    mouseX = e.touches[0].clientX
    mouseY = e.touches[0].clientY
  } else {
    mouseX = e.clientX
    mouseY = e.clientY
  }
}

onMounted(() => {
  // 初始化Canvas动画
  initCanvas()

  // 添加事件监听器
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('mousemove', handleCanvasMouseMove)
  window.addEventListener('touchstart', handleMouseDown as any)
  window.addEventListener('touchend', handleMouseUp)
  window.addEventListener('touchmove', handleCanvasMouseMove as any)
  window.addEventListener('contextmenu', (e) => {
    if (isLongPress) e.preventDefault()
  })

  // 初始化滚动位置
  lastScrollY = window.scrollY
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('mousemove', handleCanvasMouseMove)
  window.removeEventListener('touchstart', handleMouseDown as any)
  window.removeEventListener('touchend', handleMouseUp)
  window.removeEventListener('touchmove', handleCanvasMouseMove as any)

  // 清理动画
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (longPressTimer) {
    clearTimeout(longPressTimer)
  }
})
</script>

<style lang="scss">
#progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  z-index: 100;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
}

#bgCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.main-content {
  min-height: calc(100vh - 70px);
  padding-top: 70px;
  
  &.slide-content {
    min-height: 100vh;
    padding-top: 0;
  }
}

#app.slide-mode {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

:global(body.mode-interaction) {
  cursor: crosshair !important;
  user-select: none;
}
</style>