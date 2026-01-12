import express, { json } from 'express';
import dotenv from 'dotenv';
import inventoryRoutes from './routes/inventoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

// Prefijo para la API
app.use('/api/v1', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('Servidor del inventario de Alimentos Activo 🚀');
});

// Middleware básico de registro (Log) para ver qué peticiones llegan
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} request to ${req.url}`
  );
  next();
});
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
