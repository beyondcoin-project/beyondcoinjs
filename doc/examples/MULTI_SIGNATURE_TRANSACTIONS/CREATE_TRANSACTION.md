# Generating multi signature transactions

## Abstract 
> You should have at minimum a basic understanding of how blockchain and multi-signature transactions work before proceeding. Multi-sig transactions are generated by asynchronously executing the newMultiSigTransaction() function while passing in the required parameters to produce a new multi-sig transaction. 

## `newMultiSigTransaction()` parameters 

See the table below to get a better understanding of the parameters required. 

## Parameters
| Parameter name | Type | Required | Description | 
| :-------------: |:-------------:| :-------------:| :-------------:|
| `network` | String | Yes | The beyondcoin network specification. 
| `witnessScript` | String | Yes | The witness script associated with the multi-signature address funding this transaction.
| `keys` | Array | Yes | An array containing objects with the private keys, encoded in WIF format.
| `signatures` | Number | Yes | The number of signatures required to execute this transaction.
| `utxo` | Array | Yes | An array containing objects with each UTXO used to fund this transaction.  
| `output` | Array | Yes | An array containing objects with the payment addresses and amounts to be transferred for this transaction.
| `fee` | Number | Yes | The transaction fee, also known as the miner fee.

## Parameters explained 

### `network`
The `network` parameter can be set as either `normal` for live network transactions or as `testnet` for testnet based transactions. 

### `witnessScript` 
The witness script is the unique result of all the public keys associated with the multi-signature address, it is commonly created and saved when the multi-signature address is generated or derived.

### `keys`
In this library, each private key to the multi-signature address funding a transaction is encoded as a WIF, also known as the Wallet Import Format. The `keys` array is made up of string type properties each containing a WIF.

### `signatures`
The signatures property assists in identifying the number of signatures required to execute the transaction, i.e broadcast to the Beyondcoin network. This property is actually determined at the time the multi-signature address is created but still must be correctly passed to the `newMultiSigTransaction()` function.

### `utxo`
This is also known as unspent transaction outputs. In this library, the `utxo` is an array containing objects defining each unspent output to be used for this transaction. The objects contain a number of properties, see below. 

#### `utxo` object parameters 
The transaction ID corresponding with the unspent output. 

| Parameter name | Type | Description
| :-------------: |:-------------:| :-------------:| 
| `txid` | String | The unique transaction ID of a UTXO.   
| `index` | String | The index value of this UTXO.  
| `amount` | Number | The amount of beyondcoin present at this UTXO **IN LITOSHI** formatting.

### `output`
In this library, the `output` parameter is an array containing objects defining each potential output with the payment addresses (and other related output data). Multiple new outputs can be created in a single transaction allowing for easy transaction batching, enabling you to consume outputs from previous transactions and send to as many addresses as required. See the parameter properties for `output` objects below. 

####  `output` object parameters 

| Parameter name | Type | Description
| :-------------: |:-------------:| :-------------:| 
| `address` | String | The beyondcoin address.   
| `amount` | String | The amount of **LITOSHI** to pay this address/output.

### `fee`
The transaction fee for this transaction in **LITOSHI**. 

# Considerations

## Transaction amount 
The total sum of all payment amounts set in the `output` object **including the transaction fee** must be equal to or less than the amount specified in the UTXOs provided for a transaction. 

## Change amount 
The change amount is calculated by taking all the `output` amounts and subtracting the transaction fee from the total  `utxo` amounts provided. If the remaining amount is greater than 0, the remaining amount is considered 'change' and will be forwarded to the address corresponding with the WIF funding the transaction, as set in your parameters. 

It's possible to manually create a change amount by setting a custom `output` object with a predetermined change amount using your own calculations. 

## Signatures
The `signatures` property is required for guidance only. For example, if the multi-signature address was generated in a way that requires 3 of 5 keys but you set the signatures property as 2 keys when building a transaction, the transaction will still require 3 of 5 keys, since the "transaction" is being spent from a multi-signature address that was generated requiring 3 of 5 days.

The `signatures` property passed to `newMultiSigTransaction()` has no influence on the actual signatures required to execute a transaction, at this point it's required to assist with internal functionality when transferring partially signed transactions. 

This property will likely be removed in the future. 

# Complete transaction
## 1 to 1 transaction 

