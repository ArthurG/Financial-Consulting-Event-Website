$(document).ready(function(){
	
	$("#custom-transfer").hide();
	$("#downpayment-group").hide();
	
   $("#submit-button").click(function(){
	    clearErrors();
		$(".errors").hide()
		
		var ccName = [$("#cc1name").val(), $("#cc2name").val(), $("#cc3name").val()];
		var ccRate = [$("#cc1rate").val(),$("#cc2rate").val(),$("#cc3rate").val()];
		var ccBalance = [$("#cc1balance").val().replace(",","").replace(" ",""),$("#cc2balance").val().replace(",","").replace(" ",""),$("#cc3balance").val().replace(",","").replace(" ","")];
		var savings = $("#savings").val().replace(",","").replace(" ","");
		var savingsrate = $("#savingsrate").val();
		var monthlysaving = $("#monthlysaving").val().replace(",","").replace(" ","");
		var Homeprice = $("#Homeprice").val().replace(",","").replace(" ","");
		var time = $("#time").val();
		var downpayment = $("#downpayment").val();
		var income = $("#income").val().replace(",","").replace(" ","");
		var lio = $("#lio").val();
		var error = checkValues(ccName,ccRate,ccBalance,savings,savingsrate,monthlysaving,Homeprice,time,downpayment,income,lio);
		
		if (error!=""){
			$(".errors").hide()
			$(".errors").html(error);
			$(".errors").show(400)
		}
		
		else{
			var s = getSteps(ccName,ccRate,ccBalance,savings,savingsrate,monthlysaving,Homeprice,time,downpayment,income,lio);
			$(".warnings").hide();
			$(".steps").hide();
			$(".warnings").html(s[1]);
			$(".steps").html(s[0]);
			$(".warnings").show(600);
			setTimeout(function(){$(".steps").show(600);}, 600);
						
		}
		
	   })
	   
	 $("#lio").change(function() {
		 if ($("#lio").val() == 5){
			 $("#custom-transfer").show(300);
			 }
		else{
			 $("#custom-transfer").hide(300);
			}
		 })
		 
	 $("#downpayment").change(function() {
		 if ($("#downpayment").val() == 100){
			 $("#downpayment-group").show(300);
			 }
		else{
			 $("#downpayment-group").hide(300);
			}
		 })
	
}); 

var checkValues = function(name,rate,balance,savings,savingsrate, monthly, Homeprice, time, downpayment, income, lio){
	var ret = [];
	var a = "";
	
	for (i = 0;i<3;i++){
		ccNum = i+1;
		if (name[i] == ""){
			ret.push("Please enter the name of credit card " + ccNum);
			errorFill("cc"+ccNum+"name");
		}
		if (rate[i] == ""){
			ret.push("Please enter the interest rate of credit card "  +ccNum);
			errorFill("cc"+ccNum+"rate");
		}
		if (isNaN(rate[i])){
			ret.push("Please enter a number for credit card "+ ccNum+" 's rate");
			errorFill("cc"+ccNum+"rate");
		}
		if (balance[i] == ""){
			ret.push("Please enter the balance for credit card " + ccNum);
			errorFill("cc"+ccNum+"balance");
		}
		if (isNaN(balance[i])){
			ret.push("Please enter a number for credit card "+ ccNum+"'s balance section ");
			errorFill("cc"+ccNum+"balance");
		}
	}
	
	if (savings == ""){
		ret.push("Please enter the amount of money in your savings");
		errorFill("savings");
	}
	if (isNaN(savings)){
		ret.push("Please enter a number for the saving's balance section ");
		errorFill("savings");
	}
	
	if (savingsrate == ""){
		ret.push("Please enter the annual interest rate of your savings");
		errorFill("savingsrate");
	}
	if (isNaN(savingsrate)){
		ret.push("Please enter a number for your savings' annual interest rate");
		errorFill("savingsrate");
	}
	
	if (monthly == ""){
		ret.push("Please enter how much discretionary income you plan to save every month");
		errorFill("monthlysaving");
	}
	if (isNaN(monthly)){
		ret.push("Please enter a numeric value for how much discretionary income you plan to save");
		errorFill("monthlysaving");
	}
	
	if (Homeprice == ""){
		ret.push("Please enter what your expected Home price is");
		errorFill("Homeprice");
	}
	if (isNaN(Homeprice)){
		ret.push("Please enter a number for your expected Home price");
		errorFill("Homeprice");
	}
	
	if (time == ""){
		ret.push("Please enter how long it will take for you to pay off your Home");
		errorFill("time");
	}
	if (isNaN(time)){
		ret.push("Please enter a number for your expected payback period");
		errorFill("time");
	}
	
	if (downpayment == 100){
		if ($("#downpayment-custom").val() == ""){
			ret.push("Please enter what percentage your downpayment will be");
			errorFill("downpayment-custom");
			}
		if (isNaN($("#downpayment-custom").val())){
			ret.push("Please enter a number for your downpayment");
			errorFill("downpayment-custom");
			}
		
	}
	
	if (income == ""){
		ret.push("Please enter your gross monthly income");
		errorFill("income");
	}
	if (isNaN(income)){
		ret.push("Please enter a number for your gross monthly income");
		errorFill("income");
	}
	if ($("#lio").val() == 5){
		if ($("#consolidatedLender").val() == ""){
			ret.push("Please enter which lender you plan to use to consolidate your debt");
			errorFill("consolidatedLender");
		}
		if ($("#consolidatedTransfer").val() == ""){
			ret.push("Please enter a value for what your transfer fee is");
			errorFill("consolidatedTransfer");
		}
		if (isNaN($("#consolidatedTransfer").val())){
			ret.push("Please enter a number for your transfer fee");
			errorFill("consolidatedTransfer");
		}
		if ($("#consolidatedTime").val() == ""){
			ret.push("Please enter a value for the promotional period");
			errorFill("consolidatedTime");
		}
		if (isNaN($("#consolidatedTime").val())){
			ret.push("Please enter a number for the promotional period");
			errorFill("consolidatedTime");
		}
		if ($("#consolidatedRate").val() == ""){
			ret.push("Please enter what the rate for your consolidated debt is");
			errorFill("consolidatedRate");
		}
		if (isNaN($("#consolidatedRate").val())){
			ret.push("Please enter a numeric value for your consolidated debt fee");
			errorFill("consolidatedRate");
		}
		
		}
	
	//if (lio == "1"){
	//	ret.push("Please select what low interest option you plan to use");
	//}
	
	if (ret.length>0){
		var errorStart = "<div class=\"alert alert-danger\" role=\"alert\"><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span><span class=\"sr-only\">Error:</span>";
		var errorEnd = "</div>";
		
		for(i = 0;i<ret.length;i++){
			a = a + errorStart + ret[i]  + errorEnd;
		}
		
		return a;
	
	}
	else{
		return false;
	}
}

