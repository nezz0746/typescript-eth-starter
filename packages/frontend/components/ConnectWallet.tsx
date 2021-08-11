/* eslint-disable @next/next/no-img-element */
import { useEthers } from '@usedapp/core';
import React, { useState } from 'react';
import { walletconnect } from '../lib/connectors';
import Modal from './Modal';

function ConnectWallet(): JSX.Element {
  const { activate, activateBrowserWallet } = useEthers();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src="images/wallet.svg" alt="wallet-icon" className="w-5 mr-2" />
          Connect to a wallet
        </button>
      </div>
      <Modal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        <div className="flex flex-col">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              activateBrowserWallet();
            }}
          >
            <img src="images/logo-metamask.png" className="w-5 mr-5" alt="metamask-logo" />
            MetaMask
          </button>
          <button
            className="inline-flex items-center px-4 py-2 mt-5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              activate(walletconnect);
            }}
          >
            <img src="images/logo-walletconnect.svg" className="w-5 mr-5" alt="metamask-logo" />
            WalletConnect
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ConnectWallet;
