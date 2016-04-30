/*********************************************************************************************************
*
*		Currency Converter Coding Challenge
*
**********************************************************************************************************/

/*********************************************************************************************************
*
*		CONTROLLER
*
**********************************************************************************************************/

$(document).ready(function(){

	$('#convert').click(run);  // event listener

	$('#clear').click(clearHist);

	function run(){ // runs the model and renders the result
		var convertedAmt = convert();  // runs the model
		//console.log('Called the run function')
		render(convertedAmt); // runs the view
	};

});

/*********************************************************************************************************
*
*		VIEW
*
**********************************************************************************************************/

function render(amount){ // renders the converted amount to the view
	document.getElementById("outAmt").innerHTML = amount;
	//console.log('Called the render function')
	// knows nothing about the model or the controller. just renders the page with the given data.
};

function clearHist(){

};


/*********************************************************************************************************
*
*		MODEL
*
**********************************************************************************************************/


/***************
"Business Layer"

contains "business logic"
****************/
function convert(){

	var inputs = validate();

	convTable = [1, 0.65, 16.53, 65.75, 121.88];
	fromInd = inputs.indexOf(inputs[1]);
	toInd = inputs.indexOf(inputs[2]);

	output = (convAmt/convTable[fromInd])*convTable[toInd];

	return output; // knows nothing about the view or the controller, just outputs it's modeled data.

	/* future functionality:
		- round decimal places for nice display
		- list history of all conversions
		- button to clear history
		- summarize conversion in output box including inputs
			e.g. "1 USD is worth 16 pesos!"
		- retreive real-time currency information from an API like
			google finance, yahoo finance, currencylayer API, euro central bank feed, open source exchange rates API
			this probably requires JSON
	*/
};

/**************
"Service Layer"

- gets data from various locations such as form inputs, server/database if there was one,
	or external website database of currency conversion factors.
- maps / formats data from various sources into something the business logic can use
- calls 
***************/
function validate(){ // also part of the model

	convAmt = parseFloat(document.getElementById("inputValue").value);
	fromCurr = document.getElementById("fromCurr").value;
	toCurr = document.getElementById("toCurr").value;
		console.log("Converting "+convAmt+" "+fromCurr+" to "+toCurr);



	var formData = [convAmt, fromCurr, toCurr];

	return formData;
};