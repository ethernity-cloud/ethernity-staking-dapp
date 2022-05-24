import { ethers } from 'ethers';
import { contract } from '../contract/etnyContract';

class EtnyContract {
  library = null;

  etnyContract = null;

  constructor(library) {
    this.library = library;
    this.etnyContract = new ethers.Contract(contract.address, contract.abi, library);
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
