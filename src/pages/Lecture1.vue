<template>
  <div class="lecture-page">
    <div class="page-container" :style="{ transform: `translateX(-${(currentPage - 1) * 100}%)` }">
      
      <!-- 封面页 -->
      <div class="page cover-page">
        <div class="cover-content">
          <div class="course-badge">🐳 Docker & Kubernetes 实战课程</div>
          <h1 class="main-title">第1课时</h1>
          <h2 class="sub-title">容器技术概述与Docker基础入门</h2>
          <p class="tagline">从"在我机器上能跑"到"一次构建、处处运行"</p>
          <div class="meta-info">
            <span>📚 90分钟</span>
            <span>🎯 理论+实操</span>
            <span>📊 入门级</span>
          </div>
        </div>
      </div>

      <!-- 课程目标 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">01</span>
          <h1 class="page-title">课程目标</h1>
        </div>
        <div class="page-body">
          <div class="goal-list">
            <div class="goal-item">
              <div class="goal-icon">🎯</div>
              <div class="goal-content">
                <h3>理解容器技术背景</h3>
                <p>掌握容器技术产生的背景和解决的问题</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">📦</div>
              <div class="goal-content">
                <h3>掌握Docker核心概念</h3>
                <p>镜像、容器、仓库三大核心组件</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">⚖️</div>
              <div class="goal-content">
                <h3>了解容器与虚拟机区别</h3>
                <p>理解两种虚拟化技术的本质差异</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="goal-icon">🔧</div>
              <div class="goal-content">
                <h3>完成Docker环境搭建</h3>
                <p>安装配置并实践基础命令</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程安排 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">02</span>
          <h1 class="page-title">课程安排</h1>
        </div>
        <div class="page-body">
          <div class="schedule-grid">
            <div class="schedule-item">
              <div class="schedule-time">45分钟</div>
              <div class="schedule-type">理论讲解</div>
              <div class="schedule-desc">容器技术背景、Docker核心概念、企业案例</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">30分钟</div>
              <div class="schedule-type">实操演示</div>
              <div class="schedule-desc">Docker安装配置、基础命令实践</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">15分钟</div>
              <div class="schedule-type">随堂练习</div>
              <div class="schedule-desc">动手实践、提交成果</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 1 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 1</span>
          <h1 class="section-title">容器技术产生背景</h1>
          <p class="section-desc">为什么我们需要容器技术？</p>
        </div>
      </div>

      <!-- 经典场景 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.1</span>
          <h1 class="page-title">经典场景：开发人员的噩梦</h1>
        </div>
        <div class="page-body">
          <div class="highlight-box warning">
            <div class="highlight-title">⚠️ 痛点场景</div>
            <div class="highlight-content">
              <strong>"在我机器上是好的啊！"</strong>
              <p>这是开发人员最常说的一句话</p>
            </div>
          </div>
          <p class="paragraph">
            在传统软件开发中，应用在开发环境运行正常，但部署到生产环境后却出现各种问题。
            这种"环境不一致"的问题浪费大量调试时间。
          </p>
        </div>
      </div>

      <!-- 典型案例 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.1</span>
          <h1 class="page-title">典型案例分析</h1>
        </div>
        <div class="page-body">
          <div class="example-box">
            <div class="example-title">💡 某互联网公司的Web应用</div>
            <table class="compare-table">
              <thead>
                <tr>
                  <th>配置项</th>
                  <th>开发环境</th>
                  <th>生产环境</th>
                  <th>问题</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Python版本</td>
                  <td>3.11</td>
                  <td>3.8</td>
                  <td class="error">版本不兼容</td>
                </tr>
                <tr>
                  <td>Web框架</td>
                  <td>Flask 3.0</td>
                  <td>Flask 2.0</td>
                  <td class="error">API变更</td>
                </tr>
                <tr>
                  <td>数据库</td>
                  <td>PostgreSQL</td>
                  <td>MySQL</td>
                  <td class="error">SQL语法差异</td>
                </tr>
                <tr>
                  <td>操作系统</td>
                  <td>macOS</td>
                  <td>CentOS</td>
                  <td class="error">路径/权限差异</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 传统部署痛点 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.2</span>
          <h1 class="page-title">传统部署的痛点</h1>
        </div>
        <div class="page-body">
          <div class="pain-points-grid">
            <div class="pain-point-card">
              <div class="pain-icon">🔧</div>
              <h3>环境不一致</h3>
              <p>开发、测试、生产环境配置差异巨大</p>
            </div>
            <div class="pain-point-card">
              <div class="pain-icon">📦</div>
              <h3>依赖冲突</h3>
              <p>不同项目需要不同版本的运行时</p>
            </div>
            <div class="pain-point-card">
              <div class="pain-icon">📝</div>
              <h3>配置复杂</h3>
              <p>新员工配置环境需要数天时间</p>
            </div>
            <div class="pain-point-card">
              <div class="pain-icon">🔄</div>
              <h3>迁移困难</h3>
              <p>换服务器就要重新配置环境</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 问题影响 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.2</span>
          <h1 class="page-title">问题影响统计</h1>
        </div>
        <div class="page-body">
          <div class="impact-items">
            <div class="impact-item">
              <span class="impact-value">30%</span>
              <span class="impact-label">开发时间浪费在环境问题上</span>
            </div>
            <div class="impact-item">
              <span class="impact-value">50%</span>
              <span class="impact-label">部署失败源于环境差异</span>
            </div>
            <div class="impact-item">
              <span class="impact-value">数天</span>
              <span class="impact-label">新员工环境配置时间</span>
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：环境</div>
            <p><strong>环境</strong>指软件运行所需的完整条件，包括操作系统、运行时（如Python、Java）、依赖库、配置文件等。就像植物生长需要土壤、阳光、水分一样，软件运行也需要特定的"环境"。</p>
          </div>
        </div>
      </div>

      <!-- 传统方案一 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.3</span>
          <h1 class="page-title">传统方案一：详细文档</h1>
        </div>
        <div class="page-body">
          <div class="solution-item">
            <h3>📄 方案描述</h3>
            <p>编写详细的环境配置文档，指导手动安装</p>
            <div class="pros-cons">
              <div class="pros">
                <div class="label">优点</div>
                <span class="pro">✓ 成本低，易于实施</span>
              </div>
              <div class="cons">
                <div class="label">缺点</div>
                <span class="con">✗ 文档容易过时</span>
                <span class="con">✗ 人工操作容易出错</span>
                <span class="con">✗ 不同人理解可能有偏差</span>
              </div>
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：部署文档</div>
            <p>记录如何安装和配置软件环境的说明文件。就像家电的使用说明书，告诉你如何操作。</p>
          </div>
        </div>
      </div>

      <!-- 传统方案二 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.3</span>
          <h1 class="page-title">传统方案二：虚拟机镜像</h1>
        </div>
        <div class="page-body">
          <div class="solution-item">
            <h3>🖥️ 方案描述</h3>
            <p>将整个操作系统打包成虚拟机镜像</p>
            <div class="pros-cons">
              <div class="pros">
                <div class="label">优点</div>
                <span class="pro">✓ 环境完全隔离</span>
                <span class="pro">✓ 可以打包所有依赖</span>
              </div>
              <div class="cons">
                <div class="label">缺点</div>
                <span class="con">✗ 镜像体积巨大（5-20GB）</span>
                <span class="con">✗ 启动慢（分钟级）</span>
                <span class="con">✗ 资源消耗高</span>
              </div>
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：虚拟机</div>
            <p><strong>虚拟机（Virtual Machine）</strong>是在一台物理电脑上模拟出的另一台完整电脑。它有自己的操作系统，就像在电脑里又装了一台电脑。</p>
          </div>
        </div>
      </div>

      <!-- 思考与引出 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 1.3</span>
          <h1 class="page-title">思考与引出</h1>
        </div>
        <div class="page-body">
          <div class="highlight-box info">
            <div class="highlight-title">💡 思考</div>
            <div class="highlight-content">
              <p>有没有一种技术，既能像虚拟机一样保证环境隔离，又能像普通进程一样轻量快速？</p>
              <p><strong>答案就是——容器技术！</strong></p>
            </div>
          </div>
          <div class="comparison-visual">
            <div class="compare-item bad">
              <div class="compare-icon">❌</div>
              <div class="compare-text">虚拟机：太重、太慢</div>
            </div>
            <div class="compare-arrow">→</div>
            <div class="compare-item good">
              <div class="compare-icon">✅</div>
              <div class="compare-text">容器：轻量、快速</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 2 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 2</span>
          <h1 class="section-title">Docker核心概念</h1>
          <p class="section-desc">理解Docker的三大核心组件</p>
        </div>
      </div>

      <!-- Docker是什么 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.1</span>
          <h1 class="page-title">Docker是什么？</h1>
        </div>
        <div class="page-body">
          <div class="definition-box">
            <div class="definition-term">Docker</div>
            <div class="definition-content">
              Docker是一个开源的应用容器引擎，让开发者可以将应用程序及其依赖打包到一个可移植的容器中，然后发布到任何操作系统上运行。
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：容器</div>
            <p><strong>容器（Container）</strong>是一种轻量级的虚拟化技术。可以把它想象成一个"盒子"，里面装着你的应用程序和它运行所需的一切。这个盒子可以在任何电脑上运行，里面的程序不会受到外部环境影响。</p>
          </div>
        </div>
      </div>

      <!-- Docker解决了什么问题 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.1</span>
          <h1 class="page-title">Docker解决了什么问题？</h1>
        </div>
        <div class="page-body">
          <div class="solution-visual">
            <div class="before-after">
              <div class="before">
                <h4>❌ 没有Docker</h4>
                <div class="flow">
                  <div class="flow-step">开发环境配置</div>
                  <div class="flow-arrow">↓</div>
                  <div class="flow-step error">环境不一致</div>
                  <div class="flow-arrow">↓</div>
                  <div class="flow-step error">反复调试</div>
                  <div class="flow-arrow">↓</div>
                  <div class="flow-step error">部署失败</div>
                </div>
              </div>
              <div class="after">
                <h4>✅ 使用Docker</h4>
                <div class="flow">
                  <div class="flow-step">打包成镜像</div>
                  <div class="flow-arrow">↓</div>
                  <div class="flow-step success">环境完全一致</div>
                  <div class="flow-arrow">↓</div>
                  <div class="flow-step success">一键部署</div>
                  <div class="flow-arrow">↓</div>
                  <div class="flow-step success">运行成功</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Docker vs 虚拟机 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.2</span>
          <h1 class="page-title">Docker vs 虚拟机</h1>
        </div>
        <div class="page-body">
          <div class="arch-comparison">
            <div class="arch-item">
              <h4>虚拟机架构</h4>
              <div class="arch-diagram">
                <div class="arch-layer app">应用 + 依赖库</div>
                <div class="arch-layer os">完整操作系统 (1-2GB)</div>
                <div class="arch-layer hypervisor">Hypervisor</div>
                <div class="arch-layer host">宿主机操作系统</div>
              </div>
            </div>
            <div class="arch-item highlight">
              <h4>容器架构</h4>
              <div class="arch-diagram">
                <div class="arch-layer app">应用 + 依赖库</div>
                <div class="arch-layer docker">Docker Engine</div>
                <div class="arch-layer host">宿主机操作系统</div>
              </div>
            </div>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">🔑 核心区别</div>
            <div class="highlight-content">
              容器<strong>共享宿主机内核</strong>，无需完整操作系统，因此更轻量、更快速！
            </div>
          </div>
        </div>
      </div>

      <!-- 对比表格 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.2</span>
          <h1 class="page-title">容器 vs 虚拟机详细对比</h1>
        </div>
        <div class="page-body">
          <table class="compare-table full-width">
            <thead>
              <tr>
                <th>特性</th>
                <th>容器</th>
                <th>虚拟机</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>启动速度</td>
                <td class="success">秒级</td>
                <td>分钟级</td>
              </tr>
              <tr>
                <td>硬盘占用</td>
                <td class="success">MB级</td>
                <td>GB级</td>
              </tr>
              <tr>
                <td>性能损耗</td>
                <td class="success">&lt;5%</td>
                <td>10-20%</td>
              </tr>
              <tr>
                <td>单机数量</td>
                <td class="success">数千个</td>
                <td>几十个</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Docker与DevOps -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.3</span>
          <h1 class="page-title">Docker与DevOps的关系</h1>
        </div>
        <div class="page-body">
          <div class="devops-flow">
            <div class="flow-item traditional">
              <h4>❌ 传统流程</h4>
              <div class="flow-steps">
                <div class="step">开发代码</div>
                <div class="step">编写部署文档</div>
                <div class="step error">环境不一致</div>
                <div class="step error">反复调试</div>
              </div>
            </div>
            <div class="flow-item modern">
              <h4>✅ Docker化流程</h4>
              <div class="flow-steps">
                <div class="step">开发代码</div>
                <div class="step">构建镜像</div>
                <div class="step success">一键部署</div>
                <div class="step success">环境一致</div>
              </div>
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：DevOps</div>
            <p><strong>DevOps</strong>是Development（开发）和Operations（运维）的组合词，指开发与运维紧密协作的工作方式，目标是加快软件交付速度、提高质量。</p>
          </div>
        </div>
      </div>

      <!-- 三大核心组件标题 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.4</span>
          <h1 class="page-title">Docker三大核心组件</h1>
        </div>
        <div class="page-body">
          <div class="core-concepts-overview">
            <div class="concept-preview">
              <div class="concept-num">01</div>
              <div class="concept-icon">🖼️</div>
              <h3>镜像 Image</h3>
              <p>应用的"安装包"</p>
            </div>
            <div class="concept-preview">
              <div class="concept-num">02</div>
              <div class="concept-icon">📦</div>
              <h3>容器 Container</h3>
              <p>镜像的运行实例</p>
            </div>
            <div class="concept-preview">
              <div class="concept-num">03</div>
              <div class="concept-icon">🏠</div>
              <h3>仓库 Repository</h3>
              <p>存储分发镜像</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 镜像 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.4</span>
          <h1 class="page-title">核心概念：镜像 Image</h1>
        </div>
        <div class="page-body">
          <div class="concept-card">
            <div class="concept-number">01</div>
            <div class="concept-icon">🖼️</div>
            <h3>镜像 Image</h3>
            <p class="concept-def">应用的"安装包"，包含运行所需的一切</p>
          </div>
          <div class="concept-detail">
            <h4>包含内容：</h4>
            <ul>
              <li>操作系统文件系统</li>
              <li>应用程序代码</li>
              <li>运行时环境（Python、Node.js等）</li>
              <li>依赖库和配置文件</li>
            </ul>
          </div>
          <div class="term-box">
            <div class="term-title">💡 类比理解</div>
            <p>镜像就像<strong>软件安装包</strong>，或者面向对象编程中的<strong>"类"</strong>。它是静态的、不可变的模板。</p>
          </div>
        </div>
      </div>

      <!-- 容器 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.4</span>
          <h1 class="page-title">核心概念：容器 Container</h1>
        </div>
        <div class="page-body">
          <div class="concept-card">
            <div class="concept-number">02</div>
            <div class="concept-icon">📦</div>
            <h3>容器 Container</h3>
            <p class="concept-def">镜像的运行实例，隔离的运行环境</p>
          </div>
          <div class="concept-detail">
            <h4>容器特性：</h4>
            <ul>
              <li>拥有独立的文件系统</li>
              <li>拥有独立的网络配置</li>
              <li>拥有独立的进程空间</li>
              <li>可以被启动、停止、删除</li>
            </ul>
          </div>
          <div class="term-box">
            <div class="term-title">💡 类比理解</div>
            <p>容器就像<strong>运行中的软件</strong>，或者面向对象编程中的<strong>"对象实例"</strong>。一个镜像可以创建多个容器实例。</p>
          </div>
        </div>
      </div>

      <!-- 仓库 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.4</span>
          <h1 class="page-title">核心概念：仓库 Repository</h1>
        </div>
        <div class="page-body">
          <div class="concept-card">
            <div class="concept-number">03</div>
            <div class="concept-icon">🏠</div>
            <h3>仓库 Repository</h3>
            <p class="concept-def">存储和分发镜像的地方</p>
          </div>
          <div class="concept-detail">
            <h4>仓库类型：</h4>
            <ul>
              <li><strong>Docker Hub</strong> - 官方公共仓库</li>
              <li><strong>私有仓库</strong> - 企业内部使用</li>
              <li><strong>镜像标签</strong> - 区分不同版本</li>
            </ul>
          </div>
          <div class="term-box">
            <div class="term-title">💡 类比理解</div>
            <p>仓库就像<strong>应用商店</strong>。GitHub存储代码，Docker Hub存储镜像。你可以从中下载别人做好的镜像，也可以上传自己的镜像。</p>
          </div>
        </div>
      </div>

      <!-- 三者关系 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.4</span>
          <h1 class="page-title">镜像、容器、仓库的关系</h1>
        </div>
        <div class="page-body">
          <div class="relationship-diagram">
            <h4>📊 工作流程</h4>
            <div class="diagram-flow">
              <div class="flow-item">
                <span class="flow-icon">📝</span>
                <span>Dockerfile</span>
              </div>
              <div class="flow-arrow">build →</div>
              <div class="flow-item highlight">
                <span class="flow-icon">🖼️</span>
                <span>镜像</span>
              </div>
              <div class="flow-arrow">run →</div>
              <div class="flow-item">
                <span class="flow-icon">📦</span>
                <span>容器</span>
              </div>
            </div>
            <div class="diagram-flow">
              <div class="flow-item">
                <span class="flow-icon">🖼️</span>
                <span>镜像</span>
              </div>
              <div class="flow-arrow">push →</div>
              <div class="flow-item highlight">
                <span class="flow-icon">🏠</span>
                <span>仓库</span>
              </div>
              <div class="flow-arrow">pull →</div>
              <div class="flow-item">
                <span class="flow-icon">🖼️</span>
                <span>镜像</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 企业案例 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 2.5</span>
          <h1 class="page-title">企业应用案例</h1>
        </div>
        <div class="page-body">
          <div class="case-studies">
            <div class="case-card">
              <div class="case-logo">🏢</div>
              <h3>阿里巴巴</h3>
              <p class="case-desc">全球最大的Docker实践者</p>
              <ul class="case-stats">
                <li>日均容器启动：<strong>10亿次</strong></li>
                <li>双十一支撑：<strong>数百万容器</strong></li>
              </ul>
            </div>
            <div class="case-card">
              <div class="case-logo">🍔</div>
              <h3>美团</h3>
              <p class="case-desc">容器化率超过95%</p>
              <ul class="case-stats">
                <li>部署效率：<strong>提升10倍</strong></li>
                <li>资源利用率：<strong>提升40%</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Part 3 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 3</span>
          <h1 class="section-title">实操环节</h1>
          <p class="section-desc">Docker安装与基础命令实践</p>
        </div>
      </div>

      <!-- 环境准备 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.1</span>
          <h1 class="page-title">环境准备</h1>
        </div>
        <div class="page-body">
          <div class="highlight-box warning">
            <div class="highlight-title">⚠️ 系统要求</div>
            <div class="highlight-content">
              内核版本必须 <strong>≥ 3.10</strong>
            </div>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">检查内核版本</span>
            </div>
            <pre><code>uname -r
