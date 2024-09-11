import express, { Express } from 'express'
import { GenreService } from '../../services/GenreService';
import { BaseResponseGeneric, GenreDtoResponse } from '@repo/schemas';

export function genresRoute(app: Express): void {
    const router = express.Router()
    const _genreService = new GenreService();

    app.use('/api/genres', router)

    router.get('/', async function (_, res, next) {

        let response: BaseResponseGeneric<GenreDtoResponse[]>
        try {
            const data = await _genreService.ListAll()
            response = {
                status: 'success',
                data: data,
            }
            res.status(200)
        }
        catch (error) {
            response = {
                status: 'error',
                data: [],
                message: 'error in listing genres',
            }
            res.status(400)
            next(error)
        }
        return res.json(response)
    })

    router.get('/:id', async function (req, res, next) {
        const { id } = req.params
        let response: BaseResponseGeneric<GenreDtoResponse>
        try {
            const data = await _genreService.GetById(parseInt(id))
            if (!data) {
                response = {
                    status: 'error',
                    data: null,
                    message: 'Genre not found',
                };
                return res.status(404).json(response);
            }
            response = {
                status: 'success',
                data: data,
            }
            res.status(200)

        }
        catch (error) {
            response = {
                status: 'error',
                data: null,
                message: 'An error occurred while trying to find the genre',
            }
            res.status(400)
            next(error)
        }
        return res.json(response)
    })

    router.post('/', async function (req, res, next) {
        let response: BaseResponseGeneric<GenreDtoResponse>
        try {
            const data = await _genreService.Add(req.body)
            response = {
                status: 'success',
                data: data,
            }
            res.status(201)
        }
        catch (error) {
            response = {
                status: 'error',
                data: null,
                message: 'An error occurred while trying to create the product',
            }
            res.status(400)
            next(error)
        }
        return res.json(response)
    })



}