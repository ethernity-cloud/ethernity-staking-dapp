export const contract = {
  address: '0xEd84B2CC141dFD05d132F903C2a402C64BCab19A',
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'staker',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'baseStakeId',
          type: 'uint256'
        }
      ],
      name: 'NewBaseStake',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'staker',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'baseStakeId',
          type: 'uint256'
        }
      ],
      name: 'NewExtendedStake',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'nodeAddress',
          type: 'address'
        },
        {
          internalType: 'uint64',
          name: 'amount',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'period',
          type: 'uint64'
        }
      ],
      name: 'addBaseStakeRequest',
      outputs: [
        {
          internalType: 'uint256',
          name: '_rowNumber',
          type: 'uint256'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'companyAddress',
          type: 'address'
        }
      ],
      name: 'addCompanyWallet',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'nodeAddress',
          type: 'address'
        },
        {
          internalType: 'uint64',
          name: 'amount',
          type: 'uint64'
        },
        {
          internalType: 'address',
          name: 'rewardAddress',
          type: 'address'
        },
        {
          internalType: 'uint64',
          name: 'period',
          type: 'uint64'
        },
        {
          internalType: 'uint8',
          name: 'opReward',
          type: 'uint8'
        },
        {
          internalType: 'bool',
          name: 'allowMultipleOp',
          type: 'bool'
        },
        {
          internalType: 'bool',
          name: 'autoConfirm',
          type: 'bool'
        }
      ],
      name: 'addExtendedStakeRequest',
      outputs: [
        {
          internalType: 'uint256',
          name: '_extendedStakeId',
          type: 'uint256'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'extendedStakeID',
          type: 'uint256'
        },
        {
          internalType: 'uint64',
          name: 'amount',
          type: 'uint64'
        },
        {
          internalType: 'address',
          name: 'rewardAddress',
          type: 'address'
        }
      ],
      name: 'applyExtendedStakeRequest',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'baseStakeId',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'rewardAddress',
          type: 'address'
        }
      ],
      name: 'approveBaseStakeRequest',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'extendedStakeId',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'rewardAddress',
          type: 'address'
        }
      ],
      name: 'approveExtendedStakeRequest',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'baseStakeId',
          type: 'uint256'
        }
      ],
      name: 'cancelBaseStakeRequest',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'extendedStakeID',
          type: 'uint256'
        }
      ],
      name: 'cancelExtendedStakeRequest',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'baseStakeId',
          type: 'uint256'
        }
      ],
      name: 'declineBaseStakeRequest',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'extendedStakeID',
          type: 'uint256'
        }
      ],
      name: 'declineExtendedStakeRequest',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'baseStakeId',
          type: 'uint256'
        }
      ],
      name: 'getBaseStake',
      outputs: [
        {
          internalType: 'uint256',
          name: '_baseStakeId',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'stakeHolderAddress',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'rewardAddress',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'nodeAddress',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          internalType: 'uint64',
          name: 'amount',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'period',
          type: 'uint64'
        },
        {
          internalType: 'enum Statuses.BaseStakeStatus',
          name: 'status',
          type: 'uint8'
        },
        {
          internalType: 'enum Statuses.StakeType',
          name: 'stakeType',
          type: 'uint8'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getBaseStakeRequestTotal',
      outputs: [
        {
          internalType: 'uint256',
          name: 'count',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentApyPercentage',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'extendedStakeId',
          type: 'uint256'
        }
      ],
      name: 'getExtendedStake',
      outputs: [
        {
          internalType: 'uint256',
          name: '_baseStakeId',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'stakeHolderAddress',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'rewardAddress',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'nodeAddress',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          internalType: 'uint64',
          name: 'amount',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'amountBooked',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'period',
          type: 'uint64'
        },
        {
          internalType: 'uint8',
          name: 'operatorReward',
          type: 'uint8'
        },
        {
          internalType: 'bool',
          name: 'allowMultipleOp',
          type: 'bool'
        },
        {
          internalType: 'bool',
          name: 'autoConfirm',
          type: 'bool'
        },
        {
          internalType: 'enum Statuses.ExtendedStakeStatus',
          name: 'status',
          type: 'uint8'
        },
        {
          internalType: 'uint64',
          name: 'stakingContracts',
          type: 'uint64'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'extendedStakeId',
          type: 'uint256'
        }
      ],
      name: 'getExtendedStakeRequestContractStats',
      outputs: [
        {
          internalType: 'uint256',
          name: '_extendedStakeId',
          type: 'uint256'
        },
        {
          internalType: 'uint64',
          name: 'allContracts',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'pendingContracts',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'approvedContracts',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'declinedContracts',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'canceledContracts',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'terminatedContracts',
          type: 'uint64'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getExtendedStakeRequestTotal',
      outputs: [
        {
          internalType: 'uint256',
          name: 'count',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getMaxBaseStakeAmount',
      outputs: [
        {
          internalType: 'uint64',
          name: '',
          type: 'uint64'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getMinBaseStakeAmount',
      outputs: [
        {
          internalType: 'uint64',
          name: '',
          type: 'uint64'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getMinPeriodForStake',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'stakeId',
          type: 'uint256'
        },
        {
          internalType: 'uint64',
          name: 'stakeContract',
          type: 'uint64'
        }
      ],
      name: 'getStakeContractForStake',
      outputs: [
        {
          internalType: 'uint256',
          name: '_stakeId',
          type: 'uint256'
        },
        {
          internalType: 'uint64',
          name: '_stakeContract',
          type: 'uint64'
        },
        {
          internalType: 'uint256',
          name: 'stakeContractId',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'stakeHolderAddress',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'stakeHolderRewardAddress',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'nodeAddress',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'nodeRewardAddress',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          internalType: 'uint64',
          name: 'amount',
          type: 'uint64'
        },
        {
          internalType: 'uint64',
          name: 'period',
          type: 'uint64'
        },
        {
          internalType: 'enum Statuses.StakeContractStatus',
          name: 'status',
          type: 'uint8'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getStakeTotalSupply',
      outputs: [
        {
          internalType: 'uint64',
          name: '',
          type: 'uint64'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'oldCompanyAddress',
          type: 'address'
        }
      ],
      name: 'removeCompanyWallet',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint8',
          name: 'value',
          type: 'uint8'
        }
      ],
      name: 'setApyPercentage',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint64',
          name: 'value',
          type: 'uint64'
        }
      ],
      name: 'setMaxAmountForBaseStake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'setMaxTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint64',
          name: 'value',
          type: 'uint64'
        }
      ],
      name: 'setMinAmountForBaseStake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint8',
          name: 'value',
          type: 'uint8'
        }
      ],
      name: 'setMinPeriodForBaseStake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bool',
          name: 'status',
          type: 'bool'
        }
      ],
      name: 'setStakingStatus',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
};
