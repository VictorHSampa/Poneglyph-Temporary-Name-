import { insertTournament, getTournamentById, editTournament} from '../controller/Tournament.js';
import express from 'express';
import { Router } from 'express';
const tournamentRouter = Router();

tournamentRouter.post('/register', async (req, res) => {
    const result = insertTournament(req.body.title, req.body.date, req.body.placement, req.body.user, req.body.leader, req.body.set, req.body.type);
    res.status(result.status || 201).json(result);
})

tournamentRouter.put('/edit/:id', async (req, res) => {
    const result = await editTournament(req.params.id, req.body.title, req.body.date, req.body.placement, req.body.leader, req.body.set, req.body.type);
    res.status(result && result.status ? result.status : 200).json(result || {
        message: 'Tournament updated successfully'
    });
})

tournamentRouter.get('/search/:id', async (req, res) => {
    const tournament = await getTournamentById(req.params.id);
    if (tournament) {
        res.status(200).json(
            tournament
        );
    } else {
        res.status(404).json({
            message: 'Tournament not found'
        });
    }
})

export default tournamentRouter;