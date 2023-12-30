// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importa tus rutas aquí
// import someRoute from './routes/someRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Middlewares
app.use(express.json()); // Para parsear body en formato JSON

// Usa tus rutas aquí
// app.use('/api/someRoute', someRoute);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Iniciando el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
