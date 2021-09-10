import contractConfig from '../conf/config';
import { useTypedSelector } from '../redux/store';
import { MyNFT } from '../../hardhat/types/MyNFT';
import MyNFTArtifact from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { useContract } from '../hooks/useContract';
import { useMemo } from 'react';

const NFTPage = (): JSX.Element => {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);
  const contract = useContract<MyNFT>(
    contractConfig[currentNetworkChainId].myNft,
    MyNFTArtifact.abi,
  );

  const myNFTContract = useMemo(() => {
    return contract;
  }, [contract]);

  if (!myNFTContract) {
    return (
      <div className="p-5 flex flex-col justify-center items-center h-full">
        <p>Contract Unavailable</p>
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col  h-full">
      <p>NFTs</p>
    </div>
  );
};

export default NFTPage;
