<template>
  <div class="lecture-content">
    <header class="lecture-header">
      <h1>第3讲：容器生命周期管理</h1>
      <p class="intro">深入掌握容器的启动、停止、重启、删除操作，学会查看日志、进入容器调试，理解容器资源限制。</p>
      
      <div class="pill-list">
        <span class="pill">容器控制</span>
        <span class="pill">日志查看</span>
        <span class="pill">进入容器</span>
        <span class="pill">资源限制</span>
      </div>
    </header>

    <LectureSidebar :sections="sections" />

    <section id="intro">
      <h2>👋 课程目标</h2>
      <ul class="goal-list">
        <li>掌握容器的完整生命周期管理</li>
        <li>学会使用日志排查容器问题</li>
        <li>熟练进入容器进行调试</li>
        <li>理解并设置容器资源限制</li>
      </ul>
    </section>

    <section id="chapter-1">
      <h2>一、容器生命周期完整解析</h2>
      
      <h3>1.1 容器状态详解</h3>
      <div class="concept-box">
        <h4>📊 容器的七种状态</h4>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>状态</th>
              <th>说明</th>
              <th>如何进入</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>created</code></td>
              <td>已创建但未启动</td>
              <td><code>docker create nginx</code></td>
            </tr>
            <tr>
              <td><code>running</code></td>
              <td>正在运行</td>
              <td><code>docker start</code> 或 <code>docker run</code></td>
            </tr>
            <tr>
              <td><code>paused</code></td>
              <td>已暂停（进程冻结）</td>
              <td><code>docker pause</code></td>
            </tr>
            <tr>
              <td><code>restarting</code></td>
              <td>正在重启</td>
              <td><code>docker restart</code></td>
            </tr>
            <tr>
              <td><code>exited</code></td>
              <td>已退出（停止）</td>
              <td><code>docker stop</code> 或容器内进程结束</td>
            </tr>
            <tr>
              <td><code>dead</code></td>
              <td>死亡（无法启动）</td>
              <td>容器启动失败</td>
            </tr>
            <tr>
              <td><code>removing</code></td>
              <td>正在删除</td>
              <td><code>docker rm</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>1.2 创建容器 vs 运行容器</h3>
      <div class="experiment-box">
        <h4>🧪 实验 1：理解 create 和 run 的区别</h4>
        <pre><code># 方法一：create + start（两步）
docker create --name web1 nginx
# 输出容器 ID，但容器未启动

docker ps                    # 看不到 web1
docker ps -a                 # 能看到 web1，状态为 Created

docker start web1            # 启动容器
docker ps                    # 现在能看到了

# 方法二：run（一步到位）
docker run -d --name web2 nginx
# 相当于 create + start 的组合

# 验证
docker ps
# CONTAINER ID   IMAGE   STATUS          NAMES
# a1b2c3d4       nginx   Up 5 seconds    web1
# e5f6g7h8       nginx   Up 2 seconds    web2</code></pre>
        
        <p><strong>区别总结：</strong></p>
        <ul>
          <li><code>docker create</code>：只创建容器，不启动（用于预配置）</li>
          <li><code>docker run</code> = <code>docker create</code> + <code>docker start</code></li>
          <li><code>docker run -d</code>：后台运行</li>
          <li><code>docker run -it</code>：交互式运行</li>
        </ul>
      </div>

      <h3>1.3 容器启停操作</h3>
      <div class="experiment-box">
        <h4>🧪 实验 2：容器的启动、停止、重启</h4>
        <pre><code># 启动一个 Nginx 容器
docker run -d --name my-web -p 8080:80 nginx

# 验证运行
docker ps
curl http://localhost:8080    # 或浏览器访问

# === 停止容器 ===
docker stop my-web            # 优雅停止（给 10 秒关闭时间）
# 原理：发送 SIGTERM 信号，等待进程优雅退出

# 强制停止（立即杀死）
docker kill my-web            # 发送 SIGKILL，强制结束
# 一般不推荐，可能导致数据丢失

# === 启动已停止的容器 ===
docker start my-web           # 启动
docker ps                     # 验证状态变为 Up

# === 重启容器 ===
docker restart my-web         # 相当于 stop + start

# === 暂停和恢复 ===
docker pause my-web           # 暂停（进程冻结，但不释放资源）
docker ps                     # 状态显示 Paused
# 此时访问 http://localhost:8080 无响应

