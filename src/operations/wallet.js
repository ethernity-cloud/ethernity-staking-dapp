import { ethers } from 'ethers';
import { contract } from '../contract/erc20';

export const getWalletBalance = async (library) => {
  try {
    await library.send('eth_requestAccounts', []);
    const signer = library.getSigner();
    const walletAddress = await signer.getAddress();

    const etnyContract = new ethers.Contract(contract.address, contract.abi, library);
    const balance = await etnyContract.balanceOf(walletAddress);
    // const balance = await provider.getBalance(walletAddress);

    // convert a currency unit from wei to ether
    const balanceFormatted = ethers.utils.formatEther(balance);

    console.log(`balance: ${balanceFormatted} ETNY`);

    return balanceFormatted;
    // setTimeout(() => {
    //   setBalance(balanceFormatted);
    //   setLoading(false);
    // }, 1000);
  } catch (error) {
    return null;
  }
};
