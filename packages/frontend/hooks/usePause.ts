/* eslint-disable no-console */
import { useContractFunction } from '@usedapp/core';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';

const usePause = (
  contract: MyNFT,
): { isPaused: boolean; pause: () => Promise<void>; unpause: () => Promise<void> } => {
  const [isPaused, setIsPaused] = useState(false);
  const { send: pause } = useContractFunction(contract, 'pause', { transactionName: 'Pause Sale' });
  const { send: unpause } = useContractFunction(contract, 'unpause', {
    transactionName: 'Unpause Sale',
  });

  const getPaused = useCallback(async () => {
    try {
      console.log('Reading from contract: paused()');
      const paused = await contract.paused();
      setIsPaused(paused);
    } catch (error) {
      console.log(`error`, error);
    }
  }, [contract]);

  useEffect(() => {
    getPaused();
  }, [getPaused]);

  return {
    isPaused,
    pause,
    unpause,
  };
};

export default usePause;
