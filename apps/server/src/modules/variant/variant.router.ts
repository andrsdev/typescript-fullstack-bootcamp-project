import { Router } from 'express'
import { index, variantsByProductId } from './variant.controller'
import Call from '../../handlers/call'

const router: Router = Router()

router.get('/', [], Call(index))
router.get('/product/:id', [], Call(variantsByProductId))

export default router
