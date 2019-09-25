// See prefix examples for BTC - https://en.bitcoin.it/wiki/List_of_address_prefixes
// Prefix information for BYND and testnet coming soon.

module.exports = {
  beyondcoin: {
    messagePrefix: '\x19Beyondcoin Signed Message:\n',
    bip32: {
      public: 0x019da462,
      private: 0x019d9cfe
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0
  },
  testnet: {
    messagePrefix: '\x18Beyondcoin Signed Message:\n',
    bip32: {
      public: 0x0436ef7d,
      private: 0x0436f6e1
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef
  }
}
