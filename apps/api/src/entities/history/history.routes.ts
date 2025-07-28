import {Router} from "express";
import {HistoryController} from "./history.controller";

const router = Router();

router.get('/', HistoryController.getHistory);
router.post('/add', HistoryController.addToHistory);
router.post('/remove', HistoryController.removeFromHistory);

export default router;