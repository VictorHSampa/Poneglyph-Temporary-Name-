import Leader from '../Models/leaders.js'
import User from '../Models/users.js'
import Tournament from './tournament.js'
import Set from './sets.js'
import Round from './round.js'
import tournamentType from './tournamentType.js'

User.belongsTo(Leader, { foreignKey: 'fav_leader' })
Leader.hasMany(User, { foreignKey: 'fav_leader' })
Tournament.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Tournament, {foreignKey: 'userId'})
Tournament.belongsTo(Leader, {foreignKey: 'leaderId'})
Leader.hasMany(Tournament, {foreignKey:'leaderId'})
Round.belongsTo(Tournament, {foreignKey: 'tournamentId'})
Tournament.hasMany(Round, {foreignKey: 'tournamentId'})
Set.hasMany(Tournament, {foreignKey: 'setId'})
tournamentType.hasMany(Tournament, {foreignKey: 'tournamentTypeId'})
Tournament.belongsTo(Set, {foreignKey: 'setId'})
Tournament.belongsTo(tournamentType, {foreignKey: 'tournamentTypeId'})