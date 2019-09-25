/*
MODULE NAME: create_transaction.js
PURPOSE: Create multi-sig beyondcoin transactions.
EXPORTS:
    (a) createTransaction()
NOTES:
    (a) If the output is not exact, i.e is less than the provided utxo, the
    change amount will be calculated using the following formula:
    ((unspent_amount - amount) - fee).
*/

const beyondcoinjs = require('../../lib/core/index.js')
const asyncForEach = require('../../lib/asyncForEach.js')
const addressConversion = require('./helper/address_conversion.js')
/*
NETWORK: 'normal' or 'testnet'

WITNESSSCRIPT: A string containing the witness script for this multi-sig address.

KEYS: An array containing the private keys (WIF) of the addresses signing the
transaction.

SIGNATURES: A number specifiying the number of signatures required to build
this transaction.

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

OUTPUT: An array, with individual objects containing the address and amount that will be sent.

    (a) See the following example;
    [{
        address: MNZnbtzP6CqxUb2EqxRyov1i18NEgpZ5ek,
        amount: 2500
    },
    {
        address: MNZnbtzP6CqxUb2EqxRyov1i18NEgpZ5ek,
        amount: 2500
    }]

FEE: The amount of litoshi to set as the fee for this transaction.
*/
async function createTransaction (txData) {
  /* Convert addresses back into older encoding version */
  for (let a = 0; a < txData.output.length; a++) {
    txData.output[a].address = await addressConversion(txData.output[a].address, txData.network)
  }
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

      let txb = new beyondcoinjs.TransactionBuilder(beyondcoinNetwork)

      // Total transaction amount based on outputs used to fund transaction
      let totalTransactionAmount = 0
      // Total amount spent based on the txData.output amount
      let totalPaymentAmount = 0

      // Create new transaction by adding outputs from other TX.
      const transactionOutputVector = txData.utxo
      await asyncForEach(transactionOutputVector, async (transactionBuildInputData) => {
        txb.addInput(transactionBuildInputData.txid, transactionBuildInputData.index, 0xffffffff, scriptPubKey)
        totalTransactionAmount += transactionBuildInputData.amount
      })

      // Amount to be paid to output(s)
      await asyncForEach(txData.output, async (transactionOutputData) => {
        txb.addOutput(transactionOutputData.address, transactionOutputData.amount)
        totalPaymentAmount += transactionOutputData.amount
      })

      // Change return amount (minus the tx fee)
      if (((totalTransactionAmount - totalPaymentAmount) - txData.fee) > 0) {
        txb.addOutput(txData.changeAddress, (totalTransactionAmount - totalPaymentAmount) - txData.fee)
      }

      // Check outputs do not exceed utxo
      if ((totalPaymentAmount + txData.fee) > totalTransactionAmount) { return reject(new Error('Output exceeds UTXO provided to build transaction.')) }

      // Prepare buffer from wifs
      const keyPairs = txData.keys.map(function (wif) { return beyondcoinjs.ECPair.fromWIF(wif, beyondcoinNetwork) })

      try {
        // Sign transaction
        var currentPosOutput = 0
        await asyncForEach(txData.utxo, async (signTransactionOutput) => { // Sign each utxo
          let currentPosSign = 0
          await asyncForEach(txData.keys, async () => { // Sign each utxo using each provided key
            txb.sign(currentPosOutput, keyPairs[currentPosSign], redeemScript, null, signTransactionOutput.amount, witnessScript)
            currentPosSign++
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
      if (validSignatures < txData.signatures) { // Partial transaction
        const transactionHex = txb.buildIncomplete().toHex()
        resolve({
          rawTransaction: transactionHex,
          utxo: txData.utxo, // [UNSAFE]
          totalSignatures: txData.signatures, // sigs required (total) [UNSAFE]
          pendingSignatures: (txData.signatures === validSignatures ? 0 : txData.signatures - validSignatures), // remaining sigs [UNSAFE]
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
      return reject(new Error(`ERROR IN [createTransaction] MAIN CATCH BLOCK: ${error}`))
    }
  })
}

module.exports = createTransaction
