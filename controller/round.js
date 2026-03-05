import Round from '../models/round.js'

export async function insertRound( result, dice, first, tournamentId) {

    const round = await Round.create({ result, dice, first, tournamentId})

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

export async function getAllRounds(id) {
    
    const round = await Round.findAll({ where: {tournamentId: id }});
    return round;
}

