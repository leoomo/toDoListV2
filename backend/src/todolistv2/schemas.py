"""
Pydantic数据模式定义
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class TodoBase(BaseModel):
    """待办事项基础模式"""
    title: str = Field(..., min_length=1, max_length=255, description="待办事项标题")
    description: Optional[str] = Field(None, max_length=1000, description="待办事项描述")


class TodoCreate(TodoBase):
    """创建待办事项模式"""
    pass


class TodoUpdate(BaseModel):
    """更新待办事项模式"""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None


class TodoResponse(TodoBase):
    """待办事项响应模式"""
    id: int
    completed: bool
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class TodoListResponse(BaseModel):
    """待办事项列表响应模式"""
    items: list[TodoResponse]
    total: int
    limit: int
    offset: int


class ErrorResponse(BaseModel):
    """错误响应模式"""
    error: dict[str, str | list[dict[str, str]]] 