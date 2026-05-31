# 第十讲 Docker Compose 实验指南

本文档包含第十讲所有实验的完整代码，可以直接复制粘贴使用。

---

## 实验1：基础Compose（单服务）

### 创建项目目录
```bash
mkdir -p ~/compose-exp1
cd ~/compose-exp1
```

### 创建 docker-compose.yml
```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8081:80"
    networks:
      - app-net

networks:
  app-net:
```

### 启动服务
```bash
docker compose up -d
```

### 测试访问
```bash
curl http://localhost:8081
```

### 查看状态
```bash
docker compose ps
```

---

## 实验2：环境变量配置

### 创建项目目录
```bash
mkdir -p ~/compose-exp2
cd ~/compose-exp2
```

### 创建 .env 文件
```bash
cat > .env << 'ENVFILE'
APP_NAME=TestApp
APP_PORT=8082
APP_ENV=development
ENVFILE
```

### 创建 docker-compose.yml
```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "${APP_PORT}:80"
    environment:
      - APP_NAME=${APP_NAME}
      - APP_ENV=${APP_ENV}
    networks:
      - app-net

networks:
  app-net:
```

### 启动服务
```bash
docker compose up -d
```

### 验证环境变量
```bash
docker compose exec web env | grep APP
```

---

## 实验3：服务间通信

### 创建项目目录
```bash
mkdir -p ~/compose-exp3
cd ~/compose-exp3
```

### 创建 docker-compose.yml
```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8083:80"
    networks:
      - app-net

  client:
    image: alpine:latest
    command: sleep 3600
    networks:
      - app-net

networks:
  app-net:
```

### 启动服务
```bash
docker compose up -d
```

### 测试容器间通信
```bash
# 从client容器ping web容器
docker compose exec client ping -c 3 web

# 从client容器访问web服务
docker compose exec client wget -qO- http://web
```

---

## 实验4：LEMP栈部署

### 创建项目目录
```bash
mkdir -p ~/lemp-project
cd ~/lemp-project
mkdir -p html
```

### 创建测试页面
```bash
cat > html/index.php << 'PHP'
<?php
phpinfo();
?>
PHP
```

### 创建 docker-compose.yml
```yaml
version: "3.8"

services:
  nginx:
    image: nginx:alpine
    ports:
      - "8084:80"
    volumes:
      - ./html:/usr/share/nginx/html
    depends_on:
      - php
    networks:
      - app-net

  php:
    image: php:8-fpm-alpine
    volumes:
      - ./html:/var/www/html
    networks:
      - app-net

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - app-net

networks:
  app-net:

volumes:
  mysql-data:
```

### 启动服务
```bash
docker compose up -d
```

### 访问测试
```bash
curl http://localhost:8084
```

---

## 实验5：Flask应用编排

### 创建项目目录
```bash
mkdir -p ~/flask-app/app
cd ~/flask-app
```

### 创建 Flask 应用
```bash
cat > app/app.py << 'PYTHON'
from flask import Flask
import redis
import os

app = Flask(__name__)
redis_host = os.environ.get('REDIS_HOST', 'localhost')
redis_client = redis.Redis(host=redis_host, port=6379)

@app.route('/')
def hello():
    count = redis_client.incr('visit_count')
    return f'Hello! Visit count: {count}'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
PYTHON
```

### 创建依赖文件
```bash
cat > app/requirements.txt << 'DEPS'
flask==2.3.0
redis==4.5.0
DEPS
```

### 创建 Dockerfile
```bash
cat > app/Dockerfile << 'DOCKER'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app.py .
CMD ["python", "app.py"]
DOCKER
```

### 创建 docker-compose.yml
```yaml
services:
  web:
    build: ./app
    ports:
      - "8085:5000"
    environment:
      - REDIS_HOST=redis
    depends_on:
      - redis
    networks:
      - app-net

  redis:
    image: redis:alpine
    networks:
      - app-net

networks:
  app-net:
```

### 启动服务
```bash
docker compose up -d --build
```

### 测试访问
```bash
curl http://localhost:8085
curl http://localhost:8085
curl http://localhost:8085
```

---

## 实验6：健康检查

### 创建项目目录
```bash
mkdir -p ~/compose-exp6
cd ~/compose-exp6
```

