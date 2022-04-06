import { ethers } from 'ethers';

const getProvider = () => new ethers.providers.Web3Provider(window.ethereum);

const signMessage = async (account, message) => {
  const signer = getProvider().getSigner(account);
  // const hexMessage = utils.hexlify(utils.toUtf8Bytes(message));
  // eslint-disable-next-line no-return-await
  return await signer.signMessage(message);
};

export const isMessageSigned = async (account, message) => {
  try {
    const signature = await signMessage(account, message);
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    return signerAddress === account;
  } catch (err) {
    return false;
  }
};
