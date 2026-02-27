import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
})

try {
    await sequelize.authenticate()
    console.log('Banco de dados inicializado com sucesso!')
} catch (error) {
    console.error('Erro ao inicializar o banco de dados: ', error)
}

export default sequelize