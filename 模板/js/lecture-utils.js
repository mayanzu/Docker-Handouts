// ============================================
// 讲义通用工具函数库 (Docker/K8S 版)
// 提供所有讲义共用的交互逻辑和工具方法
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 初始化复制按钮
    initCopyButtons();
});

// 初始化代码块复制功能
function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        // 创建复制按钮
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = '复制';
        btn.style.position = 'absolute';
        btn.style.top = '5px';
        btn.style.right = '5px';
        btn.style.padding = '4px 8px';
        btn.style.fontSize = '12px';
        btn.style.background = '#fff';
        btn.style.border = '1px solid #ddd';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.opacity = '0';
        btn.style.transition = 'opacity 0.2s';
        
        // 鼠标悬停显示按钮
        block.style.position = 'relative';
        block.addEventListener('mouseenter', () => btn.style.opacity = '1');
        block.addEventListener('mouseleave', () => btn.style.opacity = '0');
        
        // 点击复制
        btn.addEventListener('click', () => {
            const code = block.querySelector('code') ? block.querySelector('code').innerText : block.innerText;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = '已复制!';
                setTimeout(() => btn.textContent = '复制', 2000);
            });
        });
        
        block.appendChild(btn);
    });
}

// 模拟终端命令执行（仅视觉效果）
function simulateTerminal(terminalId, commands) {
    const terminal = document.getElementById(terminalId);
    if (!terminal) return;
    
    const body = terminal.querySelector('.terminal-body');
    body.innerHTML = ''; // 清空
    
    let delay = 0;
    
    commands.forEach(cmd => {
        // 显示命令
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'command-line';
            line.innerHTML = <span class="prompt">$</span> <span class="command"></span>;
            body.appendChild(line);
            
            // 滚动到底部
            terminal.scrollTop = terminal.scrollHeight;
        }, delay);
        
        delay += 500; // 模拟输入延迟
        
        // 显示输出
        if (cmd.output) {
            setTimeout(() => {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerText = cmd.output;
                body.appendChild(output);
                terminal.scrollTop = terminal.scrollHeight;
            }, delay + 300); // 模拟执行延迟
            
            delay += 1000; // 下一条命令的间隔
        }
    });
}
