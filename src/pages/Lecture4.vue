<template>
  <div class="lecture-content">
    <header class="lecture-header">
      <h1>第4讲：数据持久化 — 数据卷</h1>
      <p class="intro">理解容器数据为什么会丢失，掌握Volume和Bind Mount的使用，学会数据库容器化的正确姿势。</p>
      
      <div class="pill-list">
        <span class="pill">数据卷</span>
        <span class="pill">绑定挂载</span>
        <span class="pill">数据持久化</span>
        <span class="pill">备份恢复</span>
      </div>
    </header>

    <LectureSidebar :sections="sections" />

    <section id="intro">
      <h2>👋 课程目标</h2>
      <ul class="goal-list">
        <li>理解容器数据存储的本质</li>
        <li>掌握 Volume 和 Bind Mount 的使用</li>
        <li>学会数据库容器化的最佳实践</li>
        <li>掌握数据备份与恢复技巧</li>
      </ul>
    </section>

    <section id="chapter-1">
      <h2>一、为什么需要数据持久化？</h2>
      
      <h3>1.1 容器的临时性特征</h3>
      <div class="experiment-box">
        <h4>🧪 实验 1：容器数据会丢失</h4>
        <pre><code># 启动一个容器并写入数据
docker run -it --name temp-test ubuntu bash

# 在容器内操作
echo "重要数据" > /data.txt
cat /data.txt
exit

# 重新启动容器（数据还在）
docker start -ai temp-test
cat /data.txt            # 输出：重要数据

# 删除容器
docker rm temp-test

# 创建新容器（数据丢失！）
docker run -it --name temp-test2 ubuntu bash
ls /                     # 没有 data.txt
cat /data.txt            # No such file or directory</code></pre>

        <div class="key-point">
          <h4>💡 核心问题</h4>
          <p>容器是<strong>临时的、一次性的</strong>。删除容器后，所有容器内的修改都会丢失，包括：</p>
          <ul>
            <li>应用上传的文件</li>
            <li>数据库的数据</li>
            <li>日志文件</li>
            <li>配置文件修改</li>
          </ul>
        </div>
      </div>

      <h3>1.2 联合文件系统回顾</h3>
      <div class="concept-box">
        <h4>📊 容器层与镜像层</h4>
        <p>回顾第1讲的知识：Docker 使用<strong>分层存储</strong></p>
        <ul>
          <li><strong>镜像层</strong>（只读）：共享的基础文件系统</li>
          <li><strong>容器层</strong>（可写）：容器的改动都在这一层</li>
          <li>删除容器 = 删除容器层 = 数据丢失</li>
        </ul>

        <pre><code># 查看容器的层级结构
docker inspect nginx | grep -A 10 "GraphDriver"

