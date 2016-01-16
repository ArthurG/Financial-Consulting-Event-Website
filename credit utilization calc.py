##Debt name, APR, $$, credit limit
custLenders = [["Bank1",19.99,2000,3000],["Bank2",29.5,3000,4000],["Bank3",29.99,9000,10000]]
custLenders2 = []
steps = []
totalLimit = 0
totalBorrowed = 0

#Calculate total borrowed and total credit limit
for i in range (0, len(custLenders)):
    totalBorrowed+=custLenders[i][2]
    totalLimit+=custLenders[i][3]

#Organise lenders in terms of interest rate
for place in range(len(custLenders)):
    for j in range(len(custLenders)):
        counter = 0
        for k in range (len(custLenders)):
            if custLenders[j][1] < custLenders[k][1]:
                counter+=1
        if counter == place:
            custLenders2.append(custLenders[j])

#calculate desired payoff amount
desiredRatio = totalLimit * 0.1
payOff = max(totalBorrowed - desiredRatio, 0)
debtPointer = 0

#Payoff borrowed debt
while payOff > 0:
    pay = min(custLenders2[debtPointer][2],payOff)
    steps.append("Pay off $"+str(pay) + " from " + custLenders2[debtPointer][0])
    payOff-=pay
    debtPointer+=1

print("*******STEPS*******")
for step in steps:
    print(step)
