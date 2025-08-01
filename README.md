# TodoListV2

一个现代化的待办事项列表应用程序，使用FastAPI构建。

## 项目结构

```
toDoListV2/
├── src/
│   └── todolistv2/
│       ├── __init__.py
│       └── main.py
├── examples/
│   └── basic_example.py
├── pyproject.toml
├── README.md
└── .venv/
```

## 环境配置

本项目使用 `uv` 作为Python包管理器和虚拟环境管理工具。

### 安装uv（如果还没有安装）

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 设置开发环境

1. **克隆项目并进入目录**
   ```bash
   cd toDoListV2
   ```

2. **创建虚拟环境**
   ```bash
   uv venv
   ```

3. **激活虚拟环境**
   ```bash
   source .venv/bin/activate  # macOS/Linux
   # 或者
   .venv\Scripts\activate     # Windows
   ```

4. **安装依赖**
   ```bash
   uv sync
   ```

## 运行应用

### 运行FastAPI应用

```bash
# 使用uvicorn直接运行
uvicorn src.todolistv2.main:app --reload

# 或者使用uv运行
uv run src.todolistv2.main:app
```

### 运行基础示例

```bash
python examples/basic_example.py
```

## 开发工具

项目配置了以下开发工具：

- **Black**: 代码格式化
- **isort**: import语句排序
- **flake8**: 代码检查
- **mypy**: 类型检查
- **pytest**: 单元测试

### 运行代码格式化

```bash
uv run black src/
uv run isort src/
```

### 运行代码检查

```bash
uv run flake8 src/
uv run mypy src/
```

### 运行测试

```bash
uv run pytest
```

## API文档

启动应用后，可以访问以下地址查看API文档：

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 依赖管理

### 添加新依赖

```bash
# 添加生产依赖
uv add package_name

# 添加开发依赖
uv add --dev package_name
```

### 更新依赖

```bash
uv sync --upgrade
```

## 虚拟环境管理

### 激活虚拟环境

```bash
source .venv/bin/activate
```

### 退出虚拟环境

```bash
deactivate
```

### 删除虚拟环境

```bash
rm -rf .venv
```

## 项目配置

项目使用 `pyproject.toml` 进行配置，包括：

- 项目元数据
- 依赖管理
- 开发工具配置
- 构建配置

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