# 输出示例：
# "GraphDriver": {
#     "Data": {
#         "LowerDir": "/var/lib/docker/overlay2/abc123/diff",  ← 镜像层（只读）
#         "UpperDir": "/var/lib/docker/overlay2/def456/diff",  ← 容器层（可写）
#         "WorkDir": "/var/lib/docker/overlay2/def456/work"
#     }
# }</code></pre>
      </div>
    </section>

    <section id="chapter-2">
      <h2>二、Docker 数据持久化方案</h2>
      
      <h3>2.1 三种数据挂载方式</h3>
      <div class="comparison-box">
        <div class="compare-item">
          <h4>🏗️ Volume（数据卷）</h4>
          <ul>
            <li>✅ Docker 官方推荐</li>
            <li>✅ Docker 管理存储位置</li>
            <li>✅ 支持驱动和插件</li>
            <li>✅ 便于备份和迁移</li>
          </ul>
          <pre><code>docker run -v mydata:/data nginx</code></pre>
        </div>

        <div class="compare-item">
          <h4>📁 Bind Mount（绑定挂载）</h4>
          <ul>
            <li>✅ 使用主机的绝对路径</li>
            <li>✅ 性能最好</li>
            <li>✅ 开发环境常用</li>
            <li>⚠️ 依赖主机目录结构</li>
          </ul>
          <pre><code>docker run -v /host/path:/container/path nginx</code></pre>
        </div>

        <div class="compare-item">
          <h4>🧠 Tmpfs Mount（内存挂载）</h4>
          <ul>
            <li>💾 存储在内存中</li>
            <li>⚡ 非常快</li>
            <li>⚠️ 容器停止即清空</li>
            <li>🎯 适合临时数据</li>
          </ul>
          <pre><code>docker run --tmpfs /temp nginx</code></pre>
        </div>
      </div>

      <h3>2.2 Volume vs Bind Mount 对比</h3>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>特性</th>
            <th>Volume</th>
            <th>Bind Mount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>路径</td>
            <td>卷名（Docker 管理）</td>
            <td>主机绝对路径</td>
          </tr>
          <tr>
            <td>存储位置</td>
            <td><code>/var/lib/docker/volumes/</code></td>
            <td>主机任意位置</td>
          </tr>
          <tr>
            <td>创建方式</td>
            <td>自动创建</td>
            <td>主机目录必须存在</td>
          </tr>
          <tr>
            <td>管理命令</td>
            <td><code>docker volume</code></td>
            <td>主机文件系统命令</td>
          </tr>
          <tr>
            <td>备份</td>
            <td>容易</td>
            <td>需要自己处理</td>
          </tr>
          <tr>
            <td>跨平台</td>
            <td>好</td>
            <td>差（路径不同）</td>
          </tr>
          <tr>
            <td>适用场景</td>
            <td>生产环境</td>
            <td>开发环境</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="chapter-3">
      <h2>三、Volume 数据卷详解</h2>
      
      <h3>3.1 Volume 基础操作</h3>
      <div class="experiment-box">
        <h4>🧪 实验 2：Volume 完整生命周期</h4>
        <pre><code># === 创建数据卷 ===
docker volume create my-data
# 输出：my-data

# === 查看所有数据卷 ===
docker volume ls
# DRIVER    VOLUME NAME
# local     my-data

# === 查看数据卷详情 ===
docker volume inspect my-data
# 输出（JSON 格式）：
# [
#     {
#         "CreatedAt": "2025-12-26T10:30:00Z",
#         "Driver": "local",
#         "Mountpoint": "/var/lib/docker/volumes/my-data/_data",
#         "Name": "my-data",
#         "Scope": "local"
#     }
# ]

# === 使用数据卷 ===
docker run -d \
  --name web \
  -v my-data:/usr/share/nginx/html \
  nginx

# === 验证数据持久化 ===
# 写入数据
docker exec web bash -c "echo 'Hello Volume' > /usr/share/nginx/html/test.txt"

# 删除容器
docker rm -f web

# 创建新容器使用同一数据卷
docker run -d --name web2 -v my-data:/usr/share/nginx/html nginx

# 数据还在！
docker exec web2 cat /usr/share/nginx/html/test.txt
# 输出：Hello Volume

# === 删除数据卷 ===
docker rm -f web2
docker volume rm my-data        # 删除单个
# docker volume prune           # 删除所有未使用的卷</code></pre>
      </div>

      <h3>3.2 匿名卷 vs 命名卷</h3>
      <div class="experiment-box">
        <h4>🧪 实验 3：两种卷的区别</h4>
        <pre><code># === 匿名卷（不推荐）===
docker run -d --name anon -v /data nginx
# Docker 自动生成卷名：如 a1b2c3d4e5f6...

docker volume ls
# DRIVER    VOLUME NAME
# local     a1b2c3d4e5f6...           ← 难以识别

# === 命名卷（推荐）===
docker run -d --name named -v mydata:/data nginx

docker volume ls
# DRIVER    VOLUME NAME
# local     mydata                    ← 语义清晰

# 清理
docker rm -f anon named
docker volume prune -f            # 删除匿名卷</code></pre>

        <div class="key-point">
          <h4>🎯 最佳实践</h4>
          <ul>
            <li>✅ 生产环境：使用<strong>命名卷</strong>（便于管理）</li>
            <li>⚠️ 匿名卷：仅用于临时测试</li>
            <li>✅ 卷命名建议：<code>项目名-用途</code>（如 <code>blog-db-data</code>）</li>
          </ul>
        </div>
      </div>

      <h3>3.3 Volume 的高级用法</h3>
      <pre><code># 只读挂载
docker run -d -v my-config:/etc/nginx:ro nginx
# :ro = read-only，容器内只能读取，不能修改