docker unpause my-web         # 恢复
# 瞬间恢复，比 stop/start 快</code></pre>

        <div class="key-point">
          <h4>🎯 stop vs kill vs pause</h4>
          <ul>
            <li><strong>stop</strong>：优雅停止，适合生产环境（默认等待 10 秒）</li>
            <li><strong>kill</strong>：强制停止，紧急情况使用</li>
            <li><strong>pause</strong>：冻结进程，用于临时暂停（不常用）</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="chapter-2">
      <h2>二、容器日志管理</h2>
      
      <h3>2.1 查看容器日志</h3>
      <div class="experiment-box">
        <h4>🧪 实验 3：日志查看的多种方式</h4>
        <pre><code># 启动一个会产生日志的容器
docker run -d --name log-demo nginx

# === 查看所有日志 ===
docker logs log-demo

# 输出示例：
# /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty
# /docker-entrypoint.sh: Configuration complete; ready for start up
# 2025/12/26 10:30:00 [notice] 1#1: nginx/1.25.3
# 2025/12/26 10:30:00 [notice] 1#1: start worker processes

# === 实时跟踪日志（类似 tail -f）===
docker logs -f log-demo       # Ctrl+C 退出

# === 查看最后 N 行 ===
docker logs --tail 20 log-demo        # 最后 20 行
docker logs --tail 100 log-demo       # 最后 100 行

# === 查看指定时间范围 ===
docker logs --since 10m log-demo      # 最近 10 分钟
docker logs --since 1h log-demo       # 最近 1 小时
docker logs --since "2025-12-26T10:00:00" log-demo

# === 显示时间戳 ===
docker logs -t log-demo               # 每行前面显示时间

# === 组合使用 ===
docker logs -f --tail 50 --since 5m log-demo
# 最近 5 分钟的最后 50 行，并实时跟踪</code></pre>
      </div>

      <h3>2.2 日志驱动和配置</h3>
      <div class="concept-box">
        <h4>📊 Docker 日志驱动</h4>
        <p>Docker 支持多种日志驱动（logging driver）：</p>
        <ul>
          <li><strong>json-file</strong>（默认）：存储为 JSON 文件</li>
          <li><strong>syslog</strong>：发送到 syslog</li>
          <li><strong>journald</strong>：发送到 systemd journal</li>
          <li><strong>gelf</strong>：发送到 Graylog</li>
          <li><strong>fluentd</strong>：发送到 Fluentd</li>
          <li><strong>none</strong>：不记录日志</li>
        </ul>

        <pre><code># 查看日志驱动配置
docker info | grep "Logging Driver"

# 运行时指定日志驱动
docker run -d --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 nginx

# 限制日志大小（防止磁盘占满）
# max-size: 单个日志文件最大大小
# max-file: 保留的日志文件数量</code></pre>
      </div>

      <h3>2.3 应用内日志 vs 容器日志</h3>
      <div class="example-box">
        <h4>💡 日志最佳实践</h4>
        <pre><code># ❌ 错误做法：应用日志写入文件
# 应用将日志写入 /var/log/app.log
# 容器停止后日志丢失

# ✅ 正确做法：应用日志输出到 stdout/stderr
# 应用将日志打印到标准输出
print("日志信息")              # Python
console.log("日志信息")        # Node.js
echo "日志信息"                # Shell

# Docker 会自动捕获 stdout/stderr，通过 docker logs 查看</code></pre>
      </div>
    </section>

    <section id="chapter-3">
      <h2>三、进入容器调试</h2>
      
      <h3>3.1 exec：在运行中的容器执行命令</h3>
      <div class="experiment-box">
        <h4>🧪 实验 4：exec 命令详解</h4>
        <pre><code># 启动一个容器
docker run -d --name debug-demo nginx

# === 交互式进入容器 ===
docker exec -it debug-demo bash
# 现在你在容器内了
root@abc123:/# 

# 容器内操作示例
pwd                           # 当前目录
ls -la                        # 查看文件
cat /etc/nginx/nginx.conf     # 查看 Nginx 配置
ps aux                        # 查看进程
apt update && apt install -y curl
curl localhost                # 测试 Nginx

# 退出容器（容器继续运行）
exit

# === 在容器内执行单条命令 ===
docker exec debug-demo ls /etc/nginx
docker exec debug-demo cat /etc/nginx/nginx.conf
docker exec debug-demo ps aux

# === 以特定用户执行 ===
docker exec -u root debug-demo whoami       # 以 root 执行
docker exec -u nginx debug-demo whoami      # 以 nginx 用户执行

