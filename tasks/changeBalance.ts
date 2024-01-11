import {task} from "hardhat/config";
import {getBalanceOf, getStorageSlot} from "./utils";
import {setStorageAt} from "@nomicfoundation/hardhat-network-helpers";


task("changeBalance", "Change the balance of a token for an walletAddress",
    async function (taskArguments, hre, runSuper) {


        // take the ERC20 you want to check
        const tokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // USDC

        // find a wallet address that owns this token in the holder tabs on "etherscan.io"
        const walletAddress = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503"; // The address you want to check

        // check findSlot
        const slotNumber = 9;

        // get the balance for comparaison
        const balanceBefore = await getBalanceOf(tokenAddress, walletAddress, hre.ethers.provider)

        const newBalance = 100000000n;

        if (balanceBefore === newBalance)
            throw Error('No change required ')

        const slot = getStorageSlot(walletAddress, slotNumber);
        // 100 (+ 6 decimals)
        await setStorageAt(tokenAddress, slot, newBalance);

        //Check if the operation was effective
        const balanceAfter = await getBalanceOf(tokenAddress, walletAddress, hre.ethers.provider)

        if (balanceAfter === balanceBefore)
            throw Error('No balance change')

        if (balanceAfter !== newBalance)
            throw Error('incorrect balance change')

        console.log(`Balance changed from ${balanceBefore} => ${balanceAfter}`)

    });