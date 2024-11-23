import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

// Importar las rutas
import { productsRoute } from './routes/products';
import { variantsRoute } from './routes/variants';
import { optionsRoute } from './routes/options';
import { optionValuesRoute } from './routes/optionValues';
import { collectionsRoute } from './routes/collections';

const app = express();

// Configuración de middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Registrar rutas
productsRoute(app);       // Rutas para productos
variantsRoute(app);       // Rutas para variantes
optionsRoute(app);        // Rutas para opciones
optionValuesRoute(app);   // Rutas para valores de opción
collectionsRoute(app);    // Rutas para colecciones

// Configurar puerto
const port = process.env.PORT || 5001;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`);
});