# === 指定工作目录 ===
docker exec -w /etc/nginx debug-demo pwd    # 在 /etc/nginx 目录执行

# === 设置环境变量 ===
docker exec -e MY_VAR=hello debug-demo env | grep MY_VAR</code></pre>
      </div>

      <h3>3.2 exec vs attach 的区别</h3>
      <div class="comparison-box">
        <div class="compare-item">
          <h4>docker exec</h4>
          <ul>
            <li>✅ 在容器内<strong>新建进程</strong></li>
            <li>✅ 退出不影响容器</li>
            <li>✅ 可以执行任意命令</li>
            <li>✅ <strong>推荐使用</strong></li>
          </ul>
          <pre><code>docker exec -it &lt;容器&gt; bash
# 新建 bash 进程
# exit 后容器继续运行</code></pre>
        </div>

        <div class="compare-item">
          <h4>docker attach</h4>
          <ul>
            <li>⚠️ 连接到容器<strong>主进程</strong></li>
            <li>⚠️ 退出会停止容器</li>
            <li>⚠️ 只能查看主进程输出</li>
            <li>⚠️ 不推荐使用</li>
          </ul>
          <pre><code>docker attach &lt;容器&gt;
# 连接到容器主进程
# Ctrl+C 会停止容器！
# Ctrl+P Ctrl+Q 可以安全退出</code></pre>
        </div>
      </div>

      <h3>3.3 从容器复制文件</h3>
      <div class="experiment-box">
        <h4>🧪 实验 5：容器与主机间的文件传输</h4>
        <pre><code># 启动容器
docker run -d --name file-demo nginx

# === 从容器复制到主机 ===
docker cp file-demo:/etc/nginx/nginx.conf ./nginx.conf
# 复制 Nginx 配置文件到当前目录

docker cp file-demo:/var/log/nginx ./nginx-logs
# 复制整个目录

# === 从主机复制到容器 ===
echo "Hello Docker" > test.txt
docker cp test.txt file-demo:/tmp/test.txt

# 验证
docker exec file-demo cat /tmp/test.txt
# 输出：Hello Docker

# === 复制并重命名 ===
docker cp file-demo:/etc/nginx/nginx.conf ./my-config.conf</code></pre>
      </div>
    </section>

    <section id="chapter-4">
      <h2>四、容器资源限制</h2>
      
      <h3>4.1 为什么要限制资源？</h3>
      <div class="example-box">
        <h4>💡 真实场景</h4>
        <p>如果不限制资源，单个容器可能：</p>
        <ul>
          <li>💥 占用所有 CPU，导致其他容器卡死</li>
          <li>💥 消耗所有内存，触发 OOM（Out of Memory）</li>
          <li>💥 耗尽磁盘 I/O，拖慢整个系统</li>
        </ul>
      </div>

      <h3>4.2 CPU 限制</h3>
      <div class="experiment-box">
        <h4>🧪 实验 6：限制 CPU 使用</h4>
        <pre><code># === CPU 份额（相对权重）===
docker run -d --name cpu-low --cpus="0.5" nginx
# 最多使用 0.5 个 CPU（50% 的一个核心）

docker run -d --name cpu-high --cpus="2" nginx
# 最多使用 2 个 CPU

# === CPU 份额权重（多个容器竞争时）===
docker run -d --cpu-shares=512 --name share-low nginx
docker run -d --cpu-shares=1024 --name share-high nginx
# share-high 获得的 CPU 时间是 share-low 的 2 倍

# === 指定 CPU 核心 ===
docker run -d --cpuset-cpus="0,1" --name cpu-core nginx
# 只在 CPU 0 和 1 上运行

# === 查看资源使用情况 ===
docker stats
# 实时显示每个容器的 CPU、内存、网络、IO 使用率</code></pre>
      </div>

      <h3>4.3 内存限制</h3>
      <div class="experiment-box">
        <h4>🧪 实验 7：限制内存使用</h4>
        <pre><code># === 硬限制（超过会被 Kill）===
docker run -d --memory="512m" --name mem-limit nginx
# 最多使用 512MB 内存，超过会触发 OOM

docker run -d --memory="1g" --name mem-1g nginx
# 最多使用 1GB

# === 内存 + Swap 限制 ===
docker run -d \
  --memory="512m" \
  --memory-swap="1g" \
  --name mem-swap nginx
# 内存 512MB + Swap 512MB = 总共 1GB

