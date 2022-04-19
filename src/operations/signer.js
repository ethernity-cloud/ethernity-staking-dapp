import { ethers } from 'ethers';

const signMessage = async (library, account, message) => {
  const signer = library.getSigner(account);
  // const hexMessage = utils.hexlify(utils.toUtf8Bytes(message));
  // eslint-disable-next-line no-return-await
  return await signer.signMessage(message);
};

export const isMessageSigned = async (library, account, message) => {
  try {
    const signature = await signMessage(library, account, message);
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    return signerAddress === account;
  } catch (err) {
    return false;
  }
};
