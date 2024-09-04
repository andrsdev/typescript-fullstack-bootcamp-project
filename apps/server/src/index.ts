import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler';
import { productRouter } from './routes/product/product';

const app = express()

app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

productRouter(app);

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
