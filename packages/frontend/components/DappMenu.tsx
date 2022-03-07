/* eslint-disable @next/next/no-img-element */
import { useEthers } from '@usedapp/core';
import blockies from 'blockies-ts';
import React from 'react';
import useSelfID from '../hooks/useSelfID';

export function truncateHash(hash: string): string {
  return hash.replace(hash.substring(9, hash.length - 4), '...');
}

const DappMenu = (): JSX.Element => {
  const { account, active } = useEthers();
  const { self, login } = useSelfID();
  let accountBlockieImageSrc: string;
  let didBlockieImageSrc: string;

  if (typeof window !== 'undefined') {
    didBlockieImageSrc = blockies.create({ seed: self?.did.id || '987' }).toDataURL();

    accountBlockieImageSrc = blockies.create({ seed: account as string | undefined }).toDataURL();
  }
  return (
    <div>
      <div className="group bg-white h-14 w-full flex items-center justify-between rounded-full shadow-sm space-x-2 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <div
          onClick={() => {
            login();
          }}
          className="flex cursor-pointer bg-black p-2 rounded-full rounded-tr-none flex-col justify-center items-center"
        >
          {active ? (
            <img src={didBlockieImageSrc} className="rounded-full h-10 w-10" alt="blockie" />
          ) : (
            <div className="border rounded-full h-10 w-10" />
          )}
        </div>
        <div className="">
          <div className="block text-sm font-bold text-gray-900 truncate">
            {self?.did.id ? truncateHash(self?.did.id || '') : 'Connect'}
          </div>
          <div className="block text-sm text-right text-orange-600 truncate">
            {account ? truncateHash(account || '') : 'Connect'}
          </div>
        </div>
        <div
          onClick={() => {
            // setConnectModalOpen(true);
          }}
          className="flex p-2 cursor-pointer relative rounded-full rounded-bl-none bg-orange-600 flex-col justify-center items-center"
        >
          {account ? (
            <img src={accountBlockieImageSrc} className="rounded-full h-10 w-10" alt="blockie" />
          ) : (
            <div className="border rounded-full h-10 w-10" />
          )}
          {/* {account && (
            <div className="absolute bottom-1 rounded-full bg-white left-2 h-4 w-4">
              <Image src="/metamask.png" layout="fill" />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default DappMenu;
