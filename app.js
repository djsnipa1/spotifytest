const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
//passport imports
const passport = require('passport')
const session = require('express-session')
require('./middleware/passport')

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

//passport initialization
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/login',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private']
  }),
  function(req, res) {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
})

app.get(
  '/callback',
  function(req, res, next) {
    passport.authenticate('spotify', function(err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.redirect('/login')
      }

      return res.json({user, info})
    })(req, res, next)
  }
)

app.get('/', (req, res) => res.send('Hello Simplex readers!'))

app.listen(port, () => console.log(`App started on port: ${port}!`))