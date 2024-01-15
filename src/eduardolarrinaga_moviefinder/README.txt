0) Software Requerido
Node.js
MongoDB
Python
FastAPI
MySQL

1) Servicios que Hay que Arrancar
MongoDB (Base de datos para el microservicio de Node.js)
MySQL (Base de datos para el microservicio de Python con FastAPI)
Servidor Node.js para el microservicio de películas
Servidor Python FastAPI para el microservicio de autenticación de usuarios
Gateway en Node.js para la integración de servicios

2) Dependencias que Hay que Instalar

Para Node.js:
Ejecutar npm install en la carpeta raíz del proyecto para instalar las dependencias, para ello ejecuta la siguiente linea de codigo:

npm install axios cors express http-proxy-middleware mongodb mongoose yamljs


Para Python FastAPI:
Primero debes crear un entorno virtual. Para ello abrimos un cmd en la carpeta raíz del proyecto y ejecutamos las siguientes lineas:
-----------------------
cd python-fastAPI
python -m venv venv
.\venv\Scripts\activate
-----------------------

ES RECOMENDABLE ACTUALIZAR EL pip PARA INSTALAR LAS DEPENDECIAS, PARA ELLO DESDE DONDE LO HABIAMOS DEJADO CONTINUAMOS CON ESTAS LINEAS, SI NO TE INTERESA PUEDES SALTARTELAS:
-----------------------------------------
cd venv
cd Scripts
python.exe -m pip install --upgrade pip
cd ..
cd ..
-----------------------------------------
CONTINUAMOS, HAYAS ACTUALIZADO EL pip O NO:
-------------------------------
pip install -r requirements.txt
-------------------------------

3) Cómo Arrancar la Parte Servidora
Microservicio en Python:
Si aun sigues en la anterior puedes seguir con las lineas de abajo y saltarte (cd python-fastAPI y .\venv\Scripts\activate), sino abre nuevamente un terminal desde la carpeta raíz y ejecuta las siguientes lineas de codigo:

cd python-fastAPI
.\venv\Scripts\activate
python -m back-end.run


Microservicio en Node.js:
Abrir otro terminal desde la carpeta raíz y ejecutar las siguientes lineas de codigo:

cd node
cd back-end
node app.js

Gateway:
Abrir un tercer terminal de la misma manera:

cd gateway
node gateway.js

4) Cómo Acceder a la Parte Cliente

Una vez que los servicios del servidor estén funcionando, abre tu navegador web.
Ingresa a http://localhost:8080/frontend/login.html
Navega entre las diferentes páginas HTML (buscar.html, pelicula.html, index.html, login.html, registro.html) para interactuar con la aplicación.