/* eslint-disable new-cap */
/*
MODULE NAME: sign_partial_transaction.js
PURPOSE: Sign an already partially signed multi-sig beyondcoin transaction.
EXPORTS:
    (a) signPartialMultiSignatureTransaction()
NOTES:
    (a) If the output is not exact, i.e is less than the provided utxo, the
    change amount will be calculated using the following formula:
    ((unspent_amount - amount) - fee).
*/

const beyondcoinjs = require('../../lib/core/index.js')
const asyncForEach = require('../../lib/asyncForEach.js')
/*
NETWORK: 'normal' or 'testnet'

WITNESSSCRIPT: A string containing the witness script for this multi-sig address.

RAWTRANSACTION: The raw transaction.

UTXO: An array, with objects containing the txid and index that will be used to
finance this new transaction.

    (a) See the following example;
    [{
        txid: "2afaabe9208addf4513d93671911f55271da72d679c63c1b269746c75b3a0c46",
        index: 2,
        amount: 15000 // unspent amount for this TXID
    }]
    (b) The index is the index location on the beyondcoin blockchain of the output used
    for the corresponding txid, which is the txid property in this object.

KEYS: An array containing the private keys (WIF) of the addresses signing the
transaction.

TOTALSIGNATURES: A number specifiying the number of signatures required to build
this transaction.
*/
async function signPartialMultiSignatureTransaction (txData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Set beyondcoin network
      const beyondcoinNetwork = (txData.network === 'normal' ? beyondcoinjs.networks.beyondcoin : beyondcoinjs.networks.testnet)
      // Prepare P2SH-P2WSH encapsulation
      const witnessScript = Buffer.from(txData.witnessScript, 'hex')
      const witnessScriptHash = beyondcoinjs.crypto.sha256(witnessScript)
      const redeemScript = beyondcoinjs.script.witnessScriptHash.output.encode(witnessScriptHash)
      const redeemScriptHash = beyondcoinjs.crypto.hash160(redeemScript)
      const scriptPubKey = beyondcoinjs.script.scriptHash.output.encode(redeemScriptHash)
      const address = beyondcoinjs.address.fromOutputScript(scriptPubKey, beyondcoinNetwork)
      txData.address = address
      txData.changeAddress = address

      const txb = new beyondcoinjs.TransactionBuilder.fromTransaction(beyondcoinjs.Transaction.fromHex(txData.rawTransaction), beyondcoinNetwork)

      // Prepare buffer from wifs
      const keyPairs = txData.keys.map(function (wif) { return beyondcoinjs.ECPair.fromWIF(wif, beyondcoinNetwork) })
      try {
        /*
        TODO: Better utxo validation, parse using built-in prevTxMap to rebuild utxo set and validate.
        rebuild txid: (Buffer.from('PREVTXMAP_UTXO', 'hex').reverse())
        */
        // Sign transaction
        var currentPosOutput = 0
        await asyncForEach(txb.inputs, async (signTransactionOutput) => {
          let currentPosSign = 0
          await asyncForEach(txData.keys, async () => {
            // Obtain input txid and validate against the provided input txid set
            if (Buffer.from(txb.tx.ins[currentPosSign].hash).reverse().toString('hex') !== txData.utxo[currentPosSign].txid) {
              reject(new Error(`UTXO TXID (${txData.utxo[currentPosSign].txid}) DOES NOT MATCH PROVIDED UTXO TXID.`))
            } else {
              txb.sign(currentPosOutput, keyPairs[currentPosSign], redeemScript, null, txData.utxo[currentPosSign].amount, witnessScript)
              currentPosSign++
            }
          })
          currentPosOutput++
        })
      } catch (error) {
        return reject(new Error(`ERROR SIGNING TRANSACTION: ${error}`))
      }

      // Check for incomplete transaction and check current signatures
      var validSignatures = 0
      await asyncForEach(txb.inputs, async (tx) => {
        let inputSignature = 0
        // Check each input signature
        await asyncForEach(tx.signatures, async (signature) => {
          if (!(signature === undefined)) { inputSignature++ }
        })
        validSignatures = inputSignature // [UNSAFE]
      })
      // Compare valid signatures to the number of required signatures
      if (validSignatures < txData.totalSignatures) { // Partial transaction
        const transactionHex = txb.buildIncomplete().toHex()
        resolve({
          rawTransaction: transactionHex,
          utxo: txData.utxo, // [UNSAFE]
          totalSignatures: txData.totalSignatures, // signatures required (total) [UNSAFE]
          pendingSignatures: (txData.totalSignatures === validSignatures ? 0 : txData.totalSignatures - validSignatures), // remaining signatures required [UNSAFE]
          state: 'incomplete'
        })
      } else { // Complete transaction
        const transactionHex = txb.build().toHex()
        resolve({
          rawTransaction: transactionHex,
          state: 'complete'
        })
      }
    } catch (error) {
      return reject(new Error(`ERROR IN [signPartialMultiSignatureTransaction] MAIN CATCH BLOCK: ${error}`))
    }
  })
}

module.exports = signPartialMultiSignatureTransaction