var getSteps = function(name,rate,balance,savings,savingsrate,monthly,Homeprice,time,downpayment,income,lio){
	//Set up values
	for(i = 0;i<3;i++){
		rate[i] = parseFloat(rate[i]);
		balance[i] = parseFloat(balance[i]);
		}
	savings = parseFloat(savings);
	savingsrate = parseFloat(savingsrate);
	var monthlyRate = 1+savingsrate/(100*12);
	monthly = parseFloat(monthly);
	Homeprice = parseFloat(Homeprice);
	time = parseInt(time);
	downpayment = parseFloat(downpayment);
	income = parseFloat(income);
	if (downpayment == 100){
		downpayment = parseFloat($("#downpayment-custom").val());
		}
	
	
	
	var mtgAPR = 5;
	var numPayments = time*12;

	
	//Saved values
	var warnings = [];
	var steps = [];
	
	//Check monthly payment for the mortgage
	monthlyPayment = pmt(mtgAPR,numPayments,Homeprice*(1-downpayment)).toFixed(2);
	
	//Check if customer is within desired 20% ratio for Home loan
	var mtgvincome = income*0.28 > monthlyPayment;
	if (!mtgvincome){
		warnings.push("Your monthly mortgage payment will be above 28% of your income. Banks may look at this in a negative way. Consider buying a cheaper Home, or getting a higher paying job."									);
	}
	
	if (savingsrate >= 4){
		warnings.push("You are getting a high return on your savings. Consider moving it to a safer option (Savings account, Government bonds) to ensure minimal chance of loss.");
	}
	
	//Order lenders in terms of interest rate
	var name2 = [];
	var rate2 = [];
	var balance2 = [];
	
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
				rate2.push(parseInt(rate[j]));
				balance2.push(parseInt(balance[j]));
			}
		}
	}
	name = name2;
	rate = rate2;
	balance = balance2;
	
	//Move debt to one place	
	var consolidatedBalance = [];
	var consolidatedRate = [];
	var consolidatedName = [];
	var consolidatedTime = [];
	var consolidatedPayoffTime = [];
	var consolidatedIndex = -1;
	//Customer doesn't want to transfer debt
	if (lio == 1){
		steps.push("User chooses to keep debt in current position");
		consolidatedBalance = balance;
		consolidatedName = name;
		consolidatedRate = rate;
		consolildatedTime = [999,999,999];
		consolidatedPayoffTime = [timePayoff(monthly,rate[0],balance[0]),timePayoff(monthly,rate[1],balance[1]),timePayoff(monthly,rate[2],balance[2])];
			
	}
	
	//Customer transfers debt to low interest option
	else{
		var cBank;
		var cRate;
		var cTime;
		var cTransfer;
		if (lio == 2 ){
			cBank = "Chase Slate";
			cRate = 0;
			cTime = 15;
			cTransfer = 3;
		}
		if (lio == 3 ){
			cBank = "Discover It";
			cRate = 0;
			cTime = 18;
			cTransfer = 3;
		}
		if (lio == 4 ){
			cBank = "TD Bank Cash Rewards";
			cRate = 13.62;
			cTime = 24;
			cTransfer = 0;
		}
		if (lio == 5){
			cBank = $("#consolidatedLender").val();
			cRate = $("#consolidatedRate").val();
			cTime = $("#consolidatedTime").val();
			cTransfer = $("#consolidatedTransfer").val();
		}
			
		//Take life savings to pay off debt if it makes sense
		for (i=0;i<3;i++){
			if (savings == 0){
				break;
			}
			else if (lio == 1 || cRate > savingsrate && rate[i]>cRate){	
				var m = Math.min(savings,balance[i]);
				savings = savings - m;
				balance[i] = balance[i] - m;
				steps.push("Take $" + m + " out of your savings and use it to pay " + name[i] + ". Money left in savings: $" + savings.toFixed(2));		
			}
		}	
	
		for (i = 0;i<3;i++){
			//Favourable to transfer debt to low interest option
			if (rate[i] > cRate && balance[i] != 0){
				
				var switching = (1+cTransfer/100);
				var afterDebt = switching*balance[i];
				//First time coming through
				if (consolidatedIndex == -1){
					consolidatedName.push(cBank);
					consolidatedRate.push(cRate);
					consolidatedBalance.push(afterDebt);
					consolidatedTime.push(cTime);
					consolidatedIndex = consolidatedBalance.length-1
				}
				//Not first time coming through
				else{
					consolidatedBalance[consolidatedIndex] = consolidatedBalance[consolidatedIndex] + afterDebt;
				}
				steps.push("Transfer your debt at " + name[i] + " to " + cBank + ". Money in " + cBank + ": $" + consolidatedBalance[consolidatedIndex].toFixed(2));
				
			}
			
			//Unfavourable to transfer debt to low interest option
			else if(rate[i] <= cRate && balance[i] != 0){
				consolidatedName.push(name[i]);
				consolidatedBalance.push(balance[i]);
				consolidatedRate.push(rate[i]);
				consolidatedTime.push(999);
				steps.push("Keep your debt in in " + name[i] + " and do not transfer it. Money owed to " + name[i] + ": $" + balance[i].toFixed(2));
			}
		}
		
		//Sort the debt in order of interest rate
		name2 = [];
		rate2 = [];
		balance2 = [];
		time2 = [];
		
	
		for (place = 0; place<consolidatedName.length;place++){
			for (j = 0;j<consolidatedName.length;j++){
				counter = 0;
				for (k = 0;k<consolidatedName.length;k++){
					if (rate[j] < rate[k]){
						counter +=1;
					}
				}
				if (counter == place){
					name2.push(consolidatedName[j]);
					rate2.push(parseInt(consolidatedRate[j]));
					balance2.push(parseInt(consolidatedBalance[j]));
					time2.push(parseInt(consolidatedTime[j]));
					consolidatedPayoffTime.push(timePayoff(monthly,consolidatedRate[j],consolidatedBalance[j]));
				}
			}
		}
		consolidatedBalance = balance2;
		consolidatedName = name2;
		consolidatedRate = rate2;
		consolidatedTime = time2;
		
	}
	
	//Pay off the rest of the debt
	var month = 0;
	
	while (true){
		month+=1;
		money = monthly;
		
		//Calculate interest
		savings = savings * monthlyRate;	
		for (i = 0;i<consolidatedBalance.length;i++){
			if (consolidatedBalance[i] > 0){
				consolidatedBalance[i] = (consolidatedBalance[i] * (1+consolidatedRate[i]/(100*12)));
				consolidatedTime[i] -= 1;
				consolidatedPayoffTime[i] = timePayoff(monthly,consolidatedRate[i],consolidatedBalance[i]);
			}
		}
		
		//Find if need to pay quickest due loan
		var minTime = 999999999999999999;
		var minPointer = 999999999999999;
		for (i = 0;i<consolidatedBalance.length;i++){
			//Has balance, better than previous result
			if (consolidatedBalance[i] > 0 && consolidatedTime[i]<minTime){
				minPointer = i;
				minTime = consolidatedTime[i];
				}
			
		}
		
		//Pay of quickest due loan
		if (minPointer != 999999999999999 && savings<consolidatedBalance[minPointer] && consolidatedPayoffTime[i] > consolidatedTime[i]){
			console.log("payOffTime: " + consolidatedPayoffTime[minPointer] + " balance: " + consolidatedBalance[minPointer] + " consolidTime: " + consolidatedTime[minPointer]);
			var p = Math.min(money,consolidatedBalance[minPointer]);
			consolidatedBalance[minPointer] = consolidatedBalance[minPointer] - p;
			money -= p;
			steps.push("Month " + month+": Take $" + p + " from monthly savings to pay off " + consolidatedName[minPointer] + ". Money owed to " + consolidatedName[minPointer] + ": $" + consolidatedBalance[minPointer]);						
		}
		
		//Balance comes due
		console.log(consolidatedTime[minPointer]);
		if(minPointer != 999999999999999 && consolidatedTime[minPointer] <= 0){
			var p  = Math.min(savings,consolidatedBalance[minPointer]);
			savings = savings - p;
			consolidatedBalance[minPointer] = consolidatedBalance[minPointer] - p;
			steps.push("Month " + month +": Take $" + p + "from savings account to pay off "+consolidatedName[minPointer]+". Money owed to "+ consolidatedName[minPointer] + ": $"  + consolidatedBalance[minPointer]);		
		}
		
		//Said loan is paid off fully
		if (consolidatedBalance[minPointer] == 0){
			consolidatedPayoffTime[minPointer] = 0;
			consolidatedTime[minPointer] = 0;
		}
		
		//Balance is due but is not fully paid off
		if(consolidatedTime[minPointer] == 0 && consolidatedBalance[minPointer] != 0){
			warnings.push("Warning: You are unable to pay off your debt to " + consolidatedName[i] + " before the promotional period ends. You may be subject to high interest charges. Consider setting aside more money every month to pay off debt or selecting a lower payment or selecting a different bank to consolidate your debt.");
		}	
				
		//Pay off highest interest loan 
		if (money>0){
			for (i = 0;i<consolidatedBalance.length;i++){
				if (consolidatedRate[i] > savingsrate && consolidatedBalance[i] > 0){
					var p = Math.min(money,consolidatedBalance[i]);
					consolidatedBalance[i] = consolidatedBalance[i] - p;
					money -= p;
					steps.push("Month " + month+": Take $" + p + " from monthly savings to pay off " + consolidatedName[i] + ". Money owed to " + consolidatedName[i] + ": $" + consolidatedBalance[i]); 	
			
					}
				
				}
			}
		//put money in savings
		if (money > 0){
			savings = savings + money;
			steps.push("Month "+ month + ": Take $" + money + " and deposit into savings for downpayment for Home. Total savings for downpayment: $" + savings.toFixed(2));
			money = 0;
			}
			
		
		//Savings is full
		if (savings > Homeprice*(downpayment/100)){
			//Pay off all credit card debt
			for (i = 0;i<consolidatedBalance.length;i++){
				if (consolidatedBalance[i] > 0){
					var p = Math.min(savings,consolidatedBalance[i]);
					consolidatedBalance[i] -= p;
					savings -= p;					
					
					steps.push("Month " + month +": Take $" + p + "from savings account to pay off "+consolidatedName[i]+". Money owed to "+ consolidatedName[i] + ": $"  + consolidatedBalance[i]);				
					subtracted = true;
				}
			}
			
			
		
			
		}
		
		//If savings still full, stop loop
		if (savings > Homeprice*(downpayment/100)){
			break;
		}
		
		
	}	 
	var waiting = 0;
	while (savings < Homeprice*(downpayment/100)){
		month+=1;
		savings = (savings * monthlyRate);
		savings = (savings + monthly).toFixed(2);
		steps.push("Month "+ month + ": Take $" + monthly + " and deposit into savings for downpayment for Home. Total savings for downpayment: $" + savings);
	}
		
	if (month/12>2){
		warnings.push("Your current situation will result in you taking " + month + " months to obtain neccessary downpamynet for your Home. Consider saving more money every month or using a lower downpayment option");
	
	}
	var steps2 = "";
	var warnings2 = "";
	for (i = 0;i<steps.length;i++){
		steps2 = steps2 + steps[i] + "<br>";
		}
	for (i = 0;i<warnings.length;i++){
		warnings2 = warnings2 + warnings[i] + "<br>";
		}
	
return [steps2,warnings2];
}

var pmt = function(r,n,p){
	var compound = 12;
	r = r/100;
	MPR = Math.pow((1+r/compound),(compound/12))-1;
	a = p*MPR*Math.pow((1+MPR),n);
	b = Math.pow((1+MPR),n)-1;
	return (a/b);
}


var errorFill = function(formName){
	$("#"+formName).addClass("form-fill-error");
	}

var timePayoff = function(c,r,p){
	if ( r == 0){
		return p/c;
		}
	
	r = r/(100*12);
	return ((Math.log(c)-Math.log(c-r*p))/Math.log(1+r));
	}

var clearErrors = function(){
   	$(".form-errors").html("");
	
	for (i = 0;i<3;i++){
		$("input").removeClass("form-fill-error");
		}
	}