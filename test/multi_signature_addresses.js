/* global describe before */
/*
TEST MODULE NAME: multi_signature_addresses.js
PURPOSE: Test address generation functions for multi-sig addresses.
NOTES: No notes.
*/

const assert = require('assert')
const expect = require('chai').expect
const beyondcoinjs = require('../main.js')

describe('Generate multi signature beyondcoin addresses', function () {
  /* Generate preparatory data */
  before(async function () {
    /* Miscellaneous */
    this.normalNetworkAddressRegExp = new RegExp('[M][a-km-zA-HJ-NP-Z1-9]{26,33}')
    this.testNetworkAddressRegExp = new RegExp('[Q][a-km-zA-HJ-NP-Z1-9]{26,33}')

    /* newMultiSigAddressSet() */
    this.normalNetworkMultiSigAddress = await beyondcoinjs.newMultiSigAddressSet(3, 2, 'normal')
    this.testNetworkMultiSigAddress = await beyondcoinjs.newMultiSigAddressSet(3, 2, 'testnet')

    /* deriveMultiSigAddress() */
    const normalNetworkPublicKeys = [
      { // WIF: T9VuwBmBMfpdfZ838dDgsGBYoMb57tcC2QnqwZAW5JrFaPWNbZMU
        publicKey: '031ea86b6dde092ce7baa5fea0a6fcfbaad51140e130a2c5af17149fe231105e3b',
        index: 0
      },
      { // WIF: T8hYPA7ZWXTsM8RRDSZNUWPisW2KCcj2viEgpyh4Z4S6ZxZWEZsF
        publicKey: '03a01fcfb5e03cc51c0c63788906648c39f90170934aa7ab4d244d26187f5f094c',
        index: 1
      },
      { // WIF: T4nZbv4gLqenDayMxu3PSZKSYS68FfUB4nCGFBMdeCC4bc18WZd9
        publicKey: '028f0c7f14bb7c2387fd838345bc3b9383564c3abf4527693536e5fd47c9aa43cf',
        index: 2
      }]

    const testNetworkPublicKeys = [
      { // WIF: cPya7wQWwC37skvTyEBLe5vpnMDwZ3GKcJHPS41rMvLNXK7iAHT2
        publicKey: '0284ba38fb39865fba351c542355d48a2e9e811216c0ef6b8e798b117eb20c753c',
        index: 0
      },
      { // WIF: cNa5135Hh6zJ6K2rHqG6fG6SW68XKCDHmuYSHYMUZ1AHsnNJG223
        publicKey: '0244c3c8dd73045120bbe0a85dde8e55f9688b859cdd0624b01c0a5224effeb7f0',
        index: 1
      },
      { // WIF: cSutjxSBt3eQEKCjxp3dHtoNNMrz3kmxhKNpZHRxeYBAUayZENDm
        publicKey: '03c03fafc01786f33eb5fee9b1d920f2392b7fb13b628dffdd1b015675837a3655',
        index: 2
      }]

    this.normalNetworkDeriveMultiSigAddress = await beyondcoinjs.deriveMultiSigAddress(normalNetworkPublicKeys, 2, 'normal')
    this.testNetworkDeriveMultiSigAddress = await beyondcoinjs.deriveMultiSigAddress(testNetworkPublicKeys, 2, 'testnet')
  })
  /* newMultiSigAddressSet() */
  describe('newMultiSigAddressSet()', async function () {
    it('should return a correctly formatted master address', async function () {
      const testAddressResult = this.normalNetworkAddressRegExp.test(this.normalNetworkMultiSigAddress.master)
      assert.strictEqual(testAddressResult, true)
    })

    it('should return a KEYS array', async function () {
      expect(this.normalNetworkMultiSigAddress.keys).to.be.a('array')
      expect(this.testNetworkMultiSigAddress.keys).to.be.a('array')
    })

    it('should return [3] KEYS in array', async function () {
      assert.strictEqual(this.normalNetworkMultiSigAddress.keys.length, 3)
      assert.strictEqual(this.testNetworkMultiSigAddress.keys.length, 3)
    })

    it('should return .WITNESSSCRIPT object property', async function () {
      expect(this.normalNetworkMultiSigAddress.witnessScript).to.be.a('string')
      expect(this.testNetworkMultiSigAddress.witnessScript).to.be.a('string')
    })

    it('should return .WIF object property', async function () {
      expect(this.normalNetworkMultiSigAddress.keys[0].wif).to.be.a('string')
      expect(this.normalNetworkMultiSigAddress.keys[1].wif).to.be.a('string')
      expect(this.normalNetworkMultiSigAddress.keys[2].wif).to.be.a('string')

      expect(this.testNetworkMultiSigAddress.keys[0].wif).to.be.a('string')
      expect(this.testNetworkMultiSigAddress.keys[1].wif).to.be.a('string')
      expect(this.testNetworkMultiSigAddress.keys[2].wif).to.be.a('string')
    })

    it('should return .PUBLICKEY object property', async function () {
      expect(this.normalNetworkMultiSigAddress.keys[0].publicKey).to.be.a('string')
      expect(this.normalNetworkMultiSigAddress.keys[1].publicKey).to.be.a('string')
      expect(this.normalNetworkMultiSigAddress.keys[2].publicKey).to.be.a('string')

      expect(this.testNetworkMultiSigAddress.keys[0].publicKey).to.be.a('string')
      expect(this.testNetworkMultiSigAddress.keys[1].publicKey).to.be.a('string')
      expect(this.testNetworkMultiSigAddress.keys[2].publicKey).to.be.a('string')
    })

    it('should return .INDEX object property', async function () {
      assert.strictEqual(this.normalNetworkMultiSigAddress.keys[0].index, 0)
      assert.strictEqual(this.normalNetworkMultiSigAddress.keys[1].index, 1)
      assert.strictEqual(this.normalNetworkMultiSigAddress.keys[2].index, 2)

      assert.strictEqual(this.testNetworkMultiSigAddress.keys[0].index, 0)
      assert.strictEqual(this.testNetworkMultiSigAddress.keys[1].index, 1)
      assert.strictEqual(this.testNetworkMultiSigAddress.keys[2].index, 2)
    })
  })

  /* deriveMultiSigAddress() */
  describe('deriveMultiSigAddress()', function () {
    it('should return a correctly formatted master address', async function () {
      const testAddressResultNormalNetwork = this.normalNetworkAddressRegExp.test(this.normalNetworkDeriveMultiSigAddress.master)
      const testAddressResultTestNetwork = this.testNetworkAddressRegExp.test(this.testNetworkDeriveMultiSigAddress.master)

      assert.strictEqual(testAddressResultNormalNetwork, true)
      assert.strictEqual(testAddressResultTestNetwork, true)
    })

    it('should return correctly derived master address', async function () {
      assert.strictEqual(this.normalNetworkDeriveMultiSigAddress.master, 'MUbxofda9H43uc9QX3ee9BYbdgh1KnwnrS')
      assert.strictEqual(this.testNetworkDeriveMultiSigAddress.master, 'QPCAxsUTVzdcF12oY7kJakBNBNL32cCnAw')
    })

    it('should return .WITNESSSCRIPT object property', async function () {
      expect(this.normalNetworkMultiSigAddress.witnessScript).to.be.a('string')
      expect(this.testNetworkMultiSigAddress.witnessScript).to.be.a('string')
    })
  })
})
