/**
 * 讲义模板页面导航控制脚本
 * 功能：页面切换、键盘导航、触摸滑动支持、缩略图导航
 */

// 当前页码和总页数
let currentPage = 1;
let totalPages = 1;

/**
 * 初始化页面
 */
function init() {
  updateTotalPages(); // 从HTML中获取实际页数
  updatePageDisplay();
  bindEvents();
}

/**
 * 更新页面显示
 * 切换页面容器位置，更新页码指示器和按钮状态，调整字体大小
 */
function updatePageDisplay() {
  const container = document.getElementById('pageContainer');
  if (container) {
    container.style.transform = `translateX(-${(currentPage - 1) * 100}%)`;
  }
  
  // 更新页码显示
  const currentPageEl = document.getElementById('currentPage');
  if (currentPageEl) {
    currentPageEl.textContent = currentPage;
  }
  
  // 更新按钮状态
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  

  
  // 动态调整字体大小
  adjustFontSizeForCurrentPage();
}

/**
 * 调整当前页面的字体大小
 * 根据内容量自动调整，内容少则增大，内容多则减小
 */
function adjustFontSizeForCurrentPage() {
  const currentPageElement = document.querySelector(`.page:nth-child(${currentPage})`);
  if (!currentPageElement) return;
  
  const contentAmount = calculateContentAmount(currentPageElement);
  const fontSize = calculateFontSize(contentAmount);
  
  document.documentElement.style.setProperty('--base-font-size', `${fontSize}rem`);
}

/**
 * 更新总页数
 */
function updateTotalPages() {
  const totalPagesElement = document.getElementById('totalPages');
  if (totalPagesElement) {
    const actualTotalPages = document.querySelectorAll('.page').length;
    totalPagesElement.textContent = actualTotalPages;
    totalPages = actualTotalPages;
  }
}

/**
 * 计算页面内容量
 * @param {HTMLElement} pageElement - 页面元素
 * @returns {number} 内容量评分
 */
function calculateContentAmount(pageElement) {
  let score = 0;
  
  // 1. 计算字符数
  const textContent = pageElement.textContent || '';
  const charCount = textContent.length;
  score += charCount / 500; // 每500字符加1分
  
  // 2. 计算DOM元素数量
  const elementCount = pageElement.querySelectorAll('*').length;
  score += elementCount / 50; // 每50个元素加1分
  
  // 3. 计算内容高度
  const contentHeight = pageElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const heightRatio = contentHeight / windowHeight;
  score += heightRatio * 2; // 高度比例乘以2作为加分
  
  return score;
}

/**
 * 根据内容量计算合适的字体大小
 * @param {number} contentAmount - 内容量评分
 * @returns {number} 字体大小（rem）
 */
function calculateFontSize(contentAmount) {
  // 基础字体大小（至少1.5rem）
  const baseSize = 1.5;
  
  // 字体大小范围
  const minSize = 1.2; // 最小字体大小（至少1.2rem）
  const maxSize = 2.0; // 最大字体大小
  
  // 根据内容量调整字体大小
  // 内容量越少，字体越大；内容量越多，字体越小
  let fontSize = baseSize;
  
  if (contentAmount < 1) {
    // 内容很少，增大字体
    fontSize = Math.min(maxSize, baseSize + (1 - contentAmount) * 0.5);
  } else if (contentAmount > 3) {
    // 内容很多，减小字体
    fontSize = Math.max(minSize, baseSize - (contentAmount - 3) * 0.15);
  }
  
  // 确保字体大小在合理范围内
  return Math.max(minSize, Math.min(maxSize, fontSize));
}

/**
 * 监听窗口大小变化，重新调整字体大小
 */
function handleResize() {
  // 延迟执行，避免频繁计算
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    adjustFontSizeForCurrentPage();
  }, 200);
}



/**
 * 跳转到下一页
 */
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePageDisplay();
  }
}

/**
 * 跳转到上一页
 */
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageDisplay();
  }
}

/**
 * 跳转到指定页面
 * @param {number} page - 目标页码
 */
function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    updatePageDisplay();
  }
}

/**
 * 绑定事件监听器
 */
function bindEvents() {
  // 键盘导航
  document.addEventListener('keydown', handleKeyDown);
  
  // 触摸滑动支持
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // 按钮点击事件
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', prevPage);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', nextPage);
  }
  
  // 窗口大小变化事件
  window.addEventListener('resize', handleResize);
}

/**
 * 处理键盘事件
 * @param {KeyboardEvent} e - 键盘事件对象
 */
function handleKeyDown(e) {
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':
      e.preventDefault();
      nextPage();
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      prevPage();
      break;
    case 'Home':
      e.preventDefault();
      goToPage(1);
      break;
    case 'End':
      e.preventDefault();
      goToPage(totalPages);
      break;
  }
}

// 触摸滑动相关变量
let touchStartX = 0;
let touchEndX = 0;

/**
 * 处理触摸开始事件
 * @param {TouchEvent} e - 触摸事件对象
 */
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

/**
 * 处理触摸结束事件
 * @param {TouchEvent} e - 触摸事件对象
 */
function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

/**
 * 处理滑动手势
 * 根据滑动方向切换页面
 */
function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // 向左滑动，下一页
      nextPage();
    } else {
      // 向右滑动，上一页
      prevPage();
    }
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
