/*
TEST MODULE NAME: transactions.js
PURPOSE: Test transaction build functions.
NOTES: No notes.
*/

const assert = require('assert')
const beyondcoinjs = require('../main.js')

describe('Generate beyondcoin transactions', function () {
  /* newTransaction() [NORMAL NETWORK] */
  describe('newTransaction() [NORMAL NETWORK]', function () {
    it('should return correct HEX for 1 to 1 transaction', async function () {
      /* Build transaction */
      const TransactionHexResult = await beyondcoinjs.newTransaction({
        network: 'normal',
        wif: 'TB4jGAWf7drXBP4WMsHFh21NUQyC5ACkunveQta9zfMBunEamEek',
        utxo: [{
          txid: 'f6f88dcabf62ceace717eba00eb3993105a06ef3442a7e959e8ec2a3921555d6',
          index: 1,
          amount: 2500 // unspent amount
        }],
        output: [{
          address: 'MNZnbtzP6CqxUb2EqxRyov1i18NEgpZ5ek',
          amount: 1500
        }],
        fee: 1000 // transaction fee
      })
      assert.strictEqual(TransactionHexResult, '01000000000101d6551592a3c28e9e957e2a44f36ea0053199b30ea0eb17e7acce62bfca8df8f60100000017160014296fa7d715a65bfa33d2e4338f1748b36b57cb3fffffffff01dc0500000000000017a914a0dfed823efb34a3dec25952b4c36d03584bd5fb8702473044022016102caeb44eb2476cab9bfca9b5ef61bc13c6adfb0ace07add8885df8c598670220763c889f42f4bff6aa844168596a9908814682093eb13d01eace399b6e5bd4c401210378c055cc1e8cb385a1b8b485892e147e8fc071de07b8826bde7e1ac00c343df300000000')
    })

    it('should return correct HEX for 1 to 2 transaction', async function () {
      /* Build transaction */
      const TransactionHexResult = await beyondcoinjs.newTransaction({
        network: 'normal',
        wif: 'TB4jGAWf7drXBP4WMsHFh21NUQyC5ACkunveQta9zfMBunEamEek',
        utxo: [{
          txid: 'f6f88dcabf62ceace717eba00eb3993105a06ef3442a7e959e8ec2a3921555d6',
          index: 1,
          amount: 5500 // unspent amount
        }],
        output: [{
          address: 'MNZnbtzP6CqxUb2EqxRyov1i18NEgpZ5ek',
          amount: 2500
        },
        {
          address: 'M8K9A3qeY8vV378zVTh8a3axsffjnfidXX',
          amount: 2500
        }],
        fee: 500 // transaction fee
      })
      assert.strictEqual(TransactionHexResult, '01000000000101d6551592a3c28e9e957e2a44f36ea0053199b30ea0eb17e7acce62bfca8df8f60100000017160014296fa7d715a65bfa33d2e4338f1748b36b57cb3fffffffff02c40900000000000017a914a0dfed823efb34a3dec25952b4c36d03584bd5fb87c40900000000000017a914048915d4ec8045a14f81d24f5a25efc83be94bdb8702473044022064f4d2a14b8627ee464f434b855441636c10e70044f502c7df6fc8a1876f24ec022066a7ab1146cf025c7e2dde3a8de20fb790d1b16169bdf360e45a2261f7a5c56e01210378c055cc1e8cb385a1b8b485892e147e8fc071de07b8826bde7e1ac00c343df300000000')
    })

    it('should return correct HEX for 2 to 4 transaction', async function () {
      /* Build transaction */
      const TransactionHexResult = await beyondcoinjs.newTransaction({
        network: 'normal',
        wif: 'T5ToXxC9NsyngAoDPMRQrmSKaHjrZ8cXKGwHPffvqFxAHJuZVxVm',
        utxo: [{
          txid: 'f6f88dcabf62ceace717eba00eb3993105a06ef3442a7e959e8ec2a3921555d6',
          index: 1,
          amount: 25000 // unspent amount
        },
        {
          txid: '4a1d36e216a81528d05dcd9e00f688f55eeee815aa74972dc597b9e2c963fd9d',
          index: 0,
          amount: 25000 // unspent amount
        }],
        output: [{
          address: 'MNZnbtzP6CqxUb2EqxRyov1i18NEgpZ5ek',
          amount: 12250
        },
        {
          address: 'MLZ2rX9Sc2aHiqx3ZaAtAahPo5DnGtEf2H',
          amount: 12250
        },
        {
          address: 'MDoFovRgVciQ8LpLqo5Co8974voA3yqpBn',
          amount: 12250
        },
        {
          address: 'MDv1viQS63YZ39RxKLXTXiKRbQzfJqV3ot',
          amount: 12250
        }],

        fee: 1000 // transaction fee

      }
      )
      assert.strictEqual(TransactionHexResult, '01000000000102d6551592a3c28e9e957e2a44f36ea0053199b30ea0eb17e7acce62bfca8df8f60100000017160014ba9d1a1991ddef5ec26ec06ffbfe516c4a7bf483ffffffff9dfd63c9e2b997c52d9774aa15e8ee5ef588f6009ecd5dd02815a816e2361d4a0000000017160014ba9d1a1991ddef5ec26ec06ffbfe516c4a7bf483ffffffff04da2f00000000000017a914a0dfed823efb34a3dec25952b4c36d03584bd5fb87da2f00000000000017a9148acb2845dd1759650cd78488f5cb8beabec3922c87da2f00000000000017a91440b2ea2ce99914963770e50cb6ed1f46a5c0c7b787da2f00000000000017a91441fa3cd57adac4889ca8b8c4ab7cbc4fb220cfbf8702483045022100fc27ce8a74f914d7eac67ace44376f9295f5fa11821a925973c6b7879ebd41040220652f9fa907c263df37305e7037f1b499a2427ab7b62e6cf994c0a8e9c8c4f9ed01210311a741aa69a613d0ecfec0417ca968bcadcbe7710f13102bb8e997fbb3e9586c02483045022100afa90ffddc9afdff6b5c078977f1e398de544a0d5ef7d5b60891a1bcbcfcd98d0220248a260ef4c8c23c68eafaf386f8fbafabbc34ed838d7f52b1e316e5dde91c1601210311a741aa69a613d0ecfec0417ca968bcadcbe7710f13102bb8e997fbb3e9586c00000000')
    })

    it('should return correct error if output(s) value exceed utxo', async function () {
      /* Build transaction */
      try {
        await beyondcoinjs.newTransaction({
          network: 'normal',
          wif: 'TB4jGAWf7drXBP4WMsHFh21NUQyC5ACkunveQta9zfMBunEamEek',
          utxo: [{
            txid: 'f6f88dcabf62ceace717eba00eb3993105a06ef3442a7e959e8ec2a3921555d6',
            index: 1,
            amount: 2500 // unspent amount
          }],
          output: [{
            address: 'MNZnbtzP6CqxUb2EqxRyov1i18NEgpZ5ek',
            amount: 3500
          }],
          fee: 1000 // transaction fee
        })
      } catch (error) {
        assert.strictEqual(error.toString(), 'Error: Output exceeds UTXO provided to build transaction.')
      }
    })
  })

  /* newTransaction() [TEST NETWORK] */
  describe('newTransaction() [TEST NETWORK]', function () {
    it('should return correct HEX for 1 to 1 transaction', async function () {
      /* Build transaction */
      const TransactionHexResult = await beyondcoinjs.newTransaction({
        network: 'testnet',
        wif: 'cMopVaSzQR3ZenLMWsbyMXcsfkJNfarQUFrDYYPs73PGHvrfNCPh',
        utxo: [{
          txid: '250ad65870edbce54c16f705b73ca7c35a01b1f0b1154ee4e213a9fdecf3a6a6',
          index: 1,
          amount: 5500 // unspent amount
        }],
        output: [{
          address: 'QaZD9HhAXG3DribW853ke2PspWyTyngL49',
          amount: 5000
        }],
        fee: 500 // transaction fee
      })
      assert.strictEqual(TransactionHexResult, '01000000000101a6a6f3ecfda913e2e44e15b1f0b1015ac3a73cb705f7164ce5bced7058d60a250100000017160014902e4ee85281e3194a8a039a4033f2285e93c819ffffffff01881300000000000017a914990b64c186ce6630e5226bbbd5fe8de4ff4fcdb6870247304402204c3483b18bca372324d01c4e017d0d6f723a31f7caa44e81497a6b5e7d80fa3e02202fc5b0c4bc438dbaa5eddadab20c7776d48b25234c9936ab2119ced7c7b740e2012102a02de90b7dd7f66291db0443363bf00a845d3fbba7710ed5cc381620d5ca6fa400000000')
    })

    it('should return correct HEX for 1 to 2 transaction', async function () {
      /* Build transaction */
      const TransactionHexResult = await beyondcoinjs.newTransaction({
        network: 'testnet',
        wif: 'cMopVaSzQR3ZenLMWsbyMXcsfkJNfarQUFrDYYPs73PGHvrfNCPh',
        utxo: [{
          txid: '250ad65870edbce54c16f705b73ca7c35a01b1f0b1154ee4e213a9fdecf3a6a6',
          index: 1,
          amount: 5500 // unspent amount
        }],
        output: [{
          address: 'QRwiZvgnMD534gfL7rfubJWVH23W9oCpyj',
          amount: 2500
        },
        {
          address: 'QaZD9HhAXG3DribW853ke2PspWyTyngL49',
          amount: 2500
        }],
        fee: 500 // transaction fee
      })
      assert.strictEqual(TransactionHexResult, '01000000000101a6a6f3ecfda913e2e44e15b1f0b1015ac3a73cb705f7164ce5bced7058d60a250100000017160014902e4ee85281e3194a8a039a4033f2285e93c819ffffffff02c40900000000000017a9143a93f9aab5191d13f781479bdd29fdbb8d65865587c40900000000000017a914990b64c186ce6630e5226bbbd5fe8de4ff4fcdb68702483045022100ca9bdbe75f4676508cec138022523c920a1e1f7014d14d1c29445affe4aedf190220246dc4deff046ed9ab7aaf1496e3d4a4f93dcb1578d7eaaf6cf39dac719a1cd8012102a02de90b7dd7f66291db0443363bf00a845d3fbba7710ed5cc381620d5ca6fa400000000')
    })

    it('should return correct HEX for 2 to 4 transaction', async function () {
      /* Build transaction */
      const TransactionHexResult = await beyondcoinjs.newTransaction({
        network: 'testnet',
        wif: 'cMopVaSzQR3ZenLMWsbyMXcsfkJNfarQUFrDYYPs73PGHvrfNCPh',
        utxo: [{
          txid: '250ad65870edbce54c16f705b73ca7c35a01b1f0b1154ee4e213a9fdecf3a6a6',
          index: 1,
          amount: 25000 // unspent amount
        },
        {
          txid: '4a1d36e216a81528d05dcd9e00f688f55eeee815aa74972dc597b9e2c963fd9d',
          index: 0,
          amount: 25000 // unspent amount
        }],
        output: [{
          address: 'QjNNdS1FbwU7H7a4e8C29Jg7LSsjx3dfcq',
          amount: 12250
        },
        {
          address: 'QR2n6XdmNG2V2wLAiNGtSwMpoW1j1XoC3p',
          amount: 12250
        },
        {
          address: 'QbP15DSSsAu4YVoPTCP35WbMJk952DGAfn',
          amount: 12250
        },
        {
          address: 'QWSwnEq3eXX56qAM26qa9pzMjnc5KFiRU9',
          amount: 12250
        }],

        fee: 1000 // transaction fee

      }
      )
      assert.strictEqual(TransactionHexResult, '01000000000102a6a6f3ecfda913e2e44e15b1f0b1015ac3a73cb705f7164ce5bced7058d60a250100000017160014902e4ee85281e3194a8a039a4033f2285e93c819ffffffff9dfd63c9e2b997c52d9774aa15e8ee5ef588f6009ecd5dd02815a816e2361d4a0000000017160014902e4ee85281e3194a8a039a4033f2285e93c819ffffffff04da2f00000000000017a914f9b7de30354971c0590c908019b5a2cb98a90c3a87da2f00000000000017a9143090dfbeb332e2339f064b80ee7848e382fb661187da2f00000000000017a914a21548b5bf9b74fefd6db46c363684a002627d7e87da2f00000000000017a9146bfb9202976604e5225f0db9acb64362048a72c08702483045022100c0829356da5176549b3e90f0a8fb7cd265802897b1f0385b480be79359bd42f502200a2d43a62e2318f3615370fc0935b438970471a0d6aba4f60d46a87447c67b06012102a02de90b7dd7f66291db0443363bf00a845d3fbba7710ed5cc381620d5ca6fa40247304402207d2c634bef7a8f9541567dbc06131109185415fd71719f3f3a1e036d0fee688e0220510248b1445d94180c7145091f0fb435af6c6ba1d9f8f7b1da67e380dcb43fa9012102a02de90b7dd7f66291db0443363bf00a845d3fbba7710ed5cc381620d5ca6fa400000000')
    })

    it('should return correct error if output(s) value exceed utxo', async function () {
      /* Build transaction */
      try {
        await beyondcoinjs.newTransaction({
          network: 'testnet',
          wif: 'cMopVaSzQR3ZenLMWsbyMXcsfkJNfarQUFrDYYPs73PGHvrfNCPh',
          utxo: [{
            txid: 'f6f88dcabf62ceace717eba00eb3993105a06ef3442a7e959e8ec2a3921555d6',
            index: 1,
            amount: 2500 // unspent amount
          }],
          output: [{
            address: 'QRwiZvgnMD534gfL7rfubJWVH23W9oCpyj',
            amount: 3500
          }],
          fee: 1000 // transaction fee
        })
      } catch (error) {
        assert.strictEqual(error.toString(), 'Error: Output exceeds UTXO provided to build transaction.')
      }
    })
  })
})
