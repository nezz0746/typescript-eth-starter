import contractConfig from '../conf/config';
import AetherianArtifact from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { useTypedSelector } from '../redux/store';
import { useContract } from './useContract';
import { MyNFT } from '../../hardhat/types/MyNFT';

const useNFTContract = (): MyNFT | null => {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);
  const contract = useContract<MyNFT>(
    contractConfig[currentNetworkChainId].myNft,
    AetherianArtifact.abi,
  );

  return contract;
};

export default useNFTContract;
