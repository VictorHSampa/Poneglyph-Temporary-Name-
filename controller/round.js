import Round from '../models/round.js'

export async function insertRound( result, dice, first, tournamentId, comment) {

    const round = await Round.create({ result, dice, first, tournamentId, comment })

    try {
        await round.validate()
    } catch(error) {
        return { message: error.message, status: 400 };
    }
     
    try {
        await round.save()
        return { message: 'Round created successfully', round };
    } catch(error) {
        return { message: error.message, status: 500 };
    }

}

export async function editRound(id, result, dice, first, comment) {
    const updates = { result, dice, first, comment };

    await Round.update(updates, { where: { id } });
    return { message: 'Round updated successfully' };
}

export async function getAllRounds(id) {
    
    const round = await Round.findAll({ where: {tournamentId: id }});
    return round;
}

