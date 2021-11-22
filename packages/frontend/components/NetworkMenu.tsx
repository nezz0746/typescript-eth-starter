/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { ChainId } from '@usedapp/core';
import { Listbox, Transition } from '@headlessui/react';
import { HomeIcon, SelectorIcon } from '@heroicons/react/solid';
import { allowedChains } from '../conf/config';
import classNames from 'classnames';

interface NetworkOption {
  name: string;
  icon: React.ReactNode;
}

const chainIdToName: Record<number, NetworkOption> = {
  [ChainId.Localhost]: {
    name: 'Localhost',
    icon: <HomeIcon className="text-black w-5 h-5" />,
  },
  [ChainId.Hardhat]: {
    name: 'Hardhat',
    icon: <HomeIcon className="text-black w-5 h-5" />,
  },
  [ChainId.Rinkeby]: {
    name: 'Rinkeby',
    icon: <p className="bg-rinkeby w-4 h-4 rounded-full"></p>,
  },
  [ChainId.Polygon]: {
    name: 'Polygon',
    icon: <p className="bg-polygon w-4 h-4 rounded-full"></p>,
  },
};

export default function NetworkMenu({
  setNetwork,
  currentNetworkChainId,
}: {
  setNetwork: (chainId: number) => void;
  currentNetworkChainId: number;
}): JSX.Element {
  return (
    <div className="w-48">
      <Listbox value={currentNetworkChainId} onChange={setNetwork}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <div className={'flex flex-row justify-between items-center cursor-pointer'}>
              <p>{chainIdToName[currentNetworkChainId].name}</p>
              <div>{chainIdToName[currentNetworkChainId].icon}</div>
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {allowedChains.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                        cursor-default select-none relative`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <div
                      className={classNames({
                        'flex flex-row justify-between items-center py-2 pl-4 pr-4 cursor-pointer':
                          true,
                        'bg-indigo-200': selected,
                      })}
                    >
                      <p className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {chainIdToName[person].name}
                      </p>
                      <div>{chainIdToName[person].icon}</div>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
