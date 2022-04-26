const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const spotifyController = require('./controllers/spotify.js')

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.get('/login', spotifyController.login)
app.get('/callback', spotifyController.callback) 

app.get('/', (req, res) => res.send('Hello Simplex readers!'))

app.listen(port, () => console.log(`App started on port: ${port}!`))