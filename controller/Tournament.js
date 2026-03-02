import Tournament from '../models/tournament.js'

export async function insertTournament(title, date, placement, userId, leaderId, setId, tournamentTypeId) {

    const tournament = await Tournament.create({ title, date, placement, userId, leaderId, setId, tournamentTypeId})

    return {tournament}
}

export async function getTournamentById(id) {
    const tournament = await Tournament.findByPk(id, { include: ['leader', 'opset', 'tournamentType'] });
    
    if (!tournament) {
        return { message: 'tournament not found', status: 404 };
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