# 输出示例：3.10.0-1160.el7.x86_64</code></pre>
          </div>
          <table class="compare-table">
            <thead>
              <tr>
                <th>项目</th>
                <th>最低要求</th>
                <th>推荐配置</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>操作系统</td>
                <td>CentOS 7.x</td>
                <td>CentOS 7.9</td>
              </tr>
              <tr>
                <td>内存</td>
                <td>2GB</td>
                <td>4GB+</td>
              </tr>
              <tr>
                <td>磁盘</td>
                <td>20GB</td>
                <td>50GB+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Docker安装步骤1-2 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.2</span>
          <h1 class="page-title">Docker安装（步骤1-2）</h1>
        </div>
        <div class="page-body">
          <div class="install-step">
            <div class="step-number">Step 1</div>
            <div class="step-content">
              <h4>安装依赖包</h4>
              <div class="code-block">
                <pre><code>yum install -y yum-utils device-mapper-persistent-data lvm2</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 2</div>
            <div class="step-content">
              <h4>添加Docker仓库</h4>
              <div class="code-block">
                <pre><code>yum-config-manager --add-repo \
  https://download.docker.com/linux/centos/docker-ce.repo</code></pre>
              </div>
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：yum</div>
            <p><strong>yum</strong>是CentOS系统的软件包管理器，类似手机上的应用商店。yum install就是安装软件的命令。</p>
          </div>
        </div>
      </div>

      <!-- Docker安装步骤3-4 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.2</span>
          <h1 class="page-title">Docker安装（步骤3-4）</h1>
        </div>
        <div class="page-body">
          <div class="install-step">
            <div class="step-number">Step 3</div>
            <div class="step-content">
              <h4>安装Docker</h4>
              <div class="code-block">
                <pre><code>yum install -y docker-ce docker-ce-cli containerd.io</code></pre>
              </div>
            </div>
          </div>
          <div class="install-step">
            <div class="step-number">Step 4</div>
            <div class="step-content">
              <h4>启动Docker服务</h4>
              <div class="code-block">
                <pre><code>systemctl start docker
