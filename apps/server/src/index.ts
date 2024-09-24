import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { productsRoute } from './routes/products/'
import { genresRoute } from './routes/genres'
import { collectionsRoute } from './routes/collections'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

genresRoute(app)
collectionsRoute(app)
productsRoute(app)

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
