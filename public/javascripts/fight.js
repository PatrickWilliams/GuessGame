var slaying = true;

var youHit = Math.floor(Math.random() * 2);
var damageThisRound = Math.floor(Math.random() * 5 + 1);
var totalDamage = 0;

var myFunction = function(){
	while (slaying) {
  		if (youHit) {
  			switch(damageThisRound){
  			   case 1: 
  			     alert("You hit the theif and punched him in the face doing 1 damage!");
    			     totalDamage += damageThisRound;
    			     break;
    			   case 2:
    			     alert("You hit the theif and kicked him in the face doing 2 damage!");
    			     totalDamage += damageThisRound;
    			     break;
    			   case 3:
    			     alert("You hit the theif and broke his leg doing " + damageThisRound + " damage!");
    			     totalDamage += damageThisRound;
    			     break;
    			   case 4:
    			     alert("You hit the theif and broke his arms doing " + damageThisRound + " damage!")
    	                     totalDamage += damageThisRound;
    	                     break;
    	                   case 5:
    	                     alert("You threw the mightest of punches doing massive damage!")
    	                     totalDamage += damageThisRound;
    	                     break;
    			}
    
    	if (totalDamage >= 4) {
      alert("You did it! You beat the theif!");
      slaying = false;
    	} else {
      	youHit = Math.floor(Math.random() * 2);
    	}
  		} 
  		else {
    		alert("The theif stabs you! You're dead.");
    		slaying = false;
  		}
	}
}
