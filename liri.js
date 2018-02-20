require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var input2 = process.argv[3];

function  logic(query){
  switch (query) {
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
      fromFile();
      break;

  };
}


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

    var artist = data.tracks.items[0].artists[0].name;
    var songNameFromSpotify = data.tracks.items[0].name;
    var songUrl = data.tracks.items[0].preview_url;
    var album = data.tracks.items[0].album.name;

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
      if (!error && response.statusCode === 200)
        var parsed = JSON.parse(body);
        var { Title, imdbRating, Year, Country, Language, Plot, Actors } = parsed;
        var RottenTomatoesRating = parsed.Ratings[1].Value;
        //
        // console.log(parsed);
        // console.log(RottenTomatoesRating);
        console.log(` Title: ${Title} \n Year: ${Year} \n IMDB Rating: ${imdbRating} \n Rotten Tomatoes Rating: ${RottenTomatoesRating} \n Year: ${Year} \n Country: ${Country} \n Language: ${Language} \n Plot: ${Plot}`);
  });
}

function fromFile() {
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log('calling first from file: ' + dataArr[0]);

    //renaming input2
    input2 = dataArr[1].trim();
    console.log(input2);

    logic(dataArr[0]);

  });


}
logic(input)
