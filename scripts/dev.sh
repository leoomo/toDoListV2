#!/bin/bash

# 开发环境启动脚本

echo "🚀 启动 TodoListV2 开发环境..."

# 检查虚拟环境是否存在
if [ ! -d ".venv" ]; then
    echo "📦 创建虚拟环境..."
    uv venv
fi

# 激活虚拟环境
echo "🔧 激活虚拟环境..."
source .venv/bin/activate

# 同步依赖
echo "📚 同步项目依赖..."
uv sync

# 运行代码格式化
echo "🎨 运行代码格式化..."
uv run black src/
uv run isort src/

# 运行代码检查
echo "🔍 运行代码检查..."
uv run flake8 src/
uv run mypy src/

# 启动开发服务器
echo "🌐 启动开发服务器..."
echo "📖 API文档: http://localhost:8000/docs"
echo "📖 ReDoc: http://localhost:8000/redoc"
echo "🛑 按 Ctrl+C 停止服务器"
echo ""

uvicorn src.todolistv2.main:app --reload --host 0.0.0.0 --port 8000 