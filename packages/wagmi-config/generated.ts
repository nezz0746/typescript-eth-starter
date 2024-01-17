import {
  useNetwork,
  useChainId,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export const counterABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NumberSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNumber',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'number',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_number', internalType: 'uint256', type: 'uint256' }],
    name: 'setNumber',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export const counterAddress = {
  5: '0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619',
  1337: '0x71C95911E9a5D330f4D621842EC243EE1343292e',
  80001: '0x4dEd60AC9C6859e19bb809026aFE8128DD810992',
  11155111: '0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87',
} as const

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export const counterConfig = {
  address: counterAddress,
  abi: counterABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UpgradeableCounter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const upgradeableCounterABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NumberSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNumber',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'number',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_number', internalType: 'uint256', type: 'uint256' }],
    name: 'setNumber',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UpgradeableCounterReciever
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const upgradeableCounterRecieverABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'number',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof counterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    ...config,
  } as UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"getNumber"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterGetNumber<
  TFunctionName extends 'getNumber',
  TSelectData = ReadContractResult<typeof counterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'getNumber',
    ...config,
  } as UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"number"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterNumber<
  TFunctionName extends 'number',
  TSelectData = ReadContractResult<typeof counterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'number',
    ...config,
  } as UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof counterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"proxiableUUID"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof counterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof counterABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof counterABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, TFunctionName, TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof counterABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'initialize' }
    : UseContractWriteConfig<typeof counterABI, 'initialize', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'initialize'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, 'initialize', TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof counterABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof counterABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, 'renounceOwnership', TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"setNumber"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterSetNumber<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof counterABI,
          'setNumber'
        >['request']['abi'],
        'setNumber',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setNumber' }
    : UseContractWriteConfig<typeof counterABI, 'setNumber', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setNumber'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, 'setNumber', TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'setNumber',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof counterABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof counterABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, 'transferOwnership', TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"upgradeTo"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterUpgradeTo<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof counterABI,
          'upgradeTo'
        >['request']['abi'],
        'upgradeTo',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'upgradeTo' }
    : UseContractWriteConfig<typeof counterABI, 'upgradeTo', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeTo'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, 'upgradeTo', TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'upgradeTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof counterABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      }
    : UseContractWriteConfig<typeof counterABI, 'upgradeToAndCall', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, 'upgradeToAndCall', TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function usePrepareCounterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function usePrepareCounterInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, 'initialize'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function usePrepareCounterRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"setNumber"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function usePrepareCounterSetNumber(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, 'setNumber'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'setNumber',
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, 'setNumber'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function usePrepareCounterTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"upgradeTo"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function usePrepareCounterUpgradeTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, 'upgradeTo'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'upgradeTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, 'upgradeTo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"upgradeToAndCall"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function usePrepareCounterUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, 'upgradeToAndCall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, 'upgradeToAndCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof counterABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    ...config,
  } as UseContractEventConfig<typeof counterABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__ and `eventName` set to `"AdminChanged"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof counterABI, 'AdminChanged'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof counterABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__ and `eventName` set to `"BeaconUpgraded"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterBeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof counterABI, 'BeaconUpgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof counterABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__ and `eventName` set to `"Initialized"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof counterABI, 'Initialized'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof counterABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__ and `eventName` set to `"NumberSet"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterNumberSetEvent(
  config: Omit<
    UseContractEventConfig<typeof counterABI, 'NumberSet'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    eventName: 'NumberSet',
    ...config,
  } as UseContractEventConfig<typeof counterABI, 'NumberSet'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof counterABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof counterABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__ and `eventName` set to `"Upgraded"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5e28e947EcC3684b6F385Dd1bB0C7Fa6f66F8619)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4dEd60AC9C6859e19bb809026aFE8128DD810992)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xc4793A8CB76A59Fd9E8341882784cD87fE8aFe87)
 */
export function useCounterUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof counterABI, 'Upgraded'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof counterABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link upgradeableCounterABI}__.
 */
export function useUpgradeableCounterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof upgradeableCounterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof upgradeableCounterABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: upgradeableCounterABI,
    ...config,
  } as UseContractReadConfig<
    typeof upgradeableCounterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"getNumber"`.
 */
