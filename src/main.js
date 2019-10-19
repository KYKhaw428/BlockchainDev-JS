const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('422a19a30cbbe701ca40ec11c8ce41108155bf198b0c434c785abf6d1d6c946e')
const myWalletAddress = myKey.getPublic('hex');


let kyCoins = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
kyCoins.addTransaction(tx1);

console.log('\nStarting the miner...');
kyCoins.minePendingTransactions(myWalletAddress);

console.log('\nBalance of ky is', kyCoins.getBalanceOfAddress(myWalletAddress));

// kyCoins.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', kyCoins.isChainValid());

