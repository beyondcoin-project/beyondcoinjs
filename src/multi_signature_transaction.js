/*
MODULE NAME: multi_signature_transaction.js
PURPOSE: Create multi-sig beyondcoin transactions.
DEPENDENCIES:
    (a) /lib/core/index.js
    (b) /src/litoshi.js
    (c) /multi_signature_transaction/helper/address_conversion.js
    (d) /multi_signature_transaction/helper/derive_address.js

    (e) /multi_signature_transaction/create_transaction.js
    (f) /multi_signature_transaction/view_partial_transaction.js
    (g) /multi_signature_transaction/sign_partial_transaction.js
EXPORTS:
    (a) createTransaction()
        This can initialize the creation of a transaction. If all the required keys
        are passed to createTransaction(), it will produce a complete ready-to-broadcast
        transaction. If only some keys are passed, it will create a partial transaction.

    (c) viewPartialTransaction()
        This will provide information about a partial transaction.

    (d) signPartialTransaction()
        This will sign a partial transaction. If the transaction has been signed with the
        required number of keys, it will produce a ready-to-broadcast transaction. If a
        transaction is not yet fully signed by all signees, it will produce a partial
        transaction.

NOTES:
    (a) If the output is not exact, i.e is less than the provided utxo, the
    change amount will be calculated using the following formula:
    ((unspent_amount - amount) - fee).
    (b) %%% WARNING %%% | %%% DANGER %%%
        (1) totalSignatures
        (2) pendingSignatures
        (3) utxo
    This information, provided between users when passing partial transactions is reference only
    and can be manipulated, in most cases the transaction ***MIGHT*** fail. The rawTransaction can
    only be considered 'trusted' information.

*/

module.exports = {
  createTransaction: require(`./multi_signature_transaction/create_transaction.js`),
  viewPartialTransaction: require(`./multi_signature_transaction/view_partial_transaction.js`),
  signPartialTransaction: require(`./multi_signature_transaction/sign_partial_transaction.js`)
}
