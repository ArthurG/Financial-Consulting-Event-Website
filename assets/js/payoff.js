$(document).ready(function(){

   $("#submit-button").click(function(){
	   var ccName = $("#ccname").val();
	   var ccMinBal = $("#ccminbal").val();
	   var ccTolBal = $("#cctotbal").val();
	   var phoneNum = $("#phonenum").val();
	   var email = $("#email").val();
	   var notifytime = $("#notify-time").val();
	   var phoneN = $("#phone-notify").is(":checked");
	   var textN = $("#text-notify").is(":checked");
	   var emailN = $("#email-notify").is(":checked");
	      
	   clearErrors();
	   
	   var problems = checkValues(ccName,ccMinBal,ccTolBal,phoneNum,email,notifytime,phoneN,textN,emailN);
	   
	   if (problems.length!=""){
		   $(".form-errors").hide();
		   $(".form-errors").html(problems);
		   $(".form-errors").show(400);		
	   }
	   
	   if(problems.length == 0){
		   displayValues(ccName,ccMinBal,ccTolBal,phoneNum,email,notifytime,phoneN,textN,emailN);
	   }
	   
	   
	   })


	
});



var checkValues = function(ccName,ccMinBal,ccTolBal,phoneNum,email,notifytime,phoneN,textN,emailN){
	
	
	/*console.log(ccName);
	console.log(ccMinBal);
	console.log(ccTolBal);
	console.log(phoneNum);
	console.log(email);
	console.log(notifytime);
	console.log(phoneN);
	console.log(textN);
	console.log(emailN);*/
	
	var errors = [];
	var errors2 = "";
	var errorStart = "<div class=\"alert alert-danger\" role=\"alert\"><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span><span class=\"sr-only\">Error:</span>";
	var errorEnd = "</div>";

	var filled = true;
	var numbers = true;
	
	if(ccName == "" ){ 
			errors.push("Enter the Credit Card's name");
			errorFill("ccname");
	}
	
	if(ccMinBal== "" ){ 
			errors.push("Enter a numerical value for the minimum monthly payment due");
			errorFill("ccminbal");
	}
	
	if(isNaN(ccMinBal)){ 
			errors.push("Enter a numerical value for the minimum monthly payment due");
			errorFill("ccminbal");
	}
	
	if(ccTolBal== "" ){ 
			errors.push("Enter a numerical value for the total outsanding balance");
			errorFill("cctotbal");
	}
	
	if(isNaN(ccTolBal)){ 
		errors.push("Enter a numerical value for the total outsanding balance");
		errorFill("cctotbal");
	}
	
	
	if(!phoneN && !textN && !emailN){
		errors.push("Select a notification option");
		errorFill("phone-notify");
		errorFill("text-notify");
		errorFill("email-notify");
		}
		
	if((phoneN || textN) && phoneNum == ""){
		errors.push("Enter your phone number");
		errorFill("phonenum");
		}
	
	if((emailN) && email == ""){
		errors.push("Enter your phone number");
		errorFill("email");
		}
	
	if(notifytime == ""){
		errors.push("Enter the best time to notify you of the payment");
		errorFill("notify-time");
		}
	for (i = 0;i<errors.length;i++){
		errors2 = errors2 + errorStart + errors[i] + errorEnd;
		}
	
	return errors2;
}

var displayValues = function(ccName,ccMinBal,ccTolBal,phoneNum,email,notifytime,phoneN,textN,emailN){
	alert("Reminder submited!");
	
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