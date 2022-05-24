import { ethers } from 'ethers';
import { contract } from '../contract/etnyStakingContract';

class EtnyStakingContract {
  library = null;

  stakingContract = null;

  stakingContractWithSigner = null;

  constructor(library) {
    this.library = library;
    this.stakingContract = new ethers.Contract(contract.address, contract.abi, library);
    this.stakingContractWithSigner = new ethers.Contract(contract.address, contract.abi, library.getSigner());
  }

  async getMinBaseStakeAmount() {
    try {
      const amount = await this.stakingContract.getMinBaseStakeAmount();
      return amount.toNumber();
    } catch (ex) {
      return ex.message;
    }
  }

  async getMaxBaseStakeAmount() {
    try {
      const amount = await this.stakingContract.getMaxBaseStakeAmount();
      return amount.toNumber();
    } catch (ex) {
      return ex.message;
    }
  }

  async getCurrentApyPercentage() {
    try {
      const apyPercentage = await this.stakingContract.getCurrentApyPercentage();
      return apyPercentage.toNumber();
    } catch (ex) {
      return ex.message;
    }
  }

  async getMinPeriodForStake() {
    try {
      const minPeriod = await this.stakingContract.getMinPeriodForStake();
      return minPeriod.toNumber();
    } catch (ex) {
      return ex.message;
    }
  }

  async getStakeTotalSupply() {
    try {
      const totalSupply = await this.stakingContract.getMaxBaseStakeAmount();
      return totalSupply.toNumber();
    } catch (ex) {
      return ex.message;
    }
  }

  // BASE STAKING REQUEST
  async getBaseStake(baseStakeId) {
    try {
      return await this.stakingContract.getBaseStake(baseStakeId);
    } catch (ex) {
      return ex.message;
    }
  }

  async getBaseStakeRequestTotal() {
    try {
      const total = await this.stakingContract.getBaseStakeRequestTotal();
      return total.toNumber();
    } catch (ex) {
      return ex.message;
    }
  }

  async addBaseStakeRequest(nodeAddress, amount, period) {
    try {
      // const receipt = await transaction.wait();
      return await this.stakingContractWithSigner.addBaseStakeRequest(nodeAddress, amount, period);
    } catch (ex) {
      return ex.message;
    }
  }

  async approveBaseStakeRequest(baseStakeId, rewardAddress) {
    try {
      return await this.stakingContractWithSigner.approveBaseStakeRequest(baseStakeId, rewardAddress);
    } catch (ex) {
      return ex.message;
    }
  }

  async cancelBaseStakeRequest(baseStakeId) {
    try {
      return await this.stakingContractWithSigner.cancelBaseStakeRequest(baseStakeId);
    } catch (ex) {
      return ex.message;
    }
  }

  async declineBaseStakeRequest(baseStakeId) {
    try {
      return await this.stakingContractWithSigner.declineBaseStakeRequest(baseStakeId);
    } catch (ex) {
      return ex.message;
    }
  }
}

export default EtnyStakingContract;
