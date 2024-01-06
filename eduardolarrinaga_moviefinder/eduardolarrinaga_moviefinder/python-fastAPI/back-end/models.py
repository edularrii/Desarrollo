# users/models.py
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    favorites = Column(String)  # IDs de películas favoritas almacenadas como cadena (puedes ajustar según sea necesario)

# Configurar conexión a MySQL
DATABASE_URL = "mysql+mysqlconnector://username:password@localhost/dbname"
engine = create_engine(DATABASE_URL)

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Crear una sesión de base de datos para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
