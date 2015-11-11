#! /usr/bin/env node

var prompt = require('prompt');
var program = require('commander');
var check_password=require("./lib/cryptomagic.js");

var iterations=0; // default set to 0 for older identifiers (this test with 1 to 20 and 5000 pbkdf2/iso7816 iterations).

program
  .version('1.0.0')
  .description('A tool for test passwords on a blockchain.info wallet')
  .usage('(-p <file ...> | -i <identifier>) [options]')
  .option('-p, --payload <file ...>', 'read payload from a file')
  .option('-i, --identifier <identifier>', 'get payload via API for that identifier')
  .option('-d, --dictionary <file ...>', 'check each password on this file')
  .option('-n, --iterations <number>', 'fix number of pbkdf2/iso7816 iterations. By Default check 1 to 20 and 5000');
  
  program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ bciptk -p mypayload.txt');
  console.log('    $ bciptk -i "8ea09594-830c-4681-9d9e-6fe4fe7d8be6"');
  console.log('    $ bciptk -i "8ea09594-830c-4681-9d9e-6fe4fe7d8be6" -d words.txt');
  console.log('    $ bciptk -p mypayload.txt -n 5000');
  console.log('    $ bciptk -p mypayload.txt -n 5000 -d wordlist.txt');
  console.log('');
  });
  program.parse(process.argv);


if(typeof program.payload === "undefined" && typeof program.identifier === "undefined"){

	showError("No -p or -i parameters given! Please specify one of those");
	
}else if(typeof program.payload != "undefined" && typeof program.identifier != "undefined"){

	showError("You can not spcified two sources of payload. Just use -p OR -i parameters.");

}

if(typeof program.iterations != "undefined"){

	iterations =  isNaN(parseInt(program.iterations)) ? 0 : parseInt(program.iterations) ;
	
	console.log("Using "+(iterations==0?"1 to 20 and 5000":iterations)+" pbkdf2/iso7816 iterations.");
}


if(typeof program.payload != "undefined"){
	//read file
	console.log("Reading payload from file...");
	try{
	
		var payload=require("fs").readFileSync(program.payload).toString().trim();
		if(payload){
			console.log("Payload loaded OK.");
			console.log("Starting 're-try forever' mode.");
			startCrack(payload, iterations);
		}else{
			showError("Payload not found.");
		}
		
		
	}catch(e){
	
		showError(e.message);
		
	}
	
}else{
	//get payload via api
	var url='https://blockchain.info/wallet/'+program.identifier+'?format=json';
	
	console.log("Getting payload from: "+url);
	
	var request = require('request');
	
	request('https://blockchain.info/wallet/'+program.identifier+'?format=json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    
	    try{
		    var payloadData=JSON.parse(body);
		    
		    if("payload" in payloadData){
			    
			    //Check authType?
			    
			    try{
			    
			    	var payloadNEWFormat=JSON.parse(payloadData.payload);
			    	
			    	if("payload" in payloadNEWFormat){
			    	
			    		var finalPayload=payloadNEWFormat.payload.trim();
			    	
				    	if("pbkdf2_iterations" in payloadNEWFormat){
					    	if(iterations != payloadNEWFormat.pbkdf2_iterations){
					    		iterations=payloadNEWFormat.pbkdf2_iterations;
						    	console.log("Now Using API pbkdf2/iso7816 iteration value: "+iterations);
					    	}
				    	}
			    	
			    	}else{
				    	 showError("Error getting payload. Bad JSON payload value.");
			    	}
			    	
		    	}catch(e2){
			    	var finalPayload=payloadData.payload.trim();
		    	}
		    	
		    	if(finalPayload){
			    	console.log("Payload loaded OK.");
			    	startCrack(finalPayload, iterations);
		    	}else{
			    	 showError("Error getting payload. Bad JSON payload value. Is two-factor auth enabled?");
		    	}
			    
		    }else{
			    showError("Error getting payload. Bad JSON payload value. Is two-factor auth enabled?");
		    }
		    
	    }catch(e){
	    	console.log(e.message);
	    	showError("Error getting payload. Bad JSON.");
	    }
	    
	  }else{
	      console.error(error,response.statusCode);
	  	  showError("Error getting payload. Bad identifier?");
		  
	  }
	})

}


function showError(msg){
	program.outputHelp();
	console.error('  Error:');
	console.error('');
	console.error('  '+msg);
	console.error('');
	process.exit(1);
}

function startCrack(payload, iterations){
	
	if(typeof program.dictionary != "undefined"){
	
		if(require("fs").existsSync(program.dictionary)){
			
			var rl = require('readline').createInterface({
			  input: require('fs').createReadStream(program.dictionary)
			});
			
			rl.on('line', function (line) {
			  	console.log("Checking '"+line+"'");
			  	if(check_password(payload, line, iterations)) {
					console.log("=======================");
				    console.log("Password found: "+line);
				    console.log("=======================");
				}
			  
			});
			
			rl.on('close', function() {
			  console.log("Password not found.");
			  process.exit();
			});
			
		}else{
			showError("Dictionary file not found.");
		}
	
	}else{
		
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

	} //re-try forever mode
	
}


