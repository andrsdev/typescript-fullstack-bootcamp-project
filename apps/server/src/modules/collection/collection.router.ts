import { Router } from 'express'
import { index } from './collection.controller'
import Call from '../../handlers/call'

const router: Router = Router()

router.get('/', [], Call(index))

export default router
