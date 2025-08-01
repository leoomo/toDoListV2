# TodoListV2 技术架构文档

## 1. 项目概述

TodoListV2 是一个现代化的待办事项管理应用，采用前后端分离架构，提供直观的用户界面和强大的后端API支持。

### 1.1 功能特性

- ✅ 添加待办事项
- ✅ 标记完成/未完成
- ✅ 删除待办事项
- ✅ 筛选显示（全部/未完成/已完成）
- ✅ 批量操作（清除已完成/清除全部）
- ✅ 现代化UI设计
- ✅ 响应式布局

## 2. 技术栈

### 2.1 前端技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.x | 前端框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| Tailwind CSS | 3.x | 样式框架 |
| Axios | 1.x | HTTP客户端 |
| React Router | 6.x | 路由管理 |

### 2.2 后端技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| FastAPI | 0.104+ | Web框架 |
| Python | 3.11+ | 编程语言 |
| SQLAlchemy | 2.0+ | ORM框架 |
| Pydantic | 2.0+ | 数据验证 |
| SQLite | 3.x | 数据库 |
| Uvicorn | 0.24+ | ASGI服务器 |

### 2.3 开发工具

| 工具 | 说明 |
|------|------|
| uv | Python包管理 |
| ESLint | 代码检查 |
| Prettier | 代码格式化 |
| Black | Python代码格式化 |
| MyPy | Python类型检查 |

## 3. 项目结构

```
toDoListV2/
├── backend/                 # 后端代码
│   ├── src/
│   │   └── todolistv2/
│   │       ├── __init__.py
│   │       ├── main.py          # FastAPI应用入口
│   │       ├── models.py        # 数据模型
│   │       ├── schemas.py       # Pydantic模式
│   │       ├── database.py      # 数据库配置
│   │       ├── crud.py          # CRUD操作
│   │       └── api/
│   │           ├── __init__.py
│   │           └── todos.py     # 待办事项API
│   ├── pyproject.toml
│   ├── uv.lock
│   └── .env
├── frontend/                # 前端代码
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   └── TodoFilter.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── todo.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── docs/                    # 文档
│   └── technical-architecture.md
└── README.md
```

## 4. 数据库设计

### 4.1 数据库表结构

#### 4.1.1 todos 表

```sql
-- 创建待办事项表
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_todos_created_at ON todos(created_at);

-- 创建触发器，自动更新updated_at字段
CREATE TRIGGER update_todos_updated_at
    AFTER UPDATE ON todos
    FOR EACH ROW
BEGIN
    UPDATE todos SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
```

### 4.2 数据库初始化脚本

```sql
-- 初始化数据库脚本 (init_db.sql)
-- 删除已存在的表（如果存在）
DROP TABLE IF EXISTS todos;

-- 创建todos表
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_todos_created_at ON todos(created_at);

-- 创建触发器
CREATE TRIGGER update_todos_updated_at
    AFTER UPDATE ON todos
    FOR EACH ROW
BEGIN
    UPDATE todos SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- 插入示例数据
INSERT INTO todos (title, description, completed) VALUES
    ('完成项目文档', '编写技术架构文档和API说明', FALSE),
    ('学习React Hooks', '掌握useState和useEffect的使用', TRUE),
    ('部署应用', '将应用部署到生产环境', FALSE);
```

## 5. API接口设计

### 5.1 基础信息

- **Base URL**: `http://localhost:8000/api/v1`
- **Content-Type**: `application/json`
- **认证方式**: 暂无（可扩展JWT认证）

### 5.2 API端点

#### 5.2.1 获取所有待办事项

```http
GET /api/v1/todos
```

**查询参数**:
- `completed` (optional): `true` | `false` | `all` - 筛选条件
- `limit` (optional): 限制返回数量，默认50
- `offset` (optional): 偏移量，默认0

