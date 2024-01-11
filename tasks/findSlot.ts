import {task} from "hardhat/config";
import {getBalanceOf, getStorageValue} from "./utils";





task("findSlot", "Find the slot of balanceOf for a token ",
    async function (taskArguments, hre, runSuper) {


        const maxSlotCheck = 20;

        // take the ERC20 you want to check
        const tokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // USDC

        // find a wallet address that owns this token in the holder tabs on "etherscan.io"
        const walletAddress = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503"; // The address you want to check

        // get the balance for comparaison
        const balance = await getBalanceOf(tokenAddress, walletAddress, hre.ethers.provider)
        if (balance === 0n)
            throw Error("Balance === 0n, choose another walletAddress")

        // iterate on slot until we find the balance
        for (let i = 0; i < maxSlotCheck; i++) {
            const storageValue = await getStorageValue(tokenAddress, walletAddress, i, hre.ethers.provider);
            console.debug(`Testing slot ${i.toString()} => ${BigInt(storageValue)} -- ${balance.toString()} `)
            if (BigInt(storageValue) === balance) {
                console.log(`Find a match at slot ${i} \n`)
                break;
            }
        }
    });