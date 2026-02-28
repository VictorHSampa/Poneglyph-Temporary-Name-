import Leader from '../Models/leaders.js'
import User from '../Models/users.js'


User.belongsTo(Leader, { foreignKey: 'fav_leader' })
Leader.hasMany(User, { foreignKey: 'fav_leader' })
