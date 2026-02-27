import db from '../src/configDB.js'
import { Sequelize } from 'sequelize'

const Color = db.define('color', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Color