# TodoListV2

现代化的全栈待办事项管理应用，采用 FastAPI + Next.js 技术栈构建。

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
│   │   │   ├── TodoForm.tsx
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoFilter.tsx
│   │   ├── hooks/             # 自定义 Hooks
│   │   │   └── useTodos.ts
│   │   ├── lib/               # API 服务层
│   │   │   └── api.ts
│   │   └── types/             # TypeScript 类型
│   │       └── todo.ts
│   ├── package.json           # 前端配置
│   └── README.md              # 前端文档
├── docs/                      # 项目文档
├── examples/                  # 示例代码
└── scripts/                   # 脚本文件
```

## 🚀 快速开始

### 环境要求
- Python 3.8+
- Node.js 18+
- npm 或 yarn

### 1. 启动后端服务

```bash
# 进入后端目录
cd backend

# 安装依赖（使用 uv）
uv sync

# 启动开发服务器
uv run uvicorn src.todolistv2.main:app --reload --host 0.0.0.0 --port 8000
```

后端服务将在 http://localhost:8000 启动

### 2. 启动前端服务

```bash
# 进入前端目录  
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端应用将在 http://localhost:3000 启动

## 🎯 应用功能

### ✅ 核心功能
- **任务管理**: 创建、查看、编辑、删除待办事项
- **状态切换**: 标记任务完成/未完成
- **智能筛选**: 全部、未完成、已完成三种视图
- **批量操作**: 清除已完成任务、清除全部任务
- **实时同步**: 前后端数据实时同步

### 🎨 用户体验
- **响应式设计**: 完美支持桌面端和移动端
- **加载状态**: 优雅的加载指示器
- **错误处理**: 友好的错误提示和重试机制
- **表单验证**: 客户端和服务端双重验证
- **视觉反馈**: 流畅的交互动画

## 📡 API 接口

### 基础接口
- `GET /health` - 健康检查
- `GET /docs` - Swagger API 文档
- `GET /redoc` - ReDoc API 文档

### 待办事项接口
- `GET /api/v1/todos/` - 获取待办事项列表
- `POST /api/v1/todos/` - 创建新的待办事项
- `GET /api/v1/todos/{id}` - 获取单个待办事项
- `PUT /api/v1/todos/{id}` - 更新待办事项
- `DELETE /api/v1/todos/{id}` - 删除待办事项
- `DELETE /api/v1/todos/completed` - 批量删除已完成
- `DELETE /api/v1/todos/all` - 批量删除全部

## 🛠️ 开发工具

### 后端开发
```bash
# 代码格式化
uv run black src/
uv run isort src/

# 代码检查
uv run flake8 src/
uv run mypy src/

# 运行测试
uv run pytest -v

# API 测试
bash test_api_curl.sh
```

### 前端开发
```bash
# 类型检查
npm run type-check

# 代码检查
npm run lint

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 🧪 测试

### 后端测试
- **单元测试**: pytest 覆盖所有 CRUD 操作
- **API 测试**: 完整的 REST API 测试套件
- **集成测试**: 数据库集成测试

### 前端测试
- **组件测试**: React 组件功能测试
- **用户交互测试**: Puppeteer 自动化测试
- **API 集成测试**: 前后端通信测试

## 📚 文档

- [后端 API 文档](./backend/README.md)
- [前端开发文档](./frontend/README.md)
- [技术架构文档](./docs/technical-architecture.md)
- [API 测试文档](./docs/api-testing.md)

## 🚦 服务状态

### 开发环境
- **后端服务**: http://localhost:8000
- **前端应用**: http://localhost:3000
- **API 文档**: http://localhost:8000/docs

### 主要特性
- ✅ **完整的 CRUD 操作**
- ✅ **实时数据同步**
- ✅ **响应式用户界面**
- ✅ **类型安全**
- ✅ **错误处理**
- ✅ **加载状态**
- ✅ **批量操作**

## 🛡️ 生产部署

### 后端部署
```bash
# 构建
uv build

# 生产启动
uvicorn src.todolistv2.main:app --host 0.0.0.0 --port 8000
```

### 前端部署
```bash
# 构建
npm run build

# 启动
npm start
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)  
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🎊 项目亮点

- **现代化技术栈**: FastAPI + Next.js + TypeScript
- **全栈类型安全**: 端到端 TypeScript 支持
- **优雅的架构设计**: 清晰的分层架构
- **完善的错误处理**: 前后端统一错误处理
- **企业级代码质量**: 完整的测试覆盖和代码规范
- **开发体验优化**: 热重载、自动类型检查、实时预览