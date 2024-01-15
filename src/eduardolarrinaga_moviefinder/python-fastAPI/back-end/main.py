
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import schemas, models, auth, database
from .database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

models.Base.metadata.create_all(bind=engine)

@app.post('/register', response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = models.get_user_by_username(db, username=user.username)
    db_email = models.get_user_by_email(db, email=user.email)
    if db_user or db_email:
        raise HTTPException(status_code=400, detail="Username or email already registered")

    return models.create_user(db=db, user=user)


@app.post('/login')
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = models.get_user_by_username(db, username=user.username)
    if db_user is None or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": auth.create_access_token({"sub": user.username}), "token_type": "bearer"}


