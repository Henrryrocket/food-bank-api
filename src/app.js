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

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`);
})