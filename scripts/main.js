document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // 功能 1: 导航项点击高亮
    // 逻辑: 为所有 .nav-item 元素添加点击事件监听器。
    //       点击时，移除所有兄弟元素的 'active' 类，并为当前点击的元素添加 'active' 类。
    // =================================================================
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // 允许平滑滚动，同时立即更新高亮状态
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // =================================================================
    // 功能 2: 滚动监听与导航项自动高亮 (Scroll Spy)
    // 逻辑: 使用 IntersectionObserver API 监听所有 <section> 元素的可见性。
    //       当某个 section 进入或离开视口时，更新对应导航项的 'active' 状态。
    //       'root' 设置为 #main-content，确保只在主内容区域滚动时触发。
    // =================================================================
    const mainContent = document.getElementById('main-content');
    const sections = document.querySelectorAll('section[id]');
    
    if (mainContent && sections.length > 0 && navItems.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`.nav-item[href="#${id}"]`);
                
                if (navLink) {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                        navItems.forEach(item => item.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                }
            });
        }, { 
            root: mainContent, 
            threshold: [0.2, 0.5, 0.8], // 在 section 可见度达到 20%, 50%, 80% 时触发
            rootMargin: "-100px 0px -100px 0px" // 缩小视口范围，避免同时高亮多个
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // =================================================================
    // 功能 3: 统一的代码复制逻辑
    // 逻辑: 为所有 .copy-button 元素添加点击事件。
    //       点击时，首先尝试从 'data-copy' 属性获取文本。
    //       如果 'data-copy' 不存在，则查找相邻的 <code> 或 <pre> 元素并获取其文本。
    //       使用 navigator.clipboard.writeText API 异步复制文本。
    //       复制成功或失败后，临时改变按钮的文本和样式以提供反馈。
    // =================================================================
    document.body.addEventListener('click', async (e) => {
        if (e.target && e.target.closest('.copy-button')) {
            const button = e.target.closest('.copy-button');
            const originalHtml = button.innerHTML;
            const parent = button.parentElement;
            
            let textToCopy = button.dataset.copy;

            if (!textToCopy) {
                const codeBlock = parent.querySelector('code, pre');
                if (codeBlock) {
                    textToCopy = codeBlock.innerText;
                }
            }

            if (!textToCopy || !textToCopy.trim()) {
                console.warn('Copy button clicked, but no text found to copy.');
                return;
            }

            try {
                await navigator.clipboard.writeText(textToCopy);
                
                button.innerHTML = '<i class="fas fa-check mr-1"></i> 已复制';
                button.classList.add('bg-green-600', 'text-white');
                button.classList.remove('bg-gray-700');

                setTimeout(() => {
                    button.innerHTML = originalHtml;
                    button.classList.remove('bg-green-600', 'text-white');
                    button.classList.add('bg-gray-700');
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
                button.innerHTML = '复制失败';
                setTimeout(() => {
                    button.innerHTML = originalHtml;
                }, 2000);
            }
        }
    });
});
