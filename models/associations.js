import Color from './colors.js'
import Leader from './leaders.js'
import User from '../Models/users.js'

Leader.belongsTo(Color, { foreignKey: 'color1' })
Leader.belongsTo(Color, { foreignKey: 'color2' })
User.belongsTo(Leader, { foreignKey: 'fav_leader' })
