var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require('twitter')
var spotify = require('spotify');
var request = require('request');
var client = new Twitter(keys.twitterKeys);


switch (process.argv[2]) {
	case "my-tweets":
		var params = {screen_name: 'stoo_aaron'};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
				if (!error) {
		            //Loop that shows last 20 tweets.  It console logs out i which starts at 0, so it only goes from 0-19...trying to fix that.
		  			for (var i = 0; i < 3; i++) {
		  				var j = i + 1;
		    			console.log("Tweet #" + j + ": " + tweets[i].text + " | CREATED ON: " + tweets[i].user.created_at) + "\n";
					}
				}
		});
	break;
	case "spotify-this-song":
		if (process.argv[3] == null) {
			searchSpotify("ace of base the sign");
		} else {
		 	searchSpotify(process.argv[3]);
		};
	break;
	case "movie-this":
		if (process.argv[3] == null) {
			searchMovie("Mr. Nobody");
		} else {
		 	searchMovie(process.argv[3]);
		};
	break;
}

function searchSpotify(song) {
	spotify.search({type: "track", query: song}, function(err, data) {
		if (err) {
			console.log(err);
		}
		console.log("Artist: " + data.tracks.items[0].artists[0].name + "\n");
		console.log("Song: " + data.tracks.items[0].name + "\n");
		console.log("URL: " + data.tracks.items[0].preview_url + "\n");
		console.log("Album: " + data.tracks.items[0].album.name + "\n");
	})
}

function searchMovie(name) {
        request('http://www.omdbapi.com/?t=' + name +'&r=json&tomatoes=true', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var body = JSON.parse(body);
        console.log("Title: " + body.Title + "\n");
        console.log("Year Released: " + body.Year + "\n");
        console.log("IMDB Rating: " + body.imdbRating + "\n");
        console.log("Country: " + body.Country + "\n");
        console.log("Language: " + body.Language + "\n");
        console.log("Plot: " + body.Plot + "\n");
        console.log("Actors: " + body.Actors + "\n");
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating + "\n");
        console.log("Rotten Tomatoes Link: " + body.tomatoURL);
      }
    })
}