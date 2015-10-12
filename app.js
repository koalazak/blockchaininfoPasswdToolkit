var prompt = require('prompt');
var check_password=require("./lib/cryptomagic.js");

var payload=''; //payload value from https://blockchain.info/wallet/[[your_identifier]]?format=json
var iterations=0; // set to 0 for older identifiers (this test with 1 to 20 iterations). Use 5000 for new identifiers.

if(!payload){
	console.log("Please edit app.js to fill 'payload' variable.");
	process.exit();
}

prompt.message = "";
prompt.delimiter = "";
prompt.colors = false;
prompt.start();


(function askPassword(){

	var promptSchema = {
	    properties: {
	     password: {
	        message:"Password:",
	        hidden: true
	      }
	    }
	};
	  
	prompt.get(promptSchema, function (err, result) {
	
		if(err){ //normally ctrl+c
			console.log(err.message);
			process.exit();
		}
		    
	    if(check_password(payload, result.password, iterations)) {
			console.log("=======================");
		    console.log("Password OK: "+result.password);
		    console.log("=======================");
		}else{
			console.log("Wrong password. Try again.");
			//re-try forever
			askPassword();
		}
	    
	});

})();
  
  

