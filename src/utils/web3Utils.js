import { ethers } from 'ethers';

export const isAddress = (address) => {
  try {
    ethers.utils.getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
};
