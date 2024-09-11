import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler';
import { productRouter } from './routes/product/product';
import { collectionRouter } from './routes/collection/collection';
import { variantRouter } from './routes/variant/variant';

const app = express()

app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

productRouter(app);
collectionRouter(app);
variantRouter(app);

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