# 多个容器共享一个卷
docker run -d --name app1 -v shared-data:/data nginx
docker run -d --name app2 -v shared-data:/data nginx
# 两个容器可以互相访问对方写入的数据

# 卷的驱动（高级）
docker volume create --driver local --opt type=nfs my-nfs-volume
# 支持 NFS、CIFS 等网络存储</code></pre>
    </section>

    <section id="chapter-4">
      <h2>四、Bind Mount 绑定挂载</h2>
      
      <h3>4.1 基本用法</h3>
      <div class="experiment-box">
        <h4>🧪 实验 4：Bind Mount 实战</h4>
        <pre><code># 创建测试目录
mkdir -p /tmp/docker-test
echo "Host File" > /tmp/docker-test/host.txt

# === 绑定挂载（Windows 路径）===
docker run -it --name bind-test \
  -v C:\tmp\docker-test:/data \
  ubuntu bash

# 在容器内查看
ls /data                    # 看到 host.txt
cat /data/host.txt          # 输出：Host File

# 容器内创建文件
echo "Container File" > /data/container.txt
exit

# 主机上查看（数据同步了！）
ls C:\tmp\docker-test
# host.txt  container.txt
cat C:\tmp\docker-test\container.txt
# 输出：Container File</code></pre>

        <div class="key-point">
          <h4>⚠️ 关键特性</h4>
          <ul>
            <li>主机和容器<strong>实时同步</strong></li>
            <li>修改主机文件 → 容器内立即生效</li>
            <li>修改容器文件 → 主机上立即生效</li>
            <li>适合<strong>开发环境</strong>（修改代码即时生效）</li>
          </ul>
        </div>
      </div>

      <h3>4.2 开发环境典型用例</h3>
      <div class="experiment-box">
        <h4>🧪 实验 5：前端开发环境</h4>
        <pre><code># 假设你有一个前端项目
# 目录结构：
# C:\projects\my-website\
#   ├── index.html
#   ├── style.css
#   └── script.js

# 挂载整个项目目录
docker run -d \
  --name dev-server \
  -p 8080:80 \
  -v C:\projects\my-website:/usr/share/nginx/html \
  nginx

# 访问 http://localhost:8080

# 修改 index.html（在主机上用 VS Code 编辑）
# 刷新浏览器 → 立即看到效果！

# 这就是 Bind Mount 的威力：
# ✅ 无需重新构建镜像
# ✅ 无需重启容器
# ✅ 改代码 → F5 刷新 → 看效果</code></pre>
      </div>

      <h3>4.3 Bind Mount 的注意事项</h3>
      <div class="example-box">
        <h4>⚠️ 常见陷阱</h4>
        <pre><code># 陷阱1：目录覆盖
docker run -d -v C:\empty:/etc/nginx nginx
# 主机的空目录会覆盖容器内的 /etc/nginx
# 导致 Nginx 配置丢失，启动失败！

# 解决方案：只挂载单个文件
docker run -d \
  -v C:\myconfig\nginx.conf:/etc/nginx/nginx.conf:ro \
  nginx

# 陷阱2：权限问题（Linux）
docker run -v /data:/data ubuntu touch /data/test.txt
# 文件属主可能是 root，主机普通用户无法删除

# 解决方案：指定用户
docker run --user $(id -u):$(id -g) ...

# 陷阱3：性能问题（Windows/macOS）
# Docker Desktop 的文件同步有性能损耗
# 解决方案：数据库等 I/O 密集的用 Volume，不用 Bind Mount</code></pre>
      </div>
    </section>

    <section id="chapter-5">
      <h2>五、数据库容器化实战</h2>
      
      <h3>5.1 MySQL 数据持久化</h3>
      <div class="experiment-box">
        <h4>🧪 实验 6：MySQL 数据持久化</h4>
        <pre><code># === 错误做法（数据会丢失）===
docker run -d --name mysql-wrong \
  -e MYSQL_ROOT_PASSWORD=123456 \
  mysql:8.0
# 删除容器后，数据库数据全部丢失！

# === 正确做法（使用 Volume）===
docker run -d \
  --name mysql-persistent \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v mysql-data:/var/lib/mysql \
  -p 3306:3306 \
  mysql:8.0

