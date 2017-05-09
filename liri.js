//write the code you need to grab the data from keys.js. Then store the keys in a variable.
//....
var request = require("request");
var fs = require("fs");
var twitterKeys = require("./keys.js");
var twitter= require("twitter");
var spotify= require("spotify");

//Make it so liri.js can take in one of the following commands:
var action = process.argv[2];
var name = "";

var nodeArgs = process.argv;
var movieName = "Mr+Nobody";



switch (action){


	case "my-tweets":
	 	myTweets();
	 	break;

	case "spotify-this-song":
		spotifyThisSong();
		break;

	case "movie-this":
		movieThis();
		break;

	case "do-what-it-says":	
		doWhatItSays();
		break;
}

//This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets(){
	var client = new twitter(twitterKeys.twitterKeys);
	client.get("src= http://twitter.com/statuses/user_timeline.json", {count:20}, function(error, tweets, response){
		if (error){
			console.log("Error. Please go to src= http://twitter.com/statuses/user_timeline/kathrinweb2017.json?callback=twitterCallback2&count=20");
		}
		if(!error){
			tweets.forEach(function(kdTweet){
				console.log("At "+ kdTweet.created_at +"\nKD Tweeted: "+ kdTweet.text);
			});
		}
	});
	
}

function spotifyThisSong() {
	//make song name one sring, if no song name, Ace of Base
	if (process.argv.length >3){
		var songName = name;
		for (var i = 3; i < nodeArgs.length; i++) {
  			if (i > 3 && i < nodeArgs.length) {
   		 	songName = songName + "+" + nodeArgs[i];
	  		}else{
	   			songName += nodeArgs[i];
	  		}console.log("You searched for: "+songName);
		}
	}if (process.argv.length <4){
		songName = "the+sign+ace+of+base"
	}
//spotify search, if error, show error, if no error, but search yeilds nothing=>Ace of Base
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }if (!err && data.tracks.total === 0){
	    	spotify.search({type: 'track', query: 'The+sign+ace+of+base'}, function(err, data){
		    	console.log("We weren't able to find your search, please try this 1990's hit!")
		    	console.log("Artist(s): "+data.tracks.items[0].album.artists[0].name+
		    		"\nSong name: "+data.tracks.items[0].name+
		    		"\nA preview link of the song from Spotify: "+ data.tracks.items[0].preview_url+
		    		"\nFrom the Album: "+data.tracks.items[0].album.name);
	    	});
	    	return;
//if search runs, ideal console log:
	    }else{
	    	console.log("Artist(s): "+data.tracks.items[0].album.artists[0].name+
	    		"\nSong name: "+data.tracks.items[0].name+
	    		"\nA preview link of the song from Spotify: "+ data.tracks.items[0].preview_url+
	    		"\nFrom the Album: "+data.tracks.items[0].album.name);
	    }

  	});
}

function movieThis(){

	if (process.argv.length >3){
		movieName = "";
		for (var i = 3; i < nodeArgs.length; i++) {
  			if (i > 3 && i < nodeArgs.length) {
   		 	movieName = movieName + "+" + nodeArgs[i];
	  		}else{
	   			movieName += nodeArgs[i];
	  		}console.log(movieName);
		}
	}
	
	request("http://www.omdbapi.com/?t=" + movieName+ "&Tomatoes=true", function(error, response, body) {
		//console.log("Error: ln 60")
	  		// If the request was successful...
	  		if (!error && response.statusCode === 200) {
	    	//var rottenName = (JSON.parse(body).Title).replace(" ", "_");
			//console.log("rN" +rottenName);
			// Then log the body from the site!
		    console.log("*Title: "+ JSON.parse(body).Title);
		    console.log("*The movie came out in: " + JSON.parse(body).Year);
		    console.log("*The movie's rating is: " + JSON.parse(body).imdbRating);
		    console.log("*The movie was produced in: " + JSON.parse(body).Country);
		    console.log("*The movie is in: " + JSON.parse(body).Language);
		    console.log("*Plot summary: " + JSON.parse(body).Plot);
		    console.log("*Main actors: " + JSON.parse(body).Actors);
		    console.log("*The movie was produced in: " + JSON.parse(body).Language);
		   console.log("*"+ JSON.parse(body).tomatoURL);
		  	}
		});
}



function doWhatItSays(){
// 	// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
fs.readFile("random.txt", "utf8", function(err, response) {
	if (err){
		console.log("error dowhatitsays");
	}if (!err && response.statusCode === 200) {
		//after comma, collect the words or what's inside the ""
		var responseArray = response.split(",");
		var saysAction = responseArray[0];
		name = responseArray[1];
		spotifyThisSong();
		}
});
}


