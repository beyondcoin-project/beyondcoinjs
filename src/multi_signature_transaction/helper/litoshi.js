/*
MODULE NAME: litoshi.js
PURPOSE: Provide conversion to and from beyondcoin/litoshi values.
DEPENDENCIES:
    (a) big.js (NPM MODULE)
EXPORTS:
    (a) toBeyondcoin(NUMBER)
    (b) toLitoshi(NUMBER)
NOTES:
    (a) Credit to https://github.com/dawsbot/satoshi-bitcoin
*/

const Big = require('big.js')

// @private
var conversion = 100000000

// es6 polyfill
if (!Number.isInteger) {
  Number.isInteger = function (num) {
    return typeof num === 'number' && num % 1 === 0
  }
}

// @private
function toNumber (notNum) {
  return Number(notNum)
}

/*
   * Convert litoshi to beyondcoin
   * @param {number|string} litoshi Amount of litoshi to convert. Must be a whole number
   * @throws {TypeError} Thrown if input is not a number or string
   * @throws {TypeError} Thrown if input is not a whole number or string format whole number
   * @returns {number}
*/
function toBeyondcoin (litoshi) {
  return new Promise((resolve, reject) => {
    try {
    // validate arg
      var litoshiType = typeof litoshi
      if (litoshiType === 'string') {
        litoshi = toNumber(litoshi)
        litoshiType = 'number'
      }
      if (litoshiType !== 'number') {
        throw new TypeError('toBeyondcoin must be called on a number or string, got ' + litoshiType)
      }
      if (!Number.isInteger(litoshi)) {
        throw new TypeError('toBeyondcoin must be called on a whole number or string format whole number')
      }

      var biglitoshi = new Big(litoshi)
      const toBeyondcoinReturn = Number(biglitoshi.div(conversion))
      resolve(toBeyondcoinReturn)
    } catch (error) {
      reject(new Error(`ERROR IN [toBeyondcoin] MAIN CATCH BLOCK: ${error}`))
    }
  })
};

/*
   * Convert beyondcoin to litoshi
   * @param {number|string} beyondcoin Amount of beyondcoin to convert
   * @throws {TypeError} Thrown if input is not a number or string
   * @returns {number}
*/
function toLitoshi (beyondcoin) {
  return new Promise((resolve, reject) => {
    try {
    // validate arg
      var beyondcoinType = typeof beyondcoin
      if (beyondcoinType === 'string') {
        beyondcoin = toNumber(beyondcoin)
        beyondcoinType = 'number'
      }
      if (beyondcoinType !== 'number') {
        throw new TypeError('toLitoshi must be called on a number or string, got ' + beyondcoinType)
      }

      var bigbeyondcoin = new Big(beyondcoin)
      const toLitoshiReturn = Number(bigbeyondcoin.times(conversion))
      resolve(toLitoshiReturn)
    } catch (error) {
      reject(new Error(`ERROR IN [toLitoshi] MAIN CATCH BLOCK: ${error}`))
    }
  })
};

module.exports = {
  toBeyondcoin: toBeyondcoin,
  toLitoshi: toLitoshi
}
