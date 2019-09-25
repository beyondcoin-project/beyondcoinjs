/*  MODULE NAME: main.js
PURPOSE: Handle primary functions and exports.
EXPORTS:
    (a) newAddress()
    (b) newTestAddress()
    (c) newSeedAddress()
    (d) newTestSeedAddress()
    (e) newTransaction()
    (f) newMultiSigAddressSet()
    (g) deriveMultiSigAddress()
    (h) newMultiSigTransaction()
    (i) viewPartialMultiSigTransaction
    (j) signPartialMultiSigTransaction
NOTES: No notes.
*/

/* (EXPORTS) */
module.exports = {
  newAddress: require(`./src/address.js`).createBeyondcoinAddressPair,
  newTestAddress: require(`./src/address.js`).createTestBeyondcoinAddressPair,
  newSeedAddress: require(`./src/address_seed.js`).createBeyondcoinAddressSeedPair,
  newTestSeedAddress: require(`./src/address_seed.js`).createTestBeyondcoinAddressSeedPair,
  newTransaction: require(`./src/transaction_builder.js`),
  newMultiSigAddressSet: require(`./src/address_multi_sig.js`),
  deriveMultiSigAddress: require(`./src/address_multi_sig_derive.js`),
  newMultiSigTransaction: require(`./src/multi_signature_transaction.js`).createTransaction,
  viewPartialMultiSigTransaction: require(`./src/multi_signature_transaction.js`).viewPartialTransaction,
  signPartialMultiSigTransaction: require(`./src/multi_signature_transaction.js`).signPartialTransaction
}
