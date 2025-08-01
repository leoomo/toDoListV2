<div align="center">

# 📝 TodoListV2

**现代化的全栈待办事项管理应用**

*采用 FastAPI + Next.js 技术栈构建的企业级待办事项管理系统*

[![Python](https://img.shields.io/badge/Python-3.11+-blue?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[✨ 功能特性](#-功能特性) • [⚡ 演示预览](#-演示预览) • [🚀 快速开始](#-快速开始) • [📖 文档](#-文档) • [🤝 贡献](#-贡献指南)

</div>

## 📑 目录

- [✨ 功能特性](#-功能特性)
- [🏗️ 技术架构](#%EF%B8%8F-技术架构)
- [📁 项目结构](#-项目结构)
- [⚡ 演示预览](#-演示预览)
- [🚀 快速开始](#-快速开始)
- [🔧 环境配置](#-环境配置)
- [📡 API 接口](#-api-接口)
- [🛠️ 开发指南](#%EF%B8%8F-开发指南)
- [🧪 测试](#-测试)
- [🚀 部署](#-部署)
- [📖 文档](#-文档)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)
- [🙏 致谢](#-致谢)

---

## ✨ 功能特性

### 🎯 核心功能
- **📝 任务管理**: 创建、查看、编辑、删除待办事项
- **✅ 状态切换**: 一键标记任务完成/未完成
- **🔍 智能筛选**: 全部、未完成、已完成三种视图
- **📦 批量操作**: 清除已完成任务、清除全部任务
- **🔄 实时同步**: 前后端数据实时同步
- **🎉 成功提示**: 友好的操作反馈消息

### 🎨 用户体验
- **📱 响应式设计**: 完美支持桌面端和移动端
- **⏳ 加载状态**: 优雅的加载指示器
- **🛡️ 错误处理**: 智能错误提示和重试机制
- **✔️ 表单验证**: 客户端和服务端双重验证
- **🌈 视觉反馈**: 流畅的交互动画和过渡效果

### 🔧 开发特性
- **🔒 类型安全**: 端到端 TypeScript 支持
- **🧪 测试覆盖**: 完整的单元测试和集成测试
- **📏 代码规范**: ESLint、Prettier、Black 代码格式化
- **🔄 热重载**: 开发环境实时更新
- **📊 API 文档**: 自动生成的 OpenAPI/Swagger 文档

---

## 🏗️ 技术架构

### 后端 (FastAPI)
- **FastAPI** - 现代化的 Python Web 框架
- **SQLAlchemy** - ORM 框架 
- **SQLite** - 轻量级数据库
- **Pydantic** - 数据验证
- **pytest** - 测试框架

### 前端 (Next.js)
- **Next.js 15** - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Axios** - HTTP 客户端

## 📁 项目结构

```
toDoListV2/
├── backend/                    # FastAPI 后端
│   ├── src/
│   │   └── todolistv2/
│   │       ├── main.py         # 应用入口
│   │       ├── models.py       # 数据模型
│   │       ├── schemas.py      # Pydantic 模式
│   │       ├── crud.py         # CRUD 操作
│   │       ├── database.py     # 数据库配置
│   │       └── api/
│   │           └── todos.py    # API 路由
│   ├── tests/                  # 测试文件
│   ├── pyproject.toml         # 后端配置
│   └── README.md              # 后端文档
├── frontend/                   # Next.js 前端
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   │   ├── page.tsx       # 主页面
│   │   │   └── layout.tsx     # 根布局
│   │   ├── components/        # React 组件
│   │   │   ├── TodoForm.tsx   # 任务表单组件
│   │   │   ├── TodoList.tsx   # 任务列表组件
│   │   │   ├── TodoItem.tsx   # 任务项组件
│   │   │   ├── TodoFilter.tsx # 筛选器组件
│   │   │   ├── Toast.tsx      # 提示消息组件
│   │   │   └── LoadingOverlay.tsx # 加载遮罩组件
│   │   ├── hooks/             # 自定义 Hooks
│   │   │   └── useTodos.ts    # 任务管理 Hook
│   │   ├── lib/               # API 服务层
│   │   │   └── api.ts         # API 客户端
│   │   └── types/             # TypeScript 类型
│   │       └── todo.ts        # 任务类型定义
│   ├── package.json           # 前端配置
│   └── README.md              # 前端文档
├── docs/                      # 项目文档
├── examples/                  # 示例代码
├── scripts/                   # 脚本文件
├── assets/                    # 静态资源
│   └── snapshot.png          # 应用截图
└── README.md                  # 项目主文档
```

---

## ⚡ 演示预览

### 🖥️ 应用界面

<div align="center">
  
![TodoListV2 应用截图](./assets/snapshot.png)

*TodoListV2 - 现代化的待办事项管理界面*

</div>

**主要功能演示:**
- ✅ **添加任务表单** - 支持标题和描述输入，带必填项验证
- ✅ **智能筛选器** - 全部/未完成/已完成三种视图，实时统计
- ✅ **任务管理** - 一键完成/删除，批量操作支持
- ✅ **友好提示** - 成功/错误消息，优雅的用户反馈
- ✅ **响应式设计** - 完美适配桌面和移动设备

### 🌐 在线体验

- **前端应用**: http://localhost:3000
- **API 文档**: http://localhost:8000/docs
- **ReDoc 文档**: http://localhost:8000/redoc

---

## 🚀 快速开始

### 📋 前提条件

确保您的系统已安装以下软件：

- **Python 3.11+** ([下载](https://python.org/downloads/))
- **Node.js 18+** ([下载](https://nodejs.org/))
- **uv** (Python 包管理器) - `pip install uv`
- **Git** ([下载](https://git-scm.com/))

### 🔽 克隆项目

```bash
git clone https://github.com/your-username/TodoListV2.git
cd TodoListV2
```

### 🛠️ 一键启动

使用项目提供的启动脚本：

```bash
# 使用启动脚本（推荐）
bash scripts/dev.sh
```

### 📦 手动启动

#### 1️⃣ 启动后端服务

```bash
# 进入后端目录
cd backend

# 安装依赖
uv sync

# 启动开发服务器
uv run uvicorn src.todolistv2.main:app --reload --host 0.0.0.0 --port 8000
```

✅ 后端服务启动：http://localhost:8000  
📖 API 文档：http://localhost:8000/docs

#### 2️⃣ 启动前端服务

打开新终端：

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

✅ 前端应用启动：http://localhost:3000

### 🎉 开始使用

打开浏览器访问 http://localhost:3000，开始体验现代化的待办事项管理！

---

## 🔧 环境配置

### 环境变量

创建环境配置文件：

#### 后端环境变量 (`.env`)

```bash
# 数据库配置
DATABASE_URL=sqlite:///./todo.db

# API 配置
API_V1_STR=/api/v1
PROJECT_NAME=TodoListV2

# CORS 配置
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

#### 前端环境变量 (`.env.local`)

```bash
# API 基础地址
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 📡 API 接口

### 🔍 基础接口

| 方法 | 端点 | 描述 |
|------|------|------|
| `GET` | `/health` | 健康检查 |
| `GET` | `/docs` | Swagger API 文档 |
| `GET` | `/redoc` | ReDoc API 文档 |

### 📝 待办事项接口

| 方法 | 端点 | 描述 | 参数 |
|------|------|------|------|
| `GET` | `/api/v1/todos/` | 获取待办事项列表 | `completed`, `limit`, `offset` |
| `POST` | `/api/v1/todos/` | 创建新的待办事项 | `title`, `description` |
| `GET` | `/api/v1/todos/{id}` | 获取单个待办事项 | `id` |
| `PUT` | `/api/v1/todos/{id}` | 更新待办事项 | `id`, `title`, `description`, `completed` |
| `DELETE` | `/api/v1/todos/{id}` | 删除待办事项 | `id` |
| `DELETE` | `/api/v1/todos/completed` | 批量删除已完成 | - |
| `DELETE` | `/api/v1/todos/all` | 批量删除全部 | - |

### 📄 API 文档

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

### 🧪 API 测试示例

```bash
# 创建待办事项
curl -X POST "http://localhost:8000/api/v1/todos/" \
  -H "Content-Type: application/json" \
  -d '{"title": "学习 FastAPI", "description": "完成 TodoListV2 项目"}'

# 获取所有待办事项
curl -X GET "http://localhost:8000/api/v1/todos/"

# 更新待办事项状态
curl -X PUT "http://localhost:8000/api/v1/todos/1" \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## 🛠️ 开发指南

### 🐍 后端开发

#### 代码格式化和检查

```bash
cd backend

# 代码格式化
uv run black src/
uv run isort src/

# 代码检查
uv run flake8 src/
uv run mypy src/
```

#### 运行测试

```bash
# 单元测试
uv run pytest -v

# 测试覆盖率
uv run pytest --cov=src/todolistv2 --cov-report=html

# API 集成测试
bash test_api_curl.sh
```

### ⚛️ 前端开发

#### 开发命令

```bash
cd frontend

# 类型检查
npm run type-check

# 代码检查和修复
npm run lint
npm run lint:fix

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

#### 开发工具配置

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化 
- **TypeScript**: 类型检查
- **Tailwind CSS**: 样式框架

### 🔄 开发工作流

1. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **开发过程**
   - 后端：修改代码 → 运行测试 → 格式化代码
   - 前端：修改代码 → 类型检查 → 代码检查

3. **提交前检查**
   ```bash
   # 后端检查
   cd backend && uv run pytest && uv run black src/ && uv run mypy src/
   
   # 前端检查  
   cd frontend && npm run build && npm run lint
   ```

4. **提交和推送**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

---

## 🧪 测试

### 🐍 后端测试

#### 测试类型
- **单元测试**: pytest 覆盖所有 CRUD 操作
- **API 测试**: 完整的 REST API 测试套件  
- **集成测试**: 数据库集成测试

#### 运行测试

```bash
cd backend

# 运行所有测试
uv run pytest

# 详细输出
uv run pytest -v

# 测试覆盖率
uv run pytest --cov=src/todolistv2

# 生成 HTML 覆盖率报告
uv run pytest --cov=src/todolistv2 --cov-report=html
```

### ⚛️ 前端测试

#### 测试类型
- **组件测试**: React 组件功能测试
- **用户交互测试**: E2E 自动化测试
- **API 集成测试**: 前后端通信测试

#### 运行测试

```bash
cd frontend

# 运行组件测试（待实现）
npm run test

# E2E 测试（待实现）
npm run test:e2e
```

### 📊 测试覆盖率

目前的测试覆盖情况：
- ✅ 后端 API 接口：100%
- ✅ 数据库模型：100%
- ✅ CRUD 操作：100%
- 🔄 前端组件：开发中
- 🔄 E2E 测试：开发中

## 🚀 部署

### 🐳 Docker 部署（推荐）

#### 使用 Docker Compose

```bash
# 克隆项目
git clone https://github.com/your-username/TodoListV2.git
cd TodoListV2

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 停止服务
docker-compose down
```

#### 手动 Docker 部署

```bash
# 构建后端镜像
cd backend
docker build -t todolistv2-backend .

# 构建前端镜像  
cd ../frontend
docker build -t todolistv2-frontend .

# 运行后端容器
docker run -d -p 8000:8000 --name backend todolistv2-backend

# 运行前端容器
docker run -d -p 3000:3000 --name frontend todolistv2-frontend
```

### 🌐 传统部署

#### 后端部署

```bash
cd backend

# 安装生产依赖
uv sync --no-dev

# 启动生产服务器
uv run uvicorn src.todolistv2.main:app --host 0.0.0.0 --port 8000 --workers 4
```

#### 前端部署

```bash
cd frontend

# 安装依赖
npm ci

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### ☁️ 云平台部署

#### Vercel (前端)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署前端
cd frontend
vercel --prod
```

#### Railway/Render (后端)

1. 连接 GitHub 仓库
2. 选择 `backend` 目录
3. 设置启动命令：`uvicorn src.todolistv2.main:app --host 0.0.0.0 --port $PORT`
4. 配置环境变量

### 🔧 生产环境配置

#### 环境变量

```bash
# 后端
DATABASE_URL=postgresql://user:pass@host:port/db
CORS_ORIGINS=["https://your-frontend-domain.com"]

# 前端  
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
```

### 📊 监控和日志

- **应用监控**: 建议使用 Sentry 或 DataDog
- **性能监控**: 使用 New Relic 或 AppDynamics  
- **日志管理**: 使用 ELK Stack 或 Splunk

---

## 📖 文档

### 📚 项目文档

- [🏗️ 技术架构文档](./docs/technical-architecture.md)
- [🧪 API 测试文档](./docs/api-testing.md)
- [🐍 后端开发文档](./backend/README.md)
- [⚛️ 前端开发文档](./frontend/README.md)

### 🔗 在线文档

- **API 文档**: http://localhost:8000/docs
- **ReDoc 文档**: http://localhost:8000/redoc
- **数据库设计**: 查看 `backend/models.py`

### 📋 开发资源

- [FastAPI 官方文档](https://fastapi.tiangolo.com/)
- [Next.js 官方文档](https://nextjs.org/docs)  
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！请按照以下步骤参与项目：

### 🔀 贡献流程

1. **Fork 项目**
   ```bash
   # 点击 GitHub 页面右上角的 "Fork" 按钮
   ```

2. **克隆到本地**
   ```bash
   git clone https://github.com/your-username/TodoListV2.git
   cd TodoListV2
   ```

3. **创建功能分支**
   ```bash
   git checkout -b feature/amazing-feature
   # 或者修复 bug
   git checkout -b fix/bug-description
   ```

4. **开发和测试**
   ```bash
   # 确保代码通过所有测试
   cd backend && uv run pytest
   cd ../frontend && npm run build
   ```

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # 请遵循 Conventional Commits 规范
   ```

6. **推送分支**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **创建 Pull Request**
   - 打开 GitHub 页面，点击 "New Pull Request"
   - 填写详细的描述和测试说明
   - 等待代码审查

### 📝 提交规范

我们使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式（不影响代码运行）
- `refactor:` 重构代码
- `test:` 添加测试
- `chore:` 构建过程或辅助工具的变动

### 🐛 Bug 报告

请使用 [GitHub Issues](https://github.com/your-username/TodoListV2/issues) 报告 bug：

1. 描述问题和期望行为
2. 提供复现步骤
3. 包含环境信息（OS、Python 版本、Node.js 版本）
4. 如果可能，提供错误截图

### 💡 功能请求

我们欢迎新功能建议！请在 Issues 中：

1. 详细描述功能需求
2. 解释使用场景
3. 提供可能的实现方案

---

## 🛠️ 故障排除

### 常见问题

#### 🔴 端口占用问题

```bash
# 查找占用端口的进程
lsof -i :8000  # 后端端口
lsof -i :3000  # 前端端口

# 终止进程
kill -9 <PID>
```

#### 🔴 Python 版本问题

```bash
# 检查 Python 版本
python --version
# 需要 Python 3.11+

# 使用 pyenv 管理多个 Python 版本
pyenv install 3.11.0
pyenv local 3.11.0
```

#### 🔴 Node.js 版本问题

```bash
# 检查 Node.js 版本
node --version
# 需要 Node.js 18+

# 使用 nvm 管理 Node.js 版本
nvm install 18
nvm use 18
```

#### 🔴 依赖安装问题

```bash
# 清理缓存重新安装
cd backend && rm -rf .venv && uv sync
cd frontend && rm -rf node_modules package-lock.json && npm install
```

### 📧 获取帮助

- **GitHub Issues**: [报告问题](https://github.com/your-username/TodoListV2/issues)
- **GitHub Discussions**: [讨论和问答](https://github.com/your-username/TodoListV2/discussions)
- **邮箱**: your-email@example.com

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

```
MIT License

Copyright (c) 2024 TodoListV2

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 致谢

### 🛠️ 技术栈

感谢以下开源项目：

- [FastAPI](https://fastapi.tiangolo.com/) - 现代化的 Python Web 框架
- [Next.js](https://nextjs.org/) - React 全栈框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 超集
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [SQLAlchemy](https://sqlalchemy.org/) - Python SQL 工具包

### 👥 贡献者

感谢所有为此项目做出贡献的开发者！

<!-- 这里可以添加贡献者列表 -->

### 🌟 Star History

如果这个项目对你有帮助，请考虑给它一个 ⭐️！

---

<div align="center">

**[⬆️ 回到顶部](#-todolistv2)**

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>