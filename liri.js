require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js')

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var input2 = process.argv[3];
console.log(input);

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
    console.log('requested');
    console.log(tweets);
    if (!error) {
      console.log(tweets);
    }
  });
  //twitter API

  //loop though jason and print tweets


}

function Spotify(song) {
  //get song

}

function movie(movieName) {
  // Code Goes Here...
}

function doit() {
  //take text from text.txt and do something with it.
}
