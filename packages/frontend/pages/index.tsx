/* eslint-disable no-console */
import { useContractFunction } from '@usedapp/core';
import GreeterArtifact from '../artifacts/contracts/Greeter.sol/Greeter.json';
import { Greeter } from '../../hardhat/types/Greeter';
import React, { useCallback, useEffect, useState } from 'react';
import { useContract } from '../hooks/useContract';
import contractConfig from '../conf/config';
import { useTypedSelector } from '../redux/store';

export default function Home(): JSX.Element {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);
  const greeterContract = useContract<Greeter>(
    contractConfig[currentNetworkChainId].greeter,
    GreeterArtifact.abi,
  );

  return (
    <div className="p-5 flex flex-row justify-center items-center h-full">
      {greeterContract ? <GreetingCard contract={greeterContract} /> : <p>Contract Unavailable</p>}
    </div>
  );
}

const GreetingCard = ({ contract }: { contract: Greeter }) => {
  const setGreetingCaller = useContractFunction(contract, 'setGreeting', {
    transactionName: 'Setting Greeting.',
  });

  const [greeting, setGreeting] = useState('');
  const [updateCount, setCount] = useState(0);

  const fetchGreeting = useCallback(async () => {
    const data = await contract.greet();

    setGreeting(data);
  }, [contract]);

  const fetchCount = useCallback(async () => {
    const greeted = await contract.greeted();
    setCount(greeted.toNumber());
  }, [contract]);

  useEffect(() => {
    fetchGreeting();
    fetchCount();
  }, [fetchCount, fetchGreeting]);

  const setGreeter = async () => {
    await setGreetingCaller.send(greeting);

    fetchGreeting();
    fetchCount();
  };

  return (
    <div className="bg-white p-5 relative overflow-hidden shadow rounded-lg w-1/2">
      <div className="">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Greeter
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            {updateCount}
          </span>
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="greeter"
            id="greeter"
            value={greeting}
            onChange={(e) => {
              setGreeting(e.target.value);
            }}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Say hello !"
          />
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              onClick={setGreeter}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
