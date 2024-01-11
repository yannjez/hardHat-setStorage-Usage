# setStorage in hardHat

Project to demonstrate the use of getStorage and setStorage in a hardHat environment


## Hardhat ERC-20 Balance Modifier

### Description

The changeBalance task interacts with an ERC-20 token contract to modify the balance of a specific address. It is useful
in scenarios where you need to simulate token balances for testing smart contract interactions or dApp functionalities.

### How it Works

- The task targets a specified ERC-20 token contract and a specific wallet address.
- It changes the balance of the token for the specified address to a new value.
- This is achieved by directly interacting with the storage slot corresponding to the balance of the address in the
  token contract.

### Usage

```npx hardhat changeBalance```<br/>
```npm run  changeBalance```

## Hardhat Slot finder

### Description

The `findSlot` task is designed to identify the storage slot of the `balanceOf` function for a specific ERC-20 token.
This task is particularly useful for developers and auditors who need to understand the storage layout of an ERC-20
token contract on Ethereum.

### How it Works

- The task iterates through the storage slots of a given ERC-20 token contract.
- It checks up to `maxSlotCheck` slots to find where the balance of a specified wallet address is stored.
- The task utilizes two custom utility functions: `getBalanceOf` and `getStorageValue`.
    - `getBalanceOf`: Retrieves the balance of the specified wallet address from the token contract.
    - `getStorageValue`: Reads the value at a specific storage slot for the given wallet address.

### Usage

```npx hardhat findSlot ``` <br/>
```npm run  findSlot ```



## Basic hardhat commands 

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```