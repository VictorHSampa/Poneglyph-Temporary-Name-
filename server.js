import express from 'express'

const app = express()
const port = 3000

app.listen(port)

app.post('/user', (req, res) => {
    res.send('User created')
})

app.get('/user', (req, res) => {
    res.send('User details')
})

