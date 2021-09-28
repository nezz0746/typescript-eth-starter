/* eslint-disable @next/next/no-img-element */
import { useEthers } from '@usedapp/core';
import blockies from 'blockies-ts';

import React, { Fragment } from 'react';
import ConnectWallet from './ConnectWallet';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Balance from './Balance';

function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...');
}

const DappMenu = (): JSX.Element => {
  const { account, deactivate } = useEthers();
  let blockieImageSrc: string;

  if (typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: account as string | undefined }).toDataURL();
  }

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) =>
        !account ? (
          <ConnectWallet />
        ) : (
          <>
            <Menu.Button className="group p-2 py-3 pr-6 w-full flex items-center justify-between rounded-full border border-gray-300 shadow-sm space-x-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="min-w-0 flex-1 flex items-center h-6 space-x-3">
                <span className="flex flex-col justify-center items-center rounded-lg">
                  <img
                    style={{ height: 30, width: 30 }}
                    src={blockieImageSrc}
                    className="rounded-full"
                    alt="blockie"
                  />
                </span>
                <span className="block min-w-0 flex-1">
                  <span className="block text-sm font-medium text-gray-900 truncate">
                    {truncateHash(account)}
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate">
                    <Balance />
                  </span>
                </span>
              </span>
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <Menu.Item
                  onClick={() => {
                    deactivate();
                  }}
                >
                  {({ active }) => (
                    <p
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                      )}
                    >
                      Disconnect
                    </p>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )
      }
    </Menu>
  );
};

export default DappMenu;
