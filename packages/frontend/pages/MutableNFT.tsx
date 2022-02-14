import { TileDocument } from '@ceramicnetwork/stream-tile';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { MutableNFT } from '../../hardhat/types/MutableNFT';
import MutableNFTArtifact from '../artifacts/contracts/MutableNFT.sol/MutableNFT.json';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import TokenForm from '../components/TokenForm';

import contractConfig from '../conf/config';
import { useContract } from '../hooks/useContract';
import useMintMutable from '../hooks/useMintMutable';
import useSelfID from '../hooks/useSelfID';
import { setRegistry } from '../redux/app';
import { useTypedSelector } from '../redux/store';
import { getRegistry, getTokenStreamID } from '../services/metadatamanage';
import { makeNewWordImage } from '../services/wordmaker';

const MutableNFTPage = (): JSX.Element => {
  const d = useDispatch();
  const { self } = useSelfID();
  const { currentNetworkChainId, metadataRegistry } = useTypedSelector((state) => state.app);
  const contract = useContract<MutableNFT>(
    contractConfig[currentNetworkChainId].mutableNft,
    MutableNFTArtifact.abi,
  );

  const { mintNFT, minting, balance, fetchTokenMetadata } = useMintMutable(contract);

  const myNFTContract = useMemo(() => {
    return contract;
  }, [contract]);

  const fetchRegistry = useCallback(async () => {
    const registry = await getRegistry();

    d(setRegistry(registry));
  }, [d]);

  useEffect(() => {
    fetchRegistry();
  }, [fetchRegistry]);

  if (!myNFTContract) {
    return (
      <div className="p-5 flex flex-col justify-center items-center h-full">
        <p>Contract Unavailable</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center p-2">
      <div className="bg-white border shadow-md mr-5 rounded-md p-2 w-1/2">
        <p className="text-gray-600 border-b mb-2">Mutable NFT</p>
        <button
          onClick={() => {
            mintNFT().then(() => {
              fetchRegistry();
            });
          }}
          className="inline-flex mb-2 disabled:opacity-40 w-full justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {minting ? <Spinner size="small" /> : 'MINT'}
        </button>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  TokenID
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {balance.map((tokenID) => (
                <TokenForm
                  updateNFT={async (newWord) => {
                    console.log('shit');
                    if (!self?.client.ceramic) return;
                    // Get new image URL
                    const { path } = await makeNewWordImage({ word: newWord });

                    const tokenStreamID = await getTokenStreamID({ tokenID: tokenID.toString() });

                    // Update metadata
                    const doc = await TileDocument.load(self?.client.ceramic, tokenStreamID);

                    await doc.update(
                      { image: path },
                      {},
                      { pin: true, publish: true, anchor: true },
                    );

                    fetchRegistry();
                  }}
                  fetchTokenMetadata={fetchTokenMetadata}
                  key={tokenID}
                  tokenID={tokenID}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white border shadow-md rounded-md p-2 w-1/2">
        <p className="text-gray-600 border-b mb-2">Collection metadata registry</p>
        <Table
          columns={[
            { name: 'Token ID', key: 'tokenID' },
            { name: 'Token URI', key: 'tokenURI' },
          ]}
          colCollection={Object.keys(metadataRegistry).map((tokenID) => ({
            tokenID,
            tokenURI: metadataRegistry[tokenID],
          }))}
        />
      </div>
    </div>
  );
};

export default MutableNFTPage;
