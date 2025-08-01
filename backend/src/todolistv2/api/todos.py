"""
待办事项API路由
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from ..database import get_db
from ..models import Todo
from ..schemas import TodoCreate, TodoUpdate, TodoResponse, TodoListResponse
from ..crud import (
    get_todos, get_todo, create_todo, update_todo,
    delete_todo, delete_completed_todos, delete_all_todos
)

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("/", response_model=TodoListResponse)
async def read_todos(
    completed: Optional[str] = Query(None, description="筛选条件: true/false/all"),
    limit: int = Query(50, ge=1, le=100, description="限制返回数量"),
    offset: int = Query(0, ge=0, description="偏移量"),
    db: AsyncSession = Depends(get_db)
):
    """
    获取待办事项列表
    
    - **completed**: 筛选条件 ('true', 'false', 'all')
    - **limit**: 限制返回数量 (1-100)
    - **offset**: 偏移量
    """
    todos, total = await get_todos(db, completed=completed, limit=limit, offset=offset)
    return TodoListResponse(
        items=[TodoResponse.model_validate(todo) for todo in todos],
        total=total,
        limit=limit,
        offset=offset
    )


@router.get("/{todo_id}", response_model=TodoResponse)
async def read_todo(todo_id: int, db: AsyncSession = Depends(get_db)):
    """
    根据ID获取单个待办事项
    """
    todo = await get_todo(db, todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return TodoResponse.model_validate(todo)


@router.post("/", response_model=TodoResponse, status_code=201)
async def create_todo_item(todo: TodoCreate, db: AsyncSession = Depends(get_db)):
    """
    创建新的待办事项
    """
    return TodoResponse.model_validate(await create_todo(db, todo))


@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo_item(
    todo_id: int,
    todo_update: TodoUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    更新待办事项
    """
    todo = await update_todo(db, todo_id, todo_update)
    if todo is None:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return TodoResponse.model_validate(todo)


@router.delete("/completed", status_code=204)
async def delete_completed_todos_batch(db: AsyncSession = Depends(get_db)):
    """
    批量删除所有已完成的待办事项
    """
    await delete_completed_todos(db)


@router.delete("/all", status_code=204)
async def delete_all_todos_batch(db: AsyncSession = Depends(get_db)):
    """
    批量删除所有待办事项
    """
    await delete_all_todos(db)


@router.delete("/{todo_id}", status_code=204)
async def delete_todo_item(todo_id: int, db: AsyncSession = Depends(get_db)):
    """
    删除待办事项
    """
    success = await delete_todo(db, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="待办事项不存在") 