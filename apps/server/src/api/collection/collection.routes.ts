import express, { Router } from 'express'
import { listCollections } from './collection.controller'

const collectionRouter: Router = express.Router()

collectionRouter.get('/', listCollections)

export default collectionRouter
