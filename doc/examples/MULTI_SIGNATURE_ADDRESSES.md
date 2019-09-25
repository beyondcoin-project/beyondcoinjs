# Generating multi-signature addresses

## Abstract 
> Multi-signature addresses are similar to conventional addresses with the requirement that one must sign all transactions from a multi-signature address in accordance with the set amount of required signatures, determined at the time the multi-signature address is created.

> A pre-determined number of private keys are required to sign transactions from multi-signature addresses.

> Normal multi-signature addresses start with M and testnet multi-signature addresses start with Q. Addresses are constructed with a P2SH (SegWit) schema. 
## Utilities 

## `newMultiSigAddressSet()`

The `newMultiSigAddressSet()` function provides one with the ability to programmatically create an entirely new multi-signature address, along with the corresponding private keys, all at the same time. 

Ideally, the private keys would be distributed in a secure manner. 

## `newMultiSigAddressSet()` parameters 

See the table below to get a better understanding of the parameters required. 

## Parameters
| Parameter name | Type | Required | Description | 
| :-------------: |:-------------:| :-------------:| :-------------:|
| `addresses` | Number | Yes | The number of addresses to create and link with the master multi-sig address. 
| `signatures` | Number | Yes | The number of signatures required to execute transactions from the master multi-sig address.
| `network` | String | Yes | The beyondcoin network specification.

## Parameters explained 
### `addresses`
The total number of addresses to create and link with the master multi-sig address. 

### `signatures`
The number of signatures required to execute a transaction from the multi-sig address. For example, 2 (of 4 addresses) or 3 (of 4 addresses).

### `network`
The `network` parameter can be set as either `normal` for live network transactions or as `testnet` for testnet based transactions. 

### Response
Once executed you will receive a reply consisting of the master multi-sig address and an array (`keys`) containing the associated private keys and other relevant information.

See the execution example below. 

```
const beyondcoinjs = require('beyondcoinjs');

async function newExample(){
try {
	const result = await beyondcoinjs.newMultiSigAddressSet(3, 2, 'testnet');
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

newExample(); 
```

See  example reply below.
```
{ master: 'QboXBsqxZPbLvW1DhTAaMRAZEduGSoGfdY',
  witnessScript: '532102f1536e0f98fc0ca84aece0eaa432935b06b9f8095eff5eb84647310d425e74562103cdee29349b5766a6f842c59f921f9464c91d4ddceb5c3470a5725b3386933d072103576791ac5a362ccf57ae5fd72d74007edbac431672add7feda410efda2b5722f21026014ad043fc098279074de1bf43bc2d6a4815b4cd272e242c4c094391e13eb4321036dc7deb2ff499dc7d8e14cf9b32b5ca1c36c0e04be005c060179d59079b7878d55ae',
  keys: 
   [ { wif: 'cQmr33kCVSGwNBozw9f9C3Mg1mgf4UmaQKQspVQzh87sci9Na2PH',
       publicKey: '034029adf0fea05239e2c82733eeda7be36bdb19a93ae20e239d51db0fe4dc9b08',
       index: 0 },
     { wif: 'cTqMiuDtKtDmkgnHSxmSbscWLZK86iJZqVtY6t6BWp5oth3cme3v',
       publicKey: '03750ac13e6d91d45cbe3ea2854302e7c19e7437dfa3e565b09526d56b4239cfa4',
       index: 1 },
     { wif: 'cSu4ZFFyTW2PJSzCyCv7tEky5GVrUnGYyLTLE11ksBDBdbp5h8f6',
       publicKey: '03156c0aeaf32475618d58061fb0f11a3b4d3bb9e663fecfb53e6661a8ca9b0116',
       index: 2 } ] }
```
The example above requires any 2 signatures of the 3 signatures to execute a transaction. 

## Considerations

The private key of each public key (derived using the WIF) is used to sign corresponding transactions relating to the master multi-sig address. 

**WARNING**: You must retain a copy of the `witnessScript` in order to build a transaction from the master multi-sig address, optionally, you can store the `index` and `publicKey` values to rebuild the `witnessScript`.

---
---
## `deriveMultiSigAddress()`

The `deriveMultiSigAddress()` function provides one with the ability to programmatically create an entirely new multi-signature address using **your own** provided public keys. 

## `deriveMultiSigAddress()` parameters 

See the table below to get a better understanding of the parameters required. 

## Parameters
| Parameter name | Type | Required | Description | 
| :-------------: |:-------------:| :-------------:| :-------------:|
| `publicKeys` | Array | Yes | The public keys that can sign transactions from the master multi-sig address.
| `signatures` | Number | Yes | The number of signatures required to execute transactions from the master multi-sig address.
| `network` | String | Yes | The beyondcoin network specification.

## Parameters explained 

### `publicKeys`
An array consisting of objects with the `publicKey` and `index` value (starting at zero), see parameter specification below. 

| Parameter name | Type | Required | Description | 
| :-------------: |:-------------:| :-------------:| :-------------:|
| `publicKey` | String | Yes | The public key in a HEX string format.
| `index` | Number | Yes | The index value of this public key.

### `signatures`
The number of signatures required to execute a transaction from the multi-sig address. For example, 2 (of 4 addresses) or 3 (of 4 addresses).

### `network`
The `network` parameter can be set as either `normal` for live network transactions or as `testnet` for testnet based transactions. 

### Response
Once executed you will receive a reply consisting of the master multi-sig address and an array (`keys`) containing the associated public keys and the index value of each public key.

See the execution example below. 

```
const beyondcoinjs = require('beyondcoinjs');

async function newExample(){
try {
const publicKeyData = [
    {
    publicKey: '0341e31bf8c5984b54dd579c2d14da9c2d0283fb1c81e149b6223fd5465d6dbf48', 
    index: 0
    },
    {
    publicKey: '032e1a9249dfcb617db4cca873c95f0cf19ee15d988a77381c1e33797bcfe5418c', 
    index: 1
    },
    {
    publicKey: '03e0d5f0379c1ef837e7ed6bea6493a51a3546c74b221acff8cf4086ba54584ebd', 
    index: 2
    }
];
    
const result = await beyondcoinjs.deriveMultiSigAddress(publicKeyData, 2, 'testnet');
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

newExample(); 
```
See example reply below. 

```
{ 
master: 'QQBh9sSH8URTVNr2dbW5GcUvgK4jjRLsGa',
witnessScript: '532102f1536e0f98fc0ca84aece0eaa432935b06b9f8095eff5eb84647310d425e74562103cdee29349b5766a6f842c59f921f9464c91d4ddceb5c3470a5725b3386933d072103576791ac5a362ccf57ae5fd72d74007edbac431672add7feda410efda2b5722f21026014ad043fc098279074de1bf43bc2d6a4815b4cd272e242c4c094391e13eb4321036dc7deb2ff499dc7d8e14cf9b32b5ca1c36c0e04be005c060179d59079b7878d55ae'
}
```
The example above requires any 2 signatures of the 3 signatures to execute a transaction.

## Considerations
The private key associated with each of the provided public keys are used to sign corresponding transactions relating to the master multi-sig address.

**WARNING**: You must retain a copy of the `witnessScript` in order to build a transaction from the master multi-sig address, optionally, you can store the `index` and `publicKey` values to rebuild the `witnessScript`.
