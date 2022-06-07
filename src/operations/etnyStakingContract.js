import { ethers } from 'ethers';
import { contract } from '../contract/etnyStakingContract';
import { StakingRequestType } from '../utils/StakingRequestType';

class EtnyStakingContract {
  library = null;

  stakingContract = null;

  stakingContractWithSigner = null;

  ethereum = null;

  constructor(library) {
    this.library = library;
    this.stakingContract = new ethers.Contract(contract.address, contract.abi, library);
    this.stakingContractWithSigner = new ethers.Contract(contract.address, contract.abi, library.getSigner());
    this.ethereum = window.ethereum;
  }

  getProvider() {
    const provider = new ethers.providers.Web3Provider(this.ethereum, 'any');
    const { provider: ethereum } = provider;
    return ethereum;
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
      const item = await this.stakingContract.getBaseStake(baseStakeId);
      return {
        nodeAddress: item.nodeAddress,
        stakeHolderAddress: item.stakeHolderAddress,
        amount: item.amount.toNumber(),
        period: item.period.toNumber(),
        status: item.status,
        split: item.operatorReward || 100,
        isPreApproved: item.autoConfirm,
        canBeSplitted: item.allowMultipleOp,
        // timestamp received is in seconds, so we have to convert it to milliseconds
        timestamp: item.timestamp.toNumber() * 1000,
        type: item.stakeType === 0 ? StakingRequestType.BASE : StakingRequestType.EXTENDED,
        id: item._baseStakeId.toNumber()
      };
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

  // EXTENDED STAKING REQUEST
  async getExtendedStake(extendedStakeId) {
    try {
      const item = await this.stakingContract.getExtendedStake(extendedStakeId);
      console.log(item);
      return {
        canBeSplitted: item.allowMultipleOp,
        amount: item.amount.toNumber(),
        amountBooked: item.amountBooked.toNumber(),
        isPreApproved: item.autoConfirm,
        nodeAddress: item.nodeAddress,
        split: item.operatorReward || 100,
        period: item.period.toNumber(),
        rewardAddress: item.rewardAddress,
        stakeHolderAddress: item.stakeHolderAddress,
        stakingContracts: item.stakingContracts.toNumber(),
        status: item.status,
        // timestamp received is in seconds, so we have to convert it to milliseconds
        timestamp: item.timestamp.toNumber() * 1000,
        type: item.stakeType === 0 ? StakingRequestType.BASE : StakingRequestType.EXTENDED,
        id: item._baseStakeId.toNumber()
      };
    } catch (ex) {
      return ex.message;
    }
  }

  async getExtendedStakeRequestContractStats(extendedStakeId) {
    try {
      const item = await this.stakingContract.getExtendedStakeRequestContractStats(extendedStakeId);
      return {
        total: item.allContracts.toNumber(),
        approvedContracts: item.approvedContracts.toNumber(),
        canceledContracts: item.canceledContracts.toNumber(),
        declinedContracts: item.declinedContracts.toNumber(),
        pendingContracts: item.pendingContracts.toNumber(),
        terminatedContracts: item.terminatedContracts.toNumber(),
        id: item._extendedStakeId.toNumber()
      };
    } catch (ex) {
      return ex.message;
    }
  }

  async getStakeContractForStake(extendedStakeId, stakeContract) {
    try {
      const item = await this.stakingContract.getStakeContractForStake(extendedStakeId, stakeContract);
      return {
        amount: item.amount.toNumber(),
        nodeAddress: item.nodeAddress,
        nodeRewardAddress: item.nodeRewardAddress,
        period: item.period.toNumber(),
        stakeContractId: item.stakeContractId.toNumber(),
        stakeHolderAddress: item.stakeHolderAddress,
        stakeHolderRewardAddress: item.stakeHolderRewardAddress,
        status: item.status,
        // split: item.operatorReward || 100,
        // isPreApproved: item.autoConfirm,
        // canBeSplitted: item.allowMultipleOp,
        // timestamp received is in seconds, so we have to convert it to milliseconds
        timestamp: item.timestamp.toNumber() * 1000,
        // type: item.stakeType === 0 ? StakingRequestType.BASE : StakingRequestType.EXTENDED,
        id: item._stakeId.toNumber()
      };
    } catch (ex) {
      return ex.message;
    }
  }

  async getExtendedStakeRequestTotal() {
    try {
      const total = await this.stakingContract.getExtendedStakeRequestTotal();
      return total.toNumber();
    } catch (ex) {
      return ex.message;
    }
  }

  async addExtendedStakeRequest(nodeAddress, amount, rewardAddress, period, opReward, allowPotSplitting, autoConfirm) {
    try {
      // const receipt = await transaction.wait();
      return await this.stakingContractWithSigner.addExtendedStakeRequest(
        nodeAddress,
        amount,
        rewardAddress,
        period,
        opReward,
        allowPotSplitting,
        autoConfirm
      );
    } catch (ex) {
      return ex.message;
    }
  }

  async applyExtendedStakeRequest(extendedStakeId, amount, rewardAddress) {
    try {
      return await this.stakingContractWithSigner.applyExtendedStakeRequest(extendedStakeId, amount, rewardAddress);
    } catch (ex) {
      return ex.message;
    }
  }

  async approveExtendedStakeRequest(extendedStakeId, rewardAddress) {
    try {
      return await this.stakingContractWithSigner.approveExtendedStakeRequest(extendedStakeId, rewardAddress);
    } catch (ex) {
      return ex.message;
    }
  }

  async cancelExtendedStakeRequest(extendStakeId) {
    try {
      return await this.stakingContractWithSigner.cancelExtendedStakeRequest(extendStakeId);
    } catch (ex) {
      return ex.message;
    }
  }

  async declineExtendedStakeRequest(extendStakeId) {
    try {
      return await this.stakingContractWithSigner.declineExtendedStakeRequest(extendStakeId);
    } catch (ex) {
      return ex.message;
    }
  }
}

export default EtnyStakingContract;
