/*
MODULE NAME: view_partial_transaction.js
PURPOSE: View information about partially signed multi-sig
transactions.
EXPORTS:
    (a) viewPartialMultiSignatureTransaction()
NOTES: No notes.
*/

const beyondcoinjs = require('../../lib/core/index.js')
/*
NETWORK: 'normal' or 'testnet'

RAWTRANSACTION: The raw transaction.
*/
async function viewPartialMultiSignatureTransaction (network, rawTransaction) {
  return new Promise(async (resolve, reject) => {
    try {
      // Set beyondcoin network
      const beyondcoinNetwork = (network === 'normal' ? beyondcoinjs.networks.beyondcoin : beyondcoinjs.networks.testnet)
      // Retrieve transaction
      const txb = beyondcoinjs.TransactionBuilder.fromTransaction(beyondcoinjs.Transaction.fromHex(rawTransaction), beyondcoinNetwork)
      resolve(txb)
    } catch (error) {
      return reject(new Error(`ERROR IN [viewPartialMultiSignatureTransaction] MAIN CATCH BLOCK: ${error}`))
    }
  })
}

module.exports = viewPartialMultiSignatureTransaction
