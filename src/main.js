const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('48f517bd06e3a2871820fef552409508aa010da50d4ffb2e918b47b44f284e2b')

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const kyCoins = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'adress1', 70);
tx1.signTransaction(myKey);
kyCoins.addTransaction(tx1);

// Mine block
kyCoins.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address2', 15);
tx2.signTransaction(myKey);
kyCoins.addTransaction(tx2);

// // Mine block
// kyCoins.minePendingTransactions(myWalletAddress);

// // Create third transaction
// const tx3 = new Transaction(myWalletAddress, 'address3', 10);
// tx3.signTransaction(myKey);
// kyCoins.addTransaction(tx3);

// To show block details
console.log(JSON.stringify(kyCoins, null, 4));

console.log();
console.log('Balance of KKY is $%s', kyCoins.getBalanceOfAddress(myWalletAddress));

// Uncomment this line if you want to test tampering with the chain
// kyCoins.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', kyCoins.isChainValid() ? 'Yes' : 'No');