# === 禁用 Swap ===
docker run -d --memory="512m" --memory-swap="512m" --name no-swap nginx
# memory-swap = memory 时，禁用 swap

# === 内存预留（软限制）===
docker run -d --memory-reservation="256m" --name mem-reserve nginx
# 建议使用不超过 256MB，但不强制

# === 测试内存限制 ===
docker run -it --memory="100m" ubuntu bash
# 在容器内执行
apt update && apt install -y stress
stress --vm 1 --vm-bytes 150M --timeout 10s
# 超过 100MB，容器被 Kill</code></pre>

        <div class="key-point">
          <h4>⚠️ 内存限制注意事项</h4>
          <ul>
            <li>设置过小会导致容器频繁重启（OOM）</li>
            <li>Java 应用需要设置 JVM 参数：<code>-Xmx</code> 小于容器限制</li>
            <li>生产环境建议留出 20-30% 的余量</li>
          </ul>
        </div>
      </div>

      <h3>4.4 磁盘 I/O 限制</h3>
      <pre><code># 限制读写速度
docker run -d \
  --device-read-bps /dev/sda:1mb \
  --device-write-bps /dev/sda:1mb \
  --name io-limit nginx

# 限制 IOPS（每秒读写次数）
docker run -d \
  --device-read-iops /dev/sda:100 \
  --device-write-iops /dev/sda:100 \
  --name iops-limit nginx</code></pre>

      <h3>4.5 综合资源限制示例</h3>
      <div class="experiment-box">
        <h4>🧪 实验 8：生产环境资源配置</h4>
        <pre><code># 典型的生产环境配置
docker run -d \
  --name production-app \
  --cpus="2" \
  --memory="2g" \
  --memory-reservation="1.5g" \
  --restart=unless-stopped \
  -p 8080:8080 \
  -e JAVA_OPTS="-Xmx1536m" \
  my-java-app:latest

# 参数说明
# --cpus="2": 最多 2 个 CPU
# --memory="2g": 硬限制 2GB
# --memory-reservation="1.5g": 软限制 1.5GB
# --restart=unless-stopped: 自动重启
# -Xmx1536m: JVM 堆内存（容器内存的 75%）</code></pre>
      </div>
    </section>

    <section id="chapter-5">
      <h2>五、容器清理与维护</h2>
      
      <h3>5.1 删除容器</h3>
      <pre><code># 删除单个容器
docker rm &lt;容器ID或名称&gt;          # 必须先停止
docker rm -f &lt;容器ID或名称&gt;       # 强制删除（运行中的也删）

# 批量删除
docker rm $(docker ps -aq)          # 删除所有已停止的容器
docker container prune              # 删除所有已停止的容器（推荐）

# 删除所有容器（危险！）
docker rm -f $(docker ps -aq)</code></pre>

      <h3>5.2 自动清理</h3>
      <div class="experiment-box">
        <h4>🧪 实验 9：容器自动清理</h4>
        <pre><code># 容器退出后自动删除
docker run --rm -it ubuntu bash
# exit 后容器自动删除，适合临时测试

# 示例：临时运行 Python 脚本
docker run --rm python:3.11 python -c "print('Hello')"
# 执行完自动删除

# 定期清理系统
docker system prune                 # 清理未使用的容器、网络、镜像
docker system prune -a              # 清理所有未使用资源
docker system prune -a --volumes    # 连数据卷也清理（危险）</code></pre>
      </div>

      <h3>5.3 容器重启策略</h3>
      <div class="concept-box">
        <h4>📊 重启策略详解</h4>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>策略</th>
              <th>说明</th>
              <th>使用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>no</code></td>
              <td>永不重启（默认）</td>
              <td>临时测试容器</td>
            </tr>
            <tr>
              <td><code>on-failure</code></td>
              <td>失败时重启</td>
              <td>开发环境</td>
            </tr>
            <tr>
              <td><code>always</code></td>
              <td>总是重启</td>
              <td>守护进程</td>
            </tr>
            <tr>
              <td><code>unless-stopped</code></td>
              <td>除非手动停止</td>
              <td>生产环境（推荐）</td>
            </tr>
          </tbody>
        </table>

        <pre><code># 失败时重启（最多 3 次）
docker run -d --restart=on-failure:3 nginx

# 总是重启
docker run -d --restart=always nginx

# 除非手动停止才重启
docker run -d --restart=unless-stopped nginx

