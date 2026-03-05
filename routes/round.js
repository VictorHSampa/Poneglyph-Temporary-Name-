import { insertRound} from '../controller/round.js';
import express from 'express';
import { Router } from 'express';
const roundRouter = Router();

roundRouter.post('/register', async (req, res) => {
    const result = insertRound(req.body.result, req.body.dice, req.body.first, req.body.tournament);
    res.status(201).json({result});
})



export default roundRouter;