# 连接数据库并创建数据
docker exec -it mysql-persistent mysql -uroot -p123456
# 在 MySQL 命令行执行：
CREATE DATABASE testdb;
USE testdb;
CREATE TABLE users (id INT, name VARCHAR(50));
INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob');
SELECT * FROM users;
EXIT;

# === 验证数据持久化 ===
# 删除容器
docker rm -f mysql-persistent

# 创建新容器，使用同一数据卷
docker run -d \
  --name mysql-new \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v mysql-data:/var/lib/mysql \
  -p 3306:3306 \
  mysql:8.0

# 连接数据库查看
docker exec -it mysql-new mysql -uroot -p123456 -e "SELECT * FROM testdb.users;"
# +------+-------+
# | id   | name  |
# +------+-------+
# |    1 | Alice |
# |    2 | Bob   |
# +------+-------+
# 数据还在！</code></pre>
      </div>

      <h3>5.2 PostgreSQL 数据持久化</h3>
      <div class="experiment-box">
        <h4>🧪 实验 7：PostgreSQL 完整示例</h4>
        <pre><code># 创建数据卷
docker volume create pgdata

# 运行 PostgreSQL
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -v pgdata:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16

# 创建测试数据
docker exec -it postgres psql -U postgres
# 在 psql 命令行执行：
CREATE DATABASE myapp;
\c myapp
CREATE TABLE products (id SERIAL, name TEXT);
INSERT INTO products (name) VALUES ('Laptop'), ('Phone');
SELECT * FROM products;
\q

# 查看数据卷使用情况
docker volume inspect pgdata

# 停止容器
docker stop postgres

# 一周后重启（数据不丢失）
docker start postgres

# 验证数据
docker exec -it postgres psql -U postgres -d myapp -c "SELECT * FROM products;"
#  id |  name  
# ----+--------
#   1 | Laptop
#   2 | Phone</code></pre>
      </div>

      <h3>5.3 MongoDB 数据持久化</h3>
      <pre><code># MongoDB 示例
docker run -d \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -v mongo-data:/data/db \
  -p 27017:27017 \
  mongo:7

# 连接并创建数据
docker exec -it mongodb mongosh -u admin -p password
# 在 mongosh 中执行：
use mydb;
db.users.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
]);
db.users.find();
exit</code></pre>
    </section>

    <section id="chapter-6">
      <h2>六、数据备份与恢复</h2>
      
      <h3>6.1 Volume 备份</h3>
      <div class="experiment-box">
        <h4>🧪 实验 8：数据卷备份与恢复</h4>
        <pre><code># === 方法一：使用临时容器备份 ===
# 假设有个数据卷叫 mysql-data
docker run --rm \
  -v mysql-data:/source \
  -v C:\backups:/backup \
  ubuntu \
  tar czf /backup/mysql-backup-$(date +%Y%m%d).tar.gz -C /source .

# 解释：
# --rm: 容器退出后自动删除
# -v mysql-data:/source: 挂载要备份的卷
# -v C:\backups:/backup: 挂载备份存储位置
# tar czf: 创建压缩包

# === 方法二：直接复制数据卷目录（Linux）===
sudo cp -a /var/lib/docker/volumes/mysql-data \
  /backup/mysql-data-backup

# === 恢复备份 ===
# 创建新数据卷
docker volume create mysql-data-restored

# 解压备份到新卷
docker run --rm \
  -v mysql-data-restored:/target \
  -v C:\backups:/backup \
  ubuntu \
  tar xzf /backup/mysql-backup-20251226.tar.gz -C /target

# 使用恢复的数据卷
docker run -d \
  --name mysql-restored \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v mysql-data-restored:/var/lib/mysql \
  mysql:8.0</code></pre>
      </div>

      <h3>6.2 数据库备份最佳实践</h3>
      <div class="experiment-box">
        <h4>🧪 实验 9：MySQL 逻辑备份</h4>
        <pre><code># === 使用 mysqldump 备份（推荐）===
docker exec mysql-persistent \
  mysqldump -uroot -p123456 --all-databases \
  > C:\backups\mysql-all-$(date +%Y%m%d).sql

# 单个数据库备份
docker exec mysql-persistent \
  mysqldump -uroot -p123456 testdb \
  > C:\backups\testdb-$(date +%Y%m%d).sql

