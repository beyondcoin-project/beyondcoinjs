# BeyondcoinJS 

[BeyondcoinJS](https://beyondcoinjs.beyonddata.llc) is a javascript-based implementation of various beyondcoin functions enabling you to natively create beyondcoin addresses, create transactions, set custom transaction fees and more. [BeyondcoinJS](https://beyondcoinjs.beyonddata.llc) is based on the bitcoinjs code base comprising of mostly syntactic functionality tailored for beyondcoin. 

SegWit is used for all functions including address generation and transaction creation.

[BeyondcoinJS](https://beyondcoinjs.beyonddata.llc) is designed to work on both regular client applications like browsers and also conventional server applications using NodeJS.

## Don't trust. Verify.

All developers and users of this library are advised to review and verify any underlying code for its validity and suitability. It’s good practice to always verify all cryptography dependencies and the associated codebase with consideration for the potential of backdoors, especially in the form of advanced and hard to spot types like mathematical backdoors.

## WARNING

BeyondcoinJS should be considered experimental, potentially unstable and not yet entirely suitable for production use.

## Features

* [Addresses](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/ADDRESSES.md) - Generating normal and testnet addresses.

* [Seed Addresses](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/ADDRESSES.md) - Generating seed derived normal and testnet addresses.

* [Multi Signature Addresses](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/MULTI_SIGNATURE_ADDRESSES.md) - Generating multi-signature addresses.

* [Transactions](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/TRANSACTIONS.md) - Generating normal and testnet transactions.

* [Multi Signature Transactions](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/MULTI_SIGNATURE_TRANSACTIONS.md) - Generating multi signature Beyondcoin transactions. 

* [Partially Signed Multi Signature Transactions (PSMST)](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/MULTI_SIGNATURE_TRANSACTIONS/SIGN_PARTIAL_TRANSACTION.md) - Generating and signing partially signed multi signature Beyondcoin transactions. 
    
## Getting Started

These instructions will get you a copy of BeyondcoinJS up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

If you are planning to use the NodeJS version of BeyondcoinJS it's advisable that you have the following software and configuration on your machine -

```
NodeJS 8.11.4
```

### Installing with NodeJS

For NodeJS applications you can download the latest version of BeyondcoinJS by running the following command from terminal - 
```
npm install beyondcoinjs
```

### Installing with browsers
Client side applications can build the browser version of BeyondcoinJS by the following the [browser build](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/BROWSER_BUILD.md) documentation. Building for browsers enables you to easily use all BeyondcoinJS functions in the browser. 

## Examples
See a quick demo of various examples below. 

### Create a beyondcoin address 

```
const beyondcoinjs = require('beyondcoinjs');

async function newAddressExample(){
try {
    const addressPair = await beyondcoinjs.newAddress();
    const address = addressPair.address; // Example
    const wif = addressPair.wif; // Example 
    const wif = addressPair.publicKey; // Example
        console.log(addressPair); 
	} catch (error) {
		console.error(`ERROR: ${error}`);
	}
}

newAddressExample(); 
```

Once executed, the expected return information would look something like the following - 
```
{ address: 'MBeeHGfof2EwNobqyyA5fK6bNRij5CrQAC',
  wif: 'T43wmV2KzF8qmXXvsRGUeBNS1tSFotzy8jCYQHpX1GWUYFzfnXAu',
  publicKey: '027fbb9e466252e80a282fd451091425fc47ca64adc55aacac479dc437eb8a71c3'}
```

The `Wallet Import Format (WIF)` is an encoded version of the private key associated with the generated address. 

## Running tests

You can execute the included automated unit tests by running the following command - 
```
npm run test 
```
Linting tests - 
```
npm run lint 
```
Code coverage tests - 
```
npm run coverage 
```
## Deployment & Production

It’s important to note that BeyondcoinJS is not anywhere near as extensively tested as the BitcoinJS implementation and might considerably vary in the codebase. You should run extensive testing & verification before deploying anything into production.

## Built With

* [BitcoinJS](https://github.com/bitcoinjs/bitcoinjs-lib) - Initially derrived from the BitcoinJS codebase.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/CONTRIBUTING.md) for details on the BeyondcoinJS code of conduct, and the process for submitting pull & merge requests to BeyondcoinJS. 

## Versioning

No stable release, TBD.

## Authors

* Edin Jusupovic 

## License

BeyondcoinJS is licensed under the [MIT license](https://github.com/beyondcoin-project/beyondcoinjs/raw/master/LICENSE).

## Acknowledgments

No acknowledgments yet. 
