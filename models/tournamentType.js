import db from '../src/configDB.js'
import { Sequelize } from 'sequelize'

const tournamentType = db.define('tournamentType', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default tournamentType