An example transaction on the test network sending 99,990,000 litoshi to one address and a transaction fee of 10,000 litoshi using 1 UTXO that has a value of 100,000,000 litoshi, providing all three keys required for this multi-signature address.  
```
await beyondcoinjs.newMultiSigTransaction({
    network: 'testnet',
    witnessScript: '5321026c28fbb59ed148f15cbc5d97edecb0cbd120e809a525435c72c2426e4b74de622102ce90c5969d7ffb8cd3084aa997ba6735fb1a6420d098cf34a347fb9531719f802103d5d124feb096eef3e75493a88f9ae0bca91cec563d591c67b8f9001fba8c6f5421027084c8c800bf152dcc8090abcd5c51f2cba709b36c8f26b7a40cbac55dd68c352103de7780348faa72372ea5ee9b5dfcdb081e41c651431a34464327d39c6c02de0055ae',
    keys: ['cW71MiTEQ4kV4BDsrr9LykeAjF6whUJVevi79kcx4fTii9RXpbBz', 'cSFoQ5bwwFBJ6VgA4v5wAeQjLxEP891ceECoFGBKhLNVQ5sPpwWw', 'cNTbBWXpZZTUiZx19AwMY23wtUvbDUczfTPTrom2KLkbQnKUXzRk'],
    signatures: 3,
    utxo: [
    {
       txid: 'e44783c413fddba55c40189567abc8dcb2db04a680a231bf11ad3fbe07b67bb9',
       index: 0,
       amount: 100000000 // unspent amount 
    }],
    output: [
    {
       address: 'QihYZTTzDtKFEy2sGJDbAToLbnRRuzmA8r',
       amount: 99990000 // 100000000 (input) - 10000 (network fee)   
    }],
    fee: 10000, // transaction fee 
}).then((result) =>{
    console.log(result);
})
```

Once executed you will receive a reply, containing the `rawTransaction` property, which is the raw transaction that can be broadcasted to the beyondcoin network. The `state` property should be 'complete' if the transaction was successfully signed with all the provided keys, see the example below. 

```
{ rawTransaction: '01000000000101b97bb607be3fad11bf31a280a604dbb2dcc8ab679518405ca5dbfd13c48347e4000000002322002002261759eb63cb68e7a2648b2493aff5219986f38f1458e5957924062bd60f9bffffffff01f0b9f5050000000017a914f25fef8faaf3076a9f42cc0abbbe71eeb884660087050047304402203dde09f0cf14e5e45f161bc437f65f5cd815d5e23cf6172f7430dc03a88e51980220608ed8a92cec89ebcddf530ff4c27c7750b88af06cef9d5ef4d866c9730b439d0147304402204cd8e45954de4ff1ca0e4116b5c74970b0513d62202d50faad77784c8cd486f702207f14927420526d931ee97e8a5602e819730904c91db76cdf02cea0894b32217c01483045022100b1ea57700de02ef80e3b9b2793569a5ccb819f0fb12b6e8f188c37219c2e1f3d022003c1a8efd3eb4fef10e1b7f2bd76540ac03ca8bbb4a3f5cb0c966b3757587d6001ad5321026c28fbb59ed148f15cbc5d97edecb0cbd120e809a525435c72c2426e4b74de622102ce90c5969d7ffb8cd3084aa997ba6735fb1a6420d098cf34a347fb9531719f802103d5d124feb096eef3e75493a88f9ae0bca91cec563d591c67b8f9001fba8c6f5421027084c8c800bf152dcc8090abcd5c51f2cba709b36c8f26b7a40cbac55dd68c352103de7780348faa72372ea5ee9b5dfcdb081e41c651431a34464327d39c6c02de0055ae00000000',
  state: 'complete' }
```

## 2 to 3 transaction 

An example transaction on the test network consuming two UTXOs containing 100,000,000 litoshi each and sending 199,375,000 litoshi to one address along with 300,000 litoshi (each) to two different addresses and a transaction fee of 25,000 litoshi. All three keys required for this multi-signature address are provided.  
```
await beyondcoinjs.newMultiSigTransaction({
    network: 'testnet',
    witnessScript: '5321026c28fbb59ed148f15cbc5d97edecb0cbd120e809a525435c72c2426e4b74de622102ce90c5969d7ffb8cd3084aa997ba6735fb1a6420d098cf34a347fb9531719f802103d5d124feb096eef3e75493a88f9ae0bca91cec563d591c67b8f9001fba8c6f5421027084c8c800bf152dcc8090abcd5c51f2cba709b36c8f26b7a40cbac55dd68c352103de7780348faa72372ea5ee9b5dfcdb081e41c651431a34464327d39c6c02de0055ae',
    keys: ['cW71MiTEQ4kV4BDsrr9LykeAjF6whUJVevi79kcx4fTii9RXpbBz', 'cSFoQ5bwwFBJ6VgA4v5wAeQjLxEP891ceECoFGBKhLNVQ5sPpwWw', 'cNTbBWXpZZTUiZx19AwMY23wtUvbDUczfTPTrom2KLkbQnKUXzRk'],
    signatures: 3,
    utxo: [
    {
       txid: '79c2adbb6b39a3ff6ca17ddcc693873ab5b3e4d5aed825d5a3699ee624114183',
       index: 0,
       amount: 100000000 // unspent amount 
    },
    {
       txid: '27b45481cfd84196a45baeabd04f731220e0675668d216f92cfd581c06d19253',
       index: 1,
       amount: 100000000 // unspent amount 
    }],
    output: [
    {
       address: 'QihYZTTzDtKFEy2sGJDbAToLbnRRuzmA8r',
       amount: 199375000
    },
    {
       address: 'mqZgkq6ikqYW1Bp4SGcA57cznwTNMkDyzr',
       amount: 300000  
    },
    {
       address: 'QgSgkiakzJnjarJNcPZgJAsSaLdxXCHxDu',
       amount: 300000  
    }],
    fee: 25000, // transaction fee 
}).then((result) =>{
    console.log(result);
})
```
Once executed you will receive a reply, containing the `rawTransaction` property, which is the raw transaction that can be broadcasted to the beyondcoin network. The `state` property should be 'complete' if the transaction was successfully signed with all the provided keys, see the example below. 

