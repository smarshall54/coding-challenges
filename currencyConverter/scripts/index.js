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
		var [validatedData, errorFlag] = validate(); // calls the service layer (form validation function) to get data from the form		

		// renders the result or an error message if the data is not valid.
		if (errorFlag != 'error'){
			// passes that data to the business logic (convert function)
			var convertedAmt = convert(validatedData);  // runs the model
			//console.log('Called the run function')
			renderFormErr(errorFlag);
			render(convertedAmt); // runs the view
		} else {
			renderFormErr(errorFlag);
		}
		
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

function renderFormErr(flag){
	var message = document.getElementById("errMsg").innerHTML;
	console.log(message)

	if (flag=='no error'){
		document.getElementById("errMsg").innerHTML = '';
		//console.log('clearing message')
	} else if(flag=='error') {
		document.getElementById("errMsg").innerHTML = 'There was a problem with your input data!';
		//console.log('writing message')
	};

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
function convert(inputs){

	//var inputs = validate();
	convAmt = inputs[0];
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
function validate(){ // also part of the model.
	// - retrieves data from the form
	// - checks that the data is valid for the model (not actually doing any checking yet)
	// - formats the data in a way the model can use as input

	var convAmt = parseFloat(document.getElementById("inputValue").value);
	var fromCurr = document.getElementById("fromCurr").value;
	var toCurr = document.getElementById("toCurr").value;
		console.log("Converting "+convAmt+" "+fromCurr+" to "+toCurr);

	

	var formData = [convAmt, fromCurr, toCurr];
	
	if(0){ // no actual checks for form data yet. convenient test case is to put convAmt==1 in the conditional.
			// that way if the user enters "1" as the amount to convert it will throw error. useful for basic testing of form validation.
		var isErr = 1;
	} else {
		var isErr = 0;
	};
	

	if(isErr){
		var validationErrorFlag = 'error';
	} else {
		var validationErrorFlag = 'no error';
	};
	//console.log(validationErrorFlag)

	return [formData, validationErrorFlag];

};