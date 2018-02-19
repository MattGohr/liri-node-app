require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
var request = require("request");


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
  var movie2 = movieName.replace(/ /g, "+");
  console.log(movie2);
  request(`http://www.omdbapi.com/?t=${movie2}&y=&plot=short&apikey=trilogy`, function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      var Title =body.Title
      var Year =body.Year
      var Rating = body.imdbRating
      // var RottenTomatoesRating = body.Ratings[1].Value
      var Country = body.Country
      var Language = body.Language
      var Plot = body.Plot
      var Actors = body.Actors
      console.log(JSON.parse(body));
      console.log((body.Ratings));
      // console.log(` Title: ${Title} \n Year: ${Year} \n IMDB Rating: ${Rating} \n Rotten Tomatoes Rating: ${RottenTomatoesRating}`);
    }
  });
}

function doit() {
  //take text from text.txt and do something with it.
}
