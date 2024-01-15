from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str
    class Config:
        from_attributes = True

class UserOut(BaseModel):
    username: str
    email: str
    class Config:
        from_attributes = True
