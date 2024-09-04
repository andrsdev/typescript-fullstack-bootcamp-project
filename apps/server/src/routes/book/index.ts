import express, {Express} from 'express'
import { bookServices } from '../../services/bookServices'

export function bookRoute(app: Express): void {
    const router = express.Router()
    const service = new bookServices()
    
    app.use('/api/book', router)

    router.get('/', async function (_req, res, next) {
        try{
          const result = await service.getBook()
        return res.json({ result })
         } catch (e){
            next(e)
        }
    })
}