# Multi Signature Transactions

## Abstract 
> Multi-signature transactions require a pre-determined number of signatures in order to execute transactions. Partially signed multi-signature transactions ("PSMST") enable users to check the contents of transactions, add more signatures, manipulate PSMST transactions and share partially signed transactions. 

**WARNING: The multi-signature features used in BeyondcoinJS should be considered highly experimental, potentially unstable and not suitable for production use.**

## Utilities 

## `newMultiSigTransaction()`
The `newMultiSigTransaction()` function can initialize the creation of a multi-sig transaction. If all the required keys are passed to `newMultiSigTransaction()`, it will produce a complete ready-to-broadcast transaction. If only some keys are passed, it will by default create a partial transaction.

The complete documentation is located [HERE](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/MULTI_SIGNATURE_TRANSACTIONS/CREATE_TRANSACTION.md).


## `signPartialMultiSigTransaction()`
`signPartialMultiSigTransaction()` will sign a partial transaction. If the transaction has been signed with the required number of keys, it will produce a ready-to-broadcast transaction. If a transaction is not yet fully signed by all signees, it will produce a partial transaction which can be distributed to other parties for further signing.

The complete documentation is located [HERE](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/MULTI_SIGNATURE_TRANSACTIONS/SIGN_PARTIAL_TRANSACTION.md).

## `viewPartialMultiSigTransaction()`
This will `viewPartialMultiSigTransaction()` will provide refference information about a partial transaction. 

The complete documentation is located [HERE](https://github.com/beyondcoin-project/beyondcoinjs/blob/master/doc/examples/MULTI_SIGNATURE_TRANSACTIONS/VIEW_PARTIAL_TRANSACTION.md).
