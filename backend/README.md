# TodoListV2 Backend

TodoListV2 的后端API服务，基于FastAPI构建。

## 功能特性

- ✅ RESTful API设计
- ✅ 异步数据库操作
- ✅ 完整的CRUD操作
- ✅ 数据验证和错误处理
- ✅ 自动API文档生成
- ✅ 单元测试覆盖
- ✅ CORS支持

## 技术栈

- **FastAPI**: 现代化Web框架
- **SQLAlchemy**: ORM框架
- **Pydantic**: 数据验证
- **SQLite**: 数据库
- **Uvicorn**: ASGI服务器
- **pytest**: 测试框架

## 快速开始

### 1. 安装依赖

```bash
cd backend
uv sync
```

### 2. 运行开发服务器

```bash
uv run uvicorn src.todolistv2.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. 访问API文档

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API接口

### 待办事项管理

- `GET /api/v1/todos` - 获取待办事项列表
- `GET /api/v1/todos/{id}` - 获取单个待办事项
- `POST /api/v1/todos` - 创建待办事项
- `PUT /api/v1/todos/{id}` - 更新待办事项
- `DELETE /api/v1/todos/{id}` - 删除待办事项
- `DELETE /api/v1/todos/completed` - 批量删除已完成
- `DELETE /api/v1/todos/all` - 批量删除全部

## 测试状态

✅ **所有API接口测试通过**

- ✅ 根路径和健康检查
- ✅ 创建待办事项 (POST)
- ✅ 获取待办事项列表 (GET)
- ✅ 根据ID获取待办事项 (GET)
- ✅ 更新待办事项 (PUT)
- ✅ 删除待办事项 (DELETE)
- ✅ 筛选功能 (completed参数)
- ✅ 分页功能 (limit/offset参数)
- ✅ 批量删除功能 (completed/all)
- ✅ 错误处理 (404, 422, 500)
- ✅ 数据验证

## 开发

### 运行测试

```bash
# 运行单元测试
uv run pytest -v

# 运行API集成测试
bash test_api_curl.sh

# 运行Python API测试
uv run python test_api.py
```

### 代码格式化

```bash
uv run black src/
uv run isort src/
```

### 类型检查

```bash
uv run mypy src/
```

## 项目结构

```
backend/
├── src/
│   └── todolistv2/
│       ├── __init__.py
│       ├── main.py          # 应用入口
│       ├── database.py      # 数据库配置
│       ├── models.py        # 数据模型
│       ├── schemas.py       # Pydantic模式
│       ├── crud.py          # CRUD操作
│       └── api/
│           ├── __init__.py
│           └── todos.py     # 待办事项API
├── tests/                   # 测试文件
├── test_api.py             # API测试脚本
├── test_api_curl.sh        # curl API测试脚本
├── init_db.sql             # 数据库初始化脚本
├── pyproject.toml          # 项目配置
└── README.md               # 项目文档
``` 