**响应示例**:
```json
{
  "items": [
    {
      "id": 1,
      "title": "完成项目文档",
      "description": "编写技术架构文档",
      "completed": false,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

#### 5.2.2 获取单个待办事项

```http
GET /api/v1/todos/{todo_id}
```

**响应示例**:
```json
{
  "id": 1,
  "title": "完成项目文档",
  "description": "编写技术架构文档",
  "completed": false,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### 5.2.3 创建待办事项

```http
POST /api/v1/todos
```

**请求体**:
```json
{
  "title": "新任务",
  "description": "任务描述（可选）"
}
```

**响应示例**:
```json
{
  "id": 2,
  "title": "新任务",
  "description": "任务描述",
  "completed": false,
  "created_at": "2024-01-15T11:00:00Z",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

#### 5.2.4 更新待办事项

```http
PUT /api/v1/todos/{todo_id}
```

**请求体**:
```json
{
  "title": "更新的任务标题",
  "description": "更新的描述",
  "completed": true
}
```

**响应示例**:
```json
{
  "id": 1,
  "title": "更新的任务标题",
  "description": "更新的描述",
  "completed": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:30:00Z"
}
```

#### 5.2.5 删除待办事项

```http
DELETE /api/v1/todos/{todo_id}
```

**响应**: `204 No Content`

#### 5.2.6 批量删除已完成项目

```http
DELETE /api/v1/todos/completed
```

**响应**: `204 No Content`

#### 5.2.7 批量删除所有项目

```http
DELETE /api/v1/todos/all
```

**响应**: `204 No Content`

### 5.3 错误响应格式

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "输入数据验证失败",
    "details": [
      {
        "field": "title",
        "message": "标题不能为空"
      }
    ]
  }
}
```

## 6. 数据模型

### 6.1 Pydantic模式

```python
# schemas.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="待办事项标题")
    description: Optional[str] = Field(None, max_length=1000, description="待办事项描述")

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None

class TodoResponse(TodoBase):
    id: int
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TodoListResponse(BaseModel):
    items: list[TodoResponse]
    total: int
    limit: int
    offset: int
```

### 6.2 SQLAlchemy模型

```python
# models.py
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    completed = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

## 7. 前端组件设计

### 7.1 组件结构

```
src/components/
├── TodoList.tsx      # 主列表组件
├── TodoItem.tsx      # 单个待办事项组件
├── TodoForm.tsx      # 添加表单组件
└── TodoFilter.tsx    # 筛选和批量操作组件
```

### 7.2 状态管理

使用React Hooks进行状态管理：
- `useState`: 本地组件状态
- `useEffect`: 副作用处理
- `useContext`: 全局状态（可选）

### 7.3 API服务层

```typescript
// services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const todoApi = {
  // 获取所有待办事项
  getTodos: (params?: { completed?: string; limit?: number; offset?: number }) =>
    axios.get(`${API_BASE_URL}/todos`, { params }),
  
  // 创建待办事项
  createTodo: (data: { title: string; description?: string }) =>
    axios.post(`${API_BASE_URL}/todos`, data),
  
  // 更新待办事项
  updateTodo: (id: number, data: Partial<Todo>) =>
    axios.put(`${API_BASE_URL}/todos/${id}`, data),
  
  // 删除待办事项
  deleteTodo: (id: number) =>
    axios.delete(`${API_BASE_URL}/todos/${id}`),
  
  // 批量删除已完成
  deleteCompleted: () =>
    axios.delete(`${API_BASE_URL}/todos/completed`),
  
  // 批量删除全部
  deleteAll: () =>
    axios.delete(`${API_BASE_URL}/todos/all`),
};
```

## 8. 部署架构

### 8.1 开发环境

```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=sqlite:///./todo.db
    command: uvicorn src.todolistv2.main:app --reload --host 0.0.0.0 --port 8000

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    depends_on:
      - backend
```

### 8.2 生产环境

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend

  backend:
    build: ./backend
    environment:
      - DATABASE_URL=sqlite:///./todo.db
    volumes:
      - todo_data:/app/data

  frontend:
    build: ./frontend
    volumes:
      - ./frontend/dist:/usr/share/nginx/html

volumes:
  todo_data:
```

## 9. 性能优化

### 9.1 后端优化

- **数据库索引**: 为常用查询字段创建索引
- **连接池**: 使用数据库连接池
- **缓存**: Redis缓存热点数据
- **分页**: API支持分页查询
- **异步处理**: 使用FastAPI的异步特性

### 9.2 前端优化

- **代码分割**: React.lazy和Suspense
- **虚拟滚动**: 大量数据时使用虚拟滚动
- **防抖**: 搜索和筛选操作防抖
- **缓存**: 使用React Query缓存API响应
- **懒加载**: 图片和组件懒加载

## 10. 安全考虑

### 10.1 API安全

- **输入验证**: 使用Pydantic进行数据验证
- **SQL注入防护**: 使用ORM避免SQL注入
- **CORS配置**: 正确配置跨域请求
- **速率限制**: 实现API速率限制
- **HTTPS**: 生产环境使用HTTPS

### 10.2 前端安全

- **XSS防护**: 使用React的安全特性
- **CSRF防护**: 实现CSRF令牌
- **内容安全策略**: 配置CSP头
- **输入验证**: 客户端和服务器端双重验证

## 11. 测试策略

### 11.1 后端测试

- **单元测试**: pytest + pytest-asyncio
- **集成测试**: 数据库集成测试
- **API测试**: 使用httpx测试API端点
- **覆盖率**: 目标90%+代码覆盖率

### 11.2 前端测试

- **单元测试**: Jest + React Testing Library
- **组件测试**: 组件渲染和交互测试
- **E2E测试**: Playwright或Cypress
- **视觉测试**: 截图对比测试

## 12. 监控和日志

### 12.1 日志配置

```python
# logging配置
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

### 12.2 监控指标

- **API响应时间**: 平均响应时间监控
- **错误率**: 4xx/5xx错误率监控
- **数据库性能**: 查询执行时间监控
- **前端性能**: 页面加载时间监控

## 13. 扩展性考虑

### 13.1 水平扩展

- **负载均衡**: Nginx负载均衡
- **微服务**: 拆分为多个微服务
- **消息队列**: Redis/RabbitMQ处理异步任务
- **分布式缓存**: Redis集群

### 13.2 功能扩展

- **用户认证**: JWT认证系统
- **多租户**: 支持多用户/多组织
- **文件上传**: 支持附件上传
- **实时通知**: WebSocket实时更新
- **移动端**: React Native移动应用

## 14. 开发流程

### 14.1 Git工作流

1. **主分支**: `main` - 生产代码
2. **开发分支**: `develop` - 开发代码
3. **功能分支**: `feature/*` - 新功能开发
4. **修复分支**: `hotfix/*` - 紧急修复

### 14.2 CI/CD流程

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          pip install uv
          uv sync
      - name: Run tests
        run: uv run pytest

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Build and deploy
        run: echo "Deploy to production"
```

## 15. 总结

本技术架构文档提供了TodoListV2应用的完整技术方案，包括：

- ✅ 清晰的技术栈选择
- ✅ 完整的数据库设计
- ✅ 详细的API接口规范
- ✅ 前后端分离架构
- ✅ 现代化的开发工具链
- ✅ 完善的测试和部署策略
- ✅ 安全性和性能优化考虑
- ✅ 可扩展性设计

该架构具有良好的可维护性、可扩展性和性能表现，能够满足当前需求并为未来功能扩展提供坚实基础。 