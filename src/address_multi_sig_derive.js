/*
MODULE NAME: address_multi_sig_derive.js
PURPOSE: Generate multi signature beyondcoin addresses using provided public
keys.
DEPENDENCIES:
    (a) /lib/core/index.js
EXPORTS:
    (a) deriveBeyondcoinAddressMultiSig(publicKeys, signatures, network)
NOTES:
    (a) The wallet import format (WIF) is an encoded version of
    the private key.
*/

const beyondcoinjs = require('../lib/core/index.js')
/*
PUBLICKEYS: An array with the public keys used that can sign transactions,
including the index.
    (1) [{
        publickey: '03156c0aeaf32475618d58061fb0f11a3b4d3bb9e663fecfb53e6661a8ca9b0116',
        index: 0
        },
        {
        publickey: '0341e31bf8c5984b54dd579c2d14da9c2d0283fb1c81e149b6223fd5465d6dbf48',
        index: 1
        }]
SIGNATURES: The number of signatures required to execute transactions from this address.
NETWORK: The network, normal or testnet.
*/

function deriveBeyondcoinAddressMultiSig (publicKeys, signatures, network = 'testnet') {
  return new Promise((resolve, reject) => {
    try {
      // Set beyondcoin specific configuration.
      const beyondcoinNetwork = network === 'normal' ? beyondcoinjs.networks.beyondcoin : beyondcoinjs.networks.testnet
      // Convert publicKey to Buffer
      let pubKeysBuffer = publicKeys.map(function (individualPublicKey) {
        return Buffer.from(individualPublicKey.publicKey, 'hex')
      })

      const redeemScript = beyondcoinjs.script.multisig.output.encode(signatures, pubKeysBuffer) // number of sigs
      const scriptPubKey = beyondcoinjs.script.scriptHash.output.encode(beyondcoinjs.crypto.hash160(redeemScript))
      let address = beyondcoinjs.address.fromOutputScript(scriptPubKey, beyondcoinNetwork)
      // Convert address to current SegWit encoding standard (TESTNET)
      address = network === 'normal' ? address : beyondcoinjs.address.toBase58Check(beyondcoinjs.address.fromBase58Check(address)['hash'], 58)

      resolve({ master: address, witnessScript: redeemScript.toString('hex') })
    } catch (error) {
      reject(new Error(`ERROR IN [deriveBeyondcoinAddressMultiSig] MAIN CATCH BLOCK: ${error}`))
    }
  })
}

module.exports = deriveBeyondcoinAddressMultiSig
