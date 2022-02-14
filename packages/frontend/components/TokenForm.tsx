/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import Spinner from './Spinner';

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
}

interface TokenFormProps {
  tokenID: number;
  fetchTokenMetadata: (tokenID: number) => Promise<Record<string, string> | undefined>;
  updateNFT: (newWord: string) => Promise<void>;
}

const TokenForm = ({ tokenID, fetchTokenMetadata, updateNFT }: TokenFormProps): JSX.Element => {
  const [newWord, setNewWord] = useState('');
  const [updating, setUpdating] = useState(false);
  const [metadata, setMetadata] = useState<TokenMetadata | null>(null);

  const fetchMetadata = useCallback(async () => {
    const data = await fetchTokenMetadata(tokenID);

    setMetadata(data as unknown as TokenMetadata);
  }, [fetchTokenMetadata, tokenID]);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  return (
    <tr className="border-b border-gray-100 select-none">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tokenID}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {metadata && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            src={metadata.image}
            onClick={() => {
              window.open(metadata.image, '_blank');
            }}
            className="h-32  border border-black cursor-pointer"
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700">Update your word NFT !</label>
          <div className="mt-1">
            <input
              type="text"
              name="newword"
              value={newWord}
              onChange={(e) => {
                setNewWord(e.target.value);
              }}
              id="newword"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="What's on you mind ?"
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button
          type="button"
          onClick={() => {
            setUpdating(true);
            updateNFT(newWord)
              .then(() => {
                fetchMetadata().then(() => {
                  setUpdating(false);
                });
              })
              .catch(() => {
                setUpdating(false);
              });
          }}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {updating ? <Spinner size="small" /> : 'Update'}
        </button>
      </td>
    </tr>
  );
};

export default TokenForm;
