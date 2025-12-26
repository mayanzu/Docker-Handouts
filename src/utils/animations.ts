// 简单的动画工具函数和指令
export interface AnimationOptions {
  delay?: number
  duration?: string
  easing?: string
}

// 滚动动画观察器
class ScrollAnimationObserver {
  private observer: IntersectionObserver
  private elements: Map<Element, AnimationOptions> = new Map()

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const options = this.elements.get(element) || {}
            
            this.animateElement(element, options)
            this.observer.unobserve(element)
            this.elements.delete(element)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
  }

  observe(element: Element, options: AnimationOptions = {}) {
    this.elements.set(element, options)
    this.observer.observe(element)
  }

  private animateElement(element: HTMLElement, options: AnimationOptions) {
    const { delay = 0, duration = '0.6s', easing = 'ease-out' } = options
    
    // 添加动画类
    element.style.transition = `all ${duration} ${easing}`
    
    if (delay > 0) {
      setTimeout(() => {
        element.classList.add('animate-in')
      }, delay)
    } else {
      element.classList.add('animate-in')
    }
  }

  disconnect() {
    this.observer.disconnect()
    this.elements.clear()
  }
}

// 全局动画观察器实例
let globalObserver: ScrollAnimationObserver | null = null

// Vue 指令
export const vMotionSlideVisibleBottom = {
  mounted(el: HTMLElement, binding: any) {
    // 确保全局观察器存在
    if (!globalObserver) {
      globalObserver = new ScrollAnimationObserver()
    }

    // 设置初始状态
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    
    // 添加CSS类用于动画
    el.classList.add('motion-slide-bottom')
    
    // 注册观察
    const options: AnimationOptions = {
      delay: binding.value || 0,
      duration: binding.modifiers?.fast ? '0.3s' : '0.6s',
      easing: binding.modifiers?.bounce ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease-out'
    }
    
    globalObserver.observe(el, options)
  }
}

export const vMotionSlideVisibleLeft = {
  mounted(el: HTMLElement, binding: any) {
    if (!globalObserver) {
      globalObserver = new ScrollAnimationObserver()
    }

    el.style.opacity = '0'
    el.style.transform = 'translateX(-30px)'
    el.classList.add('motion-slide-left')
    
    const options: AnimationOptions = {
      delay: binding.value || 0,
      duration: '0.6s',
      easing: 'ease-out'
    }
    
    globalObserver.observe(el, options)
  }
}

export const vMotionSlideVisibleRight = {
  mounted(el: HTMLElement, binding: any) {
    if (!globalObserver) {
      globalObserver = new ScrollAnimationObserver()
    }

    el.style.opacity = '0'
    el.style.transform = 'translateX(30px)'
    el.classList.add('motion-slide-right')
    
    const options: AnimationOptions = {
      delay: binding.value || 0,
      duration: '0.6s',
      easing: 'ease-out'
    }
    
    globalObserver.observe(el, options)
  }
}

export const vMotionSlideVisibleTop = {
  mounted(el: HTMLElement, binding: any) {
    if (!globalObserver) {
      globalObserver = new ScrollAnimationObserver()
    }

    el.style.opacity = '0'
    el.style.transform = 'translateY(-30px)'
    el.classList.add('motion-slide-top')
    
    const options: AnimationOptions = {
      delay: binding.value || 0,
      duration: '0.6s',
      easing: 'ease-out'
    }
    
    globalObserver.observe(el, options)
  }
}

// 清理函数
export const cleanupAnimationObserver = () => {
  if (globalObserver) {
    globalObserver.disconnect()
    globalObserver = null
  }
}