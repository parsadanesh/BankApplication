import chalk from "chalk";
export default class BankAccount {

    
    // Properties
    #balance;
    #transactions = [];
    overdraft = false;
    overdraftLimit;

    // Constructor
    constructor(initialBalance = 0) {
        this.#balance = initialBalance;
    };


    // Private Functions

    // This function is used when no date is provided for a transaction to add todays date
    #reformatDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB');
        return formattedDate;
    }

    // Checks the date is in the correct format
    #checkDateFormat = (date) => {
        const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
        if (dateFormat.test(date)) {
            return true;
        } else {
            console.log("Incorrect Format\n");
            return false;
        }
    }

    // Add the transaction to the array
    #addTransaction = (date, type, amount) => {
        let newBal;
        let transaction;
        if (type === "credit") {
            newBal = this.#balance + amount;
            transaction = [date, type, amount, newBal];
            this.#transactions.push(transaction);
        } else if (type === "debit") {
            newBal = this.#balance - amount;
            transaction = [date, type, amount, newBal];
            this.#transactions.push(transaction);
        } else {
            console.log("Transaction Failed\n");
        }
        
    };

    // Checks the value for withdraw and deposit is a number that is larger than 0
    #checkValidInput = (number) => {
        if ((number > 0 ) && Number.isInteger(number)) {
            return true;
        } else {
            console.log("Amount is invalid\n");
            return false;
        }
    }

    // Checks there is enough money in the balance for the withdrawal
    #isWithdrawalValid = (amount) => {
        if (this.overdraft) {
            return amount <= (this.#balance + this.overdraftLimit);
        } else if (!this.overdraft) {
            return amount <= this.#balance;
        }


    };

    // Checks transaction used to print the correct format
    #checkTransactionType = (arrElement) => {
        // if deposit then true
        if (arrElement.includes("credit")) {
            return true;
        } else if (arrElement.includes("debit")) {
            return false;
        }
       }
   
    // Public Functions

    // Getter for transaction array
    getTransactions = () => {
        return this.#transactions;
    };

    // Getter for the balance
    getBalance = () => { return this.#balance; };

    // Deposits the amount, updates the balance and stores the transaction history
    depositFunds = (deposit, date = this.#reformatDate()) => {
        console.log(`Trying to deposit: £${deposit}`);
        if (this.#checkValidInput(deposit) && this.#checkDateFormat(date) && this.#checkDateFormat(date)) {
            this.#addTransaction(date, "credit", deposit);
            this.#balance += deposit;
            console.log("DEPOSIT SUCCESSFUL\n");
        } else {
            console.log("DEPOSIT UNSUCCESSFUL\n");
        }
    };

    // Used to set the overdraft status of an account
    setOverdraft = (status) => {
        this.overdraft = status;

    }

    // Used to set the overdraft limit of an account
    setOverdraftLimit = (limit) => {
        if (this.overdraft) {
            this.overdraftLimit = limit;
        }
    }

   // Prints the transactions as a statement in the predefined format
    printStatement = (statements = this.#transactions) => {
        console.log("PRINTING STATEMENT:");
        console.log("date".padEnd(10), "||", "credit".padEnd(5), "||", "debit".padEnd(5), "||", "balance".padEnd(5));
        statements.forEach(transaction => {
            // Check if transaction was a withdrawal or deposit and prints in the appropriate format
            // checks for the transaction type and if the balance after the transaction was positive or negative to print out the transaction is a colour associated format 
            if (this.#checkTransactionType(transaction) && transaction[3] >= 0) {
                console.log(String(transaction[0]).padEnd(1), "||", chalk.green(String(transaction[2]).padEnd(6)), "||".padEnd(8),  "||", chalk.green(String(transaction[3])));
            } else if (this.#checkTransactionType(transaction) && transaction[3] < 0) { // checks if transactions is a deposit and if its associated balance is negative
                console.log(String(transaction[0]).padEnd(1), "||", chalk.green(String(transaction[2]).padEnd(6)), "||".padEnd(8),  "||", chalk.red(String(transaction[3])));
            } else if ((this.#checkTransactionType(transaction) === false) && transaction[3] >= 0) {
                console.log(String(transaction[0]).padEnd(1), "||".padEnd(9), "||", chalk.red(String(transaction[2]).padEnd(5)),  "||", chalk.green(String(transaction[3])));
            } else if (this.#checkTransactionType(transaction) === false && transaction[3] < 0) {
                console.log(String(transaction[0]).padEnd(1), "||".padEnd(9), "||", chalk.red(String(transaction[2]).padEnd(5)),  "||", chalk.red(String(transaction[3])));
                
            }
        });
        console.log("");
    };

    // Makes withdraw by updating balance and storing transaction history
    withdrawFunds = (amount, date = this.#reformatDate()) => {
        console.log(`Trying to withdraw: £${amount}`);
        if (this.#checkValidInput(amount) && this.#isWithdrawalValid(amount) && this.#checkDateFormat(date)) {
            this.#addTransaction(date, "debit", amount);
            this.#balance -= amount;
            console.log(`SUCCESSFUL WITHDRAWAL\n`);
        } else if (!this.#isWithdrawalValid(amount)) {
        console.log(`INSUFFICIENT FUNDS TO WITHDRAW: £${amount}\n`);
        } else {
            console.log(`UNSUCCESSFUL WITHDRAWAL\n`);
        }
        
    }

}