var events = require('events');

//define account
Account.prototype = events.EventEmitter.prototype;
function Account() {
	this.balance = 0;
	events.EventEmitter.call(this);
	
	this.deposit = function(amount) {
		this.balance += amount;
		this.emit('balanceChanged');
	};
	
	this.withdraw = function(amount) {
		this.balance -= amount;
		this.emit('balanceChanged');
	};
}

//handlers
function displayBalance() {
	console.log('Balance is : $%d', this.balance);
}

function checkOverdraw() {
	if(this.balance < 0) {
		console.log('Account Overdrawn');	
	}
}

//handlers that are accepting parameters
function checkGoal(acc, goal) {
	if(acc.balance > goal) {
		console.log('Goal aachieved!!!');	
	}
}

//implement account
var account = new Account();
account.on("balanceChanged", displayBalance);
account.on("balanceChanged", checkOverdraw);
account.on("balanceChanged", function() {
	checkGoal(this, 100);
});

//usage
account.deposit(200);
account.deposit(300);
account.deposit(500);
account.withdraw(1500);