import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import inventoryRoutes from './routes/inventoryRoutes.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import logger from './lib/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodbank';

// --- 1. Middlewares Globales ---
app.use(cors()); // Permite peticiones desde otros dominios
app.use(express.json()); // Parsea Body JSON
app.use(requestLogger); // Log de peticiones

// Prefijo para la API
app.use('/api/v1', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('Servidor del inventario de Alimentos Activo 🚀');
});

// Health check
app.get('/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'ok',
    mongo: states[mongoose.connection.readyState],
  });
});

// --- 3. Manejo de Errores ---
// Middleware de 404 (Ruta no encontrada)
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de Errores Generales (Siempre va al final)
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser/useUnifiedTopology are defaults in modern mongoose
    });
    logger.info('Connected to MongoDB');

    app.listen(PORT, () => {
      logger.info(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start app', err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('SIGINT received: closing server');
  await mongoose.disconnect();
  process.exit(0);
});

start();
