import { genresRoute } from './index';
import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json()); // Para poder enviar JSON en las peticiones
genresRoute(app);

jest.mock('../../services/GenreService', () => ({
    GenreService: class mockGenreService {
        async ListAll() {
            return [];
        }
        async GetById(id: number) {
            if (id === 1) {
                return {
                    id: 1,
                    name: 'Rock',
                    products: []
                };
            } else {
                return null;
            }
        }
    }
}));

describe('Genres Route', () => {
    test('should return a empty list of genres', (done) => {
        request(app)
            .get('/api/genres')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    test('should return a genre when found', (done) => {
        request(app)
            .get('/api/genres/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body.status).toBe('success');
                expect(res.body.data).toEqual({
                    id: 1,
                    name: 'Rock',
                    products: []
                });
            })
            .end(done);
    });

    test('should return 404 when genre not found', (done) => {
        request(app)
            .get('/api/genres/999')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect((res) => {
                expect(res.body.status).toBe('error');
                expect(res.body.message).toBe('Genre not found');
            })
            .end(done);
    });
});