### 创建 docker-compose.yml
```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8086:80"
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 5s
    networks:
      - app-net

networks:
  app-net:
```

### 启动服务
```bash
docker compose up -d
```

### 查看健康状态
```bash
docker compose ps
```

---

## 实验7：WordPress部署

### 创建项目目录
```bash
mkdir -p ~/wordpress-app
cd ~/wordpress-app
```

### 创建 docker-compose.yml
```yaml
services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8087:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: secret
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress-data:/var/www/html
    depends_on:
      - db
    restart: unless-stopped
    networks:
      - app-net

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootsecret
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: secret
    volumes:
      - db-data:/var/lib/mysql
    restart: unless-stopped
    networks:
      - app-net

networks:
  app-net:

volumes:
  wordpress-data:
  db-data:
```

### 启动服务
```bash
docker compose up -d
```

### 访问WordPress
```
浏览器打开: http://localhost:8087
```

---

## 清理所有实验环境

### 方法1：逐个清理
```bash
cd ~/compose-exp1 && docker compose down -v
cd ~/compose-exp2 && docker compose down -v
cd ~/compose-exp3 && docker compose down -v
cd ~/lemp-project && docker compose down -v
cd ~/flask-app && docker compose down -v
cd ~/compose-exp6 && docker compose down -v
cd ~/wordpress-app && docker compose down -v
```

### 方法2：使用清理脚本
```bash
#!/bin/bash
echo "清理所有实验环境..."

# 清理所有实验项目
for dir in compose-exp1 compose-exp2 compose-exp3 compose-exp6 lemp-project flask-app wordpress-app; do
  if [ -d ~/$dir ]; then
    cd ~/$dir && docker compose down -v 2>/dev/null
  fi
done

# 清理未使用的资源
docker container prune -f
docker network prune -f
docker volume prune -f

echo "✅ 清理完成！"
```

### 方法3：一键清理所有Docker资源（谨慎使用）
```bash
# 停止所有容器
docker stop $(docker ps -q)

# 删除所有容器
docker container prune -f

# 删除所有网络
docker network prune -f

# 删除所有数据卷
docker volume prune -f

# 删除所有镜像
docker image prune -a -f
```

---

## 常用命令速查

### 启动服务
```bash
docker compose up -d              # 后台启动
docker compose up                 # 前台启动（查看日志）
docker compose up -d --build      # 重新构建并启动
```

### 查看状态
```bash
docker compose ps                 # 查看服务状态
docker compose logs               # 查看所有日志
docker compose logs -f web        # 实时查看web服务日志
docker compose top                # 查看进程
```

### 管理服务
```bash
docker compose stop               # 停止服务
docker compose start              # 启动已停止的服务
docker compose restart            # 重启服务
docker compose pause              # 暂停服务
docker compose unpause            # 恢复服务
```

### 清理资源
```bash
docker compose down               # 停止并删除容器
docker compose down -v            # 停止并删除容器和数据卷
docker compose down --rmi all     # 停止并删除所有资源
```

### 进入容器
```bash
docker compose exec web sh        # 进入web容器
docker compose exec web bash      # 进入web容器（如果有bash）
```

### 扩展服务
```bash
docker compose up -d --scale web=3    # 扩展web服务到3个副本
```

---

## 故障排查

### 问题1：端口被占用
```bash
# 查看端口占用
sudo lsof -i :8080
# 或
sudo ss -tlnp | grep 8080

# 解决：修改docker-compose.yml中的端口映射
```

### 问题2：容器启动失败
```bash
# 查看日志
docker compose logs [服务名]

# 查看详细信息
docker compose ps -a
```

### 问题3：服务间无法通信
```bash
# 检查网络
docker network ls
docker network inspect [网络名]

# 测试连通性
docker compose exec [服务1] ping [服务2]
```

### 问题4：数据卷问题
```bash
# 查看数据卷
docker volume ls

# 查看数据卷详情
docker volume inspect [卷名]
```

---

## 提示

1. 所有实验使用不同的端口（8081-8087），避免冲突
2. 实验完成后记得清理环境，释放资源
3. 如果遇到问题，先查看日志：`docker compose logs`
4. 生产环境请使用更安全的密码和配置
5. 建议将 .env 文件加入 .gitignore

---

**祝学习愉快！** 🎉
