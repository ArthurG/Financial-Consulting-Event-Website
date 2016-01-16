import math
def pmt(r, n, P):
    r = r/100
    MPR = ((1+r/compound)**(compound/12))-1
    a = P*MPR*(1+MPR)**n
    b = (1+MPR)**n-1
    return (a/b)

def timePayoff(c,r,p):
    r = r/100/12
    return (math.log10(c)-math.log10(c-r*p))/math.log10(1+r)

print(timePayoff(836.03,4.5,165000))

#print("Note: For all inputs, assume 'you' refers to you as well as your spouse")

##debt = int(input("How much do you owe in debt? "))
##debtRate = int(input("Annual interest (%) on your debt? "))
##savings = int(input("How much do you have put away as a downpayment for your home?"))
##savingsRate = int(input("What is the interest rate (or annual return rate) earn from your savings? "))
##monthly = int(input("How much money can you put away every month to use to pay off debt and create downpayment for your home?"))
##homeprice = int(input("What is the maximum price of a home you plan to purchase?"))
##time = int(input("How long will it take you to pay off your mortgage? "))
##income = int(input("What is your gross monthly (after tax) income?"))
##debt = int(input("Which low interest option do you prefer? "))


steps = []
warnings = []

##CUSTOMER INFO
##Debt name, APR, $$
debt = [["CC1", 3,2000],["CC2",2,2000],["cc333",26,2000]]
debt2 = []
savings = 200
savingsRate = 6
monthly = 1500
homeprice = 100000
time = 30
income = 20000
#bank name, APR, timeline, switching fee
lowInterestLoans = [["BMO", 5, 12, 3],["CITI",5,6, 3],["Don't transfer"]]
debtSelection = 2

#Assumed values
mtgAPR = 5
compound = 12
downPayment = 0.2
numPayments = time*12
#bank name, APR, total debt
consolidatedDebt = []
consolidatedIndex = -1
consolidatedDebt2 = []


#counters
months = 0

##Find the monthly payment for the mortgage
monthlyPayment = (pmt(mtgAPR,numPayments,homeprice*(1-downPayment)))

##Check if customer is within the desired 28% ratio for home loan
MtgvIncome = income * 0.28 > monthlyPayment
if (not MtgvIncome):
    warnings.append("Your monthly mortgage payment will be above 28% of your income. Banks may look at this in a negative way. Consider buying a cheaper home, or getting a higher paying job.")

#Check if savings contains too much risk
if savingsRate >= 4:
    warnings.append("You are getting a high return on your savings. Consider moving it to a safer option to ensure minimal chance of loss.")
    
#Check if monthly savings is too low
##if savings*lowInterestLoans[debtSelection][1] < debt:
##    warnings.append("Your monthly saving will not allow you to fully pay off your credit card debt within the promotional rate period. Consider saving more money every month or picking another debt repayment option")


#For loop to put in correct order of interest rates
cd = len(debt)
for place in  range (cd): 
    count = 0       
    for i in range (cd):
        pointer = 0
        for j in range (cd):
            if debt[i][1] < debt[j][1]:
                pointer+=1
        if pointer == place:
            debt2.append(debt[i])
            break
debt = debt2

#Take life savings and use it to pay off debt
for i in range (len(debt)):
    if savings == 0:
        break
    elif (savings!=0):
        m = min(savings,debt[i][2])
        savings -= m
        debt[i][2] -=  m
        steps.append("Take $" + str(m) + " out of your savings and use it to pay " + str(debt[i][0]) + ". Money left in savings: " + str(savings))
    else:
        break

##Customer doesn't want to transfer debt
if debtSelection == len(lowInterestLoans)-1:
    consolidatedDebt = debt
    steps.append("User chooses to keep debt in current position")

#Transfer debt to the low interest option
else:
    for i in range(0,  len(debt)):
        #favourable to transfer debt to low interest option
        if debt[i][1]>lowInterestLoans[debtSelection][1] and debt[i][2]!=0:
            switching = (1+lowInterestLoans[debtSelection][2]/100)
            afterDebt = switching*debt[i][2]
            #First time coming through            
            if consolidatedIndex == -1:
                consolidatedDebt.append([lowInterestLoans[debtSelection][0],lowInterestLoans[debtSelection][1],afterDebt])
                consolidatedIndex = len(consolidatedDebt)-1
            else:
                consolidatedDebt[consolidatedIndex][2] = consolidatedDebt[consolidatedIndex][2] + afterDebt
            steps.append("Transfer your debt at "+ debt[i][0] +" to " + lowInterestLoans[debtSelection][0] + " to minimize interest. Money owed to " + consolidatedDebt[consolidatedIndex][0] + ": " + str(consolidatedDebt[consolidatedIndex][2]))
            
        
            
        #unfavourable to transfer debt to  low interest option
        elif debt[i][1]<lowInterestLoans[debtSelection][1]:
            consolidatedDebt.append(debt[i])
            steps.append("Keep your debt in  "+ debt[i][0] + " and do not transfer it. Money owed to " + debt[i][0] + ": " + str(debt[i][2]))

            

#Pay off the rest of the debt
month = 0
while True:
    month +=1
    money = monthly
    for i in range (len(consolidatedDebt)):
        if (consolidatedDebt[i][2])!=0:
            consolidatedDebt[i][2] = consolidatedDebt[i][2] * (1+consolidatedDebt[i][1]/100/12)
            if money == 0:
                continue
            p = min(money, consolidatedDebt[i][2])
            consolidatedDebt[i][2] -= p
            money -= p
            steps.append("Month "+ str(month)+ ": Take $" + str(p) + " from monthly savings to pay off " + str(consolidatedDebt[i][0]) + ". Money owed to " + str(consolidatedDebt[i][0]) + ": " + str(consolidatedDebt[i][2]))
    if money>0:
        savings += money
        steps.append("Month "+ str(month) + ": Take $" + str(money) + " and deposit into savings for downpayment for home. Total savings for downpayment: " + str(savings))
        break

#Save money for downpayment for home
waiting = 0
while savings<homeprice*downPayment:
    month+=1
    savings += monthly
    savings = savings*(1+savingsRate/100/12)
    steps.append("Month "+ str(month) + ": Take $" + str(money) + " and deposit into savings for downpayment for home. Total savings for downpayment: " + str(savings))

if (month//12>2):
    warnings.append("Your current situation will result in you taking " + str(month//12) + " to save enough money for the downpayment for your home. Consider raising the amount of money you save per month or buying a cheaper home." )
    
print("Warnings ")
for i in range (0, len(warnings)):
    print (str(i+1)+  ". " + warnings[i])
print("Steps you need to take")
for i in range (0, len(steps)):
    print (str(i+1)+  ". " + steps[i])
    

