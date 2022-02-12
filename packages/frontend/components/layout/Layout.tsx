import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useEthers, useNotifications } from '@usedapp/core';
import React from 'react';
import Snackbar, { SnackSeverity } from '../Snackbar';
import TransactionsIcon from '../svg/TransactionsIcon';
import CloseIcon from '../svg/CloseIcon';
import DappMenu from '../DappMenu';
import Spinner from '../svg/Spinner';
import NetworkMenu from '../NetworkMenu';
import { allowedChains } from '../../conf/config';
import { useTypedSelector } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setCurrentNetworkChainId, setShowTransactions } from '../../redux/app';
import TransactionsSidebar from '../TransactionsSidebar';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any;
  }
}

const TRANSACTION_TITLES: Record<string, { text: string; type: SnackSeverity }> = {
  transactionStarted: { text: 'Local Transaction Started...', type: 'pending' },
  transactionSucceed: { text: 'Local Transaction Completed !', type: 'success' },
  transactionFailed: { text: 'Local Transaction Failed :(', type: 'error' },
  walletConnected: { text: 'Wallet Connected Successfully !', type: 'success' },
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { chainId } = useEthers();
  const { notifications } = useNotifications();
  const { currentNetworkChainId, showTransactions, transactionProcessing } = useTypedSelector(
    (state) => state.app,
  );

  const renderTransactionButton = () => (
    <div className="ml-2 py-2">
      <button
        onClick={() => {
          dispatch(setShowTransactions(!showTransactions));
        }}
        className="inline-flex h-12 w-12 justify-center items-center p-2 border rounded-full shadow-md text-gray-600 bg-white hover:bg-gray-100"
      >
        {showTransactions ? (
          <CloseIcon />
        ) : transactionProcessing ? (
          <Spinner />
        ) : (
          <TransactionsIcon />
        )}
      </button>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="z-11">
        <Disclosure as="nav" className="bg-white shadow-md px-1">
          {({ open }) => (
            <>
              <div className="mx-auto px-2">
                <div className="relative flex justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <p className="text-2xl">ETH STARTER</p>
                    </div>
                    <div className="flex items-center ml-5">
                      <NetworkMenu
                        setNetwork={(chainId) => {
                          dispatch(setCurrentNetworkChainId(chainId));
                        }}
                        currentNetworkChainId={currentNetworkChainId}
                      />
                    </div>
                    {[
                      { path: '/', name: 'Greeter' },
                      { path: '/NFT', name: 'NFTs' },
                      { path: '/MutableNFT', name: 'Mutable NFTs' },
                    ].map((route) => {
                      return (
                        <div key={route.name} className="hidden sm:ml-6 sm:flex sm:space-x-8">
                          <Link href={route.path}>
                            <p
                              className={classNames({
                                'text-gray-900 inline-flex items-center px-1 pt-1  text-sm font-medium hover:cursor-pointer':
                                  true,
                                'border-indigo-500 border-b-2': route.path === router.pathname,
                              })}
                            >
                              {route.name}
                            </p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute hidden inset-y-0 right-0 sm:flex items-center">
                    <DappMenu />
                    <div className="hidden h-full sm:flex">{renderTransactionButton()}</div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-4 space-y-1">
                  <a
                    href="#"
                    className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Greeter
                  </a>
                  <div className="flex sm:hidden">
                    <DappMenu />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>
      <main className="flex-grow overflow-scroll bg-gray-100 z-0">
        <TransactionsSidebar />
        {chainId && chainId !== currentNetworkChainId ? (
          allowedChains.includes(chainId) ? (
            <div className="h-full justify-center flex flex-col">
              <p className="text-center text-gray-500">Please connect to the correct Network.</p>
            </div>
          ) : (
            <div className="h-full justify-center flex flex-col">
              <p className="text-center text-gray-500">Current Network not supported.</p>
            </div>
          )
        ) : (
          children
        )}
        <div className="absolute bottom-0 left-0 w-full p-2 flex flex-col">
          {notifications.map((notif) => (
            <div className="mt-2" key={notif.id}>
              <Snackbar
                {...{
                  message: TRANSACTION_TITLES[notif.type].text,
                  severity: TRANSACTION_TITLES[notif.type].type,
                }}
              />
            </div>
          ))}
        </div>
      </main>
      <footer className="p-3 border text-center">
        <p className="text-gray-600 font-extralight">
          Built in the future by{' '}
          <a
            href="https://twitter.com/home"
            className="text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            Nezzar KEFIF
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
