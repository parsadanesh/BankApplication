import BankAccount from "./BankAccount.js";

//? DEMONSTRATING THE ACCEPTANCE CRITERIA
const testAccount = new BankAccount;
testAccount.depositFunds(1000, "10-01-2012");
testAccount.depositFunds(2000, "13-01-2012");
testAccount.withdrawFunds(500, "14-01-2012");
testAccount.withdrawFunds(10, "15-01-2024");
testAccount.depositFunds(20, "16-01-2012");
const transactions = testAccount.getTransactions();
testAccount.printStatement(transactions);

//? DEMONSTRATING CREATING AN ACCOUNT WITH A £1000
const testAccount2 = new BankAccount(1000);
console.log(testAccount2.getBalance());

//? DEMONSTRATING ADDING A DEPOSIT AND PRINTING STATEMENT
const testAccount3 = new BankAccount();
testAccount3.depositFunds(100);
testAccount3.printStatement();
testAccount3.depositFunds(300);
testAccount3.printStatement();

//? DEMONSTRATING MAKING WITHDRAWALS AND PRINTING STATEMENT
// create an account that has 500 balance
const testAccount4 = new BankAccount(500);
testAccount4.withdrawFunds(100);
testAccount4.printStatement();
testAccount4.withdrawFunds(200);
testAccount4.printStatement();

// Try withdraw more than in the balance
testAccount4.withdrawFunds(300);
testAccount4.printStatement();



//? DEMONSTRATING THE OVERDRAFT
const testAccount6 = new BankAccount();
// Setting up an overdraft for the account and the limit.
testAccount6.setOverdraft(true);
testAccount6.setOverdraftLimit(300);
// Add funds to the account
testAccount6.depositFunds(100, "13/01/2012");
// Take 200 which is within the limits
testAccount6.withdrawFunds(200, "14/01/2012");
// Accidentally try to withdraw more money than within the limit
testAccount6.withdrawFunds(300, "15/01/2012");
testAccount6.withdrawFunds(100, "15/01/2012");
// print statements
testAccount6.printStatement();