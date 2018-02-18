require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js')
// var Spotify = require('node-spotify-api');
//
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: 'fbfdbe7819f24807b0b0ae5d63a5745a',
  secret: '3a6dea8cff9b4a2ea5111c32998231ac'
});


var input = process.argv[2];
var input2 = process.argv[3];

switch (input) {
  case 'my-tweets':
    pullTweats();
    break;

  case 'spotify-this-song':
    Spotify(input2);
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

function Spotify(song) {
  //get song
  console.log(`Pulling: '${song}'`);
  // console.log(spotify);

}

function movie(movieName) {
  // Code Goes Here...
}

function doit() {
  //take text from text.txt and do something with it.
}
