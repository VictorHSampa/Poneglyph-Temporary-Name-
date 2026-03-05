import Round from '../models/round.js'

export async function insertRound(roundNumber, result, dice, first) {

    const round = await Round.create({ roundNumber, result, dice, first})

    return {round}
}

export async function getRounds() {
    const round = await round.findAll(id);
    
    if (!tournament) {
        return { message: 'round not found', status: 404 };
    }
    const result = {

    }

    return result;
}