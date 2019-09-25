/*
MODULE NAME: derive_address.js
PURPOSE: Derive addresses from a WIF.
DEPENDENCIES:
    (a) /lib/core/index.js
EXPORTS:
    (a) deriveAddress()
NOTES:
    (a) This function will derive a address using the provided WIF.
    (b) Testnet addresses will use old-encoding for compatibility reasons,
    i.e start segwit testnet addresses will start with 2 instead of Q.
*/

const beyondcoinjs = require('../../lib/core/index.js')

function deriveAddress (wif, wifType) {
  return new Promise((resolve, reject) => {
    try {
      if (wifType === 'normal') {
        const keyPair = beyondcoinjs.ECPair.fromWIF(wif, beyondcoinjs.networks.beyondcoin)
        const pubKey = keyPair.getPublicKeyBuffer()

        const redeemScript = beyondcoinjs.script.witnessPubKeyHash.output.encode(beyondcoinjs.crypto.hash160(pubKey))
        const scriptPubKey = beyondcoinjs.script.scriptHash.output.encode(beyondcoinjs.crypto.hash160(redeemScript))

        let address = beyondcoinjs.address.fromOutputScript(scriptPubKey, beyondcoinjs.networks.beyondcoin)
        address = beyondcoinjs.address.toBase58Check(beyondcoinjs.address.fromBase58Check(address)['hash'], 50)
        resolve(address)
      } else if (wifType === 'testnet') {
        const keyPair = beyondcoinjs.ECPair.fromWIF(wif, beyondcoinjs.networks.testnet)
        const pubKey = keyPair.getPublicKeyBuffer()

        const redeemScript = beyondcoinjs.script.witnessPubKeyHash.output.encode(beyondcoinjs.crypto.hash160(pubKey))
        const scriptPubKey = beyondcoinjs.script.scriptHash.output.encode(beyondcoinjs.crypto.hash160(redeemScript))

        let address = beyondcoinjs.address.fromOutputScript(scriptPubKey, beyondcoinjs.networks.testnet)
        address = beyondcoinjs.address.toBase58Check(beyondcoinjs.address.fromBase58Check(address)['hash'], 196)
        resolve(address)
      } else {
        reject(new TypeError('Invalid wifType specified in [deriveAddress] function'))
      }
    } catch (error) {
      reject(new Error(`ERROR IN [deriveAddress] MAIN CATCH BLOCK: ${error}`))
    }
  })
};

module.exports = deriveAddress
