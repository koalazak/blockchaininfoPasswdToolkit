var check_password=require("./lib/cryptomagic.js");

var payload=''; //payload value from https://blockchain.info/wallet/[[your_identifier]]?format=json
var pass='';    //pass to test
var iterations=0; // set to 0 for older identifiers (test with 1 to 20 iterations). Use 5000 for new identifiers.

if(check_password(payload, pass, iterations)) {
	console.log("=======================");
    console.log("Password OK: "+pass);
    console.log("=======================");
}else{
	console.log("Invalid password.");
}