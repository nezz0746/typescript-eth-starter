/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';

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

const TokenForm = ({ tokenID, fetchTokenMetadata }: TokenFormProps): JSX.Element => {
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
    </tr>
  );
};

export default TokenForm;
