import db from '../src/configDB.js'
import { Sequelize } from 'sequelize'

const Tournament = db.define('tournament', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    placement: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Tournament