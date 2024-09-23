// const crypto = require('crypto');
// const axios = require('axios');

// class CustodialWallet {
//     constructor(rootNetworkEndpoint) {
//         this.rootNetworkEndpoint = rootNetworkEndpoint;
//         this.wallets = new Map();
//     }

//     async createWallet(userId) {
//         // Generate a new key pair
//         const privateKey = crypto.randomBytes(32).toString('hex');
//         const publicKey = crypto.createPublicKey(privateKey).export({ type: 'spki', format: 'pem' });

//         // Store the private key securely (in a real scenario, this should be encrypted and stored in a secure database)
//         this.wallets.set(userId, { privateKey, publicKey });

//         // Create an address on the Root Network (this is a placeholder - you'd need to use the actual Root Network API)
//         const address = await this.createAddressOnRootNetwork(publicKey);
//         console.log(address, "address of the user ")
//         return { userId, address };
//     }

//     async getBalance(userId) {
//         const wallet = this.wallets.get(userId);
//         if (!wallet) {
//             throw new Error('Wallet not found');
//         }

//         // Placeholder: Get balance from Root Network
//         const balance = await this.getBalanceFromRootNetwork(wallet.publicKey);
//         console.log(balance, "balance")
//         return balance;
//     }

//     async sendTransaction(userId, toAddress, amount) {
//         const wallet = this.wallets.get(userId);
//         if (!wallet) {
//             throw new Error('Wallet not found');
//         }

//         // Placeholder: Send transaction on Root Network
//         const txHash = await this.sendTransactionOnRootNetwork(wallet.privateKey, toAddress, amount);
//         return txHash;
//     }

//     // Placeholder methods - these would need to be implemented using the actual Root Network API
//     async createAddressOnRootNetwork(publicKey) {
//         // Implementation depends on Root Network API
//         return 'root_network_address_' + publicKey.slice(0, 10);
//     }

//     async getBalanceFromRootNetwork(publicKey) {
//         // Implementation depends on Root Network API
//         return Math.random() * 100; // Placeholder
//     }

//     async sendTransactionOnRootNetwork(privateKey, toAddress, amount) {
//         // Implementation depends on Root Network API
//         return 'tx_hash_' + Math.random().toString(36).substring(7);
//     }
// }

// // Usage example
// async function main() {
//     const custodialWallet = new CustodialWallet('https://porcini.rootnet.app/archive');
//     console.log(custodialWallet, "custodial wallet")
//     const user1 = await custodialWallet.createWallet('user1');
//     console.log('Created wallet:', user1);

//     const balance = await custodialWallet.getBalance('user1');
//     console.log('Balance:', balance);

//     const txHash = await custodialWallet.sendTransaction('user1', 'recipient_address', 10);
//     console.log('Transaction sent:', txHash);
// }

// main().catch(console.error);



const { Web3 } = require('web3');



// Function to create a new wallet
async function createCustodialWallet() {
    try {
        const web3 = new Web3('https://porcini.rootnet.app/archive');
        // // Generate a new account
        const account = await web3.eth.accounts.create();
        console.log(account, "account")
        const { address, privateKey } = account;
        console.log(address, privateKey, privateKey, "privatekey")

        console.log('New wallet created:');
        console.log('Address:', address);
        console.log('Private Key:', privateKey);

        const balance = await web3.eth.getBalance("0xbA6429C3Bc3B02233c8403896e30c055Fe08b58f");
        console.log(balance.toString(), "balance")
        const transaction = {
            from: '0xbA6429C3Bc3B02233c8403896e30c055Fe08b58f',
            to: '0x7cF9F5648153417509DFE64e9f17A595f764eeC8',
            value: '0x1',
            gas: '21000',
            gasPrice: await web3.eth.getGasPrice(),
            nonce: '0x1',
            type: '0x0'
        }
        const signTransaction = await web3.eth.signTransaction(transaction)

        console.log(signTransaction, "signTx")

        // NEVER store private keys in plain text or expose them

        return { address, privateKey };
    } catch (error) {
        console.error('Error creating wallet:', error);
        throw error;
    }
}

// 2a206c25d21c4ffbb64fadbf9da750bd   password

// Usage
createCustodialWallet()
    .then((wallet) => {


        // Handle the newly created wallet
    })
    .catch((error) => {
        // Handle any errors
    });