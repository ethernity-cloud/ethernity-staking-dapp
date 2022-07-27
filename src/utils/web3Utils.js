import { ethers } from 'ethers';

export const isAddress = (address) => {
  try {
    ethers.utils.getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
};

export const emptyWalletAddress = '0x0000000000000000000000000000000000000000';

export const formatAddress = (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
