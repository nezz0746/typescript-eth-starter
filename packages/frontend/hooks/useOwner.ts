/* eslint-disable no-console */
import { useEthers } from '@usedapp/core';
import { useCallback, useEffect, useState } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';

const useOwner = (contract: MyNFT): boolean => {
  const { account } = useEthers();

  const [isOwner, setIsOwner] = useState(false);
  const isItOwner = useCallback(async () => {
    if (contract) {
      console.log('Reading from contract: owner()');
      const owner = await contract.owner();

      setIsOwner(account === owner);
    }
  }, [account, contract]);

  useEffect(() => {
    isItOwner();
  }, [isItOwner]);

  return isOwner;
};

export default useOwner;
