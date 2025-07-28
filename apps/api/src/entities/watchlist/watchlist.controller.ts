import { Request, Response } from 'express';
import {TEST_MOVIE} from "../../constants";


export class WatchlistController {
    static getWatchlist(req: Request, res: Response) {
        res.send([TEST_MOVIE, TEST_MOVIE]);
    }

    static addToWatchlist(req: Request, res: Response) {
        const {id} = req.body;
    }

    static removeFromWatchlist(req: Request, res: Response) {
        const {id} = req.body;
    }
}