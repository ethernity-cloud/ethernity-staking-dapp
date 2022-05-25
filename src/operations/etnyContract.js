import { ethers } from 'ethers';
import { contract } from '../contract/etnyContract';

class EtnyContract {
  library = null;

  etnyContract = null;

  ethereum = null;

  constructor(library) {
    this.library = library;
    this.etnyContract = new ethers.Contract(contract.address, contract.abi, library);
    this.ethereum = window.ethereum;
  }

  getProvider() {
    const provider = new ethers.providers.Web3Provider(this.ethereum, 'any');
    const { provider: ethereum } = provider;
    return ethereum;
  }

  async getBalance(account) {
    try {
      const balance = await this.etnyContract.balanceOf(account);

      // convert a currency unit from wei to ether
      const balanceFormatted = ethers.utils.formatEther(balance);

      console.log(`balance: ${balanceFormatted} ETNY`);

      return balanceFormatted;
    } catch (ex) {
      return ex.message;
    }
  }
}

export default EtnyContract;
