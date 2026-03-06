import { insertRound, getAllRounds, editRound} from '../controller/round.js';
import express from 'express';
import { Router } from 'express';
const roundRouter = Router();

roundRouter.post('/register', async (req, res) => {
    const result = insertRound(req.body.result, req.body.dice, req.body.first, req.body.tournament);
    res.status(result.status || 201).json(result);
})

roundRouter.put('/edit/:id', async (req, res) => {
    const result = await editRound(req.params.id, req.body.result, req.body.dice, req.body.first);
    res.status(result && result.status ? result.status : 200).json(result || {
        message: 'Round updated successfully'
    });
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