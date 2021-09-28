import contractConfig from '../conf/config';
import { useTypedSelector } from '../redux/store';
import { MyNFT } from '../../hardhat/types/MyNFT';
import MyNFTArtifact from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { useContract } from '../hooks/useContract';
import { useMemo, useState } from 'react';
import classNames from 'classnames';
import NFTsAsOwner from '../components/NFTTabs/NFTsAsOwner';
import NFTsAsClient from '../components/NFTTabs/NFTsAsClient';

const NFTPage = (): JSX.Element => {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);
  const contract = useContract<MyNFT>(
    contractConfig[currentNetworkChainId].myNft,
    MyNFTArtifact.abi,
  );
  const [selectedTab, setSelectedTab] = useState(0);

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

  const tabs = [
    { name: 'As Owner', component: <NFTsAsOwner contract={myNFTContract} /> },
    { name: 'As Client', component: <NFTsAsClient contract={myNFTContract} /> },
  ];

  return (
    <div className="p-5 flex flex-col h-full">
      <div className="hidden sm:block">
        <nav className="relative rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              onClick={() => {
                setSelectedTab(tabIdx);
              }}
              className={classNames(
                selectedTab === tabIdx ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 cursor-pointer',
              )}
              aria-current={selectedTab === tabIdx ? 'page' : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  selectedTab === tabIdx ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                )}
              />
            </a>
          ))}
        </nav>
        {tabs[selectedTab].component}
      </div>
    </div>
  );
};

export default NFTPage;
