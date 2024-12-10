import { Router } from 'express'
import { create, index, remove, update } from './product.controller'
import Call from '../../handlers/call'

const router: Router = Router()

router.get('/', [], Call(index))
router.post('/', [], Call(create))
router.put('/:id', [], Call(update))
router.delete('/:id', [], Call(remove))

export default router
