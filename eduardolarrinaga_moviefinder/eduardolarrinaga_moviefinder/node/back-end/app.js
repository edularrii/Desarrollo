// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Necesitas instalar el paquete yamljs
const moviesRoutes = require('./routes/movies');
const path = require('path')
const { connectToDatabase } = require('./db');  // Importar función de conexión
const db = require('./db');

const app = express();

// Conectar a la base de datos
connectToDatabase(db.url);

// Carga tu especificación OpenAPI desde el archivo YAML
const swaggerDocument = YAML.load(path.join(__dirname, 'api-doc.yaml'));

// Configura Swagger UI Express con la especificación OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para el manejo de JSON en las solicitudes
app.use(express.json());

// Rutas relacionadas con películas
app.use('/api/movies', moviesRoutes);

// Para el front-end
app.use('/frontend', express.static(path.join(__dirname, '..', '..', 'front-end')));


// Puerto de escucha
// Arranca tu aplicación Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});


