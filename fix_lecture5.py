# -*- coding: utf-8 -*-
import re

# 读取文件
with open('c:/Users/ma124/Desktop/code/Docker-Handouts/lectures/lecture-5.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 删除 Part 4 容器网络管理 (从第1323行到第1944行)
# 查找 Part 4 开始到 Part 5 开始之间的内容
pattern1 = r'<div class="page section-page">\s*<div class="section-content">\s*<span class="section-label">Part 4</span>\s*<h1 class="section-title">容器网络管理</h1>.*?(?=<div class="page section-page">\s*<div class="section-content">\s*<span class="section-label">Part 5</span>)'
content = re.sub(pattern1, '', content, flags=re.DOTALL)

# 2. 删除 Part 5 容器数据管理 (从第1945行到第2378行)
# 查找 Part 5 开始到 Part 6 开始之间的内容
pattern2 = r'<div class="page section-page">\s*<div class="section-content">\s*<span class="section-label">Part 5</span>\s*<h1 class="section-title">容器数据管理</h1>.*?(?=<div class="page section-page">\s*<div class="section-content">\s*<span class="section-label">Part 6</span>)'
content = re.sub(pattern2, '', content, flags=re.DOTALL)

# 3. 删除相关的实验页面
# 删除 "动手实验：容器数据管理实践"
pattern3 = r'<div class="page section-page">\s*<div class="section-content">\s*<span class="section-label">实验</span>\s*<h1 class="section-title">动手实验：容器数据管理实践</h1>.*?(?=<div class="page section-page">\s*<div class="section-content">\s*<span class="section-label">Part 6</span>)'
content = re.sub(pattern3, '', content, flags=re.DOTALL)

# 4. 删除 "动手实验：容器网络与数据管理" (重复的实验)
pattern4 = r'<div class="page section-page">\s*<div class="section-content">\s*<span class="section-label">实验</span>\s*<h1 class="section-title">动手实验：容器网络与数据管理</h1>.*?(?=<div class="page content-page">\s*<div class="page-header">\s*<span class="page-number">总结</span>)'
content = re.sub(pattern4, '', content, flags=re.DOTALL)

# 5. 重新编号：Part 6 -> Part 4, Part 7 -> Part 5
content = content.replace('<span class="section-label">Part 6</span>', '<span class="section-label">Part 4</span>')
content = content.replace('<span class="section-label">Part 7</span>', '<span class="section-label">Part 5</span>')

# 6. 更新页面编号
content = content.replace('<span class="page-number">Part 6.1</span>', '<span class="page-number">Part 4.1</span>')
content = content.replace('<span class="page-number">Part 6.2</span>', '<span class="page-number">Part 4.2</span>')
content = content.replace('<span class="page-number">Part 7.1</span>', '<span class="page-number">Part 5.1</span>')
content = content.replace('<span class="page-number">Part 7.2</span>', '<span class="page-number">Part 5.2</span>')

# 写回文件
with open('c:/Users/ma124/Desktop/code/Docker-Handouts/lectures/lecture-5.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("lecture-5.html 修复完成！")
print("已删除：")
print("  - Part 4: 容器网络管理")
print("  - Part 5: 容器数据管理")
print("  - 相关实验页面")
print("已重新编号：")
print("  - Part 6 -> Part 4 (容器监控与日志)")
print("  - Part 7 -> Part 5 (容器安全)")
