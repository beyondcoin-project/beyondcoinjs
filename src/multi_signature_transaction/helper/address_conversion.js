/*
MODULE NAME: address_conversion.js
PURPOSE: Convert addresses back into deprecated formatting.
DEPENDENCIES:
    (a) /lib/core/index.js
EXPORTS:
    (a) addressConversion()
NOTES:
    (a) This function is required in order for current standard addresses
    to work properly with the rest of the codebase. This will likely need
    to be removed at some point and the bitcoinjs-lib codebase re-adjusted
    or updated to the new address encoding standard.
*/

const beyondcoinjs = require('../../../lib/core/index.js')

function addressConversion (address, addressType) {
  return new Promise((resolve, reject) => {
    try {
      // Do not convert legacy addresses
      // "L", "3" (NORMAL NETWORK)
      // "m", "2" (TEST NETWORK)
      if (!(address[0] === 'L' ||
         address[0] === '3' ||
         address[0] === 'm' ||
         address[0] === '2')) {
        if (addressType === 'normal') {
          const addressReturn = beyondcoinjs.address.toBase58Check(beyondcoinjs.address.fromBase58Check(address)['hash'], 50)
          resolve(addressReturn)
        } else if (addressType === 'testnet') {
          const addressReturn = beyondcoinjs.address.toBase58Check(beyondcoinjs.address.fromBase58Check(address)['hash'], 196)
          resolve(addressReturn)
        } else {
          reject(new TypeError('Invalid addressType specified in [addressConversion] function'))
        }
      } else {
        resolve(address) // No conversion
      }
    } catch (error) {
      reject(new Error(`ERROR IN [addressConversion] MAIN CATCH BLOCK: ${error}`))
    }
  })
};

module.exports = addressConversion
