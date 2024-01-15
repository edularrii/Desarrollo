const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

// Rutas para el microservicio de FastAPI
app.use('/register', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));
app.use('/login', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));
app.use('/docs', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));
app.use('/openapi.json', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));

// Rutas para el microservicio en Node.js
app.use('/api/movies/search/title', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/api/movies/:id', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/api/movies/', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/frontend', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/api-docs', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`API Gateway escuchando en http://localhost:${PORT}/frontend/login.html`);
});