export function useUpgradeableCounterGetNumber<
  TFunctionName extends 'getNumber',
  TSelectData = ReadContractResult<typeof upgradeableCounterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof upgradeableCounterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: upgradeableCounterABI,
    functionName: 'getNumber',
    ...config,
  } as UseContractReadConfig<
    typeof upgradeableCounterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"number"`.
 */
export function useUpgradeableCounterNumber<
  TFunctionName extends 'number',
  TSelectData = ReadContractResult<typeof upgradeableCounterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof upgradeableCounterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: upgradeableCounterABI,
    functionName: 'number',
    ...config,
  } as UseContractReadConfig<
    typeof upgradeableCounterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"owner"`.
 */
export function useUpgradeableCounterOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof upgradeableCounterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof upgradeableCounterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: upgradeableCounterABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof upgradeableCounterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"proxiableUUID"`.
 */
export function useUpgradeableCounterProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof upgradeableCounterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof upgradeableCounterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: upgradeableCounterABI,
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<
    typeof upgradeableCounterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__.
 */
export function useUpgradeableCounterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof upgradeableCounterABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof upgradeableCounterABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof upgradeableCounterABI, TFunctionName, TMode>({
    abi: upgradeableCounterABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"initialize"`.
 */
export function useUpgradeableCounterInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof upgradeableCounterABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<
        typeof upgradeableCounterABI,
        'initialize',
        TMode
      > & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof upgradeableCounterABI, 'initialize', TMode>({
    abi: upgradeableCounterABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useUpgradeableCounterRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof upgradeableCounterABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof upgradeableCounterABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof upgradeableCounterABI,
    'renounceOwnership',
    TMode
  >({
    abi: upgradeableCounterABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"setNumber"`.
 */
export function useUpgradeableCounterSetNumber<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof upgradeableCounterABI,
          'setNumber'
        >['request']['abi'],
        'setNumber',
        TMode
      > & { functionName?: 'setNumber' }
    : UseContractWriteConfig<
        typeof upgradeableCounterABI,
        'setNumber',
        TMode
      > & {
        abi?: never
        functionName?: 'setNumber'
      } = {} as any,
) {
  return useContractWrite<typeof upgradeableCounterABI, 'setNumber', TMode>({
    abi: upgradeableCounterABI,
    functionName: 'setNumber',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useUpgradeableCounterTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof upgradeableCounterABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof upgradeableCounterABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof upgradeableCounterABI,
    'transferOwnership',
    TMode
  >({
    abi: upgradeableCounterABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"upgradeTo"`.
 */
export function useUpgradeableCounterUpgradeTo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof upgradeableCounterABI,
          'upgradeTo'
        >['request']['abi'],
        'upgradeTo',
        TMode
      > & { functionName?: 'upgradeTo' }
    : UseContractWriteConfig<
        typeof upgradeableCounterABI,
        'upgradeTo',
        TMode
      > & {
        abi?: never
        functionName?: 'upgradeTo'
      } = {} as any,
) {
  return useContractWrite<typeof upgradeableCounterABI, 'upgradeTo', TMode>({
    abi: upgradeableCounterABI,
    functionName: 'upgradeTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"upgradeToAndCall"`.
 */
export function useUpgradeableCounterUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof upgradeableCounterABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & { functionName?: 'upgradeToAndCall' }
    : UseContractWriteConfig<
        typeof upgradeableCounterABI,
        'upgradeToAndCall',
        TMode
      > & {
        abi?: never
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof upgradeableCounterABI,
    'upgradeToAndCall',
    TMode
  >({
    abi: upgradeableCounterABI,
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__.
 */
export function usePrepareUpgradeableCounterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof upgradeableCounterABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: upgradeableCounterABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof upgradeableCounterABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareUpgradeableCounterInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof upgradeableCounterABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: upgradeableCounterABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof upgradeableCounterABI,
    'initialize'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareUpgradeableCounterRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof upgradeableCounterABI,
      'renounceOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: upgradeableCounterABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof upgradeableCounterABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"setNumber"`.
 */
export function usePrepareUpgradeableCounterSetNumber(
  config: Omit<
    UsePrepareContractWriteConfig<typeof upgradeableCounterABI, 'setNumber'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: upgradeableCounterABI,
    functionName: 'setNumber',
    ...config,
  } as UsePrepareContractWriteConfig<typeof upgradeableCounterABI, 'setNumber'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareUpgradeableCounterTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof upgradeableCounterABI,
      'transferOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: upgradeableCounterABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof upgradeableCounterABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"upgradeTo"`.
 */
export function usePrepareUpgradeableCounterUpgradeTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof upgradeableCounterABI, 'upgradeTo'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: upgradeableCounterABI,
    functionName: 'upgradeTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof upgradeableCounterABI, 'upgradeTo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link upgradeableCounterABI}__ and `functionName` set to `"upgradeToAndCall"`.
 */
export function usePrepareUpgradeableCounterUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof upgradeableCounterABI,
      'upgradeToAndCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: upgradeableCounterABI,
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof upgradeableCounterABI,
    'upgradeToAndCall'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link upgradeableCounterABI}__.
 */
export function useUpgradeableCounterEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof upgradeableCounterABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: upgradeableCounterABI,
    ...config,
  } as UseContractEventConfig<typeof upgradeableCounterABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link upgradeableCounterABI}__ and `eventName` set to `"AdminChanged"`.
 */
export function useUpgradeableCounterAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof upgradeableCounterABI, 'AdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: upgradeableCounterABI,
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof upgradeableCounterABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link upgradeableCounterABI}__ and `eventName` set to `"BeaconUpgraded"`.
 */
export function useUpgradeableCounterBeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof upgradeableCounterABI, 'BeaconUpgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: upgradeableCounterABI,
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof upgradeableCounterABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link upgradeableCounterABI}__ and `eventName` set to `"Initialized"`.
 */
export function useUpgradeableCounterInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof upgradeableCounterABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: upgradeableCounterABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof upgradeableCounterABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link upgradeableCounterABI}__ and `eventName` set to `"NumberSet"`.
 */
export function useUpgradeableCounterNumberSetEvent(
  config: Omit<
    UseContractEventConfig<typeof upgradeableCounterABI, 'NumberSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: upgradeableCounterABI,
    eventName: 'NumberSet',
    ...config,
  } as UseContractEventConfig<typeof upgradeableCounterABI, 'NumberSet'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link upgradeableCounterABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useUpgradeableCounterOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<
      typeof upgradeableCounterABI,
      'OwnershipTransferred'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: upgradeableCounterABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof upgradeableCounterABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link upgradeableCounterABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useUpgradeableCounterUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof upgradeableCounterABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: upgradeableCounterABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof upgradeableCounterABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link upgradeableCounterRecieverABI}__.
 */
export function useUpgradeableCounterRecieverRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof upgradeableCounterRecieverABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof upgradeableCounterRecieverABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: upgradeableCounterRecieverABI,
    ...config,
  } as UseContractReadConfig<
    typeof upgradeableCounterRecieverABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link upgradeableCounterRecieverABI}__ and `functionName` set to `"number"`.
 */
export function useUpgradeableCounterRecieverNumber<
  TFunctionName extends 'number',
  TSelectData = ReadContractResult<
    typeof upgradeableCounterRecieverABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof upgradeableCounterRecieverABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: upgradeableCounterRecieverABI,
    functionName: 'number',
    ...config,
  } as UseContractReadConfig<
    typeof upgradeableCounterRecieverABI,
    TFunctionName,
    TSelectData
  >)
}
