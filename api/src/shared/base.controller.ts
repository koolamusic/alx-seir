import * as express from 'express'
import logger from '../core/logger'

export default abstract class BaseController {

    /**
     * This is the implementation that we will leave to the
     * subclasses to figure out. 
     */

    protected abstract executeImpl(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void | any>;

    /**
     * This is what we will call on the route handler.
     * We also make sure to catch any uncaught errors in the
     * implementation.
     */

    public async execute(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {

        try {
            await this.executeImpl(req, res, next);
        } catch (err) {
            logger.error(`[BaseController]: Uncaught controller error`);
            console.log(err);
            next(err)
        }
    }

    public static jsonResponse(res: express.Response, code: number, message: string) {
        return res.status(code).json({
            name: this.name,
            message

        });
    }

    public success<T>(res: express.Response, DTO?: T) {
        if (!!DTO) {
            res.type('application/json');
            return res.status(200).json(DTO);
        } else {
            return res.sendStatus(200);
        }
    }

    public created(res: express.Response) {
        return res.sendStatus(201);
    }

    public todo(res: express.Response) {
        return BaseController.jsonResponse(res, 400, 'TODO');
    }

    public fail(res: express.Response, error: Error | string) {
        console.log(error);
        return res.status(500).json({
            message: error.toString()
        })
    }
}