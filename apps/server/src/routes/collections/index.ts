import express, { Express } from 'express'
import { CollectionService } from "../../services/CollectionService";
import { BaseResponseGeneric, CollectionDtoResponse } from '@repo/schemas';


export function collectionsRoute(app: Express): void {
    const router = express.Router();
    const _collectionService = new CollectionService();

    app.use('/api/collections', router);
    router.get('/', async function (_, res, next) {
        let response: BaseResponseGeneric<CollectionDtoResponse[]>;
        try {
            const data = await _collectionService.ListAll();
            response = {
                status: 'success',
                data: data
            }
            res.status(200);
        }
        catch (error) {
            response = {
                status: 'error',
                data: [],
                message: 'error in listing collections'
            }
            res.status(400);
            next(error);
        }
        return res.json(response);
    });

    router.get('/:id', async function (req, res, next) {
        const { id } = req.params;
        let response: BaseResponseGeneric<CollectionDtoResponse>;
        try {
            const data = await _collectionService.GetById(parseInt(id));
            if (!data) {
                response = {
                    status: 'error',
                    data: null,
                    message: 'Collection not found'
                };
                return res.status(404).json(response);
            }
            response = {
                status: 'success',
                data: data
            }
            res.status(200);
        }
        catch (error) {
            response = {
                status: 'error',
                data: null,
                message: 'An error occurred while trying to find the collection'
            }
            res.status(400);
            next(error);
        }
        return res.json(response);
    });

    router.post('/', async function (req, res, next) {
        let response: BaseResponseGeneric<CollectionDtoResponse>;
        try {
            const data = await _collectionService.Add(req.body);
            response = {
                status: 'success',
                data: data
            }
            res.status(201);
        }
        catch (error) {
            response = {
                status: 'error',
                data: null,
                message: 'error in adding collection'
            }
            res.status(400);
            next(error);
        }
        return res.json(response);
    });
}