import db from '../src/configDB.js'
import { Sequelize } from 'sequelize'

const Leader = db.define('leader', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color1: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    color2: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Leader