import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import apiRouter from './routes/routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (_, res) => {
  res.send({ message: 'Hello from Petshop API!' })
})

app.use('/api', apiRouter)

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
