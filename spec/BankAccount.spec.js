import chalk, { Chalk } from "chalk";
import BankAccount from "../src/BankAccount.js";

describe("User Story 1:", () => { 

    
    it("should add the deposited amount to the account balance", () => {
        // Arrange
        const testAccount = new BankAccount();
        const expected = testAccount.getBalance() + 100;
        // Act
        testAccount.depositFunds(100);
        // Assert
        expect(testAccount.getBalance()).toBe(expected);    
    });

    it("Should not add a negative number to the deposit", () => {
        // Arrange
        const testAccount = new BankAccount();
        const expected = testAccount.getBalance();
        // Act
        testAccount.depositFunds(-100);
        // Assert
        expect(testAccount.getBalance()).toBe(expected);
    });

    it("Should add all funds to the balance", () => {
        // Arrange
        const testAccount = new BankAccount();
        const expected = testAccount.getBalance() + 500;
        // Act
        testAccount.depositFunds(100);
        testAccount.depositFunds(250);
        testAccount.depositFunds(150);
        
        // Assert
        expect(testAccount.getBalance()).toBe(expected);
    });

    it("Should not allow deposit of 0", () => {
        // Arrange
        const testAccount = new BankAccount();
        const expected = testAccount.getBalance();
        // Act
        testAccount.depositFunds(0);
        // Assert
        expect(testAccount.getBalance()).toBe(expected);
    })

});

describe("User Story 2:", () => { 

    
    it("should remove the amount withdrawn from the account balance", () => {
        // Arrange
        const testAccount = new BankAccount(1000);
        
        const expected = testAccount.getBalance() - 100;
        // Act
        testAccount.withdrawFunds(100);
        // Assert
        expect(testAccount.getBalance()).toBe(expected);    
    });

    it("Should not withdraw a negative number", () => {
        // Arrange
        const testAccount = new BankAccount();
        const expected = testAccount.getBalance();
        // Act
        testAccount.withdrawFunds(-100);
        // Assert
        expect(testAccount.getBalance()).toBe(expected);
    });

    it("Should allow multiple withdraws that are within than account balance and update the balance accordingly", () => {
        // Arrange
        const testAccount = new BankAccount(1000);
        const expected = 0;
        // Act
        testAccount.withdrawFunds(500);
        testAccount.withdrawFunds(200);
        testAccount.withdrawFunds(300);

        // Assert
        expect(testAccount.getBalance()).toBe(expected);
    });

    it("Should give an error message if any value less than 1 is entered", () => {
        // Arrange
        const testAccount = new BankAccount(1000);
        const expected = testAccount.getBalance();
        // Act
        testAccount.withdrawFunds(0);
        // Assert
        expect(testAccount.getBalance()).toBe(expected);
    });


});

describe("User Story 3:", () => { 

    it("Should not allow an withdrawal bigger than the balance, check the balance stays the same", () => {
        // Arrange
        const testAccount = new BankAccount(1000);
        const expected = 1000;
        // Act
        testAccount.withdrawFunds(1200);
        
        // Assert
        expect(testAccount.getBalance()).toBe(expected);
    });

});

describe("User Story 4:", () => { 
    it("Should increase transaction array size after a successful withdrawal", () => { 
        // Arrange
        const testAccount = new BankAccount(1000);
        const expected = testAccount.getTransactions().length + 1;
        
        // Act
        testAccount.withdrawFunds(100, "01/01/2024");
        const actual = testAccount.getTransactions().length;
        // Assert
        expect(actual).toBe(expected);

    });

    it("Should add the correct transaction to array a successful withdrawal", () => { 
        // Arrange
        const testAccount = new BankAccount(1000);
        const expected = ["01/01/2024", "debit", 100, 900];
        
        // Act
        testAccount.withdrawFunds(100, "01/01/2024");
        const actual = testAccount.getTransactions();
        // Assert
        expect(actual).toContain(expected);

    });

    it("Should increase transaction array size after a successful deposit", () => { 
        // Arrange
        const testAccount = new BankAccount();
        const expected = testAccount.getTransactions().length + 1;
        
        // Act
        testAccount.depositFunds(1000, "01/01/2024");
        const actual = testAccount.getTransactions().length;
        // Assert
        expect(actual).toBe(expected);

    });

    it("Should add the correct transaction to array a successful deposit", () => { 
        // Arrange
        const testAccount = new BankAccount();
        const expected = ["01/01/2024", "credit", 1000, 1000];
        
        // Act
        testAccount.depositFunds(1000, "01/01/2024");
        const actual = testAccount.getTransactions();
        // Assert
        expect(actual).toContain(expected);

    });

    it("Should not increase transaction array size when a invalid withdrawal is made", () => { 
        // Arrange
        const testAccount = new BankAccount(500);
        const expected = testAccount.getTransactions().length;
        
        // Act
        testAccount.withdrawFunds(1000, "01/01/2024");
        const actual = testAccount.getTransactions().length;
        // Assert
        expect(expected).toBe(actual);
    });

    it("Should not increase transaction array size when a invalid withdrawal is made", () => { 
        // Arrange
        const testAccount = new BankAccount(500);
        const expected = testAccount.getTransactions().length;
        
        // Act
        testAccount.withdrawFunds(0, "01/01/2024");
        const actual = testAccount.getTransactions().length;
        // Assert
        expect(expected).toBe(actual);
    });


    it("Should not increase transaction array size when a invalid deposit is made", () => { 
        // Arrange
        const testAccount = new BankAccount();
        const expected = testAccount.getTransactions().length;
        
        // Act
        testAccount.depositFunds(-500, "01/01/2024");
        const actual = testAccount.getTransactions().length;
        // Assert
        expect(actual).toBe(expected);
    });

});


