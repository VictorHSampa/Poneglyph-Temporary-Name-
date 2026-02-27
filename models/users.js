import db from '../src/configDB.js'
import { Sequelize } from 'sequelize'

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fav_leader: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default User