/*
MODULE NAME: transaction_builder.js
PURPOSE: Create beyondcoin transactions.
DEPENDENCIES:
    (a) /lib/core/index.js
    (b) /src/litoshi.js
    (c) /transaction_builder/address_conversion.js
    (c) /transaction_builder/derive_address.js
EXPORTS:
    (a) createTransaction()
NOTES:
    (a) If the output is not exact, i.e is less than the provided utxo, the
    change amount will be calculated using the following formula:
    ((unspent_amount - amount) - fee).
*/

const beyondcoinjs = require('../lib/core/index.js')
const asyncForEach = require('../lib/asyncForEach.js')
const addressConversion = require('./transaction_builder/address_conversion.js')
const deriveAddress = require('./transaction_builder/derive_address.js')
/*
NETWORK: 'normal' or 'testnet'
WIF: The private key (WIF) of the address executing transaction.
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
      // Derive address and set txData address and changeAddress
      const address = await deriveAddress(txData.wif, txData.network === 'normal' ? 'normal' : 'testnet')
      txData.address = address
      txData.changeAddress = address

      // Set beyondcoin network
      const beyondcoinNetwork = (txData.network === 'normal' ? beyondcoinjs.networks.beyondcoin : beyondcoinjs.networks.testnet)
      const keyPair = beyondcoinjs.ECPair.fromWIF(txData.wif, beyondcoinNetwork)

      const pubKey = keyPair.getPublicKeyBuffer()
      const pubKeyHash = beyondcoinjs.crypto.hash160(pubKey)

      const redeemScript = beyondcoinjs.script.witnessPubKeyHash.output.encode(pubKeyHash)

      let txb = new beyondcoinjs.TransactionBuilder(beyondcoinNetwork)

      // Total transaction amount based on outputs used to fund transaction
      let totalTransactionAmount = 0
      // Total amount spent based on the txData.output amount
      let totalPaymentAmount = 0

      // Create new transaction by adding outputs from other TX.
      const transactionOutputVector = txData.utxo
      await asyncForEach(transactionOutputVector, async (transactionBuildInputData) => {
        txb.addInput(transactionBuildInputData.txid, transactionBuildInputData.index)
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

      try {
        // Sign transaction
        var currentPos = 0
        await asyncForEach(txData.utxo, async (signTransactionOutput) => {
          txb.sign(currentPos, keyPair, redeemScript, null, signTransactionOutput.amount)
          currentPos++
        })
      } catch (error) {
        return reject(new Error(`ERROR SIGNING TRANSACTION: ${error}`))
      }

      const transactionHex = txb.build().toHex()
      resolve(transactionHex)
    } catch (error) {
      return reject(new Error(`ERROR IN [createTransaction] MAIN CATCH BLOCK: ${error}`))
    }
  })
}

module.exports = createTransaction
