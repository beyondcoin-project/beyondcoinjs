/*
TEST MODULE NAME: addresses.js
PURPOSE: Test address generation functions.
NOTES: No notes.
*/

const assert = require('assert')
const expect = require('chai').expect
const beyondcoinjs = require('../main.js')

describe('Generate beyondcoin addresses', function () {
  /* newAddress() */
  describe('newAddress()', function () {
    it('should return a correctly formatted normal network address', async function () {
      const address = await beyondcoinjs.newAddress()
      const testAddress = new RegExp('[M][a-km-zA-HJ-NP-Z1-9]{26,33}')
      const testAddressResult = testAddress.test(address.address)

      assert.strictEqual(testAddressResult, true)
    })

    it('should return .WIF object property', async function () {
      const address = await beyondcoinjs.newAddress()
      expect(address.wif).to.be.a('string')
    })

    it('should return .ADDRESS object property', async function () {
      const address = await beyondcoinjs.newAddress()
      expect(address.address).to.be.a('string')
    })

    it('should return .PUBLICKEY object property', async function () {
      const address = await beyondcoinjs.newAddress()
      expect(address.publicKey).to.be.a('string')
    })
  })

  /* newTestAddress() */
  describe('newTestAddress()', function () {
    it('should return a correctly formatted test network address', async function () {
      const address = await beyondcoinjs.newTestAddress()
      const testAddress = new RegExp('[Q][a-km-zA-HJ-NP-Z1-9]{26,33}')
      const testAddressResult = testAddress.test(address.address)

      assert.strictEqual(testAddressResult, true)
    })

    it('should return .WIF object property', async function () {
      const address = await beyondcoinjs.newTestAddress()
      expect(address.wif).to.be.a('string')
    })

    it('should return .ADDRESS object property', async function () {
      const address = await beyondcoinjs.newTestAddress()
      expect(address.address).to.be.a('string')
    })

    it('should return .PUBLICKEY object property', async function () {
      const address = await beyondcoinjs.newTestAddress()
      expect(address.publicKey).to.be.a('string')
    })
  })

  /* newSeedAddress() */
  describe('newSeedAddress()', function () {
    it('should return a correctly formatted normal network address', async function () {
      const address = await beyondcoinjs.newSeedAddress('123456789')
      const testSeedAddress = new RegExp('[M][a-km-zA-HJ-NP-Z1-9]{26,33}')
      const testSeedAddressResult = testSeedAddress.test(address.address)

      assert.strictEqual(testSeedAddressResult, true)
    })

    it('should return .WIF object property', async function () {
      const address = await beyondcoinjs.newSeedAddress('123456789')
      expect(address.wif).to.be.a('string')
    })

    it('should return .ADDRESS object property', async function () {
      const address = await beyondcoinjs.newSeedAddress('123456789')
      expect(address.address).to.be.a('string')
    })

    it('should return .PUBLICKEY object property', async function () {
      const address = await beyondcoinjs.newSeedAddress('123456789')
      expect(address.publicKey).to.be.a('string')
    })

    it('should return the correct corresponding address (seed)', async function () {
      const address = await beyondcoinjs.newSeedAddress('123456789')
      assert.strictEqual(address.address, 'MEnWfw4QvckfLNSKoX7oGyHwNKLxBqtYEc')
    })

    it('should return the correct corresponding WIF (seed)', async function () {
      const address = await beyondcoinjs.newSeedAddress('123456789')
      assert.strictEqual(address.wif, 'T3nX6ctzwj2ZteVidczFfbKJn54M449Xq9ZiVijhu3TnEyEMMGYu')
    })
  })

  /* newTestSeedAddress() */
  describe('newTestSeedAddress()', function () {
    it('should return a correctly formatted normal network address', async function () {
      const address = await beyondcoinjs.newTestSeedAddress('123456789')
      const testSeedAddress = new RegExp('[Q][a-km-zA-HJ-NP-Z1-9]{26,33}')
      const testSeedAddressResult = testSeedAddress.test(address.address)

      assert.strictEqual(testSeedAddressResult, true)
    })

    it('should return .WIF object property', async function () {
      const address = await beyondcoinjs.newTestSeedAddress('123456789')
      expect(address.wif).to.be.a('string')
    })

    it('should return .ADDRESS object property', async function () {
      const address = await beyondcoinjs.newTestSeedAddress('123456789')
      expect(address.address).to.be.a('string')
    })

    it('should return .PUBLICKEY object property', async function () {
      const address = await beyondcoinjs.newTestSeedAddress('123456789')
      expect(address.publicKey).to.be.a('string')
    })

    it('should return the correct corresponding address (seed)', async function () {
      const address = await beyondcoinjs.newTestSeedAddress('123456789')
      assert.strictEqual(address.address, 'QTVLYoSic4TfsqZ1zsnM9yUEQMQVvQVpL6')
    })

    it('should return the correct corresponding WIF (seed)', async function () {
      const address = await beyondcoinjs.newTestSeedAddress('123456789')
      assert.strictEqual(address.wif, 'cNKF7nbfyQkEHFL7UPrWpZGzTSiSeREL5yovkLZfqBwcypmLFCmD')
    })
  })
})
