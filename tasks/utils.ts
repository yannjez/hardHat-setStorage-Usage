import {ethers} from "ethers";


/**
 * Format the data to be usable as slot number
 * @param _walletAddress
 * @param _slot
 */
const getStorageSlot = (_walletAddress: string, _slot: number) => {

    /*--------*/
    /* if the contract is compiled with VYPER the paddedAddress and paddedSlot are inverted
   /*---------*/
    const paddedAddress = ethers.zeroPadValue(_walletAddress, 32);
    const paddedSlot = ethers.zeroPadValue(ethers.toBeHex(_slot), 32);
    return ethers.keccak256(paddedAddress + paddedSlot.slice(2));
}

/**
 * Get the value from the storage
 * @param _tokenAddress
 * @param _walletAddress
 * @param _slot
 * @param provider hardHat provider
 */
const getStorageValue = async (_tokenAddress: string, _walletAddress: string, _slot: number,provider:any) => {
    const storageSlot = getStorageSlot(_walletAddress, _slot)
    return await provider.getStorage(_tokenAddress, storageSlot)
}


/**
 * Get the balance of an address for a given ERC20 token
 * @param _tokenAddress
 * @param _walletAddress
 * @param provider JsonRpcProvider
 */
const getBalanceOf = async (_tokenAddress: string, _walletAddress: string, provider: any): Promise<BigInt> => {
    const tokenABI = [
        "function balanceOf(address owner) view returns (uint256)"
    ];
    const tokenContract = new ethers.Contract(_tokenAddress, tokenABI, provider);
    return await tokenContract.balanceOf(_walletAddress);
}


export {getStorageSlot, getBalanceOf,getStorageValue}