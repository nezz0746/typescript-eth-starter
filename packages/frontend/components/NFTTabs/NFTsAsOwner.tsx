/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import { Switch } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React, { useState } from 'react';
import { MyNFT } from '../../../hardhat/types/MyNFT';
import useListedPieces from '../../hooks/useListedPieces';
import useListPiece from '../../hooks/useListPiece';
import useOwner from '../../hooks/useOwner';
import usePause from '../../hooks/usePause';
import usePrice from '../../hooks/usePrice';
import Modal from '../Modal';

const NFTsAsOwner = ({ contract }: { contract: MyNFT }): JSX.Element => {
  const { isPaused, pause, unpause } = usePause(contract);
  const { image, addImage, removeImage, listItem } = useListPiece(contract);
  const isOwner = useOwner(contract);
  const { price } = usePrice(contract);
  const { pieces, refetchPieces } = useListedPieces(contract);
  const [listOpen, setListOpen] = useState(false);

  const renderUploader = (
    <div className="flex w-full justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      {image === null ? (
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex justify-center self-center text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload the NFT Image</span>
              <input
                onChange={(e) => {
                  if (e.target.files) {
                    addImage(e.target.files[0]);
                  }
                }}
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag</p>
          </div>
          <p className="text-xs text-gray-500">Host: IPFS</p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF maximum 10MB</p>
          <div className="pt-4">
            <p className="text-sm text-gray-500 pb-4">
              Or use one of these custom made artworks from{' '}
              <a
                className="text-indigo-500 font-bold"
                href="https://twitter.com/nezzRX"
                target="_blank"
                rel="noreferrer"
              >
                @nezzRX
              </a>{' '}
              ! :)
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                'https://i.imgur.com/C0MsUXS.jpg',
                'https://i.imgur.com/pAraStc.jpg',
                'https://i.imgur.com/pOxlDkZ.jpg',
                'https://i.imgur.com/QDyJoNB.jpg',
              ].map((url) => (
                <img
                  key={url}
                  src={url}
                  onClick={async () => {
                    const blob = await fetch(url).then((r) => r.blob());

                    addImage(new File([blob], 'myImage'));
                  }}
                  className="hover:opacity-70 cursor-pointer rounded-md"
                  alt={'Custom Heads NFTs Artwork'}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={URL.createObjectURL(image)} className="w-2/3" alt="NFT_image" />
          <div className="py-2 flex flex-row justify-end items-end">
            <button
              className="inline-flex mr-2 items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                removeImage();
              }}
              type="button"
            >
              Delete
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                listItem().then(() => {
                  removeImage();
                  refetchPieces();
                });
              }}
              type="button"
            >
              List
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg mt-2 relative">
      {!isOwner && (
        <div className="absolute w-full h-full z-9 bg-gray-300 bg-opacity-70 p-5">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Ownership Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    You are not the owner of this contract. Please use the correct account to access
                    this dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Sale Status</h2>
        <div className="flex flex-row py-2 items-center">
          <Switch.Group>
            <Switch.Label className="mr-3">
              <p className="text-gray-500">Paused</p>
            </Switch.Label>
            <Switch
              checked={!isPaused}
              onChange={() => {
                if (!isPaused) {
                  pause();
                } else {
                  unpause();
                }
              }}
              className={classNames(
                !isPaused ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                className={classNames(
                  !isPaused ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                )}
              >
                <span
                  className={classNames(
                    !isPaused
                      ? 'opacity-0 ease-out duration-100'
                      : 'opacity-100 ease-in duration-200',
                    'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                  )}
                  aria-hidden="true"
                >
                  <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                    <path
                      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className={classNames(
                    !isPaused
                      ? 'opacity-100 ease-in duration-200'
                      : 'opacity-0 ease-out duration-100',
                    'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                  )}
                  aria-hidden="true"
                >
                  <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                  </svg>
                </span>
              </span>
            </Switch>
            <Switch.Label className="ml-3">
              <p className="text-gray-500">Live</p>
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-gray-500 mr-2">Unit Price</p>
          <p className="font-bold">{price} ETH</p>
        </div>
        <div className="">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Listed Pieces</h2>

          <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {pieces.length === 0 ? (
              <p className="text-gray-400">No NFT listed</p>
            ) : (
              pieces.map((piece) => (
                <div key={piece.tokenURI} className="group relative">
                  <div className="px-2 py-3 rounded-md shadow-md border">
                    <div className="w-full bg-gray-200 rounded-md overflow-hidden">
                      <a href={piece.tokenURI} target="_blank" rel="noreferrer">
                        <img
                          src={piece.tokenURI}
                          alt={piece.tokenURI}
                          className="w-full h-full object-contain lg:w-full lg:h-full"
                        />
                      </a>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <p className="text-indigo-600 font-bold text-lg">
                            <span aria-hidden="true" className="inset-0" />
                            #0{piece.tokenId}
                          </p>
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {isOwner ? 'Free' : `${price} ETH`}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-row justify-end py-2">
          <button
            type="button"
            onClick={() => {
              setListOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            List a new piece
          </button>
        </div>
      </div>
      <Modal
        open={listOpen}
        handleClose={() => {
          setListOpen(false);
        }}
      >
        <div className="w-full">
          <div className="pb-4">
            <p className="text-2xl font-extrabold tracking-tight text-gray-900">
              List a new piece:
            </p>
          </div>
          {renderUploader}
        </div>
      </Modal>
    </div>
  );
};

export default NFTsAsOwner;
