import { TileDocument } from '@ceramicnetwork/stream-tile';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { MutableNFT } from '../../hardhat/types/MutableNFT';
import MutableNFTArtifact from '../artifacts/contracts/MutableNFT.sol/MutableNFT.json';
import Map from '../components/Map';
import Spinner from '../components/Spinner';
import TokenForm from '../components/TokenForm';
import contractConfig from '../conf/config';
import { useContract } from '../hooks/useContract';
import useMintMutable from '../hooks/useMintMutable';
import useSelfID from '../hooks/useSelfID';
import { setRegions, setRegistry } from '../redux/app';
import { useTypedSelector } from '../redux/store';
import { getRegions, getRegistry, getTokenStreamID } from '../services/metadatamanage';
import { makeNewWordImage } from '../services/wordmaker';

const MutableNFTPage = (): JSX.Element => {
  const d = useDispatch();
  const { self } = useSelfID();
  const { currentNetworkChainId, tokenBalance } = useTypedSelector((state) => state.app);
  const contract = useContract<MutableNFT>(
    contractConfig[currentNetworkChainId].mutableNft,
    MutableNFTArtifact.abi,
  );
  const myNFTContract = useMemo(() => {
    return contract;
  }, [contract]);
  const { mintNFT, minting, fetchTokenMetadata, getBalance } = useMintMutable(myNFTContract);

  const fetchRegistry = useCallback(async () => {
    const registry = await getRegistry();
    const { regions } = await getRegions();

    getBalance();
    d(setRegions(regions));
    d(setRegistry(registry));
  }, [d, getBalance]);

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
    <>
      <div className="flex flex-row justify-center p-2 h-full">
        <div className="bg-white border shadow-md mr-5 rounded-md p-2 w-1/3">
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
                {tokenBalance.map(({ tokenID, data }) => {
                  console.log(data);
                  return (
                    <TokenForm
                      updateNFT={async (newWord) => {
                        if (!self?.client.ceramic) return;
                        // Get new image URL
                        const { path } = await makeNewWordImage({ word: newWord });

                        const tokenStreamID = await getTokenStreamID({
                          tokenID: tokenID.toString(),
                        });

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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white border shadow-md rounded-md p-2 w-2/3">
          <Map />
        </div>
      </div>
    </>
  );
};

export default MutableNFTPage;