describe("User Story 5:", () => { 

    it("Should print just the header when print statement is used without any transactions", () => { 
        // Arrange
        const testAccount = new BankAccount(1000);
        spyOn(console, 'log').and.callThrough();
        let actual;
        const expected = ["date       || credit || debit || balance",];
        
        // Act
        testAccount.printStatement();
        var logCalls = console.log.calls.all();
        const output = logCalls.map(call => call.args.map(arg => arg.toString()).join(' '));
        // checks if line was printed
        for (let i = 0; i < output.length; i++){
            if (output[i] == expected) {
                actual = true; 
            }
        }

        
        // Assert
        expect(actual).toBe(true);

    });


    it("Should make some a valid withdrawal then print the statement correctly", () => { 
        // Arrange
        const testAccount = new BankAccount(1000);
        spyOn(console, 'log').and.callThrough();
        const expected = 2
        let actual = 0;

        // had to refactor for the coloured text
        var testStatement = [
            "date       || credit || debit || balance",
            '02/01/2024 ||        || \x1B[31m500  \x1B[39m || \x1B[32m500\x1B[39m',
        ];
        
        // Act
        testAccount.withdrawFunds(500, "02/01/2024");
        testAccount.printStatement();
        var logCalls = console.log.calls.all();
        const output = logCalls.map(call => call.args.map(arg => arg.toString()).join(' '));

        // Counts the number of expected lines found
        for (let i = 0; i < output.length; i++){
            if (output[i] == testStatement[0]) {
                actual = actual + 1;
            }

            if (output[i] == testStatement[1]) {
                actual = actual + 1;
            }
        }
        
        // Assert
        expect(actual).toBe(expected);

    });

    it("Should make some a valid deposit check print the statement check it is shown correctly", () => { 
        // Arrange
        const testAccount = new BankAccount(500);
        spyOn(console, 'log').and.callThrough();
        let actual = 0;
        let expected = 2;

        // had to refactor for the coloured text
        var testStatement = [
            "date       || credit || debit || balance",
             '02/01/2024 || \x1B[32m500   \x1B[39m ||       || \x1B[32m1000\x1B[39m',
        ];
        
        // Act
        testAccount.depositFunds(500, "02/01/2024");
        testAccount.printStatement();
        var logCalls = console.log.calls.all();
        const output = logCalls.map(call => call.args.map(arg => arg.toString()).join(' '));

        for (let i = 0; i < output.length; i++){
            if (output[i] == testStatement[0]) {
                actual = actual + 1;
            }

            if (output[i] == testStatement[1]) {
                actual = actual + 1;
            }
        }
        
        // Assert
        expect(actual).toBe(expected);

    });

    it("Should print the transaction in the correct format", () => {
        // Arrange
        const testAccount = new BankAccount();
        spyOn(console, 'log').and.callThrough();
        var expected = [
            "date       || credit || debit || balance",
            '09/01/2024 || \x1B[32m1000  \x1B[39m ||       || \x1B[32m1000\x1B[39m',
            '10/01/2024 ||        || \x1B[31m500  \x1B[39m || \x1B[32m500\x1B[39m',
            '11/01/2024 ||        || \x1B[31m200  \x1B[39m || \x1B[32m300\x1B[39m',
            '12/01/2024 ||        || \x1B[31m300  \x1B[39m || \x1B[32m0\x1B[39m',
        ];

     
        // Act
        testAccount.depositFunds(1000, "09/01/2024");
        testAccount.withdrawFunds(500, "10/01/2024");
        testAccount.withdrawFunds(200, "11/01/2024");
        testAccount.withdrawFunds(300, "12/01/2024");
        
        testAccount.printStatement();
        var logCalls = console.log.calls.all();
        const output = logCalls.map(call => call.args.map(arg => arg.toString()).join(' '));
        // Assert
        // Checks from when statement is printed
        for (var i = 9; i < output.length-1; i++){
            expect(output[i]).toBe(expected[i-9])
        }
        
    });
});


