import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const counterABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'increment',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'setNumber',
    outputs: [],
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3ABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__.
 */
export function useCounterRead(config = {}) {
  return useContractRead({ abi: counterABI, ...config })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"number"`.
 */
export function useCounterNumber(config = {}) {
  return useContractRead({ abi: counterABI, functionName: 'number', ...config })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__.
 */
export function useCounterWrite(config = {}) {
  return useContractWrite({ abi: counterABI, ...config })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"increment"`.
 */
export function useCounterIncrement(config = {}) {
  return useContractWrite({
    abi: counterABI,
    functionName: 'increment',
    ...config,
  })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"setNumber"`.
 */
export function useCounterSetNumber(config = {}) {
  return useContractWrite({
    abi: counterABI,
    functionName: 'setNumber',
    ...config,
  })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__.
 */
export function usePrepareCounterWrite(config = {}) {
  return usePrepareContractWrite({ abi: counterABI, ...config })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"increment"`.
 */
export function usePrepareCounterIncrement(config = {}) {
  return usePrepareContractWrite({
    abi: counterABI,
    functionName: 'increment',
    ...config,
  })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"setNumber"`.
 */
export function usePrepareCounterSetNumber(config = {}) {
  return usePrepareContractWrite({
    abi: counterABI,
    functionName: 'setNumber',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function useIMulticall3Read(config = {}) {
  return useContractRead({ abi: iMulticall3ABI, ...config })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBasefee"`.
 */
export function useIMulticall3GetBasefee(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getBasefee',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBlockHash"`.
 */
export function useIMulticall3GetBlockHash(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getBlockHash',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBlockNumber"`.
 */
export function useIMulticall3GetBlockNumber(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getBlockNumber',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getChainId"`.
 */
export function useIMulticall3GetChainId(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getChainId',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockCoinbase"`.
 */
export function useIMulticall3GetCurrentBlockCoinbase(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getCurrentBlockCoinbase',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockDifficulty"`.
 */
export function useIMulticall3GetCurrentBlockDifficulty(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getCurrentBlockDifficulty',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockGasLimit"`.
 */
export function useIMulticall3GetCurrentBlockGasLimit(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getCurrentBlockGasLimit',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockTimestamp"`.
 */
export function useIMulticall3GetCurrentBlockTimestamp(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getCurrentBlockTimestamp',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getEthBalance"`.
 */
export function useIMulticall3GetEthBalance(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getEthBalance',
    ...config,
  })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getLastBlockHash"`.
 */
export function useIMulticall3GetLastBlockHash(config = {}) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getLastBlockHash',
    ...config,
  })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function useIMulticall3Write(config = {}) {
  return useContractWrite({ abi: iMulticall3ABI, ...config })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate"`.
 */
export function useIMulticall3Aggregate(config = {}) {
  return useContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate',
    ...config,
  })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3"`.
 */
export function useIMulticall3Aggregate3(config = {}) {
  return useContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate3',
    ...config,
  })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3Value"`.
 */
export function useIMulticall3Aggregate3Value(config = {}) {
  return useContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate3Value',
    ...config,
  })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"blockAndAggregate"`.
 */
export function useIMulticall3BlockAndAggregate(config = {}) {
  return useContractWrite({
    abi: iMulticall3ABI,
    functionName: 'blockAndAggregate',
    ...config,
  })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryAggregate"`.
 */
export function useIMulticall3TryAggregate(config = {}) {
  return useContractWrite({
    abi: iMulticall3ABI,
    functionName: 'tryAggregate',
    ...config,
  })
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryBlockAndAggregate"`.
 */
export function useIMulticall3TryBlockAndAggregate(config = {}) {
  return useContractWrite({
    abi: iMulticall3ABI,
    functionName: 'tryBlockAndAggregate',
    ...config,
  })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function usePrepareIMulticall3Write(config = {}) {
  return usePrepareContractWrite({ abi: iMulticall3ABI, ...config })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate"`.
 */
export function usePrepareIMulticall3Aggregate(config = {}) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate',
    ...config,
  })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3"`.
 */
export function usePrepareIMulticall3Aggregate3(config = {}) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate3',
    ...config,
  })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3Value"`.
 */
export function usePrepareIMulticall3Aggregate3Value(config = {}) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate3Value',
    ...config,
  })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"blockAndAggregate"`.
 */
export function usePrepareIMulticall3BlockAndAggregate(config = {}) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'blockAndAggregate',
    ...config,
  })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryAggregate"`.
 */
export function usePrepareIMulticall3TryAggregate(config = {}) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'tryAggregate',
    ...config,
  })
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryBlockAndAggregate"`.
 */
export function usePrepareIMulticall3TryBlockAndAggregate(config = {}) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'tryBlockAndAggregate',
    ...config,
  })
}
