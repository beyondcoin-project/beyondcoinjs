/*
MODULE NAME: address_multi_sig.js
PURPOSE: Generate multi signature beyondcoin addresses.
DEPENDENCIES:
    (a) /lib/core/index.js
EXPORTS:
    (a) createBeyondcoinAddressMultiSig(addresses, signatures, network)
NOTES:
    (a) The wallet import format (WIF) is an encoded version of
    the private key.
*/

const beyondcoinjs = require('../lib/core/index.js')
/*
ADDRESSES: The number of total addresses that can sign from this address.
SIGNATURES: The number of signatures required to execute transactions from this address.
NETWORK: The network, normal or testnet.
*/

function createBeyondcoinAddressMultiSig (addresses, signatures, network = 'testnet') {
  return new Promise((resolve, reject) => {
    try {
      // Set beyondcoin specific configuration.
      const beyondcoinNetwork = network === 'normal' ? beyondcoinjs.networks.beyondcoin : beyondcoinjs.networks.testnet
      let keysVector = []
      let pubKeyVector = []

      // Generate addresses
      for (let index = 0; index < addresses; index++) {
        const keyPair = beyondcoinjs.ECPair.makeRandom({ network: beyondcoinNetwork })
        const wif = keyPair.toWIF()
        const keyPairRaw = beyondcoinjs.ECPair.fromWIF(wif, beyondcoinNetwork)
        const pubKeyBuffer = keyPairRaw.getPublicKeyBuffer()
        const publicKey = pubKeyBuffer.toString('hex')

        keysVector.push({ wif, publicKey, index })
        pubKeyVector.push(pubKeyBuffer)
      }

      // Multi sig address generation
      let pubKeysBuffer = pubKeyVector.map(function (hex) {
        return Buffer.from(hex, 'hex')
      })

      const witnessScript = beyondcoinjs.script.multisig.output.encode(signatures, pubKeysBuffer) // number of signatures
      const witnessScriptHash = beyondcoinjs.crypto.sha256(witnessScript)
      const redeemScript = beyondcoinjs.script.witnessScriptHash.output.encode(witnessScriptHash)
      const redeemScriptHash = beyondcoinjs.crypto.hash160(redeemScript)
      const scriptPubKey = beyondcoinjs.script.scriptHash.output.encode(redeemScriptHash)

      // const scriptPubKey = beyondcoinjs.script.scriptHash.output.encode(beyondcoinjs.crypto.hash160(redeemScript))
      let address = beyondcoinjs.address.fromOutputScript(scriptPubKey, beyondcoinNetwork)
      // Convert address to current SegWit encoding standard (TESTNET)
      address = network === 'normal' ? address : beyondcoinjs.address.toBase58Check(beyondcoinjs.address.fromBase58Check(address)['hash'], 58)

      resolve({
        master: address,
        witnessScript: witnessScript.toString('hex'),
        keys: keysVector
      })
    } catch (error) {
      reject(new Error(`ERROR IN [createBeyondcoinAddressMultiSig] MAIN CATCH BLOCK: ${error}`))
    }
  })
}

module.exports = createBeyondcoinAddressMultiSig
