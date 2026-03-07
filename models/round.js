import db from '../src/configDB.js'
import { Sequelize } from 'sequelize'

const Round = db.define('round', {
    result: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    dice: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    first:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    comment:{
        type:Sequelize.STRING
    }
    
})

export default Round