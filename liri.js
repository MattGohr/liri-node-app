require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var input2 = process.argv[3];

switch (input) {
  case 'my-tweets':
    pullTweats();
    break;

  case 'spotify-this-song':
    spotifyThisSong(input2);
    break;

  case 'movie-this':
    movie(input2);
    break;

  case 'do-what-it-says':
    doit();
    // break;

};

function pullTweats() {
  console.log('Pulling tweets');

  var params = {
    screen_name: 'Offical_Roboto'
  };
  //https://developer.twitter.com/en/docs/tweets/curate-a-collection/api-reference/get-collections-list
  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {

      for (var i = 0; i < tweets.length; i++) {
        console.log(`\n${tweets[i].created_at}\n ${tweets[i].text}`);
      }

    } else {
      console.log(error);
    }
  });

}

function spotifyThisSong(song) {
  //get song
  console.log(`Pulling: '${song}'`);
  // console.log(spotify);

  spotify.search({
    type: 'track',
    query: song
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var artist = data.tracks.items[1].artists[1].name;
    var songNameFromSpotify = data.tracks.items[1].name;
    var songUrl = data.tracks.items[1].preview_url;
    var album = data.tracks.items[1].album.name;

    // console.log(data.tracks.items[1].artists);

    console.log(` Artist: ${artist} \n Song: ${songNameFromSpotify} \n Preview URL: ${songUrl} \n Album: ${album}`);

    // console.log(songNameFromSpotify);
  });


}

function movie(movieName) {
  // Code Goes Here...
}

function doit() {
  //take text from text.txt and do something with it.
}
