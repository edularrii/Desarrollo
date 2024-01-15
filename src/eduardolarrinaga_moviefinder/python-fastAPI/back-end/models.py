
from sqlalchemy import Column, Integer, String
from .database import Base
from .auth import get_password_hash

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))

def get_user_by_email(db, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db, user):
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