# 修改已有容器的重启策略
docker update --restart=unless-stopped my-container</code></pre>
      </div>
    </section>

    <section id="practice">
      <h2>六、综合练习</h2>
      
      <div class="practice-box">
        <h3>练习 1：完整的容器生命周期管理</h3>
        <pre><code># 1. 创建并启动容器
docker run -d --name practice-web -p 8080:80 nginx

# 2. 查看容器状态
docker ps
docker logs practice-web

# 3. 进入容器修改配置
docker exec -it practice-web bash
echo "Hello from Container" > /usr/share/nginx/html/index.html
exit

# 4. 验证修改
curl http://localhost:8080

# 5. 查看资源使用
docker stats practice-web --no-stream

# 6. 重启容器
docker restart practice-web

# 7. 清理
docker stop practice-web
docker rm practice-web</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 2：资源限制实战</h3>
        <pre><code># 创建资源受限的容器
docker run -d \
  --name resource-limit \
  --cpus="1" \
  --memory="512m" \
  --restart=unless-stopped \
  -p 8081:80 \
  nginx

# 实时监控资源使用
docker stats resource-limit

# 思考题：
# 1. 如何查看容器的详细资源配置？
# 2. 如果容器超出内存限制会发生什么？
# 3. 如何动态调整运行中容器的资源限制？</code></pre>
      </div>

      <div class="practice-box">
        <h3>练习 3：日志管理</h3>
        <pre><code># 创建测试容器
docker run -d --name log-test \
  --log-opt max-size=1m \
  --log-opt max-file=3 \
  nginx

# 产生大量日志（访问多次）
for i in {1..100}; do curl http://localhost:80; done

# 查看日志配置
docker inspect log-test | grep -A 10 LogConfig

# 查看最近日志
docker logs --tail 20 --since 1m log-test

# 清理
docker rm -f log-test</code></pre>
      </div>
    </section>

    <section id="summary">
      <h2>📝 课程小结</h2>
      
      <div class="summary-box">
        <h3>核心知识点</h3>
        <ul class="checklist">
          <li>✅ 容器7种状态：created、running、paused、restarting、exited、dead、removing</li>
          <li>✅ 生命周期操作：create、start、stop、restart、pause、unpause、kill、rm</li>
          <li>✅ 日志管理：<code>docker logs</code> 的多种参数（-f、--tail、--since、-t）</li>
          <li>✅ 进入容器：<code>docker exec -it</code> vs <code>docker attach</code></li>
          <li>✅ 资源限制：CPU（--cpus）、内存（--memory）、磁盘 I/O</li>
          <li>✅ 重启策略：no、on-failure、always、unless-stopped</li>
          <li>✅ 容器清理：<code>docker rm</code>、<code>--rm</code>、<code>docker prune</code></li>
        </ul>

        <h3>关键命令回顾</h3>
        <pre><code># 生命周期管理
docker start/stop/restart/pause/unpause/kill/rm &lt;容器&gt;

# 日志查看
docker logs -f --tail 100 --since 10m &lt;容器&gt;

# 进入容器
docker exec -it &lt;容器&gt; bash

# 资源限制
docker run -d --cpus="2" --memory="1g" --restart=unless-stopped nginx

# 系统清理
docker system prune -a</code></pre>

        <h3>🎯 下节预告</h3>
        <p>第4讲将学习 <strong>数据持久化</strong>：</p>
        <ul>
          <li>为什么容器数据会丢失？</li>
          <li>Volume 数据卷详解</li>
          <li>Bind Mount 绑定挂载</li>
          <li>数据备份与迁移</li>
        </ul>
      </div>
    </section>

    <div class="navigation-buttons">
      <router-link to="/lecture-2" class="nav-btn prev">← 上一讲</router-link>
      <router-link to="/lecture-4" class="nav-btn next">下一讲：数据持久化 →</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LectureSidebar from '@/components/LectureSidebar.vue'

const sections = ref([
  { id: 'intro', title: '👋 课程目标' },
  { id: 'chapter-1', title: '一、容器生命周期完整解析', level: 1 },
  { id: 'chapter-2', title: '二、容器日志管理', level: 1 },
  { id: 'chapter-3', title: '三、进入容器调试', level: 1 },
  { id: 'chapter-4', title: '四、容器资源限制', level: 1 },
  { id: 'chapter-5', title: '五、容器清理与维护', level: 1 },
  { id: 'practice', title: '六、综合练习', level: 1 },
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