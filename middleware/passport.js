const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const clientId = process.env['SPOTIFY_CLIENT_ID']
const clientSecret = process.env['SPOTIFY_CLIENT_SECRET']
const redirectUri = 'http://spotifytest.djsnipa1.repl.co/callback'

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use('spotify',
  new SpotifyStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: redirectUri
    },
    async function(accessToken, refreshToken, expires_in, profile, done) {
      try {
        const userResponse = {
          ...profile,
          accessToken,
          refreshToken,
          expires_in
        }
        done(null, userResponse)
      } catch (err) {
        done(err, null, { message: 'An error ocurred trying to authenticate the user'})
      }
    }
  )
)