# === 恢复备份 ===
docker exec -i mysql-persistent \
  mysql -uroot -p123456 \
  < C:\backups\testdb-20251226.sql

# === 定时备份脚本（Windows PowerShell）===
$date = Get-Date -Format "yyyyMMdd-HHmmss"
docker exec mysql-persistent `
  mysqldump -uroot -p123456 --all-databases `
  > "C:\backups\mysql-$date.sql"
# 配合 Windows 任务计划程序实现自动备份</code></pre>
      </div>

      <h3>6.3 Volume 迁移</h3>
      <pre><code># === 场景：迁移到另一台服务器 ===
# 服务器 A（源）
docker run --rm \
  -v mysql-data:/source \
  ubuntu \
  tar czf - -C /source . \
  > mysql-data.tar.gz

# 传输文件到服务器 B
scp mysql-data.tar.gz user@server-b:/tmp/

# 服务器 B（目标）
docker volume create mysql-data
docker run --rm \
  -v mysql-data:/target \
  -v /tmp:/backup \
  ubuntu \
  tar xzf /backup/mysql-data.tar.gz -C /target</code></pre>
    </section>

    <section id="practice">
      <h2>七、综合练习</h2>
      
      <div class="practice-box">
        <h3>练习 1：搭建 WordPress + MySQL</h3>
        <pre><code># 1. 创建网络
docker network create wordpress-net

# 2. 启动 MySQL（带持久化）
docker run -d \
  --name wordpress-db \
  --network wordpress-net \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser \
  -e MYSQL_PASSWORD=wppass \
  -v wordpress-db-data:/var/lib/mysql \
  mysql:8.0

# 3. 启动 WordPress（带持久化）
docker run -d \
  --name wordpress \
  --network wordpress-net \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=wordpress-db \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppass \
  -e WORDPRESS_DB_NAME=wordpress \
  -v wordpress-data:/var/www/html \
  wordpress:latest

# 4. 访问 http://localhost:8080 完成安装

# 5. 验证持久化
docker restart wordpress-db wordpress
# 重启后访问网站，数据不丢失</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 2：配置文件管理</h3>
        <pre><code># 场景：自定义 Nginx 配置
# 1. 提取默认配置
docker run --name temp-nginx -d nginx
docker cp temp-nginx:/etc/nginx/nginx.conf C:\nginx-config\
docker rm -f temp-nginx

# 2. 修改配置文件（自定义）
# 编辑 C:\nginx-config\nginx.conf

# 3. 使用自定义配置启动
docker run -d \
  --name my-nginx \
  -v C:\nginx-config\nginx.conf:/etc/nginx/nginx.conf:ro \
  -v nginx-html:/usr/share/nginx/html \
  -p 8080:80 \
  nginx

# 4. 测试配置修改
# 修改主机上的 nginx.conf
# 重新加载配置（不停止容器）
docker exec my-nginx nginx -s reload</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 3：数据卷清理</h3>
        <pre><code># 查看所有数据卷
docker volume ls

# 查看未使用的数据卷
docker volume ls -f dangling=true

# 清理未使用的数据卷
docker volume prune

# 查看数据卷占用的磁盘空间
docker system df -v

# 思考题：
# 1. 如何找出哪些容器在使用某个数据卷？
# 2. 删除数据卷前如何确保数据已备份？</code></pre>
      </div>
    </section>

    <section id="summary">
      <h2>📝 课程小结</h2>
      
      <div class="summary-box">
        <h3>核心知识点</h3>
        <ul class="checklist">
          <li>✅ 容器数据是<strong>临时的</strong>，删除容器会丢失数据</li>
          <li>✅ <strong>Volume</strong>（数据卷）：Docker 管理，生产环境推荐</li>
          <li>✅ <strong>Bind Mount</strong>（绑定挂载）：使用主机路径，开发环境常用</li>
          <li>✅ 数据库容器化：必须挂载数据目录（MySQL: <code>/var/lib/mysql</code>，PostgreSQL: <code>/var/lib/postgresql/data</code>）</li>
          <li>✅ 数据备份：Volume 备份 + 数据库逻辑备份（mysqldump）</li>
          <li>✅ 只读挂载：<code>:ro</code> 防止容器修改主机文件</li>
        </ul>

        <h3>关键命令回顾</h3>
        <pre><code># 数据卷管理
