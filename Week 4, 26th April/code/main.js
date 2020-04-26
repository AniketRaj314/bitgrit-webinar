const SHA256 = require('crypto-js/sha256.js')
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mine(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(this.hash);
    }
} 

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "23/04/2020", "Genesis", "0");
    }
    
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            if(this.chain[i].hash != this.chain[i].calculateHash()) {
                return false;
            }

            if(this.chain[i - 1].hash != this.chain[i].previousHash) {
                return false;
            }
        }
        return true;
    }
}

let coin = new Blockchain();
console.log("Mining First Block...");
coin.addBlock(new Block(1, "14/03/2020", {amount: 10}));

console.log("Mining Second Block...");
coin.addBlock(new Block(2, "14/03/2019", {amount: 20}));