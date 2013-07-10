
/*
 * GET home page.
 */

var random = require('node-uuid');
var limit = 8;
var allSessions = [];


exports.start = function(req, res){
	res.render('startview');
};


exports.startview = function(req, res){

	var guessarray = [];
	var suggestion = []; 
	var i = 0;
        var count = i +1;
	var left = limit-i;
	var id = random.v1();

	sessionDetails = {
		gh : guessarray,
		suggest : suggestion,
        	computerGuess : Math.floor(Math.random()*1001),
		i : i,
		max: 1000,
		min : 0,
		id : id
	};

    
    	if ( req.session.a1 ) {
	   	console.log('Session is set ' + req.session.a1);
    	} else {
	   	console.log('Session is not set, setting it now ');
	   	req.session.a1 = id;
           
    	} 

    	allSessions[id] = sessionDetails;
    	res.render('guessview', { max: sessionDetails.max, min: sessionDetails.min, count: count, left: left, guessarray : sessionDetails.gh, suggestion: sessionDetails.suggest}); 
};



exports.guessHandler = function(req, res){
 	//checks for a session, if one does not exist, one is created. 
    	if ( req.session.a1 ) {
	   	console.log('Session is set ' + req.session.a1);
    	} else {
           	res.render('startview');
	   	return;
    	} 

  	var thisSessionDetails = allSessions[req.session.a1]; 
  	thisSessionDetails.i = thisSessionDetails.i +1;
	var left = limit - thisSessionDetails.i;
  	var answer;
  	var guess = req.body.userguess;
  	var count = thisSessionDetails.i+1;  


	if ( thisSessionDetails.i < limit ) {
    		//once the loop starts, if i <8 it will continue guessing but after i=8 then you automatically lose if you didn't get it.

    		console.log('User entered value is ' + req.body.userguess);
    		console.log('Global is ' + thisSessionDetails.computerGuess);
  		
		// If the guessed value is below the computer value the new minimum number is the guess.
		if ( thisSessionDetails.computerGuess > guess ) { 
			if ( thisSessionDetails.min < guess ) {	
				thisSessionDetails.min = guess;
			} else {
				thisSessionDetails.min = thisSessionDetails.min;
			};
	
			//assignes the values of guess and 'higher' to the corresponding suggestion and guess histories
			thisSessionDetails.gh[ thisSessionDetails.i ] = guess;
			thisSessionDetails.suggest[ thisSessionDetails.i ] = 'Higher';
			res.render('guessview',{ max: thisSessionDetails.max, min: thisSessionDetails.min, left: left, count: count, guess1: req.body.userguess, answer: 'HIGHER', suggestion: thisSessionDetails.suggest, guessarray: thisSessionDetails.gh });

		} else if ( thisSessionDetails.computerGuess < guess ) {
			// if the guess is above the computer guess then the new max is the guess.
			if (thisSessionDetails.max > guess){ 
				sessionDetails.max = guess;
			} else {
				thisSessionDetails.max = thisSessionDetails.max;
			};
			
			//same as line 81
			thisSessionDetails.gh[thisSessionDetails.i] = guess;
                	thisSessionDetails.suggest[thisSessionDetails.i] = 'Lower';
			res.render('guessview',{ max: thisSessionDetails.max, min: thisSessionDetails.min, left: left, count: count, guess1 :req.body.userguess, answer: 'Lower', suggestion: thisSessionDetails.suggest, guessarray: thisSessionDetails.gh } );
	       
		}  else if( thisSessionDetails.computerGuess == guess) {

			// if you get the right answer it checks the suggestion.
			thisSessionDetails.suggest[thisSessionDetails.i] = 'Correct Answer';

			// clears session prepares for new game.		
			req.session.a1 = null;
			thisSessionDetails.gh[thisSessionDetails.i] = guess;
			res.render('winview',{ guess1: req.body.userguess, computerGuess: thisSessionDetails.computerGuess, guessarray: thisSessionDetails.gh, suggestion: thisSessionDetails.suggest});
		} else {
			// if they don't enter a number it does this.
			thisSessionDetails.suggest[thisSessionDetails.i] = 'Not a number';
			thisSessionDetails.gh[thisSessionDetails.i] = guess;
			res.render('guessview',{ max: thisSessionDetails.max, min: thisSessionDetails.min, left: left, count: count, guess1 :req.body.userguess, answer: 'Lower', suggestion: thisSessionDetails.suggest, guessarray: thisSessionDetails.gh } );
		}	
 

	} else if ( thisSessionDetails.i >= limit && thisSessionDetails.i <= limit && thisSessionDetails.computerGuess == guess) {
		// if you get the right answer it checks the suggestion.
		thisSessionDetails.suggest[thisSessionDetails.i] = 'Correct Answer';
			
		// clears session prepares for new game.		
		req.session.a1 = null;
		thisSessionDetails.gh[thisSessionDetails.i] = guess;
		res.render('winview',{ guess1: req.body.userguess, computerGuess: thisSessionDetails.computerGuess, guessarray: thisSessionDetails.gh, suggestion: thisSessionDetails.suggest});
	
	} else {
		// if you take more than 8 guesses and didn't get the answer it sends you to lose page and allows for the array reset.
		 
		if ( thisSessionDetails.computerGuess > guess ){
			thisSessionDetails.suggest[thisSessionDetails.i] = 'Higher';
		} else {
			thisSessionDetails.suggest[thisSessionDetails.i] = 'Lower';
		}
		
		//clears session
		req.session.a1 = null; 
		thisSessionDetails.gh[thisSessionDetails.i] = guess;
		res.render('loseview',{guess1:req.body.userguess, computerGuess: thisSessionDetails.computerGuess, guessarray: thisSessionDetails.gh, suggestion: thisSessionDetails.suggest});

	}

	   
};

