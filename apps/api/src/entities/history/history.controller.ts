import {Request, Response} from "express";
import {TEST_MOVIE} from "../../constants";
import moment from "moment";


export class HistoryController {
    static getHistory(req: Request, res: Response) {
        res.send([
            TEST_MOVIE,
            TEST_MOVIE,
            {...TEST_MOVIE, watchDate: moment().subtract(1, "month").valueOf()},
            {...TEST_MOVIE, watchDate: moment().subtract(1, "month").valueOf()},
            {...TEST_MOVIE, watchDate: moment().subtract(1, "month").valueOf()},
            {...TEST_MOVIE, watchDate: moment().subtract(3, "month").valueOf()}
        ]);
    }

    static addToHistory(req: Request, res: Response) {
        const {id} = req.body;
    }

    static removeFromHistory(req: Request, res: Response) {
        const {id} = req.body;
    }
}