describe("User Story 6:", () => { 

    it("Should return true for overdraft status after over draft is set up", () => { 
        // Arrange
        const testAccount = new BankAccount(100);
        const expected = true
        
        // Act
        testAccount.setOverdraft(true);
        const actual = testAccount.overdraft;
        
        // Assert
        expect(expected).toBe(actual);

    });


    it("Should set the overdraft limit to the agreed number", () => { 
        // Arrange
        const testAccount = new BankAccount(100);
        const expected = 300
        
        // Act
        testAccount.setOverdraft(true);
        testAccount.setOverdraftLimit(300);
        const actual = testAccount.overdraftLimit;
        // Assert
        expect(actual).toEqual(expected);

    });

    it("Should increase transaction array with a withdrawal that goes into the overdraft", () => { 
        // Arrange
        const testAccount = new BankAccount(100);
        const expected =  testAccount.getTransactions().length + 1//should allow up to 300 withdrawal
        
        // Act
        testAccount.setOverdraft(true);
        testAccount.setOverdraftLimit(200)  
        testAccount.withdrawFunds(250, "02/01/2024");
        const actual = testAccount.getTransactions().length;
        
        // Assert
        expect(actual).toEqual(expected);

    });

    it("Should change the balance and show the new negative value", () => { 
        // Arrange
        const testAccount = new BankAccount(100);
        const expected = -100 //should allow up to 300 withdrawal
        
        // Act
        testAccount.setOverdraft(true);
        testAccount.setOverdraftLimit(300)
        testAccount.withdrawFunds(200, "02/01/2024");
        const actual = testAccount.getBalance();
        
        // Assert
        expect(actual).toEqual(expected);

    });
    
    it("Should not change balance when trying to withdraw more money than the overdraft is set to", () => {
        // Arrange
        const testAccount = new BankAccount(100);
        const expected = testAccount.getBalance();
        // Act
        testAccount.setOverdraft(100)
        testAccount.withdrawFunds(300, "02/01/2024");
        const actual = testAccount.getBalance();
        
        // Assert
        expect(actual).toEqual(expected);
    });

    it("Should not add transaction to array if the withdrawal amount was more money than the overdraft is set to", () => {
        // Arrange
        const testAccount = new BankAccount(100);
        const expected = testAccount.getTransactions();
        // Act
        testAccount.setOverdraft(true);
        testAccount.setOverdraftLimit(200)
        testAccount.withdrawFunds(300, "02/01/2024");
        const actual = testAccount.getTransactions();
        
        // Assert
        expect(actual).toEqual(expected);
    });
});


describe("User Story 7:", () => {

    it("Should make a call to chalk.green when a deposit is made", () => {
        // Arrange
        const testAccount = new BankAccount(100);
        let isFiftyGreen = false;
        // Act
        // Check if Chalk.green was used in the output
        // AI WAS USED FOR THIS FUNCTION
        console.log = (...args) => {
            // Iterate through each argument of the console.log call
            args.forEach(arg => {
            // Check if the argument contains "50" and if it's printed in green
                if (arg.includes('50') && arg.includes('\x1b[32m')) {
                    isFiftyGreen = true;
                }
            });
        };

        testAccount.depositFunds(50);
        testAccount.printStatement();
        // Assert
        expect(isFiftyGreen).toBeTrue();

    });

    it("Should make a call to chalk.red when a deposit is made", () => {
        // Arrange
        const testAccount = new BankAccount(100);
        let isFiftyRed = false;

        // Act
        // Check if Chalk.red was used in the output
        // AI WAS USED FOR THIS FUNCTION
        console.log = (...args) => {
            // Check each argument for "50" and if it's printed in red
            args.forEach(arg => {
            if (arg.includes('50') && arg.includes('\x1b[31m')) {
                isFiftyRed = true;
            }});
        };
        testAccount.withdrawFunds(50);
        testAccount.printStatement();        
        // Assert
        expect(isFiftyRed).toBeTrue();
        

    });

});