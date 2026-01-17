import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import inventoryRoutes from './routes/inventoryRoutes.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

// --- 1. Middlewares Globales ---
app.use(cors()); // Permite peticiones desde otros dominios
app.use(express.json()); // Parsea Body JSON
app.use(requestLogger); // Log de peticiones

// Prefijo para la API
app.use('/api/v1', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('Servidor del inventario de Alimentos Activo 🚀');
});

// --- 3. Manejo de Errores ---
// Middleware de 404 (Ruta no encontrada)
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de Errores Generales (Siempre va al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
