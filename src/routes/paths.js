const path = (root, sublink) => `${root}${sublink}`;

const ROOTS_AUTH = '/auth';
const ROOTS_APP = '/';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_APP = {
  root: ROOTS_APP,
  staking: {
    root: path(ROOTS_APP, '/staking'),
    create: path(ROOTS_APP, '/staking/create')
  }
};
