# users/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .models import User, SessionLocal

router = APIRouter()

# Función para obtener una sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Ruta para registrar un nuevo usuario
@router.post("/register/")
def register(username: str, password: str, db: Session = Depends(get_db)):
    # Hash de la contraseña (debes usar algún método seguro, como bcrypt)
    hashed_password = password

    # Crear usuario en la base de datos
    db_user = User(username=username, password=hashed_password, favorites="")
    db.add(db_user)
    db.commit()

    return {"message": "User registered successfully"}

# Ruta para autenticar a un usuario
@router.post("/login/")
def login(username: str, password: str, db: Session = Depends(get_db)):
    # Verificar las credenciales (deberías usar un método seguro para verificar contraseñas)
    user = db.query(User).filter(User.username == username, User.password == password).first()
    if user:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
