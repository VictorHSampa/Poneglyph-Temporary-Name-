import Tournament from '../models/tournament.js'

export async function insertTournament(title, date, placement, userId, leaderId, setId, tournamentTypeId) {

    const tournament = await Tournament.create({ title, date, placement, userId, leaderId, setId, tournamentTypeId})

     try {
        await tournament.validate()
    } catch(error) {
        return { message: error.message, status: 400 };
    }
    try {
        await tournament.save()

        return { message: 'Tournament created successfully', tournament };
    } catch(error) {
        return { message: error.message, status: 500 };
    }
}

export async function editTournament(id, title, date, placement, leaderId, setId, tournamentTypeId) {
    const updates = { title, date, placement, leaderId, setId, tournamentTypeId };

    await Tournament.update(updates, { where: { id } });
    return { message: 'Tournament updated successfully' };
}

export async function getTournamentById(id) {
    const tournament = await Tournament.findByPk(id, { include: ['leader', 'opSet', 'tournamentType'] });
    
    if (!tournament) {
        return { message: 'Tournament not found', status: 404 };
    }
    const result = {
        id: tournament.id,
        title: tournament.title,
        date: tournament.date,
        placement: tournament.placement,
        user: tournament.user,
        leader: tournament.leader.name,
        leader_image: tournament.leader.image,
        set: tournament.opSet.code,
        type: tournament.tournamentType.name
    }

    return result;
}