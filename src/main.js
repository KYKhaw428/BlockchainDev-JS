const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('422a19a30cbbe701ca40ec11c8ce41108155bf198b0c434c785abf6d1d6c946e')

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const kyCoins = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'adress2', 100);
tx1.signTransaction(myKey);
kyCoins.addTransaction(tx1);

// Mine block
kyCoins.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
kyCoins.addTransaction(tx2);

// Mine block
kyCoins.minePendingTransactions(myWalletAddress);

console.log();
console.log('Balance of ky is $%s', kyCoins.getBalanceOfAddress(myWalletAddress));

// Uncomment this line if you want to test tampering with the chain
// kyCoins.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', kyCoins.isChainValid() ? 'Yes' : 'No');

