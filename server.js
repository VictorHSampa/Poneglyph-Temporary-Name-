import sequelize  from './src/configDB.js';
import user from './routes/User.js';
import express from 'express';
import cors from 'cors';
import './models/associations.js'

sequelize.sync().then(() => {
    console.log('Tabelas criadas com sucesso!');
}).catch((error) => {
    console.error('Erro ao criar as tabelas: ', error);
})
const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

app.use('/user', user);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
//import Leader from './Models/leaders.js'
/*
Leader.create({ name: 'Rob Lucci (OP07-079)', image: 'https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/OP07/OP07-079_p1_EN.webp', color1: 'Black', color2: 'None' }).then(() => {
})*/


// m4pYu4OJbyEhTFgU