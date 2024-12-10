import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import routerAPI from './routes'
import Handlers from './handlers'

const app = express()

const path: string = '/api'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'timezone', 'API-Key'],
  }),
)

app.use(path, routerAPI)
app.use(Handlers.handlerErrorMiddleware)
app.use(Handlers.handleError)

app.get('/', (_, res) => {
  return res.json({ ok: true })
})

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
