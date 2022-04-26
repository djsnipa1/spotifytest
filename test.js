const fetch = require('node-fetch');
const SpotifyWebApi = require('spotify-web-api-node');

const token = 'BQB76DKTyVXQ8K7qWh2CiSO0oo09XX5rn0YnNQ_kXsFHVGFEZZwEsJlqGg6QNsBtw1gPOGW9o83UsgX0hmgYxXKP7PyfYlgrY1xDqmLjCD__BDmEDbhVJvJ4gT1pVMQ0ARRqVfeqUx8ASeUXaErr3H0VWd6Fc8mFcmQLUaPOCm9EKlzagkKJFMsy716sqSxB9PgRu8mUvWEBS0yeNRFFmM1QUNw8z6mlcK5J6WKiCb_EG-gtAp78bUtB_nN_1XHH73twTqgKxbwVIuXS4mmckjKmAdVId32F3byEHFd7fuVaets7xsvL';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    console.log(me.body.display_name);
    const displayName = me.body.display_name;
  figlefy(displayName);
    // getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}
// getMyData()

function newReleases() {
  (async () => {
    const newRel = await spotifyApi.getNewReleases({ limit: 1 });
    console.log(newRel.body.albums);
    const albums = newRel.body.albums;
    //for album in albums
    console.log(albums);
    return albums;
  })().catch(e => {
    console.error(e);
  });
}

// newReleases()

function newReleasesAlbumTracks() {
  let albums = newReleases();
  // console.log(albums.items[0].artists)
  let items = albums.items;
  for (item in items) {
    let artists = item.artists;
    console.log(artists)
  }
  console.log(artists)

}
// newReleasesAlbumTracks();

function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  console.log(today);

}
// getDate();

function figlefy(name) {
  const figlefyAPI = 'https://figlefy.djsnipa1.repl.co/figlefy/';
  let myString = name;

  fetch(figlefyAPI + encodeURIComponent(myString))
    .then(res => res.text())
    .then(figlefied => {
      console.log(figlefied);
      return figlefied;
    });

}
// figlefy();

module.exports = { getMyData, newReleases, figlefy, getDate }
