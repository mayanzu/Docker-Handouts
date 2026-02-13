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
  // 获取当前页面元素
  const currentPageElement = document.querySelector(`.page:nth-child(${currentPage})`);
  if (!currentPageElement) return;
  
  // 计算内容量
  const contentAmount = calculateContentAmount(currentPageElement);
  
  // 根据内容量计算合适的字体大小
  const fontSize = calculateFontSize(contentAmount);
  
  // 应用字体大小
  document.documentElement.style.setProperty('--base-font-size', `${fontSize}rem`);
  
  // 检查内容是否溢出，需要分页
  setTimeout(() => {
    checkContentOverflow();
  }, 300); // 延迟检查，确保字体大小已应用
}

/**
 * 检查内容是否溢出，需要自动分页
 */
function checkContentOverflow() {
  const pages = document.querySelectorAll('.page');
  pages.forEach((page, index) => {
    if (checkPageOverflow(page)) {
      splitPageContent(page, index + 1);
    }
  });
  
  // 更新总页数
  updateTotalPages();
}

/**
 * 检查页面是否溢出
 * @param {HTMLElement} pageElement - 页面元素
 * @returns {boolean} 是否溢出
 */
function checkPageOverflow(pageElement) {
  const pageHeight = pageElement.clientHeight;
  const contentHeight = pageElement.scrollHeight;
  const windowHeight = window.innerHeight;
  
  // 考虑padding和边距
  const overflowThreshold = windowHeight * 0.95;
  
  return contentHeight > overflowThreshold;
}

/**
 * 分割页面内容
 * @param {HTMLElement} pageElement - 要分割的页面
 * @param {number} pageIndex - 页面索引
 */
function splitPageContent(pageElement, pageIndex) {
  const pageBody = pageElement.querySelector('.page-body');
  if (!pageBody) return;
  
  // 获取所有子元素
  const children = Array.from(pageBody.children);
  if (children.length === 0) return;
  
  // 找到合适的分割点
  let splitIndex = findSplitPoint(children, pageElement);
  if (splitIndex <= 0) return;
  
  // 创建新页面
  const newPage = createNewPage();
  
  // 移动元素到新页面
  const elementsToMove = children.slice(splitIndex);
  const newPageBody = newPage.querySelector('.page-body');
  elementsToMove.forEach(element => {
    newPageBody.appendChild(element);
  });
  
  // 插入新页面
  pageElement.parentNode.insertBefore(newPage, pageElement.nextSibling);
  
  // 更新页码显示
  updatePageNumbers();
}

/**
 * 找到合适的分割点
 * @param {HTMLElement[]} elements - 子元素数组
 * @param {HTMLElement} pageElement - 页面元素
 * @returns {number} 分割点索引
 */
function findSplitPoint(elements, pageElement) {
  const pageHeight = pageElement.clientHeight * 0.8; // 80%高度作为分割点
  let currentHeight = 0;
  
  for (let i = 0; i < elements.length; i++) {
    currentHeight += elements[i].offsetHeight;
    if (currentHeight > pageHeight) {
      return i;
    }
  }
  
  return elements.length - 1;
}

/**
 * 创建新页面
 * @returns {HTMLElement} 新页面元素
 */
function createNewPage() {
  const newPage = document.createElement('div');
  newPage.className = 'page content-page';
  
  newPage.innerHTML = `
    <div class="page-header">
      <span class="page-number">继续</span>
      <h1 class="page-title">内容续页</h1>
    </div>
    <div class="page-body">
    </div>
  `;
  
  return newPage;
}

/**
 * 更新总页数
 */
function updateTotalPages() {
  const totalPagesElement = document.getElementById('totalPages');
  if (totalPagesElement) {
    const actualTotalPages = document.querySelectorAll('.page').length;
    totalPagesElement.textContent = actualTotalPages;
    totalPages = actualTotalPages; // 更新全局变量
  }
}

/**
 * 更新页面编号
 */
function updatePageNumbers() {
  const pages = document.querySelectorAll('.page');
  pages.forEach((page, index) => {
    const pageNumberElement = page.querySelector('.page-number');
    if (pageNumberElement) {
      // 保留封面和目录的特殊编号
      if (index === 0) {
        // 封面
      } else if (index === 1) {
        // 目录
      } else {
        // 保留原始的章节序号格式，不进行覆盖
        // 仅对新创建的页面设置编号
        if (pageNumberElement.textContent === '继续') {
          pageNumberElement.textContent = `${index}`;
        }
      }
    }
  });
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
