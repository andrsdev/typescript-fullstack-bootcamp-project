import { Request, response, Response  } from "express"

export function logErrors(err: Error, _req: Request, _res: Response): void {
    console.error(err.stack)
    response.status(500).send('Something broke!')
    response.render('error', { error: err })
}   