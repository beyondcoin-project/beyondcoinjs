/*
MODULE NAME: address.js
PURPOSE: Generate beyondcoin addresses.
DEPENDENCIES:
    (a) /lib/core/index.js
EXPORTS:
    (a) createBeyondcoinAddressPair()
        (a1) Returns a beyondcoin address and the associated WIF,
        (a2) Real example of returned address pair below:
        { address: 'MBeeHGfof2EwNobqyyA5fK6bNRij5CrQAC',
          wif: 'T43wmV2KzF8qmXXvsRGUeBNS1tSFotzy8jCYQHpX1GWUYFzfnXAu',
          publicKey: '02b2687cb1cb5eb05454b6ef3dd835a69a9b9f78585e07d3104ca87b62e869136e'
        }
    (b) createTestBeyondcoinAddressPair()
        (b1) Returns a TESTNET beyondcoin address and the associated WIF,
        (b2) Real example of returned address pair below:
        { address: 'QXkngBb93AWdckZK5FnHGXgSYaQASLb4qN',
          wif: 'cSL4NZoBexSFZF4pBZQMDWDHAVKtxyeuSR8v2deJLSuipCtHmG3V',
          publicKey: '02b2687cb1cb5eb05454b6ef3dd835a69a9b9f78585e07d3104ca87b62e869136e'
        }
NOTES:
    (a) The wallet import format (WIF) is an encoded version of
    the private key.
*/

const beyondcoinjs = require('../lib/core/index.js')

function createBeyondcoinAddressPair () {
  return new Promise((resolve, reject) => {
    try {
      // Set beyondcoin specific configuration.
      const beyondcoinNetwork = beyondcoinjs.networks.beyondcoin
      const keyPair = beyondcoinjs.ECPair.makeRandom({ network: beyondcoinNetwork })
      const wif = keyPair.toWIF()

      const keyPairRaw = beyondcoinjs.ECPair.fromWIF(wif, beyondcoinNetwork)
      const pubKeyBuffer = keyPairRaw.getPublicKeyBuffer() // buffer version
      const publicKey = pubKeyBuffer.toString('hex') // hex version

      const redeemScript = beyondcoinjs.script.witnessPubKeyHash.output.encode(beyondcoinjs.crypto.hash160(pubKeyBuffer))
      const scriptPubKey = beyondcoinjs.script.scriptHash.output.encode(beyondcoinjs.crypto.hash160(redeemScript))

      const address = beyondcoinjs.address.fromOutputScript(scriptPubKey, beyondcoinNetwork)
      resolve({ address, wif, publicKey })
    } catch (error) {
      reject(new Error(`ERROR IN [createBeyondcoinAddressPair] MAIN CATCH BLOCK: ${error}`))
    }
  })
}

function createTestBeyondcoinAddressPair () {
  return new Promise((resolve, reject) => {
    try {
      // Set beyondcoin specific configuration.
      const beyondcoinNetwork = beyondcoinjs.networks.testnet
      const keyPair = beyondcoinjs.ECPair.makeRandom({ network: beyondcoinNetwork })
      const wif = keyPair.toWIF()

      const keyPairRaw = beyondcoinjs.ECPair.fromWIF(wif, beyondcoinNetwork)
      const pubKeyBuffer = keyPairRaw.getPublicKeyBuffer() // buffer version
      const publicKey = pubKeyBuffer.toString('hex') // hex version

      const redeemScript = beyondcoinjs.script.witnessPubKeyHash.output.encode(beyondcoinjs.crypto.hash160(pubKeyBuffer))
      const scriptPubKey = beyondcoinjs.script.scriptHash.output.encode(beyondcoinjs.crypto.hash160(redeemScript))

      var address = beyondcoinjs.address.fromOutputScript(scriptPubKey, beyondcoinNetwork)
      // Convert address to current SegWit encoding standard
      address = beyondcoinjs.address.toBase58Check(beyondcoinjs.address.fromBase58Check(address)['hash'], 58)
      resolve({ address, wif, publicKey })
    } catch (error) {
      reject(new Error(`ERROR IN [createTestBeyondcoinAddressPair] MAIN CATCH BLOCK: ${error}`))
    }
  })
}

module.exports = {
  createBeyondcoinAddressPair: createBeyondcoinAddressPair,
  createTestBeyondcoinAddressPair: createTestBeyondcoinAddressPair
}
