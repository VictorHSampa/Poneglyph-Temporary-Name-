import db from '../src/configDB.js'
import { Sequelize } from 'sequelize'

const Set = db.define('opSet', {
    code: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Set