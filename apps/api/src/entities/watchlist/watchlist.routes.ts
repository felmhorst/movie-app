import {Router} from "express";
import {WatchlistController} from "./watchlist.controller";

const router = Router();

router.get('/', WatchlistController.getWatchlist);
router.post('/add', WatchlistController.addToWatchlist);
router.post('/remove', WatchlistController.removeFromWatchlist);

export default router;