```
{ rawTransaction: '0100000000010283411124e69e69a3d525d8aed5e4b3b53a8793c6dc7da16cffa3396bbbadc279000000002322002002261759eb63cb68e7a2648b2493aff5219986f38f1458e5957924062bd60f9bffffffff5392d1061c58fd2cf916d2685667e02012734fd0abae5ba49641d8cf8154b427010000002322002002261759eb63cb68e7a2648b2493aff5219986f38f1458e5957924062bd60f9bffffffff039838e20b0000000017a914f25fef8faaf3076a9f42cc0abbbe71eeb884660087e0930400000000001976a9146e3588f39d65abd8540f01096b9f565a0baf9bff88ace09304000000000017a914d9a048f0af2fe81813dbad575c38258d8e60c4da87050048304502210090c8f72f9dbd5e8c4b785d545869842ba0666d1dcbfada6b229507ee17ec08c4022021d959ad97380514d3be1f5d5ac06c1b48b27b24e6ec6bf7cada5879c82ac5c101483045022100efe1d27ba549b05b08f96c169d9a8f086ccdcd45a9bf5bfb1f1ebbef0cb4dfff0220412c8e4a14aa8bf07b48a54d87aa76f81f4e83cdc7f1ad06393dd9a88d23cf3001483045022100ab60f9e1b6da99626a41805fd50aadce379353eca70e3931a0252446838234bf022014e49f479d544e3adc169caf2ddb380f506ceed601a11f2ec31934db66392e4701ad5321026c28fbb59ed148f15cbc5d97edecb0cbd120e809a525435c72c2426e4b74de622102ce90c5969d7ffb8cd3084aa997ba6735fb1a6420d098cf34a347fb9531719f802103d5d124feb096eef3e75493a88f9ae0bca91cec563d591c67b8f9001fba8c6f5421027084c8c800bf152dcc8090abcd5c51f2cba709b36c8f26b7a40cbac55dd68c352103de7780348faa72372ea5ee9b5dfcdb081e41c651431a34464327d39c6c02de0055ae050047304402207f692a278059fc5f9c6be77ef0a6814991faad449859f24f48c5858b1a59d29c022046c96e5bde8a38102d0633887b343c9dc452c42e657195e765b9e8039df2bac901483045022100da2c31efda306dac59bdb9e075d4364c7e446f27089dbe13909d4c42224429d202206db15d396785ad8021b89024ce7ee51b02f53ac7971b05a36035fd9e85bc80ce0147304402207651ce6b51e72fda5b41200382197e6e0db9b88f3d3907bafc3e1b04ccab705e02206cf3d040ee80649f1015c74fdb270017aa5a13c8a8105da9224859d86458ea6d01ad5321026c28fbb59ed148f15cbc5d97edecb0cbd120e809a525435c72c2426e4b74de622102ce90c5969d7ffb8cd3084aa997ba6735fb1a6420d098cf34a347fb9531719f802103d5d124feb096eef3e75493a88f9ae0bca91cec563d591c67b8f9001fba8c6f5421027084c8c800bf152dcc8090abcd5c51f2cba709b36c8f26b7a40cbac55dd68c352103de7780348faa72372ea5ee9b5dfcdb081e41c651431a34464327d39c6c02de0055ae00000000',
  state: 'complete' }
```

## Partially Signed Transactions
For information on partially signed transactions, see the [PSMST (Partially Signed Multi Signature Transactions](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/MULTI_SIGNATURE_TRANSACTIONS/SIGN_PARTIAL_TRANSACTION.md) documentation.
