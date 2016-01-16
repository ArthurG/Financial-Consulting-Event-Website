$(document).ready(function(){

   $("#submit-button").click(function(){
	   clearErrors();
	   var ccName = [$("#cc1name").val(), $("#cc2name").val(), $("#cc3name").val()];
	   var ccRate = [$("#cc1rate").val(),$("#cc2rate").val(),$("#cc3rate").val()];
	   var ccBalance = [$("#cc1balance").val(),$("#cc2balance").val(),$("#cc3balance").val()];
	   var ccLimit = [$("#cc1limit").val(), $("#cc2limit").val(), $("#cc3limit").val()];
	   	   
	   var problems = checkValues(ccName,ccRate,ccBalance,ccLimit);
	   if (problems.length!=""){
		   $(".form-errors").hide();
		   $(".form-errors").html(problems);
		   $(".form-errors").show(400);
		   
			
	   }
	   
	   if(problems.length == 0){
		   displayValues(ccName,ccRate,ccBalance,ccLimit);
	   }
	   
	   
	   })


	
});



var checkValues = function(name,rate,balance,limit){
	var errors = [];
	var errors2 = "";
	var errorStart = "<div class=\"alert alert-danger\" role=\"alert\"><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span><span class=\"sr-only\">Error:</span>";
	var errorEnd = "</div>";

	var filled = true;
	var numbers = true;
	for (i=0;i<3;i++){
		var ccnumber = i+1;
		if(name[i] == "" ){
			errors.push("Enter a value for Credit Card " + ccnumber + "'s name");
			errorFill("cc"+ccnumber+"name");
		}
		if (rate[i] == ""){
			errors.push("Enter a value for Credit Card " + ccnumber + "'s interest rate ");
			errorFill("cc"+ccnumber+"rate");
		}
		if (balance[i] == ""){
			errors.push("Enter a value for Credit Card " + ccnumber + "'s balance");
			errorFill("cc"+ccnumber+"balance");
		}
		if (limit[i] == ""){
			errors.push("Enter a value for Credit Card " + ccnumber + "'s credit limit");
			errorFill("cc"+ccnumber+"limit");
		}

		if (isNaN(rate[i])){
			errors.push("Enter a numeric value for Credit Card " + ccnumber + "'s interest rate");
			errorFill("cc"+ccnumber+"rate");
		}
		if (isNaN(balance[i])){
			errors.push("Enter a numeric value for Credit Card " + ccnumber + "'s balance");
			errorFill("cc"+ccnumber+"balance");
		}
		if (isNaN(limit[i])){
			errors.push("Enter a numeric value for Credit Card " + ccnumber + "'s credit limit");
			errorFill("cc"+ccnumber+"limit");
		}
		
	}
	for (i = 0;i<errors.length;i++){
		errors2 = errors2 + errorStart + errors[i] + errorEnd;
		}
	
	return errors2;
}

var displayValues = function(name, rate, balance, limit){
	
	var name2 = [];
	var rate2 = [];
	var balance2 = [];
	var limit2 = [];
	var steps= "";
	
	totalBalance = 0;
	totalLimit = 0;
	//Calculate total Balance / credit limit
	for (i = 0;i<3;i++){
		totalBalance+=parseFloat(balance[i]);
		totalLimit+=parseFloat(limit[i]);
	}
	
	//Order lenders in terms of interest rate
	for (place = 0; place<3;place++){
		for (j = 0;j<3;j++){
			counter = 0;
			for (k = 0;k<3;k++){
				if (rate[j] < rate[k]){
					counter +=1;
				}
			}
			if (counter == place){
				name2.push(name[j]);
				rate2.push(parseFloat(rate[j]));
				balance2.push(parseFloat(balance[j]));
				limit2.push(parseFloat(limit[j]));
			}
		}
	}
	
	//Calculate desired payoff amounts
	desiredRatio = totalLimit*0.1;
	payOff = Math.max(totalBalance - desiredRatio,0);
	debtPointer = 0;
	
	while (payOff > 0){
		pay = Math.min(balance2[debtPointer],payOff);
		steps = steps+ "Pay off $" + pay.toFixed(2) + " from your " + name2[debtPointer] + " credit card <br/>";
		payOff-=pay;
		debtPointer+=1;
	}
	
	//Set the sidebar
	$(".steps").html(steps);
	if (steps == ""){
		
		$(".steps").html("Your current credit utilization is below 10%");
		
	}
	
	
}



var errorFill = function(formName){
	$("#"+formName).addClass("form-fill-error");
	}

var clearErrors = function(){
   	$(".form-errors").html("");
	
	for (i = 0;i<3;i++){
		$("input").removeClass("form-fill-error");
		}
	}