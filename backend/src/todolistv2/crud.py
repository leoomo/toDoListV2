"""
CRUD操作函数
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, delete
from sqlalchemy.orm import selectinload
from typing import Optional, List
from .models import Todo
from .schemas import TodoCreate, TodoUpdate


async def get_todos(
    db: AsyncSession,
    completed: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
) -> tuple[List[Todo], int]:
    """
    获取待办事项列表
    
    Args:
        db: 数据库会话
        completed: 筛选条件 ('true', 'false', 'all')
        limit: 限制数量
        offset: 偏移量
    
    Returns:
        (todos, total_count)
    """
    # 构建查询条件
    query = select(Todo)
    
    if completed == "true":
        query = query.where(Todo.completed == True)
    elif completed == "false":
        query = query.where(Todo.completed == False)
    # completed == "all" 或 None 时不过滤
    
    # 获取总数
    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)
    
    # 获取分页数据
    query = query.order_by(Todo.created_at.desc()).offset(offset).limit(limit)
    result = await db.execute(query)
    todos = result.scalars().all()
    
    return list(todos), total


async def get_todo(db: AsyncSession, todo_id: int) -> Optional[Todo]:
    """
    根据ID获取单个待办事项
    
    Args:
        db: 数据库会话
        todo_id: 待办事项ID
    
    Returns:
        Todo对象或None
    """
    query = select(Todo).where(Todo.id == todo_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()


async def create_todo(db: AsyncSession, todo: TodoCreate) -> Todo:
    """
    创建新的待办事项
    
    Args:
        db: 数据库会话
        todo: 待办事项数据
    
    Returns:
        创建的Todo对象
    """
    db_todo = Todo(
        title=todo.title,
        description=todo.description
    )
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo


async def update_todo(
    db: AsyncSession,
    todo_id: int,
    todo_update: TodoUpdate
) -> Optional[Todo]:
    """
    更新待办事项
    
    Args:
        db: 数据库会话
        todo_id: 待办事项ID
        todo_update: 更新数据
    
    Returns:
        更新后的Todo对象或None
    """
    db_todo = await get_todo(db, todo_id)
    if not db_todo:
        return None
    
    # 更新字段
    update_data = todo_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_todo, field, value)
    
    await db.commit()
    await db.refresh(db_todo)
    return db_todo


async def delete_todo(db: AsyncSession, todo_id: int) -> bool:
    """
    删除待办事项
    
    Args:
        db: 数据库会话
        todo_id: 待办事项ID
    
    Returns:
        是否删除成功
    """
    db_todo = await get_todo(db, todo_id)
    if not db_todo:
        return False
    
    await db.delete(db_todo)
    await db.commit()
    return True


async def delete_completed_todos(db: AsyncSession) -> int:
    """
    删除所有已完成的待办事项
    
    Args:
        db: 数据库会话
    
    Returns:
        删除的数量
    """
    query = delete(Todo).where(Todo.completed == True)
    result = await db.execute(query)
    await db.commit()
    return result.rowcount


async def delete_all_todos(db: AsyncSession) -> int:
    """
    删除所有待办事项
    
    Args:
        db: 数据库会话
    
    Returns:
        删除的数量
    """
    query = delete(Todo)
    result = await db.execute(query)
    await db.commit()
    return result.rowcount 