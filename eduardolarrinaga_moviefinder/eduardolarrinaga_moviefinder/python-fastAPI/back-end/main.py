# back-end/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker

app = FastAPI()

# Configuración CORS para permitir solicitudes desde el front-end
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración de SQLAlchemy
DATABASE_URL = "mysql+mysqlconnector://usuario:contraseña@localhost/nombre_bd"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Definir la base de datos declarativa de SQLAlchemy
Base: DeclarativeMeta = declarative_base()

# Incluir rutas y configuración de FastAPI
from .users import auth

app.include_router(auth.router, prefix="/users", tags=["users"])
