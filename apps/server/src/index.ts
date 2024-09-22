import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import productRoutes from './routes/products.routes'
import variantRoutes from './routes/variants.routes'
import collectionRoutes from './routes/collections.routes'
import optionRoutes from './routes/options.routes';
import optionValueRoutes from './routes/optionsValues.routes';
import path from 'path';
import { fileURLToPath } from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, '../../packages/database/src/images')));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/variants', variantRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/options', optionRoutes);
app.use('/api/option-values', optionValueRoutes);

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