docker volume create/ls/inspect/rm/prune

# 使用数据卷
docker run -v volume-name:/container/path

# 使用绑定挂载
docker run -v /host/path:/container/path

# 只读挂载
docker run -v /path:/path:ro

# 数据卷备份
docker run --rm -v my-vol:/source -v /backup:/backup ubuntu tar czf /backup/backup.tar.gz -C /source .

# 数据库备份
docker exec mysql mysqldump -uroot -p database > backup.sql</code></pre>

        <h3>最佳实践</h3>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐方案</th>
              <th>原因</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>数据库数据</td>
              <td>Volume</td>
              <td>性能好、易备份</td>
            </tr>
            <tr>
              <td>应用配置文件</td>
              <td>Bind Mount（只读）</td>
              <td>便于修改和版本控制</td>
            </tr>
            <tr>
              <td>开发环境源代码</td>
              <td>Bind Mount</td>
              <td>实时同步，无需重启</td>
            </tr>
            <tr>
              <td>日志文件</td>
              <td>Volume 或 Bind Mount</td>
              <td>根据日志收集方案选择</td>
            </tr>
            <tr>
              <td>临时数据</td>
              <td>Tmpfs</td>
              <td>快速且自动清理</td>
            </tr>
          </tbody>
        </table>

        <h3>🎯 下节预告</h3>
        <p>第5讲将学习 <strong>Dockerfile 编写</strong>：</p>
        <ul>
          <li>Dockerfile 指令详解</li>
          <li>构建自己的镜像</li>
          <li>多阶段构建</li>
          <li>镜像优化技巧</li>
        </ul>
      </div>
    </section>

    <div class="navigation-buttons">
      <router-link to="/lecture-3" class="nav-btn prev">← 上一讲</router-link>
      <router-link to="/lecture-5" class="nav-btn next">下一讲：Dockerfile →</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LectureSidebar from '@/components/LectureSidebar.vue'

const sections = ref([
  { id: 'intro', title: '👋 课程目标' },
  { id: 'chapter-1', title: '一、为什么需要数据持久化？', level: 1 },
  { id: 'chapter-2', title: '二、Docker 数据持久化方案', level: 1 },
  { id: 'chapter-3', title: '三、Volume 数据卷详解', level: 1 },
  { id: 'chapter-4', title: '四、Bind Mount 绑定挂载', level: 1 },
  { id: 'chapter-5', title: '五、数据库容器化实战', level: 1 },
  { id: 'chapter-6', title: '六、数据备份与恢复', level: 1 },
  { id: 'practice', title: '七、综合练习', level: 1 },
  { id: 'summary', title: '📝 课程小结', level: 1 }
])
</script>

<style lang="scss" scoped>
.coming-soon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: $spacing-xl;
}

.coming-soon-card {
  @include card($spacing-xxl);
  text-align: center;
  max-width: 600px;
  background: linear-gradient(135deg, $color-bg-subtle, rgba($color-primary, 0.05));

  .coming-soon-icon {
    font-size: 4rem;
    margin-bottom: $spacing-lg;
    @include float-animation;
  }

  h2 {
    color: $color-heading;
    margin-bottom: $spacing-md;
    font-size: 1.75rem;
  }

  p {
    color: $color-text-secondary;
    margin-bottom: $spacing-xl;
    font-size: 1.125rem;
  }

  .preview-topics {
    text-align: left;
    margin-bottom: $spacing-xl;

    h3 {
      color: $color-primary;
      margin-bottom: $spacing-md;
      font-size: 1.125rem;
    }

    .checklist {
      margin-left: 0;
      
      li {
        margin-bottom: $spacing-sm;
        padding: $spacing-sm;
        background: rgba($color-primary, 0.05);
        border-left: 3px solid $color-primary;
        border-radius: 0 $border-radius $border-radius 0;
      }
    }
  }

  .navigation {
    display: flex;
    gap: $spacing-md;
    justify-content: center;

    .nav-button {
      @include button-secondary;
      text-decoration: none;
      padding: $spacing-md $spacing-lg;
    }
  }
}

.lecture-header {
  text-align: center;
  margin-bottom: $spacing-xxl;
  
  .pill-list {
    justify-content: center;
    margin-top: $spacing-lg;
  }
}
</style>