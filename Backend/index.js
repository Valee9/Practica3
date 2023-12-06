import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import infoRoutes from './routes/info.js';
import infoModel from './models/info.js';
import { infoSeeds } from './seeders/info.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/profile', infoRoutes);

const PORT = process.env.PORT || 6001;
const URL = process.env.MONGO_URL
console.log(PORT)
console.log(URL)
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', async () => {
  console.log('Conexión correcta a la base de datos');

  try {
    await infoModel.deleteMany();
    await infoModel.insertMany(infoSeeds);
    console.log('Datos cargados exitosamente en la base de datos');
  } catch (err) {
    console.error('Error al cargar los datos:', err);
  }
});

db.on('error', (err) => {
  console.error('Error de conexión a la base de datos:', err);
});

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
