import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { productsRoute } from './routes/products'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());


productsRoute(app);

app.get('/app/products', (req, res) => {
  res.json({ message: 'Aquí están los productos' });
});

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
