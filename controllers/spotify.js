const request = require('request')
const querystring = require('querystring')

const clientId = process.env['SPOTIFY_CLIENT_ID']
const clientIdSecret = process.env['SPOTIFY_CLIENT_SECRET']
const redirectUri = 'http://spotifytest.djsnipa1.repl.co/callback'//make you put this redirect uri on your Spotify's developer dashboard
const stateKey = 'spotify_auth_state'

const generateRandomString = function(length) {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const login = async function (req, res) {
  const state = generateRandomString(16)
  res.cookie(stateKey, state)
  const scope = `user-read-private user-read-email`

  res.redirect(`https://accounts.spotify.com/authorize?` +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    })
  )
}

const callback = async function (req, res, next) {
  let code = req.query.code || null
  let state = req.query.state || null
  let storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    next(new Error('state_mismatch'))
  }
  
  res.clearCookie(stateKey)
  let authOptions = {
    url: `https://accounts.spotify.com/api/token`,
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientIdSecret).toString('base64'))
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      let access_token = body.access_token
      let refresh_token = body.refresh_token

      let options = {
        url: `https://api.spotify.com/v1/me`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      }

      // use the access token to access the Spotify Web API
      request.get(options, async function(error, response, body) {
        if(!!error) {
          console.log(error)
        } else {
          res.json({
            userProfile: body,
            accessToken: access_token,
            refreshToken: refresh_token 
          })
        }
      })
    } else {
      next(error)
    }
  })
}

module.exports = {
  login,
  callback
}