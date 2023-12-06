const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_lynx",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "LynxVault__InvalidAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LynxVault__NotOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LynxVault__NotWhitelisted",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LynxVault__ProperChannels",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "SetWhitelist",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_addresses",
        "type": "address[]"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "addMultipleWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lynx",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_otherToken",
        "type": "address"
      }
    ],
    "name": "recoverERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "setWhitelistStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "whitelisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export default abi;