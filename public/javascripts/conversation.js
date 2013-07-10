
 conversation = function(){

var him = prompt("Hello, my name is Martha Wayne, welcome to my fundraiser! What might your name be?");

alert("Wow what a nice name! It is a pleasure to meet you Mr." + him);

var job = prompt("Now tell me Mr." + him + " what exactly do you do?");

job = job.toLowerCase();

switch(job){
	case "scientist":
	  alert("Wow you must be smart!);
	  break;
	case "lawyer" :
	  alert("Hmm a lawyer you say? I do believe my father could use men like you.");
	  break;
	case "doctor" :
	  alert("A doctor you say? I bet you must have a lovely home!");
	  break;
	case "maid" :
	  alert("Oh you're a maid... how interesting... could you fetch me some wine?");
	  break;
	default:
	  alert("I've never heard of that job... I assume it is interesting");
	  break;
	}

alert("Well it has been nice talking to you Mr." + him + ". I hope I see you again, but unfortunately they need me in the kitchen. Goodbye.");

var direction = prompt("Do you go to the KITCHEN and follow her, or stay?");

direction = direction.toLowerCase();

if(direction === "kitchen"){
	alert("Oh you found me again Mr." + him + ". I am beginning to think you're following me. I'm just joking dear.);
	var answer = prompt("Now tell me what do you think of all this crime in the city? Is it GOOD or BAD?");
	answer = answer.toLowerCase();
	switch(answer){
		case good:
		  alert("Really you think that the crime is good? You are a very unique man.");
		  break;
		case bad:
		  alert("Me too. But I have no idea how to fix it.");
		  break;
		default:
		  alert("Thats a very interesting idea.");
		  break;
	}
} else {
	alert("You stay in the current room and party the night 		away.");
	
};
}
