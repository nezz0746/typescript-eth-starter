import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({
  open,
  handleClose,
  children,
}: {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        open={open}
        onClose={handleClose}
      >
        <div className="flex flex-col items-center sm:py-8 justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block border w-1/2 bg-white rounded-lg px-4 pt-5 pb-4 overflow-scroll shadow-xl transform transition-all sm:p-6">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
