# Generating beyondcoin addresses

## Abstract 
> In this library, beyondcoin addresses consist of two unique parts, the address, and the associated private key. The private key is a unique cryptographic code ("key") that verifies you are the owner of an address, enabling you to spend beyondcoin from that address.

>  In BeyondcoinJS, the private key is encoded as a WIF, also known as the Wallet Import Format, this is done to make the private key easier to read without compromising on security or integrity.

## Address formatting 

Since beyondcoinJS is a segwit-first library, it is considered that all non-segwit functions, including non-segwit addresses, are deprecated. Be aware that this does not necessarily mean these standards or functions are deprecated on the beyondcoin network. In order to maintain backwards compatability, addresses are P2SH. Currently BECH32 is not supported and there are no plans to support native segwit in this library until more mainstream adoption. 

### Normal network 
| Address        | Type           | Network | Status  |
| :-------------: |:-------------:| :-------------:| :-----:|
| L | Normal (non segwit) | Normal Network | Deprecated |
| 3     | SegWit (old encoding) | Normal Network | Deprecated |
| M     | SegWit | Normal Network | Current |

### Test network 
| Address        | Type           | Network | Status  |
| :-------------: |:-------------:| :-------------:| :-----:|
| m | Normal (non segwit) | Test Network |  Deprecated |
| n | Normal (non segwit) | Test Network |  Deprecated |
| 2 | SegWit (old encoding) | Test Network |  Deprecated |
| Q | SegWit | Test Network |  Current |

## Creating an address

A new address can be created by asynchronously executing the `newAddress()` function. 

```
const beyondcoinjs = require('beyondcoinjs');

async function newAddressExample(){
try {
    const addressPair = await beyondcoinjs.newAddress();
    const address = addressPair.address; // Example
    const wif = addressPair.wif; // Example 
    const publicKey = addressPair.publicKey; // Example 
    
        console.log(addressPair); 
	} catch (error) {
		console.error(`ERROR: ${error}`);
	}
}

newAddressExample(); 
```

This will resolve with a promise containing the address, private key (encoded as a WIF) and the public key, see below. 

```
{ address: 'MBeeHGfof2EwNobqyyA5fK6bNRij5CrQAC',
  wif: 'T43wmV2KzF8qmXXvsRGUeBNS1tSFotzy8jCYQHpX1GWUYFzfnXAu',
  publicKey: '02c6f97fab64fb93c3c5a2a3755632ceccadcd3cc9a93a454c2bc0b489cc4d3fb4'}
```

## Creating a testnet address
You can generate a testnet address just as easily as a normal address by asynchronously executing the `newTestAddress()` function.

```
const beyondcoinjs = require('beyondcoinjs');

async function newAddressExample(){
try {
    const addressPair = await beyondcoinjs.newTestAddress();
    const address = addressPair.address; // Example
    const wif = addressPair.wif; // Example 
    const publicKey = addressPair.publicKey; // Example 
    
        console.log(addressPair); 
	} catch (error) {
		console.error(`ERROR: ${error}`);
	}
}

newAddressExample(); 
```

This will resolve with a promise containing the address, private key (encoded as a WIF) and the public key, see below. 
```
{ address: 'QXkngBb93AWdckZK5FnHGXgSYaQASLb4qN',
  wif: 'cSL4NZoBexSFZF4pBZQMDWDHAVKtxyeuSR8v2deJLSuipCtHmG3V',
  publicKey: '02c6f97fab64fb93c3c5a2a3755632ceccadcd3cc9a93a454c2bc0b489cc4d3fb4'}
```

> Note: beyondcoin testnet addresses begin with Q. 

## Creating a seed derived address 
A seed derived address is generated using a predetermined identifier, in this library SHA256 is used. This is particularly useful for creating addresses that require relationships or where complex address generation schemes are needed.  

The seed value should be unique. 

### Normal network 
You can generate a seed based beyondcoin address by asynchronously executing the `newSeedAddress("seed_value_here")` function and supplying your seed as the first function parameter. 

This will resolve with a promise containing the address, private key (encoded as a WIF) and the public key, see below
```
{ address: 'MBeeHGfof2EwNobqyyA5fK6bNRij5CrQAC',
  wif: 'T43wmV2KzF8qmXXvsRGUeBNS1tSFotzy8jCYQHpX1GWUYFzfnXAu',
  publicKey: '02c6f97fab64fb93c3c5a2a3755632ceccadcd3cc9a93a454c2bc0b489cc4d3fb4'}
```

### Test network 
You can generate a seed based testnet beyondcoin address by asynchronously executing the `newTestSeedAddress("seed_value_here")` function and supplying your seed as the first function parameter. 

This will resolve with a promise containing the address, private key (encoded as a WIF) and the public key, see below
```
{ address: 'QXkngBb93AWdckZK5FnHGXgSYaQASLb4qN',
  wif: 'cSL4NZoBexSFZF4pBZQMDWDHAVKtxyeuSR8v2deJLSuipCtHmG3V',
  publicKey: '02c6f97fab64fb93c3c5a2a3755632ceccadcd3cc9a93a454c2bc0b489cc4d3fb4'}
```
