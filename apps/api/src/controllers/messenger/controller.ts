import { Request, Response, NextFunction } from 'express'
import fetch from 'node-fetch'
import secrets from '../../core/secrets'
import logger from '../../core/logger'



export const getJokesController = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params, "<==== Params | Query ====>", req.query)

    try {
        const { id } = req.params
        const apiResponse = await fetch(`${secrets.JOKES_API}/${id}`)
        const apiResponseJson = await apiResponse.json()
        console.log(apiResponseJson)
        res.status(200).json(apiResponseJson)
    } catch (err) {
        logger.log(err)
        next(err)
    }
}


export const getMangasController = async (_req: Request, res: Response, next: NextFunction) => {

    try {
        const apiResponse = await fetch(`${secrets.KITSU_API}`)
        const apiResponseJson = await apiResponse.json()
        console.log(apiResponseJson)
        res.status(200).json(apiResponseJson)
    } catch (err) {
        logger.log(err)
        next(err)
    }
}


export const getSingleMangaController = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params, "<==== Params | Query ====>", req.query)

    try {
        const { id } = req.params
        const apiResponse = await fetch(`${secrets.KITSU_API}/${id}`)
        const apiResponseJson = await apiResponse.json()
        console.log(apiResponseJson)
        res.status(200).json(apiResponseJson)
    } catch (err) {
        logger.log(err)
        next(err)
    }
}
