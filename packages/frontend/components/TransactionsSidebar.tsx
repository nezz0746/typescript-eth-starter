import { useTransactions } from '@usedapp/core';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { setTransactionProcessing } from '../redux/app';
import { useTypedSelector } from '../redux/store';
import Spinner from './svg/Spinner';
import SuccessIcon from './svg/SuccessIcon';

const TransactionsSidebar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { transactions } = useTransactions();
  const [showMoreTransactions, setShowMoreTransactions] = useState(false);
  const showTransactions = useTypedSelector((state) => state.app.showTransactions);
  const transactionPanelProps = useSpring({
    from: { translateX: 300, width: 300 },
    to: { translateX: showTransactions ? 0 : 300 },
  });

  const transactionsFromPast12Hours = transactions.filter((tx) =>
    dayjs(tx.submittedAt).isAfter(dayjs().subtract(12, 'hours')),
  );

  const checkTransactions = useCallback(() => {
    if (transactionsFromPast12Hours.filter((tx) => !tx.receipt).length > 0) {
      dispatch(setTransactionProcessing(true));
    } else {
      dispatch(setTransactionProcessing(false));
    }
  }, [dispatch, transactionsFromPast12Hours]);

  useEffect(() => {
    checkTransactions();
  }, [checkTransactions]);

  return (
    <animated.div
      style={transactionPanelProps}
      className="absolute right-0 border-l overflow-y-scroll  h-full "
    >
      {transactions.length === 0 ? (
        <p className="text-center mt-5">No Transactions</p>
      ) : (
        (showMoreTransactions ? transactions : transactionsFromPast12Hours).map((transaction) => {
          const pending = !transaction.receipt;

          return (
            <div
              className="w-full border-b justify-center items-center border-gray-300 cursor-pointer flex flex-row"
              key={transaction.transaction.hash}
            >
              <div className="p-4">
                {pending ? (
                  <div className="text-gray-400 h-7 w-7">
                    <Spinner />
                  </div>
                ) : (
                  <div className="text-green-400 h-7 w-7">
                    <SuccessIcon />
                  </div>
                )}
              </div>
              <div className=" flex-grow flex flex-row items-end">
                <p>{transaction.transactionName}</p>
                <p className="text-xs font-extralight ml-2">
                  {dayjs(transaction.submittedAt).format('HH:mm')}
                </p>
              </div>
            </div>
          );
        })
      )}
      {transactions.length > transactionsFromPast12Hours.length && (
        <div className="flex flex-row justify-center items-center p-5">
          <button
            type="button"
            onClick={() => {
              setShowMoreTransactions(!showMoreTransactions);
            }}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showMoreTransactions ? 'Show less' : 'Show More'}
          </button>
        </div>
      )}
    </animated.div>
  );
};

export default TransactionsSidebar;
