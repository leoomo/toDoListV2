"""
API测试
"""

import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from src.todolistv2.models import Todo
from src.todolistv2.crud import create_todo
from src.todolistv2.schemas import TodoCreate


async def test_read_todos_empty(client: AsyncClient):
    """测试获取空列表"""
    response = await client.get("/api/v1/todos/")
    assert response.status_code == 200
    data = response.json()
    assert data["items"] == []
    assert data["total"] == 0



async def test_create_todo(client: AsyncClient, db_session: AsyncSession):
    """测试创建待办事项"""
    todo_data = {
        "title": "测试任务",
        "description": "这是一个测试任务"
    }
    response = await client.post("/api/v1/todos/", json=todo_data)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == todo_data["title"]
    assert data["description"] == todo_data["description"]
    assert data["completed"] == False
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data



async def test_create_todo_minimal(client: AsyncClient):
    """测试创建最小待办事项（只有标题）"""
    todo_data = {"title": "最小任务"}
    response = await client.post("/api/v1/todos/", json=todo_data)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == todo_data["title"]
    assert data["description"] is None



async def test_create_todo_invalid(client: AsyncClient):
    """测试创建无效待办事项"""
    # 缺少标题
    response = await client.post("/api/v1/todos/", json={"description": "只有描述"})
    assert response.status_code == 422
    
    # 标题为空
    response = await client.post("/api/v1/todos/", json={"title": ""})
    assert response.status_code == 422
    
    # 标题过长
    response = await client.post("/api/v1/todos/", json={"title": "a" * 256})
    assert response.status_code == 422



async def test_read_todo(client: AsyncClient, db_session: AsyncSession):
    """测试获取单个待办事项"""
    # 创建测试数据
    todo_create = TodoCreate(title="测试任务", description="测试描述")
    todo = await create_todo(db_session, todo_create)
    
    response = await client.get(f"/api/v1/todos/{todo.id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == todo.id
    assert data["title"] == todo.title
    assert data["description"] == todo.description



async def test_read_todo_not_found(client: AsyncClient):
    """测试获取不存在的待办事项"""
    response = await client.get("/api/v1/todos/999")
    assert response.status_code == 404



async def test_update_todo(client: AsyncClient, db_session: AsyncSession):
    """测试更新待办事项"""
    # 创建测试数据
    todo_create = TodoCreate(title="原始标题", description="原始描述")
    todo = await create_todo(db_session, todo_create)
    
    # 更新数据
    update_data = {
        "title": "更新后的标题",
        "description": "更新后的描述",
        "completed": True
    }
    response = await client.put(f"/api/v1/todos/{todo.id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == update_data["title"]
    assert data["description"] == update_data["description"]
    assert data["completed"] == update_data["completed"]



async def test_update_todo_partial(client: AsyncClient, db_session: AsyncSession):
    """测试部分更新待办事项"""
    # 创建测试数据
    todo_create = TodoCreate(title="原始标题", description="原始描述")
    todo = await create_todo(db_session, todo_create)
    
    # 只更新完成状态
    update_data = {"completed": True}
    response = await client.put(f"/api/v1/todos/{todo.id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == todo.title  # 标题不变
    assert data["description"] == todo.description  # 描述不变
    assert data["completed"] == True  # 完成状态改变



async def test_update_todo_not_found(client: AsyncClient):
    """测试更新不存在的待办事项"""
    response = await client.put("/api/v1/todos/999", json={"title": "新标题"})
    assert response.status_code == 404



async def test_delete_todo(client: AsyncClient, db_session: AsyncSession):
    """测试删除待办事项"""
    # 创建测试数据
    todo_create = TodoCreate(title="要删除的任务")
    todo = await create_todo(db_session, todo_create)
    
    response = await client.delete(f"/api/v1/todos/{todo.id}")
    assert response.status_code == 204
    
    # 验证已删除
    get_response = await client.get(f"/api/v1/todos/{todo.id}")
    assert get_response.status_code == 404



async def test_delete_todo_not_found(client: AsyncClient):
    """测试删除不存在的待办事项"""
    response = await client.delete("/api/v1/todos/999")
    assert response.status_code == 404



async def test_read_todos_with_filter(client: AsyncClient, db_session: AsyncSession):
    """测试带筛选条件的待办事项列表"""
    # 创建测试数据
    todos_data = [
        {"title": "未完成任务1", "completed": False},
        {"title": "已完成任务1", "completed": True},
        {"title": "未完成任务2", "completed": False},
        {"title": "已完成任务2", "completed": True},
    ]
    
    for todo_data in todos_data:
        todo_create = TodoCreate(title=todo_data["title"])
        todo = await create_todo(db_session, todo_create)
        if todo_data["completed"]:
            await client.put(f"/api/v1/todos/{todo.id}", json={"completed": True})
    
    # 测试获取全部
    response = await client.get("/api/v1/todos/")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 4
    
    # 测试获取未完成的
    response = await client.get("/api/v1/todos/?completed=false")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 2
    assert all(not item["completed"] for item in data["items"])
    
    # 测试获取已完成的
    response = await client.get("/api/v1/todos/?completed=true")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 2
    assert all(item["completed"] for item in data["items"])



async def test_read_todos_with_pagination(client: AsyncClient, db_session: AsyncSession):
    """测试分页功能"""
    # 创建多个测试数据
    for i in range(15):
        todo_create = TodoCreate(title=f"任务{i+1}")
        await create_todo(db_session, todo_create)
    
    # 测试默认分页
    response = await client.get("/api/v1/todos/")
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 15  # 默认limit=50，所以全部返回
    assert data["total"] == 15
    assert data["limit"] == 50
    assert data["offset"] == 0
    
    # 测试自定义分页
    response = await client.get("/api/v1/todos/?limit=5&offset=5")
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 5
    assert data["total"] == 15
    assert data["limit"] == 5
    assert data["offset"] == 5



async def test_delete_completed_todos(client: AsyncClient, db_session: AsyncSession):
    """测试批量删除已完成的待办事项"""
    # 创建测试数据
    todos_data = [
        {"title": "未完成任务1", "completed": False},
        {"title": "已完成任务1", "completed": True},
        {"title": "未完成任务2", "completed": False},
        {"title": "已完成任务2", "completed": True},
    ]
    
    for todo_data in todos_data:
        todo_create = TodoCreate(title=todo_data["title"])
        todo = await create_todo(db_session, todo_create)
        if todo_data["completed"]:
            await client.put(f"/api/v1/todos/{todo.id}", json={"completed": True})
    
    # 删除已完成的
    response = await client.delete("/api/v1/todos/completed")
    assert response.status_code == 204
    
    # 验证结果
    response = await client.get("/api/v1/todos/")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 2  # 只剩下未完成的
    assert all(not item["completed"] for item in data["items"])



async def test_delete_all_todos(client: AsyncClient, db_session: AsyncSession):
    """测试删除所有待办事项"""
    # 创建测试数据
    for i in range(5):
        todo_create = TodoCreate(title=f"任务{i+1}")
        await create_todo(db_session, todo_create)
    
    # 删除所有
    response = await client.delete("/api/v1/todos/all")
    assert response.status_code == 204
    
    # 验证结果
    response = await client.get("/api/v1/todos/")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert data["items"] == []



async def test_root_endpoint(client: AsyncClient):
    """测试根路径"""
    response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data
    assert "docs" in data



async def test_health_check(client: AsyncClient):
    """测试健康检查"""
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "TodoListV2 API" 