systemctl enable docker</code></pre>
              </div>
            </div>
          </div>
          <div class="term-box">
            <div class="term-title">📚 名词解释：systemctl</div>
            <p><strong>systemctl</strong>是Linux系统服务管理命令。start启动服务，enable设置开机自启。</p>
          </div>
        </div>
      </div>

      <!-- 配置镜像加速 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.3</span>
          <h1 class="page-title">配置镜像加速</h1>
        </div>
        <div class="page-body">
          <p class="paragraph">国内访问Docker Hub较慢，配置阿里云加速器可提升下载速度。</p>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">配置加速器</span>
            </div>
            <pre><code>mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://your-id.mirror.aliyuncs.com"
  ]
}
EOF
systemctl daemon-reload
systemctl restart docker</code></pre>
          </div>
          <div class="tip-box">
            <div class="tip-title">💡 获取加速地址</div>
            <p>阿里云控制台 → 容器镜像服务 → 镜像加速器</p>
          </div>
        </div>
      </div>

      <!-- 验证安装 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.4</span>
          <h1 class="page-title">验证安装</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看版本</span>
            </div>
            <pre><code>docker version</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">运行测试</span>
            </div>
            <pre><code>docker run hello-world</code></pre>
          </div>
          <div class="highlight-box success">
            <div class="highlight-title">✅ 安装成功标志</div>
            <div class="highlight-content">
              看到 "Hello from Docker!" 表示Docker已正确安装
            </div>
          </div>
        </div>
      </div>

      <!-- 认识Docker Hub -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 3.5</span>
          <h1 class="page-title">认识Docker Hub</h1>
        </div>
        <div class="page-body">
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">搜索镜像</span>
            </div>
            <pre><code>docker search ubuntu
docker search nginx</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">拉取镜像</span>
            </div>
            <pre><code>docker pull ubuntu
docker pull centos:7
docker pull nginx:latest</code></pre>
          </div>
          <div class="code-block">
            <div class="code-header">
              <span class="code-title">查看本地镜像</span>
            </div>
            <pre><code>docker images</code></pre>
          </div>
        </div>
      </div>

      <!-- Part 4 标题 -->
      <div class="page section-page">
        <div class="section-content">
          <span class="section-label">Part 4</span>
          <h1 class="section-title">随堂练习</h1>
          <p class="section-desc">动手实践，巩固所学</p>
        </div>
      </div>

      <!-- 练习任务 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Part 4</span>
          <h1 class="page-title">练习任务（15分钟）</h1>
        </div>
        <div class="page-body">
          <div class="exercise-tasks">
            <div class="exercise-task">
              <div class="task-number">1</div>
              <div class="task-content">
                <h3>完成Docker安装</h3>
                <p>验证：<code>docker run hello-world</code></p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">2</div>
              <div class="task-content">
                <h3>拉取CentOS 7镜像</h3>
                <p>命令：<code>docker pull centos:7</code></p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">3</div>
              <div class="task-content">
                <h3>进入容器执行命令</h3>
                <p>命令：<code>docker run -it centos:7 ls</code></p>
              </div>
            </div>
            <div class="exercise-task">
              <div class="task-number">4</div>
              <div class="task-content">
                <h3>提交截图</h3>
                <p>将运行成功的截图提交给讲师</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程总结 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">总结</span>
          <h1 class="page-title">本课时小结</h1>
        </div>
        <div class="page-body">
          <div class="summary-grid">
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">理解容器技术背景：解决环境不一致问题</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">掌握Docker核心概念：镜像、容器、仓库</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">了解容器与虚拟机区别：轻量、快速</div>
            </div>
            <div class="summary-item">
              <div class="summary-icon">✅</div>
              <div class="summary-text">完成Docker安装与基础命令实践</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 下节预告 -->
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">预告</span>
          <h1 class="page-title">下节预告</h1>
        </div>
        <div class="page-body">
          <div class="next-lecture">
            <h3>📚 第2课时：Docker核心命令（上）</h3>
            <ul>
              <li>镜像管理命令：images/pull/push/rmi</li>
              <li>容器生命周期：run/start/stop/rm</li>
              <li>容器交互：exec/attach</li>
              <li>关键参数：-it/-d/--name/-p</li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <!-- 页面导航 -->
    <div class="page-navigation">
      <button class="nav-btn prev" @click="prevPage" :disabled="currentPage === 1">
        ← 上一页
      </button>
      <div class="page-indicator">
        <span class="current">{{ currentPage }}</span>
        <span class="separator">/</span>
        <span class="total">{{ totalPages }}</span>
      </div>
      <button class="nav-btn next" @click="nextPage" :disabled="currentPage === totalPages">
        下一页 →
      </button>
    </div>

    <!-- 页面缩略图导航 -->
    <div class="page-thumbnails">
      <div 
        v-for="i in totalPages" 
        :key="i" 
        class="thumbnail" 
        :class="{ active: currentPage === i }"
        @click="goToPage(i)"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentPage = ref(1)
const totalPages = 35

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
    nextPage()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    prevPage()
  } else if (e.key === 'Home') {
    currentPage.value = 1
  } else if (e.key === 'End') {
    currentPage.value = totalPages
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
@import './styles/lecture-common.scss';
</style>
