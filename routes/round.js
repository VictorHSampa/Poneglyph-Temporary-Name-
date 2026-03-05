import { insertRound, getAllRounds} from '../controller/round.js';
import express from 'express';
import { Router } from 'express';
const roundRouter = Router();

roundRouter.post('/register', async (req, res) => {
    const result = insertRound(req.body.result, req.body.dice, req.body.first, req.body.tournament);
    res.status(201).json({result});
})

roundRouter.get('/allRounds/:id', async (req, res) => {
    let rounds = await getAllRounds(req.params.id);
    let roundNumber = 0;
    const result = rounds.map(round => {
        roundNumber = roundNumber +1;
        return {
            round: roundNumber,
            result: round.result,
            dice: round.dice,
            first: round.first
        }
    })
    res.status(200).json(
        result
    );
})



export default roundRouter;