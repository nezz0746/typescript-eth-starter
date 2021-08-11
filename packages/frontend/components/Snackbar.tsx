import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import React, { Fragment, useEffect, useState } from 'react';
import ErrorIcon from './svg/ErrorIcon';
import PendingIcon from './svg/PendingIcon';
import SuccessIcon from './svg/SuccessIcon';

export type SnackSeverity = 'error' | 'warning' | 'info' | 'success' | 'pending';

export interface SnackProps {
  severity: SnackSeverity;
  message: string;
}

const snackConfig: Record<SnackSeverity, { icon: React.ReactNode; color: string }> = {
  error: {
    icon: <ErrorIcon />,
    color: 'text-red-600',
  },
  info: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: 'text-yellow-600',
  },
  warning: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: 'text-yellow-600',
  },
  success: {
    icon: <SuccessIcon />,
    color: 'text-green-600',
  },
  pending: {
    icon: <PendingIcon />,
    color: 'text-gray-600',
  },
};

export default function CustomizedSnackbars({ message, severity }: SnackProps): JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${snackConfig[severity].color}`}>
              {snackConfig[severity].icon}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  handleClose();
                }}
              >
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
