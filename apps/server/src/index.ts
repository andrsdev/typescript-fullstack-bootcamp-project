import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { productRouter } from './routes/products'
import { logErrors } from './middlewares/logErrorMiddleware'
import { healthchecker } from './routes/health/helthchecker'
import { healthcheckerMiddleware } from './middlewares/helthcheckerMiddleware'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(healthcheckerMiddleware)
app.use('/api-v1', productRouter)
app.use('/api-v1', healthchecker)
app